import { createBrowserRouter } from "react-router-dom"
import Home from "../pages/Home.jsx"
import Perfil from "../pages/Perfil.jsx"
import Contacto from "../pages/Contacto.jsx"
import Registro from "../pages/Registro.jsx"
import Login from "../pages/Login.jsx"
import LayoutRoot from "../layouts/LayoutRoot.jsx"

export const router = createBrowserRouter([
    {
        path:"/",
        element: <LayoutRoot />,
        children:[
            {
                path:"/",
                element: <Home />
            },
            {
                path:"/login",
                element: <Login />
            },
            {
                path:"/contacto",
                element: <Contacto />
            },
            {
                path:"/registro",
                element: <Registro />
            },
            {
                path:"/perfil",
                element: <Perfil />
            },
            ]
    }
])