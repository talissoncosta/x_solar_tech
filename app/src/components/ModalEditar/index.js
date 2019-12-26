
import React, { useEffect,useState } from 'react';
import api from '../../services/api';
import { Button,Modal,Form,Container,Col,Row } from 'react-bootstrap';
import MaskedFormControl from 'react-bootstrap-maskedinput'


export default function ModalEditar({id, show, handleClose}) {
    const [token,setToken] = useState(localStorage.getItem('token'))

    const [cliente,setCliente] = useState({});
    const [nomeCliente, setNomeCliente] = useState('');
    const [cpfCliente, setCpfCliente] = useState('');
    const [telefoneCliente, setTelefoneCliente] = useState('');
    const [emailCliente, setEmailCliente] = useState('');

    async function nome(event) {
        setNomeCliente(event.target.value)
    }
    async function cpf(event) {
        setCpfCliente(event.target.value)
    }
    async function telefone(event) {
        setTelefoneCliente(event.target.value)
    }
    async function email(event) {
        setEmailCliente(event.target.value)
    }

    async function buscarDadosCliente(id) {
        var response = await api.get(`/clientes/${id}`, {
            headers: {
                Authorization: token
            }
        })
        let cl = response.data;
        setCliente(cl);
        setNomeCliente(cl.nome);
        setCpfCliente(cl.cpf);
        setEmailCliente(cl.email);
        setTelefoneCliente(cl.telefone);

    }
    async function atualizarDados() {

        let data = {
            "nome":nomeCliente,
            "cpf":cpfCliente,
            "telefone": telefoneCliente,
            "email": emailCliente
        }
        await api.put(`/clientes/${cliente._id}`,data,{
            headers: { Authorization: token }
        })
        handleClose();

    }
    useEffect(() => {
        buscarDadosCliente(id);
    }, [id]);
    return (
      <>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Editar dados do cliente</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group   >
                        <Form.Label>Nome</Form.Label>
                        <Form.Control onChange={nome} value={nomeCliente} type="text" placeholder="Nome cliente" />

                        <Form.Label>Cpf</Form.Label>
                        <MaskedFormControl onChange={cpf} value={cpfCliente} type='text' name='cpf' placeholder="xxx.xxx.xxx-xx" mask='111.111.111-11' />

                        <Form.Label>Telefone</Form.Label>
                        <MaskedFormControl onChange={telefone} value={telefoneCliente} type='text' placeholder="(xx) xxxxx-xxxx" name='telefone' mask='(11) 11111-1111' />
                        
                        <Form.Label>Email</Form.Label>
                        <Form.Control onChange={email} value={emailCliente} type="email" placeholder="Email" />
                    </Form.Group>

                </Form>
                
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Fechar
                </Button>
                <Button variant="primary" onClick={atualizarDados}>
                    Salvar
                </Button>
            </Modal.Footer>
        </Modal>
      </>

    );
}
