const { Router } = require('express');
const { createWorkout, getWorkouts, getWorkout, deleteWorkout, updateWorkout } = require('../controllers/workoutController');
const auth = require('../middleware/auth');

const router = Router();

router.use(auth);

router.route('/').get(getWorkouts).post(createWorkout);

router.route('/:id').get(getWorkout).delete(deleteWorkout).patch(updateWorkout);

module.exports = router;
