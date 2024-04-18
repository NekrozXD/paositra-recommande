const express = require("express");
const router = express.Router();

const { getUsers, CreateUser, UpdateUser, DeleteUser,UpdateValidation,loginUser } = require('../controllers/UserController.js');
router.get('/utilisateur/:id', UpdateUser);
router.get('/utilisateur', getUsers);
router.post('/utilisateur', CreateUser);
router.put('/utilisateur/:id', UpdateUser);
router.delete('/utilisateur/:id', DeleteUser);
router.put('/utilisateur/:id/validation', UpdateValidation);
router.post('/login',loginUser);


module.exports = router;