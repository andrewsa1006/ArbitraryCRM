const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
require("../models/Customer");
const Customer = mongoose.model("customer");
require("../models/Ticket");
const Ticket = mongoose.model("ticket");
require("../models/User");
const User = mongoose.model("user");
const {ensureAuthenticated} = require('../helpers/auth');
const {ensureGuest} = require('../helpers/auth');


// router.get("/", ensureGuest, (req, res) => {
//   Ticket.find({'isOpen':true}).countDocuments(function(err, count){
//     if (err) {
//       console.log(err)
//     } else {
//       return count
//     }
//   }).then(count => {
//     console.log(count)
//     res.render("main/login", {
//       count:count
//     });
//   })
// });

// router.get("/dashboard", ensureAuthenticated, (req, res) => {
//   Ticket.find({})
//     .then(ticket => {
//       res.render("main/dashboard", {
//         ticket:ticket
//       });
//     })
// });

module.exports = router;