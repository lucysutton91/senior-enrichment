// get requests have been tested and are working
// post and put requests tested with postman and working

const express = require('express');
const api = require('express').Router();
const models = require('../../db/models/index.js');
const Campus = models.Campus;
const Student = models.Student;

api.get('/', (req, res, next) => {
	Campus.findAll()
	.then(schools => {
		res.json(schools)
	})
	.catch(next);
});
api.get('/:campusId', (req, res, next) => {
	Campus.findById(req.params.campusId)
	.then(campus => {
		res.json(campus)
	})
	.catch(next)
});
api.get('/:campusId/students', (req, res, next) => {
	Student.findAll( { where : { campusId : req.params.campusId } } )
	.then(students => {
		res.json(students)
	})
	.catch(next)
});
api.post('/', (req, res, next) => {
	Campus.create({
		name : req.body.name,
		imageURL : req.body.imageURL
	})
	.then(newSchool => {
		res.json(newSchool)
	})
	.catch(next)
});
api.put('/:campusId', (req, res, next) => {
	Campus.findById(req.params.campusId)
	.then(campus => {
		campus.update({
			name : req.body.name,
			imageURL : req.body.imageUrl
		})
		.then(updatedSchool => {
			res.json(updatedSchool)
		})
	})
	.catch(next)
})

module.exports = api
