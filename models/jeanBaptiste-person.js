/*
=======================================================
  Title: jeanBaptiste-person.js
  Author: Professor Krasso
  Date: 06/25/2021
  Modifier: Sarah Jean Baptiste
  Description: Person API
========================================================
*/

// Require Mongoose. 
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Schema for roles. 
let roleSchema = new Schema({ 
    text: { type: String }
});

// Schema for dependents
let dependentSchema = new Schema({ 
    firstName: { type: String }, 
    lastName: { type: String }
});

// Schema for people.
let personSchema = new Schema({ 
    firstName: { type: String }, 
    lastName: { type: String },
    roles: [roleSchema], 
    dependents: [dependentSchema], 
    birthDate: { type: String }
});

module.exports = mongoose.model('Person', personSchema); 