const router = require('express').Router();
/*const {getUsers} = require("../controllers/users");*/
router.get('/', () => { console.log('get it')});

/*router.get('/', getUsers);*/

module.exports = router;
