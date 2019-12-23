const request = require("supertest");
const app = require('../server');

let userLogin = async() => {
    try {
        var response = await request(app).post('/login')
        .send({
            'username': 'joao',
            'password': 'xsolartech'
        })
        .set('Accept', 'application/json');
    
        return response.body.token;  
    } catch (error) {
        console.log(error)
    }

}

describe('CRUD CLIENTES', () => {
    let customer;
    it('SHOULD INSERT A CUSTOMER', async () => {

        let customer = {
            "nome": "Bran Stark",
            "cpf": "322.974.432-32",
            "telefone": "4999921291" ,
            "email": "bran@stark.com",
            "enderecos": [
              {
                "cidade": "Winterfell",
                "estado": "North",
                "bairro": "Winterfell" ,        
                "rua": "Royal road",
                "numero": "432",
                "complemento": "Castle",
                "tipo":"residencial",
                "principal": "true"
              },
              {
                "cidade": "The wall",
                "estado": "North",
                "bairro": "Wall" ,        
                "rua": "Royal road",
                "numero": "323",
                "complemento": "Castle",
                "tipo":"residencial",
                "principal": "false"
              }
            ]
          }
        let response = await request(app).post('/clientes')
        .send(customer)
        .set('Accept', 'application/json');
        expect(response.status).toBe(200);

    });

    it('SHOULD GET ALL CUSTOMERS', async () => {
        
        var response = await request(app).get('/clientes')
        .set('Accept', 'application/json');
        customer = response.body[0];
        expect(response.status).toBe(200);

    });
    
    it('SHOULD UPDATE A CUSTOMER', async () => {
        customer.nome = "Robin Arryn"
        var response = await request(app).put(`/clientes/${customer._id}`)
        .send(customer)
        .set('Accept', 'application/json');
        expect(response.status).toBe(200);
    });

    it('SHOULD REMOVE A CUSTOMER', async () => {
        var response = await request(app).delete(`/clientes/${customer._id}`)
        .set('Accept', 'application/json');
        expect(response.status).toBe(200);
    });

    it('SHOULD INSERT WITH NO DATA', async () => {
        let response = await request(app).post('/clientes')
        .send({})
        .set('Accept', 'application/json');
        expect(response.status).toBe(400);
    });

    it('SHOULD UPDATE WITH NO DATA', async () => {
        var response = await request(app).put(`/clientes/${customer._id}`)
        .send({})
        .set('Accept', 'application/json');
        expect(response.status).toBe(400);
    });
});