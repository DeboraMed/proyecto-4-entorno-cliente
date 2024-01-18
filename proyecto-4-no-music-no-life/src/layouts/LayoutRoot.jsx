import { Outlet, useNavigation } from "react-router-dom"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import "./LayoutRoot.css"

const LayoutRoot = () => {
    const navigation = useNavigation()
    console.log(navigation)

    // estructura de la página
    return ( 
        <>
            <Navbar />
            
                {
                    navigation.state === "loading" && (
                        <div>Loading</div>
                    )
                }
            
            <Outlet />
            <Footer/>
        </>
    )
}

export default LayoutRoot