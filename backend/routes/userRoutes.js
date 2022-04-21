const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getMe, getUsers } = require('../controllers/userController');

router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/me', getMe);
router.get('/', getUsers);

module.exports = router;