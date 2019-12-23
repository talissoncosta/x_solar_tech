
import React, { useEffect,useState } from 'react';
import api from '../../services/api';
import { Button,Table } from 'react-bootstrap';
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
        await setClientes(response.data);
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

            <Edit  onClick={() => editar(cliente._id)} color="primary" />
            <Delete onClick={() => remover(cliente._id)} color="secondary" />

            </td>

          </tr>
        )
    }
    useEffect(() => {
        loadClientes();
    }, []);
    return (
        <div>
            <Button variant="primary" onClick={handleShow}>
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
            <Table striped condensed hover>
                <thead>
                    <tr>
                    <th></th>
                    <th>Nome</th>
                    <th>Cpf</th>
                    <th>Telefone</th>
                    <th>Email</th>
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
