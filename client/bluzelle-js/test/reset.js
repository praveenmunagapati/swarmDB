
const resetInNode = () => 
	require('./emulator/Emulator').reset();


const resetInBrowser = () => new Promise(resolve => {

	const ws = new WebSocket('ws://localhost:8101');
	
	ws.onopen(() => {

		ws.send('reset');

	});

	ws.onmessage(() => {

		ws.close();
		resolve();

	});

});


module.exports = () => {

	if(typeof window === 'undefined') {

		return resetInNode();

	} else {

		return resetInBrowser();

	}

};