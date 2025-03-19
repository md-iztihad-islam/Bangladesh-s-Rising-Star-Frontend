import { Outlet } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";

function MainLayout(){
    return(
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="min-h-[400px]">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default MainLayout;