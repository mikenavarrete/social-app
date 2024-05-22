const Reaction = require('../models/Reaction');

async function getAllReactions(req, res) {
    try {
        const reactions = await Reaction.find();
        res.json(reactions);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get reactions.'});
    }
}

async function getReactionById(req, res) {
    try {
        const reaction = await Reaction.findById(req.params.reactionId);
        if (!reaction){
            return res.status(404).json({ message: 'Reaction not found.'});
        }
        res.json(reaction);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get reaction.'});
    }
}

async function createReaction(req, res) {
    try {
        const newReaction = await Reaction.create(req.body);
        res.status(201).json(newReaction);
    } catch (error) {
        res.status(400).json({ error: 'Failed to create reaction.'});
    }
}

async function deleteReaction(req, res) {
    try {
        const reaction = await Reaction.findByIdAndDelete(req.params.reactionId);
        if (!reaction) {
            return res.status(404).json({ message: 'Reaction not found.' });
        }
        res.json({ message: 'Reaction deleted successfully.' });
    } catch (error) {
        res.status(400).json({ error: 'Failed to delete reaction.' });
    }
}


module.exports = {
    getAllReactions,
    getReactionById,
    createReaction,
    deleteReaction
};