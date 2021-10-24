const router = require('express').Router();
// router.get('/', () => { console.log('get it')});
// const validator = require("./validator"); // or where your file is located

const { getUsers } = require('../controllers/users');
const { getUser } = require('../controllers/users');
const { updateUser } = require('../controllers/users');
const { getCurrentUser } = require('../controllers/users');
const { createUser } = require('../controllers/users');
const { updateAvatar } = require('../controllers/users');
const { updateAvatarValidate, updateUserValidate, userValidate } = require('../validator/validator');
const { idValidator } = require('../validator/validator');

router.get('/users', getUsers);
router.get('/users/me', idValidator, getCurrentUser);
router.patch('/users/me', updateUserValidate, updateUser);
router.post('/users', userValidate, createUser);
router.patch('/users/me/avatar', updateAvatarValidate, updateAvatar);
router.get('/users/:id', userValidate, idValidator, getUser);

module.exports = router;
