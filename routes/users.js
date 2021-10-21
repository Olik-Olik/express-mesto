const router = require('express').Router();
// router.get('/', () => { console.log('get it')});
// const validator = require("./validator"); // or where your file is located

const { getUsers } = require('../controllers/users');
const { getUser } = require('../controllers/users');
const { updateUser } = require('../controllers/users');
// const { createUser } = require('../controllers/users');
const { updateAvatar } = require('../controllers/users');

router.get('/users', getUsers);
router.patch('/users/me', updateUser);
// router.post('/users', createUser);
router.patch('/users/me/avatar', updateAvatar);
router.get('/users/:id', getUser);

module.exports = router;
