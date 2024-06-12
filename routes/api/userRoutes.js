const router = require('express').Router();

const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
} = require('../../controllers/userController');
//https://localhost:3000/api/users/ - get
//https://localhost:3000/api/users/ - post
router.route('/')
.get(getAllUsers)
.post(createUser);

router.route('/:userId')
.get(getUserById)
.put(updateUser)
.delete(deleteUser);

router.route('/:userId/friends/:friendId')
.post(addFriend)
.delete(removeFriend);


module.exports = router;