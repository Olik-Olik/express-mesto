const router = require('express').Router();
// router.get('/', () => { console.log('get it')});

const getUsers = require("../controllers/users").getUsers;
const   getUser = require("../controllers/users").getUser;
const updateUser = require("../controllers/users").updateUser;
const createUser = require("../controllers/users").createUser;
const updateAvatar = require("../controllers/users").updateAvatar;


router.get('/users', getUsers);
router.get('/users/:id', getUser);
router.post( '/users', createUser);
router.patch('/users/me', updateUser);
router.patch('/users/me/avatar', updateAvatar);

module.exports = router;
