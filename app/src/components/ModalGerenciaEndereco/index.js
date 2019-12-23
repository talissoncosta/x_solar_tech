
import React, { useEffect,useState } from 'react';
import api from '../../services/api';
import { Button,Modal,Form,Container,Col,Row } from 'react-bootstrap';
import MaskedFormControl from 'react-bootstrap-maskedinput'


export default function ModalGerenciaEndereco({id, show, handleClose}) {
    const [token,setToken] = useState(localStorage.getItem('token'))

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
    const [enderecoPrincipalCliente, setEnderecoPrincipalCliente] = useState([]);
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
        let end = (cl.enderecos ? cl.enderecos[0] : {});
        setCepCliente(end.cep);
        setEstadoCliente(end.estado);
        setCidadeCliente(end.cidade);
        setBairroCliente(end.bairro);
        setRuaCliente(end.rua);
        setNumeroCliente(end.numero);
        setComplementoCliente(end.complemento);
        setTipoCliente(end.tipo);


    }
    async function atualizarDados() {

        let data = {
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
                    <Form.Label>Endereço principal</Form.Label>

                    <Form.Group>
                            <Container>
                                <Row>
                                    <Col sm={4}>
                                        <Form.Label>CEP</Form.Label>
                                        <MaskedFormControl onChange={cep} value={cepCliente} type='text' name='cep' placeholder="xxxxx-xxx" mask='11111-111' />
                                    </Col>
                                    <Col sm={4}>
                                        <Form.Label>Estado</Form.Label>
                                        <Form.Control onChange={estado} value={estadoCliente} type='text' name='estado' placeholder="Estado"  />
                                    </Col>
                                    <Col sm={4}>
                                        <Form.Label>Cidade</Form.Label>
                                        <Form.Control onChange={cidade} value={cidadeCliente} type='text' placeholder="Cidade" name='cidade' />
                                    </Col>
                                </Row>
                                <Row>

                                    <Col sm={4}>
                                        <Form.Label>Bairro</Form.Label>
                                        <Form.Control onChange={bairro} value={bairroCliente} type='text' placeholder="Bairro" name='bairro' />
                                    </Col>    
                                    <Col sm={4}>
                                        <Form.Label>Rua</Form.Label>
                                        <Form.Control onChange={rua} value={ruaCliente} type='text' placeholder="Rua" name='rua' />
                                    </Col>                                    
                                    <Col sm={4}>
                                        <Form.Label>Número</Form.Label>
                                        <Form.Control onChange={numero} value={numeroCliente} type='number' placeholder="Numero" name='numero' />
                                    </Col> 
                                </Row>
                                <Row>                              
                                    <Col sm={8}>
                                        <Form.Label>Complemento</Form.Label>
                                        <Form.Control onChange={complemento} value={complementoCliente} type='text' placeholder="Complemento" name='complemento' />
                                    </Col>
                                    <Col sm={4}>
                                        <Form.Label>Tipo</Form.Label>
                                        <Form.Control onChange={tipo} value={tipoCliente} as="select">
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
