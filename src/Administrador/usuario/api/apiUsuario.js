import axios from "axios";
import Swal from "sweetalert2";

const URL = 'http://localhost:8080/api/usuarios';
const URL_BUSCAR = 'http://localhost:8080/api/buscar/usuarios';
const token = localStorage.getItem("token");


export const apiObtenerUsuarios = async () => {
    try {
        const response = await axios.get(
            `${URL}/mostrar`,
            { headers: { "x-token": token } });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data);
    }
};

export const apiBuscar = async (termino) => {
    try {
        const response = await axios.get(
            `${URL_BUSCAR}/${termino}`
        );
        return response.data;
    } catch (error) {
        throw new Error(error.response.data);
    }
};

export const apiCrearUsuario = async (
    carnet, nombre, apellido, direccion, genero, telefono, fechaNacimiento, carrera, generoPoesia, correo, password, rol, img
    ) => {
    try {
        await axios.post(`${URL}/agregar`,
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
                text: "No se pudo agregar el usuario.",
            });
        }

    }
};

export const apiEliminarUsuario = async (id) => {
    try {
        await axios.delete(
            `${URL}/eliminar/${id}`,
            { headers: { "x-token": token } }
        );
        return true;
    } catch (error) {

        console.error(error);

        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "No se pudo eliminar el usuario.",
        });
        return false;
    }
};