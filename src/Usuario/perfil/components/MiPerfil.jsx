import React, { useEffect, useState } from "react";
import { apiObtenerPerfil, apiEliminarPerfil } from "../api/apiPerfil";
import Swal from "sweetalert2";
import "../perfil.css";
import { NavBarUsuario } from "../../NavBarUsuario";

export const MiPerfilUsuario = () => {
  const [perfilUsuario, setPerfilUsuario] = useState(null);
  const [selectedProfile, setSelectedProfile] = useState(null);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const data = await apiObtenerPerfil();
      setPerfilUsuario(data);
    } catch (error) {
      // Manejar el error si es necesario
      console.error(error);
    }
  };

  const handleEliminarPerfil = () => {
    // Mostrar una alerta de confirmación antes de eliminar el perfil
    Swal.fire({
      icon: "warning",
      title: "¿Estás seguro?",
      text: "Esta acción eliminará tu perfil permanentemente",
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const isDeleted = await apiEliminarPerfil();
          if (isDeleted) {
            Swal.fire({
              icon: "success",
              title: "Perfil eliminado",
              text: "Tu perfil ha sido eliminado exitosamente.",
              showConfirmButton: true,
              confirmButtonText: "Ok",
            }).then(() => {
              // Redirigir al usuario a la página de login después de eliminar el perfil
              window.location.href = "/login";
            });
          }
        } catch (error) {
          // Mostrar mensaje de error si la eliminación no fue exitosa
          Swal.fire({
            icon: "error",
            title: "Error al eliminar el perfil",
            text: error.message, // Utilizamos el mensaje de error recibido desde el backend
            showConfirmButton: true,
            confirmButtonText: "Ok",
          });
        }
      }
    });
  };

  return (
    <div className="user-profile">
      <NavBarUsuario />
      <div className="container-fluid perfil">
        {perfilUsuario ? (
          <>
            <center>
              <div className="card mb-3" style={{ maxWidth: "650px" }}>
                <div className="row g-0">
                  <div className="col-md-5">
                    <br /><br />
                    <img src={perfilUsuario[0].img} className="img-fluid rounded-start" alt="Foto de perfil" />
                  </div>
                  <div className="col-md-7">
                    <div className="card-body">
                      <h5 className="card-title">Mi Perfil</h5>
                      <p>
                        <strong>Carnet:</strong>{" "}
                        {perfilUsuario[0].carnet}
                      </p>
                      <p><strong>Nombre:</strong> {perfilUsuario[0].nombre}</p>
                      <p><strong>Apellido:</strong> {perfilUsuario[0].apellido}</p>
                      <p><strong>Edad:</strong> {perfilUsuario[0].edad}</p>
                      <p><strong>Dirección:</strong> {perfilUsuario[0].direccion}</p>
                      <p><strong>Telefono:</strong> {perfilUsuario[0].telefono}</p>
                      <p><strong>Fecha de Declamacion:</strong> {new Date(perfilUsuario[0].fechaDeclamacion).toLocaleDateString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit' })}</p>

                      {/*  Boton de Eliminar */}
                      <button className="btn btn-danger" onClick={handleEliminarPerfil}>
                        Eliminar Mi Perfil
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </center>
          </>
        ) : (
          <p>Cargando perfil...</p>
        )}
      </div>
      <div className="col-1"></div>
    </div>
  );
};
