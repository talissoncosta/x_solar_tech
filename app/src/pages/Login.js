import React, { useState,useEffect } from "react";
import { Button, FormGroup, FormControl, FormLabel,Image,Alert } from "react-bootstrap";
import "./Login.css";
import api from '../services/api';
import { useHistory } from "react-router-dom";

export default function Login(props) {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);
  const history = useHistory();

  function validateForm() {
    return usuario.length > 0 && password.length > 0;
  }

  async function login() {
    try {
      var data ={
          "username":usuario,
          "password": password
      }
      var response = await api.post(`/login`,data)
      if(response.data.token)
        localStorage.setItem('token', response.data.token);

      history.push("/home");

    } catch (error) {
      console.log(error)
      setShowError(true)
    }


  }
  useEffect(() => {
    var token = localStorage.getItem('token');
    if(token)
      history.push("/home");
;


  }, []);
  return (
    <div className="Login">
      <form >
        <Image style={style} src="solar-tech.png"  fluid/>

        <FormGroup controlId="usuario" bsSize="large">
          <FormLabel>Usuário</FormLabel>
          <FormControl
            autoFocus
            type="usuario"
            value={usuario}
            onChange={e => setUsuario(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <FormLabel>Senha</FormLabel>
          <FormControl
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
          />
        </FormGroup>
        <Alert show={showError} variant="danger" dismissible>
          <Alert.Heading>Falha ao realizar login!</Alert.Heading>
          <p>
            Verifique o seu usuário e a sua senha!
          </p>
        </Alert>
        <Button block bsSize="large" disabled={!validateForm()} onClick={login}>
          Login
        </Button>
      </form>
    </div>
  );
}

const style = {
    height:'200px',
    width: '200px',
    marginLeft:'20%'



}