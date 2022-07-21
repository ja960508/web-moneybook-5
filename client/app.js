const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5500;

app.use('/static', express.static(path.resolve('./dist')));
app.get('*', (_req, res) => {
	res.sendFile(path.resolve('./dist/index.html'));
});

app.listen(PORT, () => {
	console.log('app is listening on PORT', PORT);
});
