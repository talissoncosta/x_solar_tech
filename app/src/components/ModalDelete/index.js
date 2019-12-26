
import React,{useState} from 'react';
import api from '../../services/api';
import { Button,Modal } from 'react-bootstrap';


export default function ModalDelete({id, show, handleClose}) {
  const [token,setToken] = useState(localStorage.getItem('token'))

  async function remover() { 
      var response = await api.delete(`/clientes/${id}`,{
        headers: { Authorization: token }
    })
      handleClose()
  }
    return (
      <>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Remover cliente</Modal.Title>
        </Modal.Header>
        <Modal.Body>Você tem certeza que deseja remover este cliente?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={remover}>
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>
      </>

    );
}
