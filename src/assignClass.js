export default class AssignClass {
    constructor() {
        this.active_css = 'active';
        this.inactive_css = 'inactive';
    }

    activate(element) {
        element.classList.add(this.active_css);
        element.classList.remove(this.inactive_css);
    }

    deactivate(element) {
        element.classList.add(this.inactive_css);
        element.classList.remove(this.active_css);
    }

    visibilityOn(element) {
        element.style.visibility = "visible";
    }

    visibilityOff(element) {
        element.style.visibility = "hidden";
    }
}
