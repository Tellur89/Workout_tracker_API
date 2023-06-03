const Workout = require('../models/Workout');
const mongoose = require('mongoose');

// GET ALL WORKOUTS
const getWorkouts = async (req, res) => {
	const user_id = req.user._id;
	const workouts = await Workout.find({ user_id }).sort({ created_At: -1 }); // sort by created date in descending (-1) order

	res.status(200).json(workouts);
};

// GET A SINGLE WORKOUT
const getWorkout = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: 'No such workout' });
	}

	const workout = await Workout.findById(id);

	if (!workout) {
		return res.status(404).json({ error: 'No such workout' });
	}

	res.status(200).json(workout);
};

// CREATE NEW WORKOUT
const createWorkout = async (req, res) => {
	const { title, load, reps } = req.body;

	let emptyFields = [];

	if (!title) {
		emptyFields.push('title');
	}
	if (!load) {
		emptyFields.push('load');
	}
	if (!reps) {
		emptyFields.push('reps');
	}
	if (emptyFields.length > 0) {
		return res.status(400).json({ error: 'Please fill in all the fields', emptyFields });
	}

	try {
		const user_id = req.user._id;
		const workout = await Workout.create({ title, load, reps, user_id });
		res.status(200).json(workout);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

// DELETE WORKOUT
const deleteWorkout = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: 'No such workout' });
	}

	const workout = await Workout.findOneAndDelete({ _id: id });

	if (!workout) {
		return res.status(404).json({ error: 'No such workout' });
	}

	res.status(200).json(workout);
};

// UPDATE WORKOUT
const updateWorkout = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: 'No such workout' });
	}

	const workout = await Workout.findOneAndUpdate({ _id: id }, { ...req.body });

	if (!workout) {
		return res.status(404).json({ error: 'No such workout' });
	}

	res.status(200).json(workout);
};

module.exports = {
	createWorkout,
	getWorkouts,
	getWorkout,
	deleteWorkout,
	updateWorkout,
};
