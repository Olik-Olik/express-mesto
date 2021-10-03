const router = require('express').Router();

const {getUsers} = require("../controllers/users");
// router.get('/', () => { console.log('get it')});
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  updateAvatar
} = require("../controllers/users");

router.get('/', getUsers);
router.get('/:id', getUser);
router.post('/', createUser)
router.patch('/me', updateUser);
router.patch('/me/avatar', updateAvatar);


module.exports = router;
