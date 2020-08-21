import CreateImages from './modules/createElements';
import CanvasApi from './modules/canvas.js';
import CssApi from './modules/cssApi';

import {
  setEventsListener,
  DOMelements,
  setLoader,
  setOnClickEvents,
  dnd,
} from './modules/base';

(() => {
  const createImg = new CreateImages(DOMelements.build, DOMelements.backup); 
  const canvasApi = new CanvasApi(
    DOMelements.build,
    DOMelements.backup,
    DOMelements.canvas
  ); 
  const cssApi = new CssApi(); 

  setLoader(cssApi);
  createImg.createBuildSection();
  createImg.createBackupSection();
  setOnClickEvents(canvasApi, cssApi);
  setEventsListener(0);
  dnd(canvasApi);
})();
