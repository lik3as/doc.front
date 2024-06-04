const offcanvasFileDesc = new bootstrap.Offcanvas('#offcanvasFileDesc');
var FileDescAction = document.querySelectorAll('.file-card .form-check-label, .file-card td:nth-child(2)');
for (var i = 0; i < FileDescAction.length; i++) {
  FileDescAction[i].addEventListener('click', function(event) {
    var targetElement = event.target;
    if (targetElement.tagName == 'LABEL') {
      // if (targetElement.parentNode.children[0].checked == true) {
      offcanvasFileDesc.show();
      // }
    } else {
      offcanvasFileDesc.show();
    }
  });
}


