import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { sendData } from "../helpers/formUsuarioHelper";
import { apiObtenerUsuarios } from "../api/apiUsuario";

export const Formulario = ({ usuarioProp, titleButton, option }) => {
    const [usuario, setUsuario] = useState(usuarioProp);
    const [generoOption, setGenero] = useState([]);
    const [generoPoesiaOption, setGeneroPoesia] = useState([]);
    const [rolesOption, setRoles] = useState([]);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        setUsuario(usuarioProp);
        loadGenero();
        loadGeneroPoesia();
    }, [usuarioProp]);

    const loadGenero = async () => {
        try {

            const usuarios = await apiObtenerUsuarios();
            const genero = [...new Set(usuarios.map((usuario) => usuario.genero))];
            setGenero(genero);

            if (!genero.includes("Masculino")) setGenero((prev) => [...prev, "Masculino"]);
            if (!genero.includes("Femenino")) setGenero((prev) => [...prev, "Femenino"]);

        } catch (error) {
            console.error("Error al cargar el genero:", error);
        }
    };

    const loadGeneroPoesia = async () => {
        try {

            const usuarios = await apiObtenerUsuarios();
            const generoPoesia = [...new Set(usuarios.map((usuario) => usuario.generoPoesia))];
            setGeneroPoesia(generoPoesia);

            if (!generoPoesia.includes("Lirica")) setGeneroPoesia((prev) => [...prev, "Lirica"]);
            if (!generoPoesia.includes("Epica")) setGeneroPoesia((prev) => [...prev, "Epica"]);
            if (!generoPoesia.includes("Dramatica")) setGeneroPoesia((prev) => [...prev, "Dramatica"]);

        } catch (error) {
            console.error("Error al cargar el genero de poesia:", error);
        }
    };

    const crud = async () => {
        await sendData(usuario, option);
        // Asegúrate de que el campo correo tenga un valor antes de enviarlo
        if (!usuario.correo) {
            console.warn("El campo correo es obligatorio.");
            return;
        }
    };

    const handleBack = () => {
        window.history.back();
    };

    return (
        <>
            <form onSubmit={handleSubmit(crud)}>
            <div className="form-group">
                    <label className="text-black">Carnet</label>
                    <input
                        {...register("carnet")}
                        type="text"
                        maxLength={6}
                        className="form-control"
                        value={usuario?.carnet || ""}
                        onChange={({ target: { value } }) =>
                            setUsuario((prevUsuario) => ({ ...prevUsuario, carnet: value }))
                        }
                    />
                    {errors.carnet && (
                        <span className="text-danger">{errors.carnet.message}</span>
                    )}
                </div>

                <div className="form-group">
                    <label className="text-black">Nombre</label>
                    <input
                        {...register("nombre")}
                        type="text"
                        className="form-control"
                        value={usuario?.nombre || ""}
                        onChange={({ target: { value } }) =>
                            setUsuario((prevUsuario) => ({ ...prevUsuario, nombre: value }))
                        }
                    />
                    {errors.nombre && (
                        <span className="text-danger">{errors.nombre.message}</span>
                    )}
                </div>

                <div className="form-group">
                    <label className="text-black">Apellido</label>
                    <input
                        {...register("apellido")}
                        type="text"
                        className="form-control"
                        value={usuario?.apellido || ""}
                        onChange={({ target: { value } }) =>
                            setUsuario((prevUsuario) => ({ ...prevUsuario, apellido: value }))
                        }
                    />
                    {errors.apellido && (
                        <span className="text-danger">{errors.apellido.message}</span>
                    )}
                </div>

                <div className="form-group">
                    <label className="text-black">Direccion</label>
                    <input
                        {...register("direccion")}
                        type="text"
                        className="form-control"
                        value={usuario?.direccion || ""}
                        onChange={({ target: { value } }) =>
                            setUsuario((prevUsuario) => ({ ...prevUsuario, direccion: value }))
                        }
                    />
                    {errors.direccion && (
                        <span className="text-danger">{errors.direccion.message}</span>
                    )}
                </div>

                <div className="form-group">
                    <label className="text-black">Genero</label>
                    <select
                        {...register("genero")}
                        className="form-select"
                        aria-label="Genero select"
                        value={usuario?.genero || ""}
                        onChange={({ target: { value } }) =>
                            setUsuario((prevUsuario) => ({ ...prevUsuario, genero: value }))
                        }
                    >
                        <option value="">Seleccione un Genero</option>
                        {generoOption.map((genero) => (
                            <option key={genero} value={genero}>
                                {genero}
                            </option>
                        ))}
                    </select>
                    {errors.genero && (
                        <span className="text-danger">{errors.genero.message}</span>
                    )}
                </div>

                <div className="form-group">
                    <label className="text-black">Telefono</label>
                    <input
                        {...register("telefono")}
                        type="text"
                        className="form-control"
                        value={usuario?.telefono || ""}
                        maxLength={8}
                        onChange={({ target: { value } }) =>
                            setUsuario((prevUsuario) => ({ ...prevUsuario, telefono: value }))
                        }
                    />
                    {errors.telefono && (
                        <span className="text-danger">{errors.telefono.message}</span>
                    )}
                </div>

                <div className="form-group">
                    <label className="text-black">Fecha de Nacimiento:</label>
                    <input
                        {...register("fechaNacimiento")}
                        type="date"
                        className="form-control"
                        value={usuario?.fechaNacimiento || ""}
                        onChange={({ target: { value } }) =>
                            setUsuario((prevUsuario) => ({ ...prevUsuario, fechaNacimiento: value }))
                        }
                    />
                </div>

                <div className="form-group">
                    <label className="text-black">Carrera</label>
                    <input
                        {...register("carrera")}
                        type="text"
                        className="form-control"
                        value={usuario?.carrera || ""}
                        onChange={({ target: { value } }) =>
                            setUsuario((prevUsuario) => ({ ...prevUsuario, carrera: value }))
                        }
                    />
                    {errors.carrera && (
                        <span className="text-danger">{errors.carrera.message}</span>
                    )}
                </div>

                <div className="form-group">
                    <label className="text-black">Genero de Poesia</label>
                    <select
                        {...register("generoPoesia")}
                        className="form-select"
                        aria-label="Genero Poesia select"
                        value={usuario?.generoPoesia || ""}
                        onChange={({ target: { value } }) =>
                            setUsuario((prevUsuario) => ({ ...prevUsuario, generoPoesia: value }))
                        }
                    >
                        <option value="">Seleccione un Genero de Poesia</option>
                        {generoPoesiaOption.map((generoPoesia) => (
                            <option key={generoPoesia} value={generoPoesia}>
                                {generoPoesia}
                            </option>
                        ))}
                    </select>
                    {errors.generoPoesia && (
                        <span className="text-danger">{errors.generoPoesia.message}</span>
                    )}
                </div>

                <div className="form-group">
                    <label className="text-black">Correo</label>
                    <input
                        {...register("correo")}
                        type="email"
                        className="form-control"
                        value={usuario?.correo || ""}
                        onChange={({ target: { value } }) =>
                            setUsuario((prevUsuario) => ({ ...prevUsuario, correo: value }))
                        }
                    />
                    {errors.correo && (
                        <span className="text-danger">{errors.correo.message}</span>
                    )}
                </div>

                <div className="form-group">
                    <label className="text-black">Password</label>
                    <input
                        {...register("password")}
                        type="password"
                        className="form-control"
                        value={usuario?.password || ""}
                        onChange={({ target: { value } }) =>
                            setUsuario((prevUsuario) => ({ ...prevUsuario, password: value }))
                        }
                    />
                    {errors.password && (
                        <span className="text-danger">{errors.password.message}</span>
                    )}
                </div>

                <div className="form-group">
                    <label className="text-black">Imagen</label>
                    <input
                        {...register("img")}
                        type="text"
                        className="form-control"
                        value={usuario?.img || ""}
                        onChange={({ target: { value } }) =>
                            setUsuario((prevUsuario) => ({ ...prevUsuario, img: value }))
                        }
                    />
                    {errors.img && (
                        <span className="text-danger">{errors.img.message}</span>
                    )}
                </div>
                <br />

                <button type="submit" className="btn btn-success">
                    {titleButton}
                </button>

                {option === 1 && ( // Mostrar el botón de cancelar solo si la opción es 1
                    <button type="button" className="btn btn-danger mx-2" onClick={handleBack}>
                        Cancelar
                    </button>
                )}
            </form>
            <br /><br />
        </>
    );
};