/*
=======================================================
  Title: jeanBaptiste-team.js
  Author: Sarah Jean Baptiste
  Date: 07/18/2021
  Description: Teams API
========================================================
*/

// Requirement statement
const mongoose = require("mongoose");

// Schema variable and assign mongoose.Schema object.
const Schema = mongoose.Schema;

// playerSchema variable with the specified fields.
let playerSchema = new Schema({ 
    firstName: { type: String }, 
    lastName: { type: String },
    salary: { type: Number }
});

// teamSchema variable with the specified fields.
let teamSchema = new Schema({ 
    name: { type: String }, 
    mascot: { type: String },
    players: [playerSchema]
});

// Export Team
module.exports = mongoose.model('Team', teamSchema);