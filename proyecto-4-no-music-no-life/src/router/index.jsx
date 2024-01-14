import { createBrowserRouter } from "react-router-dom"
import Home from "../pages/Home.jsx"
import Perfil from "../pages/Perfil.jsx"
import Contacto from "../pages/Contacto.jsx"
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
                path:"/contacto",
                element: <Contacto />
            },
            {
                path:"/perfil",
                element: <Perfil />
            }]
    }
])