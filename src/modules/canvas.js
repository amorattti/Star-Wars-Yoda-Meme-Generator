import CssApi from './cssApi';

export default class CanvasApi {
    constructor(build, backup, canvas) {
        this.canvas = canvas;
        this.build = build;
        this.backup = backup;
        this.cssApi = new CssApi()
        this.redrawImages();
    }

    preview() {
        const mirroPreviewELem = document.querySelector('.mirrorPreview');
        const ctx = this.canvas.getContext('2d');
        const mirrorCanvas = document.getElementById('mirrorCanvas');
        const mirrorCtx = mirrorCanvas.getContext('2d');
        ctx.scale(1.5, 1.5);

        const copyImage = ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);

        mirrorCanvas.height = this.canvas.height;
        mirrorCtx.putImageData(copyImage, 0, 0);
        this.cssApi.activate(mirroPreviewELem)
    }

    download(link) {
        link.href = this.canvas.toDataURL();
        link.download = 'mem.png'
    }

    async redrawImages() {
        const context = this.canvas.getContext('2d');
        const sources = {};
        let dyCanvas = 1;
        let i = 0;

        for (let i = 0; i < this.build.children.length; ++i) {
            const imageIndex = 'image' + i;
            sources[imageIndex] = this.build.children[i].firstChild.src;
        }

        const imagesObj = await this.loadImages(sources);

        for (let prop in imagesObj) {
            const text = document.getElementsByTagName('textarea')[i].value;
            const imgObj = imagesObj[prop];
            const width = imagesObj[prop].width;
            const height = imagesObj[prop].height;
            const linePosY = dyCanvas + height + 1;
            const fontSize = "34px"

            this.resize(linePosY, width, context);
            context.scale(0.7, 0.7);
            context.drawImage(imgObj, 0, dyCanvas, width, height);
            dyCanvas += height;
            context.font = "bold 40px sans-serif";
            context.fillStyle = "white";
            context.textBaseline = "middle";

            const lines = this.fragmentText(text, width - parseInt(fontSize, 0), context);
            lines.forEach(function (line, i) {
                context.strokeStyle = 'black';
                context.lineWidth = 8;
                context.strokeText(line, 20, (i + 1) * parseInt(fontSize, 0) + dyCanvas - 90, width - 50);
                context.fillStyle = 'white';
                context.fillText(line, 20, (i + 1) * parseInt(fontSize, 0) + dyCanvas - 90, width - 50);
            });
            context.restore();
            i++
        }
    }
    // resize to create multilane image canvas
    resize(linePosY, width, context) {
        const temp = context.getImageData(0, 0, canvas.width, canvas.height);
        this.canvas.height = linePosY * 0.7; // multiply because context.scale(0.7, 0.7);
        this.canvas.width = width * 0.7; // multiply because context.scale(0.7, 0.7);
        context.putImageData(temp, 0, -.90);
    }

    loadImages(sources) {
        const images = {};
        let loadedImages = 0;
        let numImages = 0;
        // get num of sources
        return new Promise((resolve) => {
            for (let src in sources) {
                numImages++;
            }
            for (let src in sources) {
                images[src] = new Image();
                images[src].onload = function () {
                    if (++loadedImages >= numImages) {
                        resolve(images);
                    }
                };
                images[src].src = sources[src];
            }
        })
    }

    fragmentText(text, maxWidth, context) {
        let words = text.split(' '),
            lines = [],
            line = "";
        if (context.measureText(text).width < maxWidth) {
            return [text];
        }
        while (words.length > 0) {
            while (context.measureText(words[0]).width >= maxWidth) {
                let tmp = words[0];
                words[0] = tmp.slice(0, -1);
                if (words.length > 1) {
                    words[1] = tmp.slice(-1) + words[1];
                } else {
                    words.push(tmp.slice(-1));
                }
            }
            if (context.measureText(line + words[0]).width < maxWidth) {
                line += words.shift() + " ";
            } else {
                lines.push(line);
                line = "";
            }
            if (words.length === 0) {
                lines.push(line);
            }
        }
        return lines;
    }
}
