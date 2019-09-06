const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const {ensureAuthenticated} = require('../helpers/auth');
require("../models/Customer");
const Customer = mongoose.model("customer");
require("../models/Ticket");
const Ticket = mongoose.model("ticket");
require("../models/User");
const User = mongoose.model("user");

// router.post("/", ensureAuthenticated, (req, res) => {
//   const newCust = {
//     _id: req.body._id,
//     nkaID: req.body.nkaID,
//     custname: req.body.custname,
//     address: req.body.address,
//     city: req.body.city,
//     state: req.body.state,
//     zipcode: req.body.zipcode,
//     phone: req.body.phone,
//     pcontact: req.body.pcontact,
//     customerNotes: req.body.customerNotes
//   };
//   new Customer(newCust).save().then(() => {
//     res.redirect("customer/viewby/id");
//   });
// });

// router.get("/viewby/id", ensureAuthenticated, (req, res) => {
//   Customer.find({})
//     .sort({ _id: "asc" })
//     .then(customer => {
//       res.render("customer/customer", {
//         customer: customer
//       });
//     });
// });

// router.get("/viewby/name", ensureAuthenticated, (req, res) => {
//   Customer.find({})
//     .sort({ custname: "asc" })
//     .then(customer => {
//       res.render("customer/customer", {
//         customer: customer
//       });
//     });
// });

// router.get("/viewby/city", ensureAuthenticated, (req, res) => {
//   Customer.find({})
//     .sort({ city: "asc" })
//     .then(customer => {
//       res.render("customer/customer", {
//         customer: customer
//       });
//     });
// });

// router.get("/viewby/state", ensureAuthenticated, (req, res) => {
//   Customer.find({})
//     .sort({ _id: "asc" })
//     .then(customer => {
//       res.render("customer/customer", {
//         customer: customer
//       });
//     });
// });

// router.get("/viewcustomer/:_id", ensureAuthenticated, (req, res) => {
//   Customer.findOne({
//     _id: req.params._id
//   }).populate('tickets')
//   .then(customer => {
//     res.render("customer/viewcustomer", {
//       customer: customer
//     });
//   });
// });

// router.post('/viewcustomer/:_id', ensureAuthenticated, (req, res) => {
//     let open;
//     let closed;
//     let priority;
//     let openStatus;
//     let ticketOpenDate = Date.now()
//     // Checks to see if isOpen has a value, in which case the ticket is NOT OPEN
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
//     Customer.findOne({
//     '_id':req.params._id
//   }).then(customer =>{
//     newTicket = {
//       callerName: req.body.callerName,
//       callbackNumber: req.body.callbackNumber,
//       reasonForCall: req.body.reasonForCall,
//       facilityName: req.body.facilityName,
//       ticketStatus: req.body.ticketStatus,
//       ticketBody: req.body.ticketBody,
//       ticket_id: req.body.ticket_id,
//       isOpen: open,
//       isClosed: closed,
//       ticketPriority: priority,
//       customerName: customer.custname,
//       customerID: req.params._id,
//       ticketOpenedBy: `${req.user.firstName} ${req.user.lastName}`,
//       ticketUpdatedBy: `${req.user.firstName} ${req.user.lastName}`,
//       ticketUpdateDate: ticketOpenDate,
//       ticketOpenStatus: openStatus
//     }
//     new Ticket(newTicket).save()
//     .then(ticket => {
//     // console.log(ticket)
//     customer.tickets.unshift(ticket._id);
//     customer.save()
//     })    
//     res.redirect(`/customer/viewcustomer/${customer._id}`)
//   })
// })

module.exports = router;