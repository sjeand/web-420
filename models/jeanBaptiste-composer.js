/*
=======================================================
  Title: jeanBaptiste-assignment-4.4.js
  Author: Professor Krasso
  Date: 06/18/2021
  Modifier: Sarah Jean Baptiste
  Description: Composer API
========================================================
*/

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let composerSchema = new Schema({ 
    firstName: { type: String }, 
    lastName: { type: String }
});

module.exports = mongoose.model('Composer', composerSchema);