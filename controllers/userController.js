const { User, Thought } = require("../models");

module.exports = {
    getUserById(req, res) {
        User.findOne({ _id: req.params.userId })
            .select('-__v')
            .then((user) =>
                !user
                    ? res.status(404).json({ message: "Not found" })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));


    },
    getAllUsers(req, res) {
        User.find()
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));

    },
    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => {
                console.log((err))
                return res.status(500).json(err);
            });
    },

    deleteUser(req, res) {
        User.findOneAndDelete(
            { _id: req.params.userId })
            .then((user) => {
                if (!user) {
                    return res.status(404).json({ message: "User not found" });
                }
  
            })
            .then(() => res.json({ message: "User and associated thoughts deleted" }))
            .catch((err) => res.status(500).json({ message: 'Server error', error: err.message }));
    },

    updateUser(req, res){
        User.findOneAndUpdate(
            {_id: req.params.userId},
            {$set: req.body},
            {runValidators: true, new: true})
            .then((user) =>
                !user
                    ?res.status(404).json({message: "User not found."})
                    :res.json(user)
            )
            .catch((err) => res.status(500).json(err));

    },
    removeFriend(req, res){
        User.findOneAndUpdate(
            {_id: req.params.userId},
            {$pull:{friends: req.params.friendId}},
            {new: true})
        .then((user) =>
                !user
                    ?res.status(404).json({message: "Not found"})
                    :res.json(user)
            )
            .catch((err) => res.status(500).json(err));

        

    },
    addFriend(req, res){
        User.findOneAndUpdate(
            {_id: req.params.userId},
            {$addToSet:{friends: req.params.friendId}},
            {runValidators: true, new: true})
            
        .then((user) =>
                !user
                    ?res.status(404).json({message: "Not found"})
                    :res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },

}