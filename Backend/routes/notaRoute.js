const express = require('express');
const router = express.Router();
const controller = require('../controllers/notaController');

router.get("/obtenerNotas", controller.obtenerNotas);
router.get('/GuardarNota', controller.GuardarNota);
router.get('/obtenerClientesProductos', controller.obtenerClientesProductos);

module.exports = router;