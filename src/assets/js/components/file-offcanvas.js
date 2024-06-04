export default class FileOffcanvas {
  filename;
  createdAt;
  url;
  static nodes = [];

  constructor(filename, url, createdAt) {
    this.filename = filename;
    this.createdAt = createdAt;
    this.url = url;
  }

  render(root, key) {
    const canvasNode = document.createElement("div");
    canvasNode.className = "offcanvas offcanvas-end";
    canvasNode.tabIndex = "-1";
    canvasNode.id = `offcanvasFileDesc-${key}`;

    canvasNode.innerHTML = `
      <div class="offcanvas-header">
        <h5 class="offcanvas-title">Visualizar arquivo</h5>
        <a href="#" class="avtar avtar-s btn-link-danger btn-pc-default" data-bs-dismiss="offcanvas">
          <i class="ti ti-circle-x f-18"></i>
        </a>
      </div>
      <div class="offcanvas-body">
        <div class="my-3 text-center">
          <img src="../assets/images/application/img-file-pdf.svg" alt="img" class="img-fluid wid-100" />
          <h5 class="mb-1 mt-4">${this.filename}</h5>
          <p class="mb-0 text-muted">${this.createdAt}</p>
        </div>
        <!--
          <hr class="my-2 border border-secondary-subtle" />
          Random people
          <h5>Compartilhar arquivo com</h5>
          <ul class="list-group list-group-flush"></ul>
        -->
        <hr class="my-4 border border-secondary-subtle" />
        <div class="row g-2">
          <div class="col-12">
            <div class="d-grid">
              <a href="${this.url}" target="_blank" class="link-light btn btn-primary">
                  Abrir Link
              <a/>
            </div>
          </div>
          <!--
            <div class="col-6">
              <div class="d-grid">
                <button class="btn btn-light-secondary">Editar</button>
              </div>
            </div>
            <div class="col-6">
              <div class="d-grid">
                <button class="btn btn-light-danger">Deletar</button>
              </div>
            </div>
          !-->
        </div>
      </div>
    `

    FileOffcanvas.nodes.push(canvasNode)
    root.appendChild(canvasNode);
  }
}
