import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiBuscar, apiEliminarUsuario, apiObtenerUsuarios } from "../api/apiUsuario";
import { Usuario } from "../model/usuario";
import Swal from "sweetalert2";
import {  Table } from "react-bootstrap";
import "../usuario.css";
import { NavBarAdmin } from "../../NavBarAdmin";
import { VerUsuario } from "./VerUsuario";

export const ListaUsuario = () => {
  const [usuario, setUsuario] = useState(Usuario);
  const [usuarios, setUsuarios] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [showModalVer, setShowModalVer] = useState(false);
  const [selectedUsuario, setSelectedUsuario] = useState(null);

  const navigate = useNavigate();
  const reload = async () => {
    const result = await apiObtenerUsuarios();
    setUsuarios(result);
  };

  const handleBuscar = async () => {
    try {
      if (searchTerm.trim() === "") {
        const response = await apiObtenerUsuarios();
        setUsuarios(response);
      } else {
        const response = await apiBuscar(searchTerm);
        const usuarios = response.results;
        setUsuarios(usuarios);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleOpenModal = (u) => {
    setShowModal(true);
    setUsuario(u);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleOpenModalVer = (usuario) => {
    setSelectedUsuario(usuario);
    setShowModalVer(true);
  };

  const handleCloseModalVer = () => {
    setShowModalVer(false);
  };

  useEffect(() => {
    reload();
  }, [showModal]);

  const eliminar = async (id) => {
    // Buscamos el salón que se quiere eliminar en la lista actual de salones
    const usuarioEliminar = usuarios.find((usuario) => usuario._id === id);

    if (usuarioEliminar && usuarioEliminar.porDefecto) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No se puede eliminar un usuario por defecto.",
      });
      return;
    }

    // Mostrar un Swal de confirmación antes de eliminar el salón
    Swal.fire({
      icon: "warning",
      title: "¿Estás seguro?",
      text: "Esta acción eliminará el salón permanentemente",
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const result = await apiEliminarUsuario(id);
          if (result) {
            setUsuarios((prevUsuario) => prevUsuario.filter((usuario) => usuario._id !== id));
            Swal.fire({
              icon: "success",
              title: "Genial!",
              text: "Se eliminó el usuario correctamente!",
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "No se pudo eliminar el usuario!",
            });
          }
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Hubo un error al eliminar el salón.",
          });
        }
      }
    });
  };

  return (
    <>
      <NavBarAdmin />
      <div className="container-fluid vista">
        <div className="row">
          <div className="col-1"></div>
          <div className="col-10">
            <div className="titulo">
              <h1 style={{ opacity: "100%" }}>Lista de Usuarios</h1>
            </div>
            <div className="row">
              <div className="col-md-4">
                <button
                  className="btn btn-primary agregar"
                  type="button"
                  style={{ width: "75%" }}
                  onClick={() => navigate("/crearUsuario")}
                >
                  Agregar
                </button>
              </div>
              <div className="col-md-4"></div>
              <div className="col-md-4">
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Buscar"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <div className="input-group-append">
                    <button
                      className="btn btn-primary"
                      type="button"
                      onClick={handleBuscar}
                    >
                      Buscar
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <Table striped bordered hover responsive>
              <thead style={{ backgroundColor: "#FAD7A0" }} className="text-center">
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>Edad</th>
                  <th>Dirección</th>
                  <th>Teléfono</th>
                  <th>Carrera</th>
                  <th>Género de Poesía</th>
                  <th>Fecha de Declamación</th>
                  <th>Opciones</th>
                </tr>
              </thead>
              {usuarios.length > 0 ? (
                usuarios.map((u) => (
                  <tbody className="text-center" key={u._id}>
                    <tr key={u._id}>
                      <td>{u._id}</td>
                      <td>{u.nombre}</td>
                      <td>{u.apellido}</td>
                      <td>{u.edad}</td>
                      <td>{u.direccion}</td>
                      <td>{u.telefono}</td>
                      <td>{u.carrera}</td>
                      <td>{u.generoPoesia}</td>
                      <td>{new Date(u.fechaDeclamacion).toLocaleDateString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit' })}</td>
                      <td>
                        <button
                          className="btn btn-ver"
                          style={{ width: "90%" }}
                          onClick={() => handleOpenModalVer(u)}
                        >
                          Ver{" "}
                          <i className="fa-regular fa-eye fa-beat"></i>
                        </button>
                        <button
                          className="btn btn-danger eliminar"
                          style={{ width: "90%" }}
                          onClick={() => { eliminar(u._id) }}
                        >
                          Eliminar{" "}
                          <i className="fa-solid fa-trash fa-beat" style={{ color: "#000000" }}></i>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                ))
              ) : (
                <tbody>
                  <tr>
                    <td colSpan="9">No se encontraron usuarios</td>
                  </tr>
                </tbody>
              )}
            </Table>
            <hr />
          </div>
          <div className="col-1"></div>
        </div>
      </div>
      <VerUsuario
        usuario={selectedUsuario}
        isOpen={showModalVer}
        onClose={handleCloseModalVer}
      />
    </>
  );
};
