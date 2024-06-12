const router = require('express').Router();
const { 
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
} = require('../../controllers/thoughtController');


//http://localhost:3000/api/thoughts/
router.route('/')
.get(getAllThoughts)
.post(createThought);


router.route('/:thoughtid')
.get(getThoughtById)
.put(updateThought)
.delete(deleteThought);


router.route('/:thoughtId/reactions')
.post(createReaction);

 
router.route('/:thoughtId/reactions/:reactionid')
.delete(deleteReaction);


module.exports = router;
