
import React, { useEffect,useState } from 'react';
import api from '../../services/api';
import { Button,Table,Container,Col,Row  } from 'react-bootstrap';
import { Edit, Delete,Add,Visibility } from '@material-ui/icons';
import ModalDelete from '../ModalDelete'
import ModalEditar from '../ModalEditar'
import ModalNovo from '../ModalNovo'
import ModalEnderecos from '../ModalEnderecos'

export default function Content() {
    const [clientes, setClientes] = useState([]);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [idSelecionado, setIdSelecionado] = useState('');
    const [enderecosCliente, setEnderecosCliente] = useState([]);

    const [modalConfirmDelete, setModalConfirmDelete] = useState(false);
    const [showModalEditar, setShowModalEditar] = useState(false);
    const [showModalNovo, setShowModalNovo] = useState(false);
    const [showModalEnderecos, setShowModalEnderecos] = useState(false);

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
    const handleCloseModalEnderecos = () => {
        setShowModalEnderecos(false);
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
    function enderecos(enderecos,id) {
        console.log("END",enderecos,id)
        setShowModalEnderecos(true)
        setIdSelecionado(id)
        setEnderecosCliente(enderecos);
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
                <Visibility title="Gerenciar endereços"  onClick={() => enderecos(cliente.enderecos,cliente._id)} color="primary" />
            
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
        <div >
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
            <ModalEnderecos
                show={showModalEnderecos}
                id={idSelecionado}
                handleClose={handleCloseModalEnderecos}
                end={enderecosCliente}

            />
            <Table  style={style.table} size="xl" responsive striped condensed hover>
                    <thead>
                        <tr>
                        <th></th>
                        <th>Nome</th>
                        <th>Cpf</th>
                        <th>Telefone</th>
                        <th>Email</th>
                        <th>Endereços</th>
                        <th>Ações</th>

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