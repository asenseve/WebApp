const express = require('express');
const router = express.Router();
const controller = require('../controllers/clienteController');

router.get('/obtenerClientes', controller.obtenerClientes);
router.post('/GuardarCliente', controller.GuardarCliente);
router.post('/EliminarCliente', controller.EliminarCliente);

module.exports = router;