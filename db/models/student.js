'use strict';
const Sequelize = require('sequelize');
const db = require('../index.js');

const Student = db.define('student', {
    name : {
        type : Sequelize.STRING,
        allowNull : false
    },
    email : Sequelize.STRING
});

module.exports = Student;
