import React, { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css"
import coconutImg from "../assets/coconut.jpg";
import { useSignupUserMutation } from "../services/appApi"

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [signupUser, {isLoading, error }] = useSignupUserMutation()
  const navigate = useNavigate();

  //estado de la imagen subida
  const [image, setImage] = useState(null);
  const [uploadingImg, setUploadingImg] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  function validateImg(e) {
    const file = e.target.files[0];
    if(file.size > 1048576) {
      return alert("El tamaño de la imagen no debe ser superior a 1MB");
    } else {
        setImage(file);
        setImagePreview(URL.createObjectURL(file))
    }
  }

  async function uploadImage(){
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "pe2e5p2x");
    try {
      setUploadingImg(true);
      let res = await fetch("https://api.cloudinary.com/v1_1/dj8wg5cyy/image/upload", {
        method: "post",
        body: data
      })
      const urlData = await res.json();
      setUploadingImg(false);
      return urlData.url
    } catch(error) {
      setUploadingImg(false);
      console.log(error);
    }
  }

  async function handleSignup(e) {
    e.preventDefault();
    if(!image) return alert("por favor, subí una imagen para tu perfil");
    const url = await uploadImage(image);
    console.log(url);
    //registrar al usuario
    signupUser({name, email, password, picture: url}).then(({data}) => {
      if(data) {
        console.log(data);
        navigate("/chat");
      }
    });
  }

  return (
    <Container>
    <Row>
      <Col md={7} className="d-flex align-items-center justify-content-center flex-direction-column">
    <Form style={{ width: "80%", maxWidth: 500}} onSubmit={handleSignup}>
      <h1 className="text-center">Crear Cuenta</h1>
      <div className="signup-profile-pic__container">
        <img src={imagePreview || coconutImg} className="signup-profile-pic" />
        <label htmlFor="image-upload" className="image-upload-label">
          <i className="fas fa-plus-circle add-picture-icon"></i>
        </label>
        <input type="file" id="image-upload" hidden accept="image/png, image/jpg" onChange={validateImg} />
      </div>
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Nombre</Form.Label>
        <Form.Control type="text" placeholder="Ingresá un Nombre" onChange={(e) => setName(e.target.value)} value={name} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Dirección de E-mail</Form.Label>
        <Form.Control type="email" placeholder="Ingresá una dirección de E-mail" onChange={(e) => setEmail(e.target.value)} value={email} />        
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Contraseña</Form.Label>
        <Form.Control type="password" placeholder="Ingresá una Contraseña" onChange={(e) => setPassword(e.target.value)} value={password} />
      </Form.Group>
      <Button variant="primary" type="submit">
        {uploadingImg ? "Registrandote..." : "Registrarse"}
      </Button>
      <div className="py-4">
        <p className="text-center">
          ¿Ya tenes una cuenta? ¡Logeate! <Link to="/login">Login</Link>
        </p>
      </div>
    </Form>
    </Col>
     <Col md={5} className="signup__bg"></Col>
    </Row>
  </Container>
  )
}

export default Signup