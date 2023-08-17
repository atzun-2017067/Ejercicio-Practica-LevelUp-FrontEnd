import { Route, Routes } from 'react-router-dom'
import { Login } from './login/components/Login'
import { isAdmin, isUser } from '../src/login/helpers/loginHelpers'
import './login/login.css';

{/* ADMIN */ }
import { ListaUsuario } from './Administrador/usuario/components/ListaUsuario.jsx'
import { CrearUsuario } from './Administrador/usuario/components/CrearUsuario.jsx'

import { Principal } from './Administrador/Principal.jsx'
import { MiPerfil } from './Administrador/perfil/components/MiPerfil.jsx'


{/* USER */ }
import { PrincipalUsuario } from './Usuario/PrincipalUsuario.jsx'
import { MiPerfilUsuario } from './Usuario/perfil/components/MiPerfil.jsx'
import { CrearCuenta } from './Crear Cuenta/usuario/components/CrearCuenta.jsx'


export const AppRouter = () => {

  return (
    <>

      <Routes>
        {/* RUTAS SIN LOGUEARSE */}
        <Route path="/" element={<Login />} />
        <Route path="/crearCuenta" element={<CrearCuenta />} />


        {/* RUTAS PARA EL ADMINISTRADOR */}
        {isAdmin() && (
          <>
            {/* Vista Principal Admin */}
            <Route path="/vistaAdmin" element={<Principal />} />

            {/* Mi Perfil */}
            <Route path="/miPerfil" element={<MiPerfil />} />

            {/* Usuarios */}
            <Route path="/listaUsuarios" element={<ListaUsuario />} />
            <Route path="/crearUsuario" element={<CrearUsuario />} />
          </>
        )}

        {/* RUTAS PARA EL USUARIO */}
        {isUser() && (
          <>
            {/* Vista Principal del Usuario */}
            <Route path="/vistaUsuario" element={<PrincipalUsuario />} />

            {/* Mi Perfil */}
            <Route path="/miPerfilUsuario" element={<MiPerfilUsuario />} />
          </>
        )}

      </Routes>
    </>
  )
}