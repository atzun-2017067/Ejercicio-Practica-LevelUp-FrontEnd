import axios from "axios";
import Swal from "sweetalert2";

const URL = 'http://localhost:8080/api/usuarios';
const token = localStorage.getItem("token");


export const apiObtenerUsuarios = async () => {
    try {
        const response = await axios.get(
            `${URL}/mostrar`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data);
    }
};


export const apiCrearCuenta = async (carnet, nombre, apellido, direccion, genero, telefono, fechaNacimiento, carrera, generoPoesia, correo, password, rol, img) => {
    try {
        await axios.post(`${URL}/crearCuenta`,
            {
                carnet,
                nombre,
                apellido,
                direccion,
                genero,
                telefono,
                fechaNacimiento,
                carrera,
                generoPoesia,
                correo,
                password,
                rol,
                img
            },
            { headers: { "x-token": token } }
        );
        return true;
    } catch (error) {
        console.error(error);

        // Mostrar mensaje de error en caso de fallo en la petición
        if (error.response && error.response.data && error.response.data.error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response.data.error,
            });
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "No se pudo crear la cuenta.",
            });
        }

    }
};