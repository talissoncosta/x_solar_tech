const express = require('express');
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const clientesController = require('../controller/clientes')

//Verbos HTTP
//GET - Receber dados de um Resource
router.get('/clientes', clientesController.buscar_todos);
router.get('/cliente/:id', clientesController.buscar_id);
//POST - Enviar dados ou informações para serem processados por um Resource.
router.post('/cliente', clientesController.salvar);
//PUT - Atualizar dados de um Resource
router.put('/cliente/:id', clientesController.atualizar);
//DELETE - Deletar um Resource
router.delete('/cliente/:id', clientesController.remover);


module.exports = router;