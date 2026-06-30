import { Outlet } from "react-router"
import Footer from "../Components/Shear/Footer"
import Navbar from "../Components/Shear/Navbar"


const Root = () => {
  return (
    <div>
       <Navbar />
       <Outlet />
       <Footer />
    </div>
  )
}

export default Root