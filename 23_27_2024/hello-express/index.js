const express = require('express');
const app = express();

const data = ['lorem', 'ipsum', 'dolor', 'sit', 'amet'];

app.get('/words', (req, res) => {
	// res.send('Hello World!');
	res.json(data);
});

const port = 3310;

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
