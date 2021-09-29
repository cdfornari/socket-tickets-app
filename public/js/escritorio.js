const escritorioName = document.querySelector('h1')
const btnAtender = document.querySelector('button')
const lblTicket = document.querySelector('small')
const alerta = document.querySelector('.alert-info')
const lblPendientes = document.querySelector('#lblPendientes')

const searchParams = new URLSearchParams(window.location.search)

if(!searchParams.has('escritorio')){
    window.location = 'index.html'
    throw new Error('El escritorio es obligatorio')
}

const escritorio = searchParams.get('escritorio');
escritorioName.innerHTML = escritorio;

alerta.style.display = 'none'


const socket = io();


socket.on('connect', () => {

    btnAtender.disabled = false;

});

socket.on('disconnect', () => {

    btnAtender.disabled = true;

});

socket.on('tickets-pendientes', (pendientes)=>{

    if(pendientes === 0){
        alerta.style.display = ''
    }else{
        alerta.style.display = 'none'
    }

    lblPendientes.innerText = pendientes;   

})


btnAtender.addEventListener('click', () => {

    
    socket.emit('atender-ticket',{escritorio}, ({ticket,ok,msg})=>{

        if(!ok){
            lblTicket.innerText = 'Nadie'
            alerta.innerText = msg
            return alerta.style.display = ''
        }

        lblTicket.innerText = 'Ticket ' + ticket.numero;

    })

});