const express = require('express');
// const { route } = require('./webSocketRoutes');
const router = express.Router();

const { getMaj,createMaj,getLast5Maj } = require('../controllers/MajController')

router.get('/Maj' ,getMaj)
router.post('/Maj',createMaj)
router.get('/lastMaj',getLast5Maj)

 module.exports = router