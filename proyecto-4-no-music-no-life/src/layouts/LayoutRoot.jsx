import { Outlet, useNavigation } from "react-router-dom"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import "./LayoutRoot.css"

const LayoutRoot = () => {
    const navigation = useNavigation()
    console.log(navigation)

    return ( 
        <>
            <Navbar />
            
                {
                    navigation.state === "loading" && (
                        <div>Loading</div>
                    )
                }
            <Footer/>
            <Outlet />
        </>
    )
}

export default LayoutRoot