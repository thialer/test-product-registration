const apiUrl = "https://test-product-registration.onrender.com/produtos"; // Corrigido: adiciona /produtos
const lista = document.getElementById("listaProdutos"); // Referência do <ul>
const form = document.getElementById("formProduto"); // Referência do <form>

// Função para carregar produtos do servidor
function carregarProdutos() {
  fetch(apiUrl)
    .then((res) => res.json())
    .then((produtos) => {
      lista.innerHTML = ""; // Limpa a lista antes de adicionar os produtos
      produtos.forEach((p) => {
        const li = document.createElement("li");
        li.textContent = `${p.name} - R$ ${p.preco}`;
        lista.appendChild(li);
      });
    })
    .catch((err) => console.error("Erro ao carregar:", err));
}

// Evento de envio do formulário
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
      form.reset(); // Limpa o formulário
      carregarProdutos(); // Recarrega a lista de produtos
    })
    .catch((err) => console.error("Erro ao salvar:", err));
});

// Carrega os produtos assim que a página abre
carregarProdutos();
