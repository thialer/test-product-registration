const express = require("express"); // 'require' importa um módulo externo no Node.js. Aqui ele importa o framework 'express', que facilita criar servidores HTTP.
const cors = require("cors"); // Importa o módulo 'cors'. Ele permite que outras aplicações façam requisições para esse servidor (por exemplo, um site no navegador).

const app = express(); // Cria uma instância do Express. 'app' representa o servidor e permite definir rotas (GET, POST, etc) e configurações.
app.use(cors()); // 'app.use' adiciona um middleware. 'cors()' habilita o servidor a aceitar requisições externas (evita bloqueios do navegador).
app.use(express.json()); // Middleware do express para interpretar o corpo (body) da requisição como JSON. Sem isso, req.body seria undefined.

const port = 3000; // Define o número da porta onde o servidor vai rodar. Ex: http://localhost:3000

const db = require("./db");

app.get("/produtos", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM produtos");
    res.json(result.rows);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post("/produtos", async (req, res) => {
  const dados = req.body;

  // ARRAY (vários produtos)
  if (Array.isArray(dados)) {
    const values = dados.map((p) => [p.name, p.preco]);

    const sql = "INSERT INTO produtos (name, preco) VALUES ($1, $2)";

    try {
      for (let v of values) {
        await db.query(sql, v);
      }
      return res
        .status(201)
        .json({ message: "Produtos inseridos", inserted: dados });
    } catch (err) {
      return res.status(500).send(err);
    }
  }

  // 1 produto só
  const sql = "INSERT INTO produtos (name, preco) VALUES ($1, $2) RETURNING id";

  try {
    const result = await db.query(sql, [dados.name, dados.preco]);
    res.status(201).json({
      id: result.rows[0].id,
      ...dados,
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(port, () => {
  // 'listen' faz o servidor 'escutar' conexões na porta definida
  console.log(`Servidor rodando em http://localhost:${port}`); // Mensagem exibida no terminal
});
