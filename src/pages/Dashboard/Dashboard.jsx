import { useNavigate } from "react-router-dom";

function Dashboard(){
    const navigate = useNavigate();
    return (
        <div>
            <div className="flex flex-col justify-center items-center mt-10 mb-10 p-5">
                <h1 className="text-xl md:text-3xl font-bold">Admin Dashboard</h1>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 mt-10">
                    <button onClick={() => navigate("/admin/searchplayer")} className="w-[150px] h-[40px] bg-gray-200 hover:bg-gray-400 cursor-pointer rounded-md">Search Player</button>
                    <button onClick={() => navigate("/admin/tournamentcontrol")} className="w-[150px] h-[40px] bg-gray-200 hover:bg-gray-400 cursor-pointer rounded-md">Tournament Control</button>
                    <button onClick={() => navigate("/admin/aboutcontrol")} className="w-[150px] h-[40px] bg-gray-200 hover:bg-gray-400 cursor-pointer rounded-md">About Control</button>
                    <button onClick={() => navigate("/admin/newscontrol")} className="w-[150px] h-[40px] bg-gray-200 hover:bg-gray-400 cursor-pointer rounded-md">News Control</button>
                    <button onClick={() => navigate("/admin/livecontrol")} className="w-[150px] h-[40px] bg-gray-200 hover:bg-gray-400 cursor-pointer rounded-md">Live Control</button>
                    <button onClick={() => navigate("/admin/productcontrol")} className="w-[150px] h-[40px] bg-gray-200 hover:bg-gray-400 cursor-pointer rounded-md">Product Control</button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;