const express = require('express');

const app = express();

app.use(express.static(__dirname + '/dist'));

app.get('/', (req, res) => {
	res.sendFile('index.html', { root : __dirname});
});
app.listen(process.env.PORT || 5000, () => {
	console.log(__dirname);
	console.log("Listening Port 3000");
});