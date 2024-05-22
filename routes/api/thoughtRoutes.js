const router = require('express').Router();
const { getAllThoughts, getThoughtById, createThought, updateThought, deleteThought, createReaction, deleteReaction  } = require('../../controllers');

router.get('/thoughts', thoughtController.getAllThoughts);
router.get('/thoughts/:thoughtId', thoughtController.getThoughtById);
router.post('/thoughts', thoughtController.createThought);
router.put('/thoughts/:thoughtId', thoughtController.updateThought);
router.delete('/thoughts/:thoughtId', thoughtController.deleteThought);

module.exports = router;
