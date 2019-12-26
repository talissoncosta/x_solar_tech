const Cliente = require("../model/cliente");


var buscar_enderecos =  async (req, res) => {
    try {
        const { id } = req.params;
        const data = await Cliente.findById(id);
        return res.json((data.enderecos?data.enderecos:data));
    } catch (error) {
        console.log(error);
        return res.status(500).json(error)
    }
}

var salvar_endereco =  async (req, res) => {
    try {
        const { id } = req.params;
        const  endereco  = req.body;

        const data = await Cliente.findById(id);
        console.log(req.body)
        console.log(data,endereco)
        data.enderecos.push(endereco);


        console.log("apospush",data)

        await Cliente.findByIdAndUpdate(id,data);

        return res.json({
            "sucess": "Endereço adicionado com sucesso!"
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json(error)
    }
}
var atualizar_enderecos =  async (req, res) => {
    try {
        const { id } = req.params;
        const  enderecos  = req.body;

        const data = await Cliente.findById(id);
        data.enderecos = enderecos;


        console.log("apospush",data)

        await Cliente.findByIdAndUpdate(id,data);

        return res.json({
            "sucess": "Endereço adicionado com sucesso!"
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json(error)
    }
}


module.exports = {
    buscar_enderecos,
    salvar_endereco,
    atualizar_enderecos
}