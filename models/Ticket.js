const mongoose = require('mongoose');
const Schema = mongoose.Schema;



// Ticket Schema
const TicketSchema = new Schema({
    ticket_id: {
      type: String      
    },
    customerID:{
      type: String,
    },
    customerName:{
      type: String
    },
    ticketPriority: {
      type: String,
    },
    ticketStatus: {
      type: String
    },
    ticketOpenStatus: {
      type: String
    },
    isOpen: {
      type: Boolean,
      default: true
    },
    isClosed: {
      type: Boolean
    },
    ticketOpenDate: {
      type: Date,
      default: Date.now
    },
    ticketOpenedBy:{
      type: String,
    },
    ticketUpdateDate:{
      type: Date
    },
    ticketUpdatedBy: {
      type: String
    },
    ticketBody: {
      type: String,
      required: true
    },
    callerName: {
      type: String,
      required: true
    }, 
    reasonForCall:{
      type: String,
    },
    callbackNumber: {
      type: String
    }
});

mongoose.model('ticket', TicketSchema, 'tickets');