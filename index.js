const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// cors
const cors = require('cors');

//conectar Mongo
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/restapi',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// crear el servidor
const app = express();

// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

// Hab cors
app.use(cors());

app.use('/',routes());

// carpeta publica
app.use(express.static('uploads'));

// puerto
app.listen(5000);