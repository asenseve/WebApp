const express = require('express');
const router = express.Router();
const controller = require('../controllers/productoController');

router.get('/obtenerProductos', controller.obtenerProductos);
router.post('/GuardarProducto', controller.GuardarProducto);
router.post('/EliminarProducto', controller.EliminarProducto);

module.exports = router;