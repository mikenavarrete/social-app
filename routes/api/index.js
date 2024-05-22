const router = require('express').Router();
const thoughtRoutes = require('./thoughtRoutes');
const userRoutes = require('./userRoutes');

router.use('/api/thoughts', thoughtRoutes);
//https://localhost:3000/api/users
router.use('/api/users', userRoutes);

module.exports = router;
