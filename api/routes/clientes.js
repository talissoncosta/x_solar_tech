const express = require('express');
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const clientesController = require('../controller/clientes')
const enderecosController = require('../controller/enderecos')

router.get('/clientes', checkAuth, clientesController.buscar_todos);
router.get('/clientes/:id', checkAuth, clientesController.buscar_id);
router.post('/clientes',checkAuth, clientesController.salvar);
router.put('/clientes/:id', checkAuth, clientesController.atualizar);
router.delete('/clientes/:id',checkAuth, clientesController.remover);


router.get('/clientes/enderecos/:id', checkAuth, enderecosController.buscar_enderecos);
router.post('/clientes/enderecos/:id',checkAuth, enderecosController.salvar_endereco);
router.put('/clientes/enderecos/:id', checkAuth, enderecosController.atualizar_enderecos);

module.exports = router;