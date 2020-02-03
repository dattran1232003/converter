const axios = require('axios');

module.exports = (server) => {
const io = require('socket.io')(server);

	io.on('connect', (socket) => {
		socket.on('client-send-number', async (number) => {
			try	{
				const apiRes = await axios.get(`http://localhost:3000/api/read-number/${number}`);
				socket.emit('server-send-string', apiRes.data);
				
			} catch (e) {
				console.error(e);
			}
			
		})
	})
}