const express = require('express');
const router = express.Router();
const { registerFreelancer, getAllFreelancers, removeFreelancer } = require('../controllers/freelancersController');

router.post('/register', registerFreelancer);
router.get('/', getAllFreelancers);
router.delete('/:id', removeFreelancer);

module.exports = router;
