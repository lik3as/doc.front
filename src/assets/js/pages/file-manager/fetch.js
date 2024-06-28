import { fetchFiles, findCustomer } from "../../api.js";
import FileCard from "../../components/file-card.js";
import FileOffcanvas from "../../components/file-offcanvas.js";

function updateFileCards(files) {
  const root = document.querySelector("#pills-home .row");
  const bodyRoot = document.getElementsByTagName("body")[0];

  root.innerHTML = '';
  FileOffcanvas.nodes.forEach((node) => {
    node.remove();
  })

  if (files == undefined) {
    mixinShow("warning", "Não encontramos arquivos por aqui");
    return;
  }
  if (files == null) {
    mixinShow("warning", "Você precisa primeiro efetuar login");
    return;
  }

  files.forEach((file, i) => {
    const pathSeg = file.path.split("/");
    const filename = pathSeg[pathSeg.length - 1];
    const createdAt = file.created_at;
    const formatedDate = createdAt.split('T')[0];

    new FileOffcanvas(filename, file.downloadUrl, createdAt).render(bodyRoot, i);
    new FileCard(filename, formatedDate).render(root, i);
  });
}

document.getElementById('search-input').addEventListener('input', async function(event) {
  const inputValue = event.target.value;
  if (inputValue.length === 11) {
    const customer = await findCustomer(inputValue);
    updateFileCards(customer.files || []);
  }
  if (inputValue.length === 0) {
    const files = await fetchFiles();
    updateFileCards(files);
  }
});

(async () => {
  const files = await fetchFiles();
  updateFileCards(files);
})()
