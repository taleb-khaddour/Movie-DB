const express = require('express');
const app = express();


app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.get('/test', (req, res) => {
    res.json({ status: 200, message: 'ok' });
});
app.get('/time', (req, res) => {
    const currentTime = new Date();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    res.json({ status: 200, message: `${hours}:${minutes}` });
  });


app.listen(3003, () => {
    console.log('listening on port 3003');
});