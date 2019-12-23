
import React from 'react';
import { Image,Container,Row,Col } from 'react-bootstrap';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useHistory } from "react-router-dom";

export default function Header() {
    const history = useHistory();

    function logout(){
        localStorage.clear();
        history.push("/");

    }
    return (
        <Container>
            <Row>
                <Col sm={8}>            
                    <Image style={style} src="solar-tech.png"  fluid/>
                </Col>
                <Col style={styleNome} sm={2}>Olá João!</Col>
                <Col style={styleNome} sm={2} onClick={logout}><ExitToAppIcon />Logout</Col>

            </Row>
        </Container>
    );
}

const style = {
    height:'100px',
    width: '100px'

}
const styleNome = {
    margin:'auto'
}
