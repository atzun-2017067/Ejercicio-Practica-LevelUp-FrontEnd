import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

export const VerUsuario = ({ usuario, isOpen, onClose }) => {
    return (
        <Modal show={isOpen} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Detalles del Usuario <br />
                    ID: {usuario && usuario._id}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {usuario && (
                    <Form>
                        <Form.Group>
                            <center>
                                {usuario.img && <img src={usuario.img} className="img-fluid rounded-start" style={{maxHeight: "150px"}} alt="Sin Imagen" />}
                            </center>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Carnet:</Form.Label>
                            <Form.Control type="text" value={usuario.carnet} readOnly />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Nombre:</Form.Label>
                            <Form.Control type="text" value={usuario.nombre} readOnly />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Apellido:</Form.Label>
                            <Form.Control type="text" value={usuario.apellido} readOnly />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Direccion:</Form.Label>
                            <Form.Control type="text" value={usuario.direccion} readOnly />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Telefono:</Form.Label>
                            <Form.Control type="text" value={usuario.telefono} readOnly />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Fecha de Nacimiento:</Form.Label>
                            <Form.Control type="text" value={new Date(usuario.fechaNacimiento).toLocaleDateString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit' })} readOnly />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Fecha de Inscripcion:</Form.Label>
                            <Form.Control type="text" value={new Date(usuario.fechaInscripcion).toLocaleDateString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit' })} readOnly />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Correo:</Form.Label>
                            <Form.Control type="text" value={usuario.correo} readOnly />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Rol:</Form.Label>
                            <Form.Control type="text" value={usuario.rol} readOnly />
                        </Form.Group>
                    </Form>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Cerrar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};