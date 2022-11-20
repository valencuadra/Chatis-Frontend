import React, {useState, useContext} from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import {useLoginUserMutation} from "../services/appApi";
import {AppContext} from "../context/appContext";

function Login() { 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { socket } = useContext(AppContext);
  const [loginUser, {isLoading, error}] = useLoginUserMutation()

  function handleLogin(e){
    e.preventDefault();
    //logica del logeo
    loginUser({email, password}).then(({data}) => {
      if(data) {
        //socket
        socket.emit("new-user")
        //navegar al chat
        navigate("/chat");
      }
    });
  }

  return (
  <Container>
    <Row>
      <Col md={5} className="login__bg"></Col>
      <Col md={7} className="d-flex align-items-center justify-content-center flex-direction-column">
    <Form style={{width: "80%", maxWidth: 500}} onSubmit={handleLogin}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        {error && <p className="alert alert-danger">{error.data}</p>}
        <Form.Label>Dirección de E-mail</Form.Label>
        <Form.Control type="email" placeholder="Ingresá tu E-mail" onChange={(e) => setEmail(e.target.value)} value={email} required />       
        <Form.Text className="text-muted">
          Tus datos no se compartiran con nadie mas.
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Contraseña</Form.Label>
        <Form.Control type="password" placeholder="Ingresá tu Contraseña" onChange={(e) => setPassword(e.target.value)} value={password} required />
      </Form.Group>
      <Button variant="primary" type="submit">
        Enviar
      </Button>
      <div className="py-4">
        <p className="text-center">
          ¿No tenes una cuenta? ¡Registrate gratis! <Link to="/signup">Registrarse</Link>
        </p>
      </div>
    </Form>
    </Col>
    </Row>
  </Container>
  );
}


export default Login