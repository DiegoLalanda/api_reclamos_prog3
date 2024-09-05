const express = require('express');
const router = express.Router();
const {
  getAllUsuariosTipo,
  getUsuarioTipoById, 
  updateUsuarioTipo,
  deleteUsuarioTipo,
} = require('../controllers/rolController');


router.get('/', getAllUsuariosTipo);

router.get('/:id', getUsuarioTipoById);

router.post('/', createUsuarioTipo);

router.put('/:id', updateUsuarioTipo);

router.delete('/:id', deleteUsuarioTipo);

module.exports = router;
