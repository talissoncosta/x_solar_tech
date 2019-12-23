const express = require('express');
const app = express();
const morgan = require('morgan');
require('dotenv').config();

const clientesRoutes = require('./routes/clientes');
const authRoutes = require('./routes/auth');

const mongoose = require('mongoose');

const  mongo_connection  =  'mongodb://mongo:27017'
const option = {
     useNewUrlParser: true,
     useUnifiedTopology: true,
     useFindAndModify: false
}
mongoose.connect(mongo_connection,option).then(function () {
    console.log("conectou");
}, function (err) {
    console.log("Falha ao conectar",err);
    
});
const allowCors = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH');
    res.header('Access-Control-Allow-Headers', 'Content-Type, authorization');
    res.header('Access-Control-Allow-Credendials', 'true');
  
    next();
  };
  
app.use(allowCors);
app.use(express.json());
app.use(morgan('dev'));
app.use(clientesRoutes);
app.use(authRoutes);

app.listen(3001, () => {
    console.log("Server is running");
})

module.exports = app