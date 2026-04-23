const express = require('express');
const multer = require('multer');
const app = express();

const upload = multer({ dest: 'uploads/' });

app.use(express.urlencoded({ extended: true }));

let bancoFake = [];

app.get('/', (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<title>Cadastro</title>
<style>
body{font-family:Arial;background:#f4f4f4;padding:20px}
form{background:#fff;padding:20px;border-radius:10px;max-width:500px;margin:auto}
input,select{width:100%;margin-bottom:10px;padding:8px}
button{padding:10px;background:#0b82d6;color:#fff;border:none}
</style>
</head>
<body>

<form action="/cadastro" method="POST" enctype="multipart/form-data">
<h2>Cadastro</h2>

<input name="nome" placeholder="Nome" required>
<input name="sobrenome" placeholder="Sobrenome" required>
<input name="cpf" placeholder="CPF" required>
<input name="rg" placeholder="RG">
<input name="mae" placeholder="Nome da mãe">
<input name="pai" placeholder="Nome do pai">
<input name="email" type="email" placeholder="Email" required>

<select name="formacao">
<option>Fundamental</option>
<option>Médio</option>
<option>Superior</option>
</select>

<input type="file" name="arquivo">

<button type="submit">Cadastrar</button>

</form>

</body>
</html>
  `);
});

app.post('/cadastro', upload.single('arquivo'), (req, res) => {
  const dados = req.body;
  const arquivo = req.file;

  bancoFake.push({
    ...dados,
    arquivo: arquivo ? arquivo.filename : null
  });

  console.log(bancoFake);

  res.send('<h2>Cadastro realizado com sucesso</h2><a href="/">Voltar</a>');
});

app.listen(3000, () => {
  console.log('http://localhost:3000');
});