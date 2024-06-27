export default class FileCard {
  filename;
  createdAt;
  parent;

  constructor(filename, createdAt) {
    this.filename = filename;
    this.createdAt = createdAt;
  }

  render(parent, key) {
    const cardNode = document.createElement("div");
    cardNode.className = "col-md-6 col-lg-4 col-xxl-3";

    const offcanvasFileDesc = new bootstrap.Offcanvas('#offcanvasFileDesc-' + key);

    cardNode.onclick = (event) => {
      var targetElement = event.target;
      if (targetElement.tagName == 'LABEL') {
        // if (targetElement.parentNode.children[0].checked == true) {
        offcanvasFileDesc.show();
        // }
      } else {
        offcanvasFileDesc.show();
      }
    };

    cardNode.innerHTML = `
      <div class="card file-card">
        <div class="card-body">
          <div class="d-flex align-items-center justify-content-between">
            <div class="form-check">
              <input type="radio" name="file-radio" class="form-check-input input-primary" id="file-check-${key}" />
              <label class="form-check-label d-block" for="file-check-${key}"> </label>
            </div>
          </div>
          <div class="my-3 text-center">
            <img src="/assets/images/application/img-file-pdf.svg" alt="img" class="img-fluid" />
          </div>
          <div class="d-flex align-items-center justify-content-between mt-4">
            <div>
              <h6 class="mb-0">
                <span class="w-100 filename">${this.filename}</span></h6>
              <p class="mb-0 text-muted"><small>${this.createdAt}</small></p>
            </div>
          </div>
        </div>
      </div>
    `
    parent.appendChild(cardNode);
  }

  _onclick (event) {
  }
}
