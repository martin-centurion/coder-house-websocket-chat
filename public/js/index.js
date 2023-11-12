(function() {
    let username;
    const socket = io();
    //from-message
    const formMessage = document.getElementById('form-message');
    //input-message
    const inputMessage = document.getElementById('input-message');
    //log-messages
    const logMessages = document.getElementById('log-messages');

    formMessage.addEventListener('submit', (event) => {
        event.preventDefault();

        const text = inputMessage.value;
        socket.emit('new-message', { username, text });
        inputMessage.value = '';
        inputMessage.focus();
    });

    function updateLogMessages({ messages }) {
        logMessages.innerText = '';
        messages.forEach((msg) => {
            const p = document.createElement('p');
            p.innerText = `${msg.username}: ${msg.text}`;
            logMessages.appendChild(p);
        })
    }

    socket.on('notification', (messages) => {
        updateLogMessages(messages)
    });

    socket.on('new-client', () => {
        Swal.fire({
            text: 'Nuevo usuario conectado',
            toast: true,
            position: 'top-rigth',
        })
    })

    Swal.fire({
        title: 'Identificate, por favor!',
        input: 'text',
        inputLabel: 'Ingresa tu username',
        allowOutsideClick: false,
        inputValidator: (value) => {
            if (!value) {
                return 'Necesitamos que ingreses un username para continuar';
            } 
        },
    })
    .then((result) => {
        username = result.value.trim();
        console.log(`Hola ${username}. Bienvenido`);
    });
})();