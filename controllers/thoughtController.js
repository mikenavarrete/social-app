const { Thought } = require('../../models');

async function getAllThoughts(req, res) {
    try {
        const thoughts = await Thought.find();
        res.json(thoughts);
    } catch (error) {
        res.status(500).json({ message: 'Failed to get thoughts.'});
    }
}

async function getThoughtById(req, res) {
    try {
        const thought = await Thought.findById(req.params.thoughtId);
        if  (!thought ) {cd
            return res.status(404).json({message: 'Thought not found.'});
        }
        res.json(thought);
    } catch (error) {
        res.status(500).json({ message: 'Failed to get thought.'});
    }
}

async function createThought(req, res) {
    try {
        const newThought = await Thought.create(req.body);
        res.status(201).json(newThought);
    } catch (error) {
        res.status(400).json({message: 'Failed to create thought.'});
    }
}

async function updateThought(req, res) {
    try {
        const updatedThought = await Thought.findByIdAndUpdate(
            req.params.thoughtId,
            req.body,
            { new:true}
        );
    res.json(updatedThought);
} catch (error) {
    res.status(400).json({ message: 'Failed to update thought.'});
}
}

async function deleteThought(req, res) {
    try {
        await Thought.findByIdAndDelete(req.params.thoughtId);
        res.json({ message: 'Thought deleted successfully.'});
} catch (error) {
    res.status(400).json({ message: 'Failed to delete thought.'});
}
}

module.exports = {
    getAllThoughts, 
    getThoughtById,
    createThought,
    updateThought,
    deleteThought
};