export default class CreateImages {
    constructor(build, backup) {
        this.build = build;
        this.backup = backup;
        this.build_from = 1;
        this.build_to = 2;
        this.backup_from = 1;
        this.backup_to = 16;

        this.createBuildSection();
        this.createBackupSection();
    }

    createBuildSection() {
        const path = `./assets/images/build/`;
        this.createImages(path, this.build, this.build_from, this.build_to);
    }

    createBackupSection() {
        const path = `./assets/images/backup/`;
        this.createImages(path, this.backup, this.backup_from, this.backup_to);
    }

    createImages(path, parent, from, to) {
        for (let i = from; i <= to; i++) {
            const image = document.createElement('img');
            const input = document.createElement('textarea');
            const div = document.createElement('div');
            image.src = path + `${i}.jpg`;
            input.maxLength = '28';
            input.placeholder = 'add some text'
            input.style.display = 'none';
            input.setAttribute('class', 'textAreaClass')
            div.appendChild(image);
            div.appendChild(input);
            parent.appendChild(div);
        }
    }
}