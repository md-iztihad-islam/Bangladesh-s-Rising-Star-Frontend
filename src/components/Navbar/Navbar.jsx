import { useNavigate } from 'react-router-dom';
import './Navbar.css';
import { useSelector } from 'react-redux';

function Navbar(){
    const navigate = useNavigate();
    const user = useSelector(state => state.auth.user);

    const closeDrawer = () => {
        document.getElementById("my-drawer-2").checked = false;
    };
    return(
        <div className="w-full flex flex-col justify-center items-center text-black">
            <div id="upperPart" className="w-full flex justify-between items-center p-5">
                <div id="logo" className="flex flex-col justify-center items-center">
                    <div className='flex ' onClick={() => navigate("/")}>
                        <p className='text-xl md:text-4xl text-red-600 font-bold'><span className='text-3xl md:text-7xl text-green-600 font-bold'>B</span>angladesh's Rising Star</p>
                    </div>
                </div>

                <div id="registration" className='flex gap-5'>
                    <button onClick={() => navigate("/register")} className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl">Register</button>
                    {
                        user?.role === "admin" && (
                            <button onClick={() => navigate("/admin")} className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl">Dashboard</button>
                        )
                    }

                    <div className="drawer lg:drawer-open md:hidden">
                        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                        <div className="drawer-content flex flex-col items-center justify-center">
                            {/* Page content here */}
                            <label htmlFor="my-drawer-2" className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl drawer-button md:hidden">
                                Menu
                            </label>
                        </div>
                        <div className="drawer-side">
                            <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                            <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4" onClick={closeDrawer}>
                            {/* Sidebar content here */}
                                <li>
                                    <button onClick={() => navigate("/")} className="btn btn-ghost sm:btn-sm md:btn-md lg:btn-lg text-black hover:bg-gray-300">Home</button>
                                </li>
                                <li>
                                    <button onClick={() => navigate("/about")} className="btn btn-ghost sm:btn-sm md:btn-md lg:btn-lg text-black hover:bg-gray-300">About</button>
                                </li>
                                <li>
                                    <button onClick={() => navigate("/live")} className="btn btn-ghost sm:btn-sm md:btn-md lg:btn-lg text-black hover:bg-gray-300">Watch Live</button>  
                                </li>
                                <li>
                                    <button onClick={() => navigate("/highlights")} className="btn btn-ghost sm:btn-sm md:btn-md lg:btn-lg text-black hover:bg-gray-300">Highlights</button>
                                </li>
                                <li>
                                    <button onClick={() => navigate("/store")} className="btn btn-ghost sm:btn-sm md:btn-md lg:btn-lg text-black hover:bg-gray-300">Store</button>
                                </li>
                                <li>
                                    <button onClick={() => navigate("/standings")} className="btn btn-ghost sm:btn-sm md:btn-md lg:btn-lg text-black hover:bg-gray-300">Standings</button>
                                </li>
                                <li>
                                    <button onClick={() => navigate("/tournament")} className="btn btn-ghost sm:btn-sm md:btn-md lg:btn-lg text-black hover:bg-gray-300">Tournament</button>
                                </li>
                                <li>
                                    {
                                        user ? (
                                            <button onClick={() => navigate("/profile")} className="btn btn-ghost sm:btn-sm md:btn-md lg:btn-lg text-black hover:bg-gray-300">Profile</button>
                                        ) : (
                                            <button onClick={() => navigate("/signin")} className="btn btn-ghost sm:btn-sm md:btn-md lg:btn-lg text-black hover:bg-gray-300">Sign in</button>
                                        )
                                    }
                                </li>
                            </ul>
                        </div>
                    </div>

                </div>
            </div>


            <div id="lowerPart" className="w-full hidden h-[50px] text-black md:flex flex-wrap justify-around items-center pl-5 pr-5 md:pl-5 md:pr-5 bg-gray-500">
                <button onClick={() => navigate("/")} className="btn btn-ghost sm:btn-sm md:btn-md lg:btn-lg text-black hover:bg-gray-300">Home</button>
                <button onClick={() => navigate("/about")} className="btn btn-ghost sm:btn-sm md:btn-md lg:btn-lg text-black hover:bg-gray-300">About</button>
                <button onClick={() => navigate("/live")} className="btn btn-ghost sm:btn-sm md:btn-md lg:btn-lg text-black hover:bg-gray-300">Watch Live</button>
                <button onClick={() => navigate("/highlights")} className="btn btn-ghost sm:btn-sm md:btn-md lg:btn-lg text-black hover:bg-gray-300">Highlights</button>
                <button onClick={() => navigate("/store")} className="btn btn-ghost sm:btn-sm md:btn-md lg:btn-lg text-black hover:bg-gray-300">Store</button>
                <button onClick={() => navigate("/standings")} className="btn btn-ghost sm:btn-sm md:btn-md lg:btn-lg text-black hover:bg-gray-300">Standings</button>
                <button onClick={() => navigate("/tournament")} className="btn btn-ghost sm:btn-sm md:btn-md lg:btn-lg text-black hover:bg-gray-300">Tournament</button>
                {
                    user ? (
                        <button onClick={() => navigate("/profile")} className="btn btn-ghost sm:btn-sm md:btn-md lg:btn-lg text-black hover:bg-gray-300">Profile</button>
                    ) : (
                        <button onClick={() => navigate("/signin")} className="btn btn-ghost sm:btn-sm md:btn-md lg:btn-lg text-black hover:bg-gray-300">Sign in</button>
                    )
                }
            </div>
        </div>
    );
}

export default Navbar;