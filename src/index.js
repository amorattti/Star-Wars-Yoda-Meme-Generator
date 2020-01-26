import CreateImages from './createElements';
import CanvasApi from './canvas.js';
import AssignClass from './assignClass';

// containers
const build = document.getElementById("build");
const backup = document.getElementById('backup');
const canvas = document.getElementById('canvas');

// clickable elements
const preview = document.getElementById('preview');
const previewB = document.getElementById('preview_button');
const downloadB = document.getElementById('download_button');
const mirrorPreview = document.getElementById('mirrorPreview_Id');

new CreateImages(build, backup); // just create imagines in containers
const canvasApi = new CanvasApi(build, backup, canvas); // run canvas and use methods
const assignClass = new AssignClass() // css api, hide or show item

preview.onclick = () => canvasApi.preview();
mirrorPreview.onclick = (e) => assignClass.deactivate(e.target);
previewB.onclick = () => canvasApi.preview();
downloadB.onclick = (e) => canvasApi.download(e.target.parentNode);

// deactivate mirror blur background on start
assignClass.deactivate(mirrorPreview);

(() => {     
    const drake = dragula([build, backup]);
    setEvents(0)

    document.onreadystatechange = () => {
        if (document.readyState !== "complete") {
            document.querySelector(
                "body").style.visibility = "hidden";
            document.querySelector(
                "#loader").style.visibility = "visible";
        } else {
            document.querySelector(
                "#loader").style.display = "none";
            document.querySelector(
                "body").style.visibility = "visible";
        }
    }; 
     
    drake.on('drop', (el, target, source) => {
        if(target != source || target === build) {                 
            if(target.children.length > 3 && target === build) {
                source.appendChild(target.lastChild);                    
                canvasApi.redrawImages();
            } else {
                canvasApi.redrawImages(); 
            }                
        };
    });

    function setEvents(i) {
        const inputs = document.getElementsByTagName('textarea');
     
        if(i < inputs.length) {
            inputs[i].onblur = () => canvasApi.redrawImages(); 
            inputs[i].onkeydown = e => {
                if(e.keyCode === 13) {
                    canvasApi.redrawImages(); 
                }
            }        
            setEvents(i + 1) 
        }      
    }
  
})();
    



