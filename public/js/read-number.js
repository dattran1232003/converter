const socket = io();

const sendData = () => { const number = $('#input').val() || 1; socket.emit('client-send-number', number); }
const split = R.join(' ');

$(document).ready( () => {
	$('#read').click(sendData);
	$(document).keypress((event) => {
		const keycode = event.keyCode || event.which;
		if (keycode === 13) sendData(); 
	})
});


const showResults = data => {
	$('#result #number-result').html(split(data.arrayClassNumber));
	$('#result #string-result').html(data.fullString);
	$('#input').val('');
	$('#input').focus();
}

socket.on('server-send-string', showResults)