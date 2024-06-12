const { Thought, User } = require('../models');

module.exports = {

    getAllThoughts(req, res) {
        Thought.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => {
                console.log(err)
                res.status(500).json(err);
            })
                
    },

    getThoughtById(req, res) {
        Thought.findOne({ _id: req.params.thoughtid })
            .select("-__v")
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: "No thought with that ID" })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },

    createThought(req, res) {
        Thought.create(req.body)
        .then((thought) => res.json(thought))
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
    },
    
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtid }, 
            { $set: req.body }, 
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: "No thought with this id!" })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },

    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtid })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: "No thought with that ID" })
                    : User.findOneAndUpdate(
                        { thoughts: req.params.thoughtid }, 
                        { $pull: { thoughts: req.params.thoughtid } },
                        { new: true })
            )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: "Student not  found" })
                : res.json({ message: "Thought deleted" })
                )
        
            .catch((err) => {res.status(500).json(err)});
    },

    
    

    createReaction(req, res) {
        Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $addToSet: { reactions: req.body } },
          { runValidators: true, new: true }
        )
          .then((thought) =>
            !thought
              ? res.status(404).json({ message: "No thought found with ID!" })
              : res.json(thought)
          )
          .catch((err) => res.status(500).json(err));
      },
      
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reaction: { reactionId: req.params.assignmentId} } }, 
            { runValidators: true, new: true })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: "No thought found with that ID" })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },

};