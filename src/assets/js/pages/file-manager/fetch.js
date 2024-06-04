import FileCard from "../../components/file-card.js";
import FileOffcanvas from "../../components/file-offcanvas.js";

let files = null;
let fileId = 0;

const token = localStorage.getItem("token");

function updateFileCards(files) {
  const root = document.querySelector("#pills-home .row");
  const bodyRoot = document.getElementsByTagName("body")[0];

  root.innerHTML = '';
  FileOffcanvas.nodes.forEach((node) => {
    node.remove();
  })

  files.forEach((file, i) => {
    const pathSeg = file.path.split("/");
    const filename = pathSeg[pathSeg.length - 1];
    const createdAt = file.createdAt;
    const formatedDate = createdAt.split('T')[0];

    new FileOffcanvas(filename, file.downloadUrl, createdAt).render(bodyRoot, i);
    new FileCard(filename, formatedDate).render(root, i);
  });
}

async function findCustomer(cpf) {
  const res = await fetch("@@API_URL/customers/find", {
    body: JSON.stringify({
      cpf: cpf,
    }),
    credentials: "include",
    method: "POST",
    headers: [
      ["Content-Type", "application/json; charset=utf-8"],
      ["Authorization", `Bearer ${token}`]
    ]
  });
  const data = await res.json();
  return data;
}

async function fetchFiles() {
  const body = await fetch(`@@API_URL/files?lim=3&id=${fileId}`, {
    headers: [
      ["Authorization", `Bearer ${token}`]
    ]
  });
  const files = await body.json() || [];
  return files
}


document.getElementById('search-input').addEventListener('input', async function(event) {
  const inputValue = event.target.value;
  if (inputValue.length === 11) {
    const customer = await findCustomer(inputValue);
    updateFileCards(customer.files);
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
