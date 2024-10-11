const express = require('express');
const router = express.Router();
const controller = require('../controllers/tipoController');

router.get('/obtenerTipos', controller.obtenerTipos);
router.post('/GuardarTipo', controller.GuardarTipo);
router.post('/EliminarTipo', controller.EliminarTipo);

module.exports = router;