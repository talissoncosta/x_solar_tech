
import React, { useEffect,useState } from 'react';
import api from '../../services/api';
import { Button,Modal,Form,Table,Toast,Container,Col,Row } from 'react-bootstrap';
import MaskedFormControl from 'react-bootstrap-maskedinput'


export default function ModalEditar({id, show, handleClose}) {
    const [cliente,setCliente] = useState({});
    const [nomeCliente, setNomeCliente] = useState('');
    const [cpfCliente, setCpfCliente] = useState('');
    const [telefoneCliente, setTelefoneCliente] = useState('');
    const [emailCliente, setEmailCliente] = useState('');
    const [cepCliente, setCepCliente] = useState('');
    const [estadoCliente, setEstadoCliente] = useState('');
    const [cidadeCliente, setCidadeCliente] = useState('');
    const [bairroCliente, setBairroCliente] = useState('');
    const [ruaCliente, setRuaCliente] = useState('');
    const [numeroCliente, setNumeroCliente] = useState('');
    const [complementoCliente, setComplementoCliente] = useState('');
    const [tipoCliente, setTipoCliente] = useState('');


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
    async function estado(event) {
        setEstadoCliente(event.target.value)
    }
    async function cidade(event) {
        setCidadeCliente(event.target.value)
    }
    async function bairro(event) {
        setBairroCliente(event.target.value)
    }
    async function cep(event) {
        setCepCliente(event.target.value)
    }
    async function rua(event) {
        setRuaCliente(event.target.value)
    }
    async function numero(event) {
        setNumeroCliente(event.target.value)
    }
    async function complemento(event) {
        setComplementoCliente(event.target.value)
    }
    async function tipo(event) {
        setTipoCliente(event.target.value)
    }

    async function salvarDados() {

        let cliente = {
            "nome":nomeCliente,
            "cpf":cpfCliente,
            "telefone": telefoneCliente,
            "email": emailCliente,
            "enderecos":[
                {
                    cep:cepCliente,
                    cidade: cidadeCliente,
                    estado: estadoCliente,
                    bairro: bairroCliente,        
                    rua: ruaCliente,
                    numero: numeroCliente,
                    complemento: complementoCliente,
                    tipo: tipoCliente,
                    principal: true
                }
            ]
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
                        <Form.Group   onSubmit={salvarDados}>
                            <Form.Label>Nome</Form.Label>
                            <Form.Control onChange={nome} type="text" placeholder="Nome cliente" />

                            <Form.Label>Cpf</Form.Label>
                            <MaskedFormControl onChange={cpf} type='text' name='cpf' placeholder="xxx.xxx.xxx-xx" mask='111.111.111-11' />

                            <Form.Label>Telefone</Form.Label>
                            <MaskedFormControl onChange={telefone} type='text' placeholder="(xx) xxxxx-xxxx" name='telefone' mask='(11) 11111-1111' />

                            <Form.Label>Email</Form.Label>
                            <Form.Control onChange={email} type="email" placeholder="Email" />
                        </Form.Group>
                        <Form.Label>Endereço principal</Form.Label>

                        <Form.Group>
                            <Container>
                                <Row>
                                    <Col sm={4}>
                                        <Form.Label>CEP</Form.Label>
                                        <MaskedFormControl onChange={cep} type='text' name='cep' placeholder="xxxxx-xxx" mask='11111-111' />
                                    </Col>
                                    <Col sm={4}>
                                        <Form.Label>Estado</Form.Label>
                                        <Form.Control onChange={estado} type='text' name='estado' placeholder="Estado"  />
                                    </Col>
                                    <Col sm={4}>
                                        <Form.Label>Cidade</Form.Label>
                                        <Form.Control onChange={cidade} type='text' placeholder="Cidade" name='cidade' />
                                    </Col>
                                </Row>
                                <Row>

                                    <Col sm={4}>
                                        <Form.Label>Bairro</Form.Label>
                                        <Form.Control onChange={bairro} type='text' placeholder="Bairro" name='bairro' />
                                    </Col>    
                                    <Col sm={4}>
                                        <Form.Label>Rua</Form.Label>
                                        <Form.Control onChange={rua} type='text' placeholder="Rua" name='rua' />
                                    </Col>                                    
                                    <Col sm={4}>
                                        <Form.Label>Número</Form.Label>
                                        <Form.Control onChange={numero} type='number' placeholder="Numero" name='numero' />
                                    </Col> 
                                </Row>
                                <Row>                              
                                    <Col sm={8}>
                                        <Form.Label>Complemento</Form.Label>
                                        <Form.Control onChange={complemento} type='text' placeholder="Complemento" name='complemento' />
                                    </Col>
                                    <Col sm={4}>
                                        <Form.Label>Tipo</Form.Label>
                                        <Form.Control onChange={tipo} as="select">
                                            <option value="">Selecione</option>
                                            <option value="comercial">Comercial</option>
                                            <option value="residencial">Residencial</option>
                                            <option value="rural">Rural</option>
                                            <option value="casa de praia">Casa de praia</option>
                                        </Form.Control>
                                    </Col>
                                </Row>
                            </Container>
                        </Form.Group>
                    </Form>

{/* //        tipo: comercial, residencial, rural ou casa de praia */}
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
