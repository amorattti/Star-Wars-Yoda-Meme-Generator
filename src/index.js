import CreateImages from './modules/createElements';
import CanvasApi from './modules/canvas.js';
import CssApi from './modules/cssApi';

import {
    setEventsListener,
    DOMelements,
    setLoader,
    setOnClickEvents,
    dnd
} from './modules/base';


(() => {
    const createImg = new CreateImages(DOMelements.build, DOMelements.backup); // just create imagines in containers
    const canvasApi = new CanvasApi(DOMelements.build, DOMelements.backup, DOMelements.canvas); // run canvas and use methods
    const cssApi = new CssApi(); // css api, hide or show item
    
    setLoader(cssApi);
    createImg.createBuildSection();
    createImg.createBackupSection();
    setOnClickEvents(canvasApi, cssApi);
    setEventsListener(0);
    dnd(canvasApi);
})();





