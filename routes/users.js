const router = require('express').Router();
// router.get('/', () => { console.log('get it')});
/*
const {
  getUsers,
  getUser,
  updateUser,
//  updateUser,
//  updateAvatar
};
*/
const updateUser = require("../controllers/users").updateUser;
/*
router.get('/users', getUsers);
router.get('/users/:id', getUser);
*/

/*router.patch('/users/me', /!*body('name').isLength({ min: 2 } || { max: 30}),
  body('about').isLength({ min: 2 } || { max: 30}),
  body('avatar'), *!/ updateUser);*/

router.patch('/users/me', updateUser);
// router.patch('/users/me/avatar', updateAvatar);


module.exports = router;
