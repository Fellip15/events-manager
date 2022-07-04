const express = require('express');
const router = express.Router();
const UserController = require('../controllers/User')

router.post('/api/users/logar', UserController.authUser);
router.post('/api/users/token', UserController.authToken);
router.post('/api/users/cadastrar', UserController.cadastrar);
router.get('/api/users/deslogar', UserController.deslogar);
router.get('/users/', UserController.getUsers);

module.exports = router;