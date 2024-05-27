document.addEventListener('DOMContentLoaded', function() {
    const chatBubble = document.getElementById('chat-bubble');
    const chatContainer = document.getElementById('chat-container');
    const sendButton = document.getElementById('send-button');
    const chatDisplay = document.getElementById('chat-display');
    const userInput = document.getElementById('user-input');

    chatBubble.addEventListener('click', function() {
        chatContainer.style.display = chatContainer.style.display === 'none' ? 'block' : 'none';
    });

    sendButton.addEventListener('click', function() {
        const userMessage = userInput.value;
        appendMessage('user', userMessage);
        
        switch(userMessage) {
            case '1':
                appendMessage('bot', 'Puedes llamar al 920035194');
                break;
            case '2':
                appendMessage('bot', 'Puedes enviar un correo a m.carpio2@alumnos.santotomas.cl');
                break;
            case '3':
                appendMessage('bot', 'Puedes visitar nuestro Instagram @medardo.carpio');
                break;
            default:
                appendMessage('bot', 'Opción no válida. Por favor, selecciona una opción válida.');
        }
        
        userInput.value = ''; // Limpiar el campo de entrada después de enviar el mensaje
    });

    // Saludo inicial del chatbot
    appendMessage('bot', '¡Bienvenido a Steam LATAM!: Te damos la siguientes opciones para contactanos; opcion 1: Llamanos, opcion 2: Envianos un correo, opcion 3: Visita nuestro Instagram.');

    function appendMessage(sender, message) {
        const messageContainer = document.createElement('div');
        messageContainer.classList.add('chat-message');
        messageContainer.innerHTML = `<div class="${sender}-message" style="color: black;">${message}</div>`;
        chatDisplay.appendChild(messageContainer);
        chatDisplay.scrollTop = chatDisplay.scrollHeight; // Desplazar hacia abajo para mostrar el último mensaje
    }
});

