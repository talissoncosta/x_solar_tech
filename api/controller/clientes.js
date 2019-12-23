const Cliente = require("../model/cliente");
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;
const nodemailer = require('nodemailer');

const uname = "joao";
const pword = "xsolartech";

var enviarEmailConfirmacao = (nome_cliente) => {
    const sendmail = require('sendmail')();
 
    sendmail({
        from: 'no-reply@xsolartech.com',
        to: 'joao@xsolartech.com',
        subject: 'Cliente cadastrado com sucesso',
        html: `<h1>Olá João</h1> O cliente ${nome_cliente} foi cadastrado com sucesso! `,
      }, function(err, reply) {
        console.log(err && err.stack);
        console.dir("Email enviado com sucesso",reply);
    });
}


var login_usuario =  (req, res) => {
    var { username,password } = req.body; 
    
    if(username != uname || password != pword){
        return res.status(401).send({
            error: "AutenticacaoInvalida"
        })
    }
    var tokenData = {
        username: username
    }

    var token = jwt.sign(tokenData, secret);

    res.send({
        token: "Bearer " + token
    });
}

var buscar_todos = async (req, res) => {
    try {
        const data = await Cliente.find({});

        return res.json(data);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error)
    }

}

var buscar_id = async (req, res) => {
    try {
 
        const { id } = req.params;
        if(!id) 
            return res.status(400).json({
                error: "Invalid data"
            });  
        const data = await Cliente.findById(id);
    
        return res.json(data);      
    } catch (error) {
        console.log(error);
        return res.status(500).json(error)
    }

}

var salvar = async (req, res) => {
    try {
        if(Object.entries(req.body).length === 0) 
            return res.status(400).json({
                error: "Invalid data"
            });   

        const data = await Cliente.create(req.body);

        enviarEmailConfirmacao(req.body.nome);
        
        return res.status(200).json(data);    
    } catch (error) {
        console.log(error);
        return res.status(500).json(error)
    }

}

var atualizar = async (req, res) => {

    try {
        const { id } = req.params;

        if(Object.entries(req.body).length === 0 || !id) 
            return res.status(400).json({
                error: "Invalid data"
            });  
        
        const { nome,email,cpf,telefone,enderecos} = req.body;
        const update = {
            $set: {
                nome: nome,
                email: email,
                cpf: cpf,
                telefone: telefone,
                enderecos: enderecos
            }
            
        }
        const data = await Cliente.findByIdAndUpdate(id,update);
            
    
        return res.status(200).json(data);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error)
    }


}

var remover = async (req, res) => {
    try {
        const { id } = req.params;
        if(!id) 
            return res.status(400).json({
                error: "Invalid data"
            });  
        const data = await Cliente.findByIdAndRemove(id);

        return res.status(200).json(data);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error)
    }
}

module.exports = {
    login_usuario,
    buscar_todos,
    buscar_id,
    salvar,
    atualizar,
    remover
}