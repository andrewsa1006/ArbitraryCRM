module.exports = {
  openTickets = function() {
    Ticket.find({'isOpen':true}.then(ticket => {
      console.log(ticket)
    }))
  }
}