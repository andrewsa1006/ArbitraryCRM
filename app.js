// Import modules
const express = require("express");
const exphbs = require("express-handlebars");
const session = require("express-session");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const flash = require("connect-flash");
const passport = require("passport");
const mongoose = require("mongoose");
const path = require("path");
const app = express();
const cookieParser = require("cookie-parser");
const {ensureAuthenticated} = require('./helpers/auth');
const {ensureGuest} = require('./helpers/auth');
const moment = require('moment')

// Requiring Models
require("./models/Customer");
const Customer = mongoose.model("customer");
require("./models/Ticket");
const Ticket = mongoose.model("ticket");
require("./models/User");
const User = mongoose.model("user");

// Requiring Config Files
const db = require("./config/database");

// Passport Config
require("./config/passport");

// Requiring Route Files
const auth = require("./routes/auth");
const main = require('./routes/main')
const ticket = require('./routes/ticket')
const customer = require('./routes/customer')

// Static assests folder
app.use(express.static(path.join(__dirname, "public")));

// Map global promise - get rid of warning
mongoose.Promise = global.Promise;
// Connect to mongoose
mongoose
  .connect(db.mongoURI, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected..."))
  .catch(err => console.log(err));

// Handlebars Helpers
const { ticketDate, ticketID, openClosed } = require("./helpers/hbs");

// Handlebars middleware
app.engine(
  "handlebars",
  exphbs({
    helpers: {
      ticketDate: ticketDate,
      ticketID: ticketID,
      openClosed: openClosed
    },
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Method Override Middleware
app.use(methodOverride('_method'));

// Cookie Parser Middleware
app.use(cookieParser());

// Express Session Middleware (must be declared before passport middleware)
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false
  })
);

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Set Global Vars
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
})

app.use("/auth", auth);
app.use("/", main);
app.use("/ticket", ticket);
app.use("/customer", customer);

// Main routes

app.get("/", ensureGuest, (req, res) => {
  res.render('main/login')
});

app.get("/dashboard", ensureAuthenticated, (req, res) => {
  Ticket.find({})
    .then(ticket => {
      res.render("main/dashboard", {
        ticket:ticket
      });
    })
});

// Customer Routes

app.post("/customer", ensureAuthenticated, (req, res) => {
  const newCust = {
    _id: req.body._id,
    custname: req.body.custname,
    address: req.body.address,
    city: req.body.city,
    state: req.body.state,
    zipcode: req.body.zipcode,
    phone: req.body.phone,
    email: req.body.email,
    pcontact: req.body.pcontact,
    customerNotes: req.body.customerNotes
  };
  new Customer(newCust).save().then(() => {
    res.redirect("customer/viewby/id");
  });
});

app.get("/customer/viewby/id", ensureAuthenticated, (req, res) => {
  Customer.find({})
    .sort({ _id: "asc" })
    .then(customer => {
      res.render("customer/customer", {
        customer: customer
      });
    });
});

app.get("/customer/viewby/name", ensureAuthenticated, (req, res) => {
  Customer.find({})
    .sort({ custname: "asc" })
    .then(customer => {
      res.render("customer/customer", {
        customer: customer
      });
    });
});

app.get("/customer/viewby/city", ensureAuthenticated, (req, res) => {
  Customer.find({})
    .sort({ city: "asc" })
    .then(customer => {
      res.render("customer/customer", {
        customer: customer
      });
    });
});

app.get("/customer/viewby/state", ensureAuthenticated, (req, res) => {
  Customer.find({})
    .sort({ _id: "asc" })
    .then(customer => {
      res.render("customer/customer", {
        customer: customer
      });
    });
});

app.get("/customer/viewcustomer/:_id", ensureAuthenticated, (req, res) => {
  Customer.findOne({
    _id: req.params._id
  }).populate('tickets')
  .then(customer => {
    res.render("customer/viewcustomer", {
      customer: customer
    });
  });
});

app.post('/customer/viewcustomer/:_id', ensureAuthenticated, (req, res) => {
    let open;
    let closed;
    let priority;
    let openStatus;
    let ticketOpenDate = Date.now()
    // Checks to see if isOpen has a value, in which case the ticket is NOT OPEN
    if(req.body.open){
      open = false,
      closed = true
    } else {
      open = true,
      closed = false
    };
    if(open === true){
      openStatus = "OPEN"
    } else {
      openStatus = "CLOSED"
    }
    // Checks to see if priority has a value, in which case it is HIGH if it does
    if(req.body.priority){
      priority = "High"
    } else {
      priority = "Normal"
    }
    Customer.findOne({
    '_id':req.params._id
  }).then(customer =>{
    newTicket = {
      callerName: req.body.callerName,
      callbackNumber: req.body.callbackNumber,
      reasonForCall: req.body.reasonForCall,
      ticketStatus: req.body.ticketStatus,
      ticketBody: req.body.ticketBody,
      ticket_id: req.body.ticket_id,
      isOpen: open,
      isClosed: closed,
      ticketPriority: priority,
      customerName: customer.custname,
      customerID: req.params._id,
      ticketOpenedBy: `${req.user.firstName} ${req.user.lastName}`,
      ticketUpdatedBy: `${req.user.firstName} ${req.user.lastName}`,
      ticketUpdateDate: ticketOpenDate,
      ticketOpenStatus: openStatus
    }
    new Ticket(newTicket).save()
    .then(ticket => {
    // console.log(ticket)
    customer.tickets.unshift(ticket._id);
    customer.save()
    })    
    res.redirect(`/customer/viewcustomer/${customer._id}`)
  })
})

// Ticket routes

app.get("/ticket/allopen", ensureAuthenticated, (req, res) => {
Ticket.find({'isOpen':true})
  .sort({ticketOpenDate: 'asc'})
  .then(ticket => {
    res.render("ticket/tickets", {
      ticket: ticket
    });
  });
});

app.get("/ticket/allclosed", ensureAuthenticated, (req, res) => {
  Ticket.find({'isOpen':false})
  .sort({ticketOpenDate: 'asc'})
  .then(ticket => {
    res.render("ticket/tickets", {
      ticket: ticket
    });
  });
});

app.get("/ticket/mytickets", ensureAuthenticated, (req, res) => {
  Ticket.find({'ticketOpenedBy':`${req.user.firstName} ${req.user.lastName}`})
  .sort({ticketOpenDate: 'asc'})
  .then(ticket => {
    res.render("ticket/tickets", {
      ticket: ticket
    });
  });
});

app.put('/ticket/update_ticket/:ticket_id', (req, res) => {
  Ticket.findOne({
    ticket_id: req.params.ticket_id
  }).then(ticket =>{
    if(req.body.open){
      open = false,
      closed = true
    } else {
      open = true,
      closed = false
    };
    if(open === true){
      openStatus = "OPEN"
    } else {
      openStatus = "CLOSED"
    }
    // Checks to see if priority has a value, in which case it is HIGH if it does
    if(req.body.priority){
      priority = "High"
    } else {
      priority = "Normal"
    }
    ticket.ticketBody += `<span> <strong>Update from ${req.user.firstName} ${req.user.lastName} on ${moment().format('MMMM Do YYYY, h:mm:ss a')}</strong>: ${req.body.updateBody}</span>`;
    ticket.isOpen = open;
    ticket.ticketPriority = priority;
    ticket.save()
      .then(ticket => {
        res.redirect(`/customer/viewcustomer/${ticket.customerID}`)
      })
    console.log(ticket)
  })
  
});


const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server started and listening on port ${port}!`);
});
