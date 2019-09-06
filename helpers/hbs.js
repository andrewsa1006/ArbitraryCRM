const moment = require('moment');

module.exports = {
  ticketDate: function(date) {
    let dd = String(date.getDate()).padStart(2, '0');
    let mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = date.getFullYear();
    let sec = date.getSeconds();
    let min = date.getMinutes();
    let hr = date.getHours();
    let miliSec = date.getMilliseconds();
    date = `${mm}/${dd}/${yyyy}`;
    return date;
  },
  ticketID: function() {
    ticketID = Math.floor((Date.now()/100))
    return ticketID;
  },
    
  ticketOpenCount: function() {
    Ticket.find({
      'isOpen':true
    }).count().then((err, count) => console.log(count))
  },
}