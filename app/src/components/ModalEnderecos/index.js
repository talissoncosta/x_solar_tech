
import React, { useEffect,useState } from 'react';
import api from '../../services/api';
import { Button,Table,Container,Col,Row,Modal,Accordion,Card  } from 'react-bootstrap';
import { Edit, Delete,Add,Visibility } from '@material-ui/icons';
import ModalGerenciaEndereco from '../ModalGerenciaEndereco'


export default function ModalEnderecos({end, show, id, handleClose}) {
        const [enderecos, setEnderecos] = useState([]);
        const [endSelecionado, setEndSelecionado] = useState({});
        const [indexSelecionado, setIndexSelecionado] = useState(0);

        const [idCliente, setIdCliente] = useState(id);
        const [token,setToken] = useState(localStorage.getItem('token'))

        const [modalGerenciaEnderecos, setModalGerenciaEnderecos] = useState(false);
    const handleCloseModalGerenciaEnderecos = () => {
        setModalGerenciaEnderecos(false);
    }
    useEffect(() => {
        console.log("endereco aauii",end)
        setIdCliente(id)
        buscar(id);

    }, [id]);

    async function atualizar(data){
        await api.put(`/clientes/enderecos/${idCliente}`,data,{
            headers: { Authorization: token }
        })
    }
    async function buscar(){
        let response = await api.get(`/clientes/enderecos/${id}`,{
            headers: { Authorization: token }
        })
        setEnderecos(response.data)

    }
    async function editar(end,index) {
        console.log("editar")
        setEndSelecionado(end)
        setIndexSelecionado(index)
        setModalGerenciaEnderecos(true)
    }
    async function updateEnderecos(end) {
        enderecos[indexSelecionado] = end;
        atualizar(enderecos);
        buscar();
    }
    const handleShow = () =>{
        setEndSelecionado({})
        setModalGerenciaEnderecos(true);
    } 

    function remover(index) {
        enderecos.splice(index, 1);
        atualizar(enderecos);
        buscar();
    }


    function renderEnderecos(endereco, index) {
        return (
            <Card>
                <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" eventKey="0">
                        {endereco.rua}
                    </Accordion.Toggle>
                    <Edit title="Editar cliente"  onClick={() => editar(endereco,index)} color="primary" />
                    <Delete title="Remover cliente" onClick={() => remover(index)} color="secondary" />
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                <Card.Body>

                    <Container style={style.endereco}>
                        <Row>
                            <Col xs={6}><b>Cidade:</b>{endereco.cidade} </Col>
                            <Col xs={6}><b>Estado: </b>{endereco.estado} </Col>
                        </Row>
                        <Row>
                            <Col xs={6}><b>Bairro:</b>{endereco.bairro} </Col>
                            <Col xs={6}><b>CEP:</b> {endereco.cep}</Col>
                        </Row>
                        <Row>
                            <Col xs={6}><b>Rua:</b> {endereco.rua}</Col>
                            <Col xs={6}><b>Número:</b> {endereco.numero}</Col>
                        </Row>
                        <Row>
                            <Col xs={6}><b>Complemento:</b>{endereco.complemento} </Col>
                            <Col xs={6}><b>Tipo:</b>{endereco.tipo} </Col>
                        </Row>
                    </Container>

                </Card.Body>
                </Accordion.Collapse>
            </Card>

        )
    }
    return (
        <div >
        <ModalGerenciaEndereco
            show={modalGerenciaEnderecos}
            handleClose={handleCloseModalGerenciaEnderecos}
            id={idCliente}
            end={endSelecionado}
            updateEnderecos={updateEnderecos}
            atualizarEnderecos={buscar}

        />
        <Modal size="lg" show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Endereços do cliente</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Button style={style.btnAdd} variant="primary" onClick={handleShow} >
                    <Add color="primary" /> Cadastrar novo endereço
                </Button>
                <Accordion defaultActiveKey="0">
           
                    {enderecos.length > 0 &&
                            enderecos.map(renderEnderecos)
                    }

                </Accordion>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Fechar
                </Button>
            </Modal.Footer>
        </Modal>


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