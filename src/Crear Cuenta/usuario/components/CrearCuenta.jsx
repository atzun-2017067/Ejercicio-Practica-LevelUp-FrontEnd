import React from "react";
import { Formulario } from "./Formulario";
import { Usuario } from "../model/usuario";

export const CrearCuenta = () => {
  const handleCancel = () => {
    // Utilizamos window.history.back() para regresar a la página anterior en el historial del navegador.
    window.history.back();
  };
  return (
    <>
      <center>
        <h1>Crear Usuario</h1>
      </center>
      <div className="container-fluid vista">
        <div className="row">
          <div className="col-3"></div>
          <div className="col-6">
            <Formulario
              usuarioProp={Usuario}
              titleButton="Crear Usuario"
              option={1}
            ></Formulario>
          </div>
        </div>
        <div className="col-3"></div>
      </div>
    </>
  );
};