import { ToastContainer } from "react-toastify";
import NavBar from "./NavBar";


type WrapperProps = {
    children : React.ReactNode
}


const Wrapper = ({children} : WrapperProps) => {
    return (
        <div>
            {/* Toast container */}
            <ToastContainer
                position="top-right"
                autoClose = {5000}
                hideProgressBar = {false}
                newestOnTop = {false}
                closeOnClick
                pauseOnHover
                draggable 
            />

            {/* Barre de navigation */}
            <NavBar/>


            {/* Contenu de la page */}

            <div className="px-5 md:px-[5%] mt-8 mb-10">
                {children}
            </div>

        </div>
    )
}

export default Wrapper;