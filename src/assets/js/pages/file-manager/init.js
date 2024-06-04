const Tus = Uppy.Tus;
const DragDrop = Uppy.DragDrop;
const ProgressBar = Uppy.ProgressBar;

const onUploadSuccess = (elForUploadedFiles) => (file, response) => {
  const url = response.uploadURL;
  const fileName = file.name;

  const li = document.createElement('li');
  const a = document.createElement('a');
  a.href = url;
  a.target = '_blank';
  a.appendChild(document.createTextNode(fileName));
  li.appendChild(a);

  document.querySelector(elForUploadedFiles).appendChild(li);
};

(function() {
  const pc_uppy_3 = new Uppy.Uppy({ debug: true, autoProceed: true })
  pc_uppy_3
    .use(DragDrop, { target: '.pc-uppy-3 .for-DragDrop' })
    .use(Tus, { endpoint: 'https://tusd.tusdemo.net/files/' })
    .use(ProgressBar, { target: '.pc-uppy-3 .for-ProgressBar', hideAfterFinish: false })
    .on('upload-success', onUploadSuccess('.pc-uppy-3 .uploaded-files ol'))
})();

