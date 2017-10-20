const express = require('express');
const api = require('express').Router();
const models = require('../../db/models/index.js');
const Student = models.Student;

api.get('/', (req, res, next) => {
	Student.findAll()
		.then(students => {
			res.json(students)
		})
		.catch(next);
});

api.get('/:studentId', (req, res, next) => {
	Student.findById(req.params.studentId)
		.then(pupil => {
			res.json(pupil)
		})
		.catch(next)
});

api.post('/', (req, res, next) => {
	Student.create({
		name: req.body.name,
		email: req.body.email,
		campusId: req.body.campusId
	})
		.then(pupil => {
			res.json(pupil);
		})
		.catch(next)
});

api.put('/:studentId', (req, res, next) => {
	Student.findById(req.params.studentId)
		.then(pupil => {
			pupil.update({
				name: req.body.name,
				email: req.body.email,
				campusId: req.body.campusId
			})
				.then(updatedStudent => {
					res.json(updatedStudent)
				})
		})
		.catch(next)
});

api.delete('/:studentId', (req, res, next) => {
	Student.findById(req.params.studentId)
		.then(pupil => {
			pupil.destroy()
				.then(() => {
					res.json('student deleted')
				})
		})
		.catch(next)
});

module.exports = api;
