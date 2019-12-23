
import React, { useEffect,useState } from 'react';
import api from '../../services/api';
import { Button,Table,Container,Col,Row  } from 'react-bootstrap';
import { Edit, Delete,Add } from '@material-ui/icons';
import ModalDelete from '../ModalDelete'
import ModalEditar from '../ModalEditar'
import ModalNovo from '../ModalNovo'

export default function Content() {
    const [clientes, setClientes] = useState([]);
    const [token,setToken] = useState("Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvYW8iLCJpYXQiOjE1NzcwMzk3Mzd9.c_MLNVTLh-KZrpEBKLtsKlZhyeoiO9zRj4_1B-fnpwk");
    const [idSelecionado, setIdSelecionado] = useState('');

    const [modalConfirmDelete, setModalConfirmDelete] = useState(false);
    const [showModalEditar, setShowModalEditar] = useState(false);
    const [showModalNovo, setShowModalNovo] = useState(false);

    const handleCloseModalDelete = () => {
        setModalConfirmDelete(false);
        loadClientes();
    }
    const handleCloseModalEditar = () =>{
        setShowModalEditar(false);
        loadClientes();
    } 
    const handleCloseModalNovo = () =>{
        setShowModalNovo(false);
        loadClientes();
    } 

    const handleShow = () => setShowModalNovo(true);

    let loadClientes = async () => {
        var response = await api.get(`/clientes`,{
            headers: { Authorization: token }
        })
        console.log(response.data)
        setClientes(response.data);
    }

    function editar(id) { 
        setShowModalEditar(true)
        setIdSelecionado(id)

    }
    function remover(id) { 
        setModalConfirmDelete(true)
        setIdSelecionado(id)
        console.log(modalConfirmDelete)
    }

    function renderCliente(cliente, index) {
        return (
          <tr key={index}>
            <td></td>
            <td>{cliente.nome}</td>
            <td>{cliente.cpf}</td>
            <td>{cliente.telefone}</td>
            <td>{cliente.email}</td>
            <td>
                <Container style={style.endereco}>
                    <Row>
                        <Col xs={6}><b>Cidade:</b>{(cliente.enderecos.length > 0? cliente.enderecos[0].cidade:'')} </Col>
                        <Col xs={6}><b>Estado: </b>{(cliente.enderecos.length > 0? cliente.enderecos[0].estado:'')} </Col>
                    </Row>
                    <Row>
                        <Col xs={6}><b>Bairro:</b>{(cliente.enderecos.length > 0? cliente.enderecos[0].bairro:'')} </Col>
                        <Col xs={6}><b>CEP:</b> {(cliente.enderecos.length > 0? cliente.enderecos[0].cep:'')}</Col>
                    </Row>
                    <Row>
                        <Col xs={6}><b>Rua:</b> {(cliente.enderecos.length > 0? cliente.enderecos[0].rua:'')}</Col>
                        <Col xs={6}><b>Número:</b> {(cliente.enderecos.length > 0? cliente.enderecos[0].numero:'')}</Col>
                    </Row>
                    <Row>
                        <Col xs={6}><b>Complemento:</b>{(cliente.enderecos.length > 0? cliente.enderecos[0].complemento:'')} </Col>
                        <Col xs={6}><b>Tipo:</b>{(cliente.enderecos.length > 0? cliente.enderecos[0].tipo:'')} </Col>
                    </Row>
                </Container>
            
            </td>

            <td>

            <Edit title="Editar cliente"  onClick={() => editar(cliente._id)} color="primary" />
            <Delete title="Remover cliente" onClick={() => remover(cliente._id)} color="secondary" />

            </td>

          </tr>
        )
    }
    useEffect(() => {
        loadClientes();
    }, []);
    return (
        <div>
            <Button style={style.btnAdd} variant="primary" onClick={handleShow}>
                <Add color="primary" /> Cadastrar novo cliente
            </Button>
            <ModalDelete
                show={modalConfirmDelete}
                id={idSelecionado}
                handleClose={handleCloseModalDelete}
            />
            <ModalEditar
                show={showModalEditar}
                id={idSelecionado}
                handleClose={handleCloseModalEditar}
            />
            <ModalNovo
                show={showModalNovo}
                handleClose={handleCloseModalNovo}
            />
            <Table style={style.table} striped condensed hover>
                    <thead>
                        <tr>
                        <th></th>
                        <th>Nome</th>
                        <th>Cpf</th>
                        <th>Telefone</th>
                        <th>Email</th>
                        <th>Endereço principal</th>
                        <th>Acões</th>

                        </tr>
                    </thead>
                    <tbody>
                        {clientes.map(renderCliente)}
                    </tbody>
                </Table>

        </div>
    );
}

const style = {

    btnAdd:{
        marginBottom:'20px'
    },
    table:{
        textAlign:'center'
    },
    endereco:{
        textAlign:'left'
    }
}