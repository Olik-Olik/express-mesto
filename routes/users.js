const router = require('express').Router();
// router.get('/', () => { console.log('get it')});

const getUsers = require("../controllers/users");
const   getUser = require("../controllers/users");

const updateUser = require("../controllers/users").updateUser;
const createUser = require("../controllers/users").createUser;

/*

router.get('/users', getUsers);
router.get('/users/:id', getUser);

*/

router.post( '/users', createUser);
router.patch('/users/me', updateUser);

const updateAvatar = require("../controllers/users").updateAvatar;
router.patch('/users/me/avatar', updateAvatar);


module.exports = router;
