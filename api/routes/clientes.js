const express = require('express');
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const clientesController = require('../controller/clientes')

router.get('/clientes', checkAuth, clientesController.buscar_todos);
router.get('/clientes/:id', checkAuth, clientesController.buscar_id);
router.post('/clientes',checkAuth, clientesController.salvar);
router.put('/clientes/:id', checkAuth, clientesController.atualizar);
router.delete('/clientes/:id',checkAuth, clientesController.remover);


module.exports = router;