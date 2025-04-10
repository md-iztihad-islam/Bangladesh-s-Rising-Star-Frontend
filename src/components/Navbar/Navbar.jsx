import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Navbar(){
    const navigate = useNavigate();
    const user = useSelector(state => state.auth.user);

    const closeDrawer = () => {
        document.getElementById("my-drawer-2").checked = false;
    };
    return(
        <div className="w-full flex flex-col justify-center items-center text-black">
            <div id="upperPart" className="w-full flex justify-between items-center p-5 border-b-2">

                <div>
                    <img src="/bff.jpg" alt="" className='h-[60px]' />
                </div>


                <div id="logo" className="flex flex-col justify-center items-center">
                    <div className='flex cursor-pointer' onClick={() => navigate("/")}>
                        <p className='text-xl md:text-4xl text-red-600 font-bold'><span className='text-3xl md:text-7xl text-green-600 font-bold'>B</span>angladesh's Rising Star</p>
                    </div>
                </div>

                <div id="registration" className='flex flex-col gap-5'>
                    <button onClick={() => navigate("/register")} className="btn btn-xs sm:btn-sm">Register</button>
                    {
                        user?.role === "admin" && (
                            <button onClick={() => navigate("/admin")} className="btn btn-xs sm:btn-sm">Dashboard</button>
                        )
                    }


                    {/* mobile menu */}

                    <div className="drawer lg:drawer-open md:hidden">
                        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                        <div className="drawer-content flex flex-col items-center justify-center">
                            {/* Page content here */}
                            <label htmlFor="my-drawer-2" className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl drawer-button md:hidden">
                                Menu
                            </label>
                        </div>
                        <div className="drawer-side z-20">
                            <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                            <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4" onClick={closeDrawer}>
                            {/* Sidebar content here */}
                                <li>
                                    <button onClick={() => navigate("/")} className="btn btn-ghost sm:btn-sm md:btn-md lg:btn-lg text-black hover:bg-gray-300">Home</button>
                                </li>
                                <li>
                                    <button onClick={() => navigate("/news")} className="btn btn-ghost sm:btn-sm md:btn-md lg:btn-lg text-black hover:bg-gray-300">News</button>
                                </li>
                                <li>
                                    <button onClick={() => navigate("/about")} className="btn btn-ghost sm:btn-sm md:btn-md lg:btn-lg text-black hover:bg-gray-300">Tournament</button>
                                </li>
                                <li>
                                    <button onClick={() => navigate("/fixture")} className="btn btn-ghost sm:btn-sm md:btn-md lg:btn-lg text-black hover:bg-gray-300">Fixture</button>
                                </li>
                                <li>
                                    <button onClick={() => navigate("/teams")} className="btn btn-ghost sm:btn-sm md:btn-md lg:btn-lg text-black hover:bg-gray-300">Teams</button>
                                </li>
                                <li>
                                    <button onClick={() => navigate("/venue")} className="btn btn-ghost sm:btn-sm md:btn-md lg:btn-lg text-black hover:bg-gray-300">Venue</button>
                                </li>
                                <li>
                                    <button onClick={() => navigate("/live")} className="btn btn-ghost sm:btn-sm md:btn-md lg:btn-lg text-black hover:bg-gray-300">Watch Live</button>  
                                </li>
                                <li>
                                    <button onClick={() => navigate("/store")} className="btn btn-ghost sm:btn-sm md:btn-md lg:btn-lg text-black hover:bg-gray-300">Store</button>
                                </li>
                                <li>
                                    <button onClick={() => navigate("/standings")} className="btn btn-ghost sm:btn-sm md:btn-md lg:btn-lg text-black hover:bg-gray-300">Standings</button>
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


            {/* Desktop menu */}

            <div id="lowerPart" className="w-full hidden h-[50px] md:flex flex-wrap justify-around items-center pl-5 pr-5 md:pl-5 md:pr-5 bg-[#d54ee1] text-white">
                <button onClick={() => navigate("/")} className="btn btn-ghost sm:btn-sm md:btn-md lg:btn-lg  ">Home</button>
                <button onClick={() => navigate("/news")} className="btn btn-ghost sm:btn-sm md:btn-md lg:btn-lg  ">News</button>
                <button onClick={() => navigate("/about")} className="btn btn-ghost sm:btn-sm md:btn-md lg:btn-lg ">Tournament</button>
                <button onClick={() => navigate("/fixture")} className="btn btn-ghost sm:btn-sm md:btn-md lg:btn-lg ">Fixture</button>
                <button onClick={() => navigate("/teams")} className="btn btn-ghost sm:btn-sm md:btn-md lg:btn-lg ">Teams</button>
                <button onClick={() => navigate("/venue")} className="btn btn-ghost sm:btn-sm md:btn-md lg:btn-lg ">Venue</button>
                <button onClick={() => navigate("/live")} className="btn btn-ghost sm:btn-sm md:btn-md lg:btn-lg  ">Watch Live</button>
                <button onClick={() => navigate("/store")} className="btn btn-ghost sm:btn-sm md:btn-md lg:btn-lg ">Store</button>
                <button onClick={() => navigate("/standings")} className="btn btn-ghost sm:btn-sm md:btn-md lg:btn-lg ">Standings</button>
                {
                    user ? (
                        <button onClick={() => navigate("/profile")} className="btn btn-ghost sm:btn-sm md:btn-md lg:btn-lg ">Profile</button>
                    ) : (
                        <button onClick={() => navigate("/signin")} className="btn btn-ghost sm:btn-sm md:btn-md lg:btn-lg ">Sign in</button>
                    )
                }
            </div>
        </div>
    );
}

export default Navbar;