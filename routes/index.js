const router = require('express').Router();
const apiRoutes = require('./api');



//https://localhost:3000/api
router.use('/api', apiRoutes);

router.use((req, res) => res.send('Wrong route!'));

module.exports = router;



