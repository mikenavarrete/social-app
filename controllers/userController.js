const {User} = require('../models');

async function getAllUsers(req, res) {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Failed to get users.'});
    }
}

async function getUserById(req, res) {
    try{
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found.'});
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Failed to get user.'});
    }
}

async function createUser(req, res) {
    try {
        const newUser = await User.create(req.body);
        res.status(201).json(newUser);
} catch (error) {
    console.log(error)
    res.status(400).json({ message: 'Failed to create user.'});
}
}

async function updateUser(req, res) {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.userId,
            req.body,
            { new: true });
            res.json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: 'Failed to update user.'});
    }
}

async function deleteUser(req, res) {
    try {
        await User.findByIdAndDelete(req.params.userId);
        res.json({ message: 'User deleted successfully.'});
        } catch (error) {
            res.status(400).json({ message: 'Failed to delete user.'});
}
}
async function addFriend(req, res) {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.userId,
            { $addToSet: { friends: req.params.friendId } },
            { new: true }
        );
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Failed to add friend.' });
    }
}

async function removeFriend(req, res) {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.userId,
            { $pull: { friends: req.params.friendId } },
            { new: true }
        );
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Failed to remove friend.' });
    }
}

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend,
};