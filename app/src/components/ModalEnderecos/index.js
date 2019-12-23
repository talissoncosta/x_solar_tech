
import React, { useEffect,useState } from 'react';
import api from '../../services/api';
import { Button,Table,Container,Col,Row,Modal,Accordion,Card  } from 'react-bootstrap';
import { Edit, Delete,Add,Visibility } from '@material-ui/icons';


export default function ModalEnderecos({end, show, handleClose}) {
        const [enderecos, setEnderecos] = useState([]);

    // function renderCliente(cliente, index) {
    //     return (
    //       <tr key={index}>
    //         <td></td>
    //         <td>{cliente.nome}</td>
    //         <td>{cliente.cpf}</td>
    //         <td>{cliente.telefone}</td>
    //         <td>{cliente.email}</td>
    //         <td>
    //             <Visibility title="Gerenciar endereços"  onClick={() => editar(cliente._id)} color="primary" />

    //             {/* <Container style={style.endereco}>
    //                 <Row>
    //                     <Col xs={6}><b>Cidade:</b>{(cliente.enderecos.length > 0? cliente.enderecos[0].cidade:'')} </Col>
    //                     <Col xs={6}><b>Estado: </b>{(cliente.enderecos.length > 0? cliente.enderecos[0].estado:'')} </Col>
    //                 </Row>
    //                 <Row>
    //                     <Col xs={6}><b>Bairro:</b>{(cliente.enderecos.length > 0? cliente.enderecos[0].bairro:'')} </Col>
    //                     <Col xs={6}><b>CEP:</b> {(cliente.enderecos.length > 0? cliente.enderecos[0].cep:'')}</Col>
    //                 </Row>
    //                 <Row>
    //                     <Col xs={6}><b>Rua:</b> {(cliente.enderecos.length > 0? cliente.enderecos[0].rua:'')}</Col>
    //                     <Col xs={6}><b>Número:</b> {(cliente.enderecos.length > 0? cliente.enderecos[0].numero:'')}</Col>
    //                 </Row>
    //                 <Row>
    //                     <Col xs={6}><b>Complemento:</b>{(cliente.enderecos.length > 0? cliente.enderecos[0].complemento:'')} </Col>
    //                     <Col xs={6}><b>Tipo:</b>{(cliente.enderecos.length > 0? cliente.enderecos[0].tipo:'')} </Col>
    //                 </Row>
    //             </Container> */}
            
    //         </td>

    //         <td>

    //         <Edit title="Editar cliente"  onClick={() => editar(cliente._id)} color="primary" />
    //         <Delete title="Remover cliente" onClick={() => remover(cliente._id)} color="secondary" />

    //         </td>

    //       </tr>
    //     )
    // }
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
                <Container>
                    <Row>
                        <Col >{endereco.rua}</Col>
                        <Col >
                            <Edit title="Editar cliente"  onClick={() => editar(endereco)} color="primary" />
                        </Col>
                        <Col >
                            <Delete title="Remover cliente" onClick={() => remover(endereco)} color="secondary" />
                        </Col>
                    </Row>

                </Container>
                    

                </Accordion.Toggle>
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

            <Modal size="lg" show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Endereços do cliente</Modal.Title>
            </Modal.Header>
            <Modal.Body>

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