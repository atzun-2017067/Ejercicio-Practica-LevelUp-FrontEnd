import axios from "axios";
import Swal from "sweetalert2";

const URL = 'http://localhost:8080/api/usuarios';
const token = localStorage.getItem("token");


export const apiObtenerPerfil = async () => {
    try {
        const response = await axios.get(
            `${URL}/mostrar-perfil`,
            { headers: { "x-token": token } });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data);
    }
};

export const apiEliminarPerfil = async () => {
    try {
        await axios.delete(
            `${URL}/eliminar-perfil`,
            { headers: { "x-token": token } }
        );
        return true;
    } catch (error) {
        // Si hubo errores de validación en el servidor, mostrar las alertas de error
        if (error.response && error.response.data && error.response.data.error) {
            throw new Error(error.response.data.error);
        } else {
            // Si ocurrió otro tipo de error en la solicitud, mostrar una alerta de error genérica
            throw new Error("Hubo un error en la solicitud para eliminar el perfil. Por favor, inténtalo nuevamente.");
        }
    }
};