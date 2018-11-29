// MAke connection to server
var socket = io.connect('https://still-escarpment-32036.herokuapp.com/');

//Query DOM
var message = document.getElementById('message');
username = document.getElementById('username');
output = document.getElementById('output');
btn = document.getElementById('send');
feedback = document.getElementById('feedback');
//Emit events on click of button
btn.addEventListener('click', () => {


    //Emit the data to be sent
    socket.emit('chat', {
        username: username.value,
        message: message.value
    });
});

//?Add "USER is Typing" on Keypress event

message.addEventListener('keypress', () => {
    socket.emit('typing', username.value);
})

//Display data in empty div on that event
socket.on('chat', (data) => {
    feedback.innerHTML = '';
    output.innerHTML += '<p><strong>' + data.username + ': </strong>' + data.message + '</p>';
});

socket.on('typing', (data) => {
    feedback.innerHTML = '<p>' + data + ' is typing a message...</p>';
});