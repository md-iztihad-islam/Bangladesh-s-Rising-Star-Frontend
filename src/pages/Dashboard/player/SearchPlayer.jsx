import { useEffect, useState } from "react";
import { useSearchPlayerQuery } from "../../../api/authApi";
import { useNavigate } from "react-router-dom";

function SearchPlayer() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [playerData, setPlayerData] = useState({});

    const {data} = useSearchPlayerQuery(email, {skip: email === ""});


    const searchHandler = async () => {
        setPlayerData(data?.data);
    };

  return (
    <div>
        <div className="flex flex-col justify-center items-center mt-10 mb-10 p-5 gap-5">
            <h1 className="text-xl md:text-3xl font-bold">Search Player</h1>
            <div className="flex flex-col gap-10">
                <div className="flex gap-10">
                    <label>Email of the player:</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Search Player" className="w-[300px] md:w-[600px] bg-gray-200 border-1 rounded-md p-2"/>
                </div>
                <div>
                    <button onClick={searchHandler} className="w-[150px] h-[40px] bg-gray-200 hover:bg-gray-400 rounded-md">Search</button>
                </div>
                <div>
                    <h1><pre>Player Name: {playerData.name}</pre></h1>
                    <button onClick={() => navigate(`/admin/searchplayer/${email}`)} className="w-[150px] h-[40px] bg-gray-200 hover:bg-gray-400 rounded-md">View Profile</button>
                    <button onClick={() => navigate(`/admin`)} className="w-[150px] h-[40px] bg-gray-200 hover:bg-gray-400 rounded-md ml-10">Back</button>
                </div>
            </div>
        </div>
    </div>
  );
};

export default SearchPlayer;