const express = require('express');
const router = express.Router()

const { registerFreelancer, getAllFreelancers, removeFreelancer } = require('../controller/freeLancerComponents');

// Route to register a new freelancer
router.post('/register', registerFreelancer);

// Route to get all freelancers
router.get('/', getAllFreelancers);

// Route to remove a freelancer by ID
router.delete('/:id', removeFreelancer);

module.exports = router;
