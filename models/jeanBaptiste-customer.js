/*
=======================================================
  Title: jeanBaptiste-customer.js
  Author: Professor Krasso
  Date: 07/06/2021
  Modifier: Sarah Jean Baptiste
  Description: Customer API
========================================================
*/

// Requirement statement
const mongoose = require("mongoose");

// Schema variable and assign mongoose.Schema object.
const Schema = mongoose.Schema;

// lineItemSchema variable with the specified fields.
const lineItemSchema = new Schema ({
    name: { type: String },
    price: { type: Number },
    quantity: { type: Number }
})

// invoiceSchema variable with the specified fields.
const invoiceSchema = new Schema ({
    subtotal: { type: Number },
    tax: { type: Number },
    dateCreated: { type: String },
    dateShipped: { type: String },
    lineItems: [lineItemSchema]
})

// customerSchema variable with the specified fields.
const customerSchema = new Schema ({
    firstName: { type: String }, 
    lastName: { type: String },
    userName: { type: String },
    invoices: [invoiceSchema]
})

// Export Customer
module.exports = mongoose.model("Customer", customerSchema);