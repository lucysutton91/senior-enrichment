'use strict'
const express = require('express');
const api = require('express').Router();
const students = require('./routes/students.js');
const campuses = require('./routes/campuses.js');
const models = require('../db/models/index.js');
const Campus = models.Campus;

// If you aren't getting to this object, but rather the index.html (something with a joke) your path is wrong.
	// I know this because we automatically send index.html for all requests that don't make sense in our backend.
	// Ideally you would have something to handle this, so if you have time try that out!
//api.use('/', (req, res) => res.json({hello: 'world'}))

api.get('/', (req, res, next) => {
	Campus.findAll()
	.then(schools => {
		res.json(schools)
	})
	.catch(next);
});
api.use('/campuses', campuses);
api.use('/students', students);

module.exports = api
