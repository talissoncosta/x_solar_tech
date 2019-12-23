const express = require('express');
const router = express.Router();

const clientesController = require('../controller/clientes')

router.post('/login',clientesController.login_usuario);

module.exports = router;