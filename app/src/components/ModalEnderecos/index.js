
import React, { useEffect,useState } from 'react';
import api from '../../services/api';
import { Button,Table,Container,Col,Row,Modal,Accordion,Card  } from 'react-bootstrap';
import { Edit, Delete,Add,Visibility } from '@material-ui/icons';
import ModalGerenciaEndereco from '../ModalGerenciaEndereco'


export default function ModalEnderecos({end, show, handleClose}) {
        const [enderecos, setEnderecos] = useState([]);
        const [modalGerenciaEnderecos, setModalGerenciaEnderecos] = useState([]);
    const handleCloseModalGerenciaEnderecos = () => {
        setModalGerenciaEnderecos(false);
    }
    useEffect(() => {
        setEnderecos(end)
        console.log("enderecos",end)
    }, [end]);
    function editar(id) {
        console.log("editar")

    }

    function remover(id) {
        console.log("remover")
    }

    function renderEnderecos(endereco, index) {
        return (
            <Card>
                <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" eventKey="0">
                        {endereco.rua}
                    </Accordion.Toggle>
                    <Edit title="Editar cliente"  onClick={() => editar(endereco)} color="primary" />
                    <Delete title="Remover cliente" onClick={() => remover(endereco)} color="secondary" />
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
        <ModalEnderecos
            show={modalGerenciaEnderecos}
            handleClose={handleCloseModalGerenciaEnderecos}

        />
        <Modal size="lg" show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Endereços do cliente</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Button style={style.btnAdd} variant="primary" >
                    <Add color="primary" /> Cadastrar novo endereço
                </Button>
                <Accordion defaultActiveKey="0">
           
                    {
                        enderecos.map(renderEnderecos)
                    }

                </Accordion>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Fechar
                </Button>
                <Button variant="primary" >
                    Salvar
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