require('dotenv').config()
const express = require('express');                                                                                                                                                                                                                                                                                                                                           
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');

const config = require('./config');
const router = require('./routes');
const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
     extended: true
}));
app.use(express.static(path.join(__dirname, 'public')));
router.set(app);

app.listen(PORT, () => console.log('listening on port '+ PORT));

module.exports = app;
