const express = require('express');

const router = express.Router()
const tourController = require('../Controllers/tourController');

//  All routes
router.route('/').get(tourController.allTours).post(tourController.createTour);
router.route('/:id').get(tourController.getTour);

module.exports = router;