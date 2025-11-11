require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const logarController = require('./controllers/logar');
const deslogarController = require('./controllers/deslogar');
const verificaAutenticacao = require('./controllers/verificarAutenticacao');

const app = express();

const USERS = [
  { id: 1, username: 'admin', password: bcrypt.hashSync('segredo', 10), name: 'Administrador' },
  { id: 2, username: 'user', password: bcrypt.hashSync('1234', 10), name: 'Usuário Comum' }
];

app.use(express.static(path.join(__dirname, 'src')));
app.use(express.json());
app.use(cookieParser());

app.post('/api/login', (req, res) => logarController(req, res, USERS));
app.post('/api/logout', deslogarController);

app.get('/api/verifica', verificaAutenticacao, (req, res) => {
  res.json({ message: 'Acesso permitido à rota protegida', user: req.user });
});

app.listen(8080, () => {
  console.log(`Servidor rodando em http://localhost:8080`);
});
