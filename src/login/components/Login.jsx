import React, { useState } from 'react';
import Swal from "sweetalert2";
import { apiLogin } from "../api/apiLogin";
import * as yup from "yup";
import '../login.css';
export const Login = () => {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      await loginSchema.validate({ correo, password }, { abortEarly: false });

      const result = await apiLogin(correo, password);
      if (result) {
        Swal.fire({
          icon: "success",
          title: "Genial!",
          text: "Ha iniciado sesión con éxito!",
          confirmButtonText: "Ok",
        }).then((r) => {
          if (result) {
            if (r.isConfirmed) {
              const [header, payload, signature] = result.split(".");
              const decodedPayload = JSON.parse(atob(payload));
              const rolUsuario = decodedPayload.rol;
              if (rolUsuario === "ROL_ADMINISTRADOR") {
                window.location.href = "/vistaAdmin";
              } else if (rolUsuario === "ROL_USUARIO") {
                window.location.href = "/vistaUsuario";
              }
            }
          }
        });
      }
    } catch (error) {
      let mensaje = "Por favor, complete todos los campos.";

      if (error.name === "ValidationError") {
        mensaje = error.errors[0];
      }

      Swal.fire({
        icon: "error",
        title: "Error",
        text: mensaje,
      });
    }
  };

  const loginSchema = yup.object().shape({
    correo: yup
      .string().required("Ingrese su correo."),
    password: yup.string().required("Ingrese su contraseña."),
  });

  return (
    <>
      <div className="login-container">
        <div className="vertical-center text-center">
          <div className="container">
            <div className="row">
              <div className="col-md-5 offset-md-3">
                <form onSubmit={handleLogin}>
                  <img className="mb-4" src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e8ddc4da-23dd-4502-b65b-378c9cfe5efa/dfh9koj-d5ed79c9-7f2d-4aed-91e5-e2652a16fe87.png/v1/fill/w_1280,h_1280,strp/golden_dawn_insignia_by_jormxdos_dfh9koj-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI4MCIsInBhdGgiOiJcL2ZcL2U4ZGRjNGRhLTIzZGQtNDUwMi1iNjViLTM3OGM5Y2ZlNWVmYVwvZGZoOWtvai1kNWVkNzljOS03ZjJkLTRhZWQtOTFlNS1lMjY1MmExNmZlODcucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.XC3lN2rrNBt8XAUWkFVStBI4yug39j-xLYCCkdHmaY8" width="150" alt="" />
                  <h1 className="h3 mb-3 fw-normal">Inicio de sesión</h1>

                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      id="floatingInput"
                      placeholder="Nickname"
                      value={correo}
                      onChange={(e) => setCorreo(e.target.value)}
                    />
                    <label htmlFor="floatingInput">Correo</label>
                  </div>
                  <div className="form-floating">
                    <input
                      type="password"
                      className="form-control"
                      id="floatingPassword"
                      placeholder="Contraseña"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <label htmlFor="floatingPassword">Contraseña</label>
                  </div>

                  <button className="w-100 btn btn-lg btn-info" type="sumbit" >
                    Entrar
                  </button>
                  <p className="mt-5 mb-3 text-muted">
                    <a id="forgot-password" href="/crearCuenta">
                      ¿Aún no tienes una cuenta?
                    </a>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
