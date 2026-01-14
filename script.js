const apiUrl = "https://test-product-registration.onrender.com/produtos";
const form = document.getElementById("formProduto");
const lista = document.getElementById("listaProdutos");

function carregarProdutos() {
  fetch(apiUrl)
    .then((res) => res.json())
    .then((produtos) => {
      lista.innerHTML = "";
      produtos.forEach((p) => {
        const li = document.createElement("li");
        li.textContent = `${p.name} - R$ ${p.preco}`;
        lista.appendChild(li);
      });
    })
    .catch(err => console.error("Erro ao carregar:", err));
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const preco = document.getElementById("preco").value;

  fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, preco }),
  })
    .then((res) => res.json())
    .then(() => {
      form.reset();
      carregarProdutos();
    })
    .catch(err => console.error("Erro ao salvar:", err));
});

carregarProdutos();
