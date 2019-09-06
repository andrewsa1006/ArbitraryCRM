const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
require("../models/Customer");
const Customer = mongoose.model("customer");
require("../models/Ticket");
const Ticket = mongoose.model("ticket");
require("../models/User");
const User = mongoose.model("user");
const {ensureAuthenticated} = require('../helpers/auth')

// router.get("/allopen", ensureAuthenticated, (req, res) => {
//  Ticket.find({'isOpen':true})
//   .sort({ticketOpenDate: 'asc'})
//   .then(ticket => {
//     res.render("ticket/tickets", {
//       ticket: ticket
//     });
//   });
// });

// router.get("/allclosed", ensureAuthenticated, (req, res) => {
//   Ticket.find({'isClosed':true})
//   .sort({ticketOpenDate: 'asc'})
//   .then(ticket => {
//     res.render("ticket/tickets", {
//       ticket: ticket
//     });
//   });
// });

// router.get("/mytickets", ensureAuthenticated, (req, res) => {
//   Ticket.find({'ticketOpenedBy':`${req.user.firstName} ${req.user.lastName}`})
//   .sort({ticketOpenDate: 'asc'})
//   .then(ticket => {
//     res.render("ticket/tickets", {
//       ticket: ticket
//     });
//   });
// });

// router.put('/update_ticket/:ticket_id', (req, res) => {
//   Ticket.findOne({
//     ticket_id: req.params.ticket_id
//   }).then(ticket =>{
//     if(req.body.open){
//       open = false,
//       closed = true
//     } else {
//       open = true,
//       closed = false
//     };
//     if(open === true){
//       openStatus = "OPEN"
//     } else {
//       openStatus = "CLOSED"
//     }
//     // Checks to see if priority has a value, in which case it is HIGH if it does
//     if(req.body.priority){
//       priority = "High"
//     } else {
//       priority = "Normal"
//     }
//     ticket.ticketBody += `<p> <strong>Update from ${req.user.firstName} ${req.user.lastName} on ${Date.now()}</strong>: ${req.body.updateBody}</p>`;
//     ticket.isOpen = open;
//     ticket.ticketPriority = priority;
//     ticket.save()
//       .then(ticket => {
//         res.redirect('/ticket/tickets')
//       })
//     console.log(ticket)
//   })
  
// });

module.exports = router;