/*
=======================================================
  Title: jeanBaptiste-user.js
  Author: Professor Krasso
  Date: 06/29/2021
  Modifier: Sarah Jean Baptiste
  Description: User API
========================================================
*/

// Required
const mongoose = require("mongoose");

// Create Schema variable and assign mongoose.Schema object.
const Schema = mongoose.Schema;

// Create dependentSchema variable with the specified fields.
const userSchema = new Schema ({
    userName: String,
    Password: String,
    emailAddress: Array
})

// Create User - assign mongoose model
const User = mongoose.model("User", userSchema);

// Export User
module.exports = User;