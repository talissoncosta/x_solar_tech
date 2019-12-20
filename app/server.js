const express = require('express');
const app = express();
const morgan = require('morgan');

const clientesRoutes = require('./routes/clientes');
const authRoutes = require('./routes/auth');

const mongoose = require('mongoose');

//localhost:27017 - Endereco do servidor de banco de dados (localhost)
// sauffs2019 - Nome do banco de dados criado


const  mongo_connection  =  'mongodb+srv://xsolartech:xsolartech@cluster0-oqx4p.mongodb.net/test?retryWrites=true&w=majority'
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