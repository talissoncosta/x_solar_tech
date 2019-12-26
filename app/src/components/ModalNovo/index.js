
import React, { useEffect,useState } from 'react';
import api from '../../services/api';
import { Button,Modal,Form,Table,Toast,Container,Col,Row } from 'react-bootstrap';
import MaskedFormControl from 'react-bootstrap-maskedinput'


export default function ModalNovo({id, show, handleClose}) {
    const [cliente,setCliente] = useState({});
    const [nomeCliente, setNomeCliente] = useState('');
    const [cpfCliente, setCpfCliente] = useState('');
    const [telefoneCliente, setTelefoneCliente] = useState('');
    const [emailCliente, setEmailCliente] = useState('');


    const [token,setToken] = useState(localStorage.getItem('token'))
    function validateForm() {
        return nomeCliente.length > 0 
                && cpfCliente.length > 0 
                && telefoneCliente.length > 0 
                && emailCliente.length > 0;
      }
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

    async function salvarDados() {

        let cliente = {
            "nome":nomeCliente,
            "cpf":cpfCliente,
            "telefone": telefoneCliente,
            "email": emailCliente
        }
        console.log(cliente)

        var response = await api.post(`/clientes`,cliente,{
            headers: { Authorization: token }
        })
        handleClose();

    }

    return (
      <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Cadastrar cliente</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group >
                            <Form.Label>Nome</Form.Label>
                            <Form.Control onChange={nome} type="text" placeholder="Nome cliente" />

                            <Form.Label>Cpf</Form.Label>
                            <MaskedFormControl onChange={cpf} type='text' name='cpf' placeholder="xxx.xxx.xxx-xx" mask='111.111.111-11' />

                            <Form.Label>Telefone</Form.Label>
                            <MaskedFormControl onChange={telefone} type='text' placeholder="(xx) xxxxx-xxxx" name='telefone' mask='(11) 11111-1111' />

                            <Form.Label>Email</Form.Label>
                            <Form.Control onChange={email} type="email" placeholder="Email" />
                        </Form.Group>

                    </Form>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Fechar
                    </Button>
                    <Button variant="primary" disabled={!validateForm()} onClick={salvarDados}>
                        Salvar
                    </Button>
                </Modal.Footer>
            </Modal>
      </>

    );
}
const styles = {
    check:{
        marginTop:"10px"
    }
}