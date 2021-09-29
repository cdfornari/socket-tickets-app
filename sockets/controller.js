const TicketControl = require('../models/ticket-control')

const ticketControl = new TicketControl();


const socketController = (socket) => {
    
    socket.emit('ultimo-ticket',ticketControl.ultimo)
    socket.emit('ultimos-atendidos',ticketControl.ultimos4)
    socket.emit('tickets-pendientes',ticketControl.tickets.length)

    socket.on('siguiente-ticket', ( payload, callback ) => {
        
        const siguiente = ticketControl.siguiente();
        socket.broadcast.emit('tickets-pendientes',ticketControl.tickets.length)
        callback(siguiente);

    })


    socket.on('atender-ticket', ({escritorio},callback)=> {

        if(!escritorio){
            return callback({
                ok: false,
                msg: 'El escritorio es obligatorio'
            })
        }

        const ticket = ticketControl.atenderTicket(escritorio);

        if(!ticket){
            callback({
                ok: false,
                msg: 'No hay tickets pendientes'
            })
        }else{
            
            socket.broadcast.emit('ultimos-atendidos',ticketControl.ultimos4)
            socket.broadcast.emit('tickets-pendientes',ticketControl.tickets.length)
            socket.emit('tickets-pendientes',ticketControl.tickets.length)

            callback({
                ok: true,
                ticket
            })
        }
    })

}



module.exports = {
    socketController
}

