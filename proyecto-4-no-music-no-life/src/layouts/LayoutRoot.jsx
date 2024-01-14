import { Outlet, useNavigation } from "react-router-dom"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

const LayoutRoot = () => {
    const navigation = useNavigation()
    console.log(navigation)

    // estructura de la página
    return (
        <div>
            <Navbar />
            <div>
                {
                    navigation.state === "loading" && (
                        <div>Loading</div>
                    )
                }
            </div>
            <Outlet />
            <Footer/>
        </div>
    )
}

export default LayoutRoot