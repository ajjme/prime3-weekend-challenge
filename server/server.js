const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 5000;

const mainRoute = require('./routes/main.route');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('server/public'));

app.use('/main', mainRoute);

app.listen(port, () => {
    console.log('listening on', port);
});