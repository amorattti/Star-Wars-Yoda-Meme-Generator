import CanvasApi from './canvas';

export const DOMelements = {
  build: document.getElementById('build'),
  backup: document.getElementById('backup'),
  canvas: document.getElementById('canvas'),
  preview: document.getElementById('preview'),
  previewB: document.getElementById('preview_button'),
  downloadB: document.getElementById('download_button'),
  mirrorPreview: document.getElementById('mirrorPreview_Id'),
  inputs: document.getElementsByTagName('textarea'),
  body: document.querySelector('body'),
  loader: document.querySelector('#loader'),
};

export const dnd = (canvasApi) => {
  const drake = dragula([DOMelements.build, DOMelements.backup]);
  drake.on('drop', (el, target, source) => {
    if (target != source || target === build) {
      if (target.children.length > 3 && target === build) {
        source.appendChild(target.lastChild);
        canvasApi.redrawImages();
      } else {
        canvasApi.redrawImages();
      }
    }
  });
};

export const setEventsListener = (i) => {
  const canvasApi = new CanvasApi(
    DOMelements.build,
    DOMelements.backup,
    DOMelements.canvas
  );

  if (i < DOMelements.inputs.length) {
    DOMelements.inputs[i].onblur = () => canvasApi.redrawImages();
    DOMelements.inputs[i].onkeydown = (e) => {
      if (e.keyCode === 13) {
        canvasApi.redrawImages();
      }
    };
    setEventsListener(i + 1);
  }
};

export const setLoader = (cssApi) => {
  document.onreadystatechange = () => {
    if (document.readyState !== 'complete') {
      cssApi.visibilityOff(DOMelements.body);
      cssApi.visibilityOn(DOMelements.loader);
    } else {
      cssApi.deactivate(DOMelements.loader);
      cssApi.visibilityOn(DOMelements.body);
    }
  };
};

export const setOnClickEvents = (canvasApi, cssApi) => {
  DOMelements.preview.onclick = () => canvasApi.preview();
  DOMelements.mirrorPreview.onclick = () =>
    cssApi.deactivate(DOMelements.mirrorPreview);
  DOMelements.previewB.onclick = () => canvasApi.preview();
  DOMelements.downloadB.onclick = (e) =>
    canvasApi.download(e.target.parentNode);
};
