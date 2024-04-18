const express = require('express');
const router = express.Router();
const registreController = require('../controllers/RegistreController');

const { getRegistre, createRegistre,deleteRegistre, updateRegistre } = require('../controllers/RegistreController');

router.get('/registre', getRegistre);

router.post('/registre', createRegistre);

router.put('/registre/:id', updateRegistre);

router.delete('registre/:id', deleteRegistre);

module.exports = router;
