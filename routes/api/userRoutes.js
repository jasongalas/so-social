const router = require('express').Router();

const {
  getUsers,
  getSingleUser,
  createUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require('../../controllers/userController');

router.route('/users').get(getUsers).post(createUser);

router.route('/users/:userId').get(getSingleUser).delete(deleteUser);

router.route('users/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;
