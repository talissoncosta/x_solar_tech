const express = require('express');
const app = express();
const morgan = require('morgan');

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
app.use(express.json());
app.use(morgan('dev'));
app.use(clientesRoutes);
app.use(authRoutes);

app.listen(3000, () => {
    console.log("Server is running");
})