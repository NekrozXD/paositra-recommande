const express = require('express');
const router = express.Router();

const { getCombinedData, getEnvoi, createEnvoi, createEnvoiUpload, getLast5Envoi,getLastEnvoi,getEnvoiWithRegister } = require('../controllers/EnvoiController.js');

router.get('/envoi', getEnvoi);
router.get('/envoi/last5', getLast5Envoi);
router.get('/combinedData', getCombinedData);
router.post('/envoi', createEnvoi);
router.post('/envoi/upload', createEnvoiUpload);
router.get('/lastEnvoi',getLastEnvoi)
router.get('/envoi-with-register', getEnvoiWithRegister)
module.exports = router;
