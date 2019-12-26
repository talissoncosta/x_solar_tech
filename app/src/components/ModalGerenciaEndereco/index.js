
import React, { useEffect,useState } from 'react';
import api from '../../services/api';
import { Button,Modal,Form,Container,Col,Row } from 'react-bootstrap';
import MaskedFormControl from 'react-bootstrap-maskedinput'


export default function ModalGerenciaEndereco({id, show, handleClose,end,updateEnderecos,atualizarEnderecos,atualizaPrincipal,index}) {
    const [token,setToken] = useState(localStorage.getItem('token'))

    const [idCliente,setIdCliente] = useState(id);

    const [cepCliente, setCepCliente] = useState('');
    const [estadoCliente, setEstadoCliente] = useState('');
    const [cidadeCliente, setCidadeCliente] = useState('');
    const [bairroCliente, setBairroCliente] = useState('');
    const [ruaCliente, setRuaCliente] = useState('');
    const [numeroCliente, setNumeroCliente] = useState('');
    const [complementoCliente, setComplementoCliente] = useState('');
    const [tipoCliente, setTipoCliente] = useState('');
    const [endPrincipal, setEndPrincipal] = useState(false);
    const [indexSelecionado, setIndexSelecionado] = useState(index);

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
    async function principal(event) {
        setEndPrincipal(event.target.checked)
    }

    async function salvarEndereco() {

        let data = {
            cep:cepCliente,
            cidade: cidadeCliente,
            estado: estadoCliente,
            bairro: bairroCliente,        
            rua: ruaCliente,
            numero: numeroCliente,
            complemento: complementoCliente,
            tipo: tipoCliente,
            principal: endPrincipal
        }
        if(Object.keys(end).length !== 0 ){
            atualizaPrincipal(indexSelecionado)

            updateEnderecos(data)
        }else{
            atualizaPrincipal()
            await api.post(`/clientes/enderecos/${idCliente}`,data,{
                headers: { Authorization: token }
            })
            atualizarEnderecos();
        }

        handleClose();

    }
    useEffect(() => {

        setIndexSelecionado(index)
      }, [index]);
    useEffect(() => {
      if(end){
        setCepCliente(end.cep);
        setEstadoCliente(end.estado);
        setCidadeCliente(end.cidade);
        setBairroCliente(end.bairro);
        setRuaCliente(end.rua);
        setNumeroCliente(end.numero);
        setComplementoCliente(end.complemento);
        setTipoCliente(end.tipo);
        setEndPrincipal(end.principal);

      }else{
        setCepCliente('');
        setEstadoCliente('');
        setCidadeCliente('');
        setBairroCliente('');
        setRuaCliente('');
        setNumeroCliente('');
        setComplementoCliente('');
        setTipoCliente('');
        setEndPrincipal(false);

      }
      setIdCliente(id)
    }, [end]);
    return (
      <>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Adicionar endereço</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>


                    <Form.Group>
                        <Container>
                            <Row>                              
                                <Col sm={8}>
                                    <Form.Check onChange={principal} type="checkbox" checked={endPrincipal} label="Endereço principal" />
                                </Col>

                            </Row>
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
                <Button variant="primary" onClick={salvarEndereco}>
                    Salvar
                </Button>
            </Modal.Footer>
        </Modal>
      </>

    );
}
