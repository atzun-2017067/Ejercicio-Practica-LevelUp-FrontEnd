import Swal from "sweetalert2";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { apiCrearUsuario } from "../api/apiUsuario";

const schema = Yup.object().shape({

  carnet: Yup.string()
    .required("El carnet es obligatorio"),

  nombre: Yup.string().when("option", {
    is: 1,
    then: Yup.string().required("El nombre es requerido"),
  }),

  genero: Yup.string().required("El genero es obligatorio"),
  direccion: Yup.string().required("La dirección es obligatoria"),
  telefono: Yup.string()
    .matches(/^[0-8]{8}$/, "El telefono debe contener solo números y tener una longitud de 8 caracteres")
    .required("El telefono es obligatorio"),

  fechaNacimiento: Yup.string().required("La fecha de nacimiento es obligatorio"),

  carrera: Yup.string().required("La carrera es obligatoria"),

  generoPoesia: Yup.string().required("El genero de poesia es obligatoria"),

  correo: Yup.string().required("El correo es obligatorio"),
  password: Yup.string().required("El password es obligatorio"),
  rol: Yup.string().required("El rol es obligatorio")
});


export const sendData = async (user, option) => {
  let resultado;
  try {
    await schema.validate(user, { abortEarly: false });
    // Verificamos si el usuario que se está editando es un administrador
    if (option === 2 && user.rol === "ROL_ADMINISTRADOR") {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se puede editar a un administrador",
      });
      return;
    }

    switch (option) {
      case 1:
        resultado = await apiCrearUsuario(
          user.carnet,
          user.nombre,
          user.apellido,
          user.direccion,
          user.genero,
          user.telefono,
          user.fechaNacimiento,
          user.carrera,
          user.generoPoesia,
          user.correo,
          user.password,
          user.rol,
          user.img
        );
        if (resultado) {
          Swal.fire({
            icon: "success",
            title: "Genial!",
            text: "Usuario creado correctamente!",
            showConfirmButton: true,
            confirmButtonText: "Ok",
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.href = "/listaUsuarios";
            } else {
              window.location.href = "/listaUsuarios";
            }
          });
        }
        break;

      default:
        break;
    }
  } catch (error) {
    if (error instanceof Yup.ValidationError) {
      // Mostrar una alerta de Swal indicando los campos faltantes o inválidos
      const errorMessages = error.inner.map((err) => err.message);
      Swal.fire({
        icon: "error",
        title: "Campos inválidos",
        html: "Por favor, corrija los siguientes errores: <br>" + errorMessages.join("<br>"),
        showConfirmButton: true,
        confirmButtonText: "Ok",
      });
    }
  }
};
