const newTicket = document.querySelector('#lblNuevoTicket');
const crear = document.querySelector('button');




const socket = io();


socket.on('connect', () => {

    crear.disabled = false;

});

socket.on('disconnect', () => {

    crear.disabled = true;

});

socket.on('ultimo-ticket',(ultimo)=>{
    newTicket.innerHTML = 'Ticket ' + ultimo;
})



crear.addEventListener('click', () => {
    
    socket.emit('siguiente-ticket', null, ( ticket ) => {

        newTicket.innerHTML = ticket;

    });

});