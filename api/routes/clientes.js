const express = require('express');
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const clientesController = require('../controller/clientes')

router.get('/clientes', clientesController.buscar_todos);
router.get('/clientes/:id', clientesController.buscar_id);
router.post('/clientes',checkAuth, clientesController.salvar);
router.put('/clientes/:id', clientesController.atualizar);
router.delete('/clientes/:id', clientesController.remover);


module.exports = router;