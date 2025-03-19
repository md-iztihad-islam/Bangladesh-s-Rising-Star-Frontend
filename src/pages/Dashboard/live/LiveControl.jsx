import { useEffect, useState } from "react";
import { useCreateLiveMutation, useGetLiveQuery } from "../../../api/liveApi";
import { useNavigate } from "react-router-dom";

function LiveControl(){
    const navigate = useNavigate();
    const [tournamentName, setTournamentName] = useState('');
    const [team1, setTeam1] = useState('');
    const [team2, setTeam2] = useState('');
    const [venue, setVenue] = useState('');
    const [videoUrl, setVideoUrl] = useState('');

    const [createLive, {isSuccess, isError}] = useCreateLiveMutation();
    const {data: allLiveData, refetch} = useGetLiveQuery();

    const createLiveInputData = {
        tournamentName,
        team1,
        team2,
        venue,
        videoUrl
    };

    const handleCreate = async () => {
        createLive(createLiveInputData);
    };

    useEffect(() => {
        if(isSuccess){
            setTournamentName('');
            setTeam1('');
            setTeam2('');
            setVenue('');
            setVideoUrl('');

            refetch();
        };
        if(isError){
            alert("Error saving data");
        };
    }, [isSuccess, isError]);
    return (
        <div>
            <div className="flex flex-col justify-center items-center mt-10 mb-10 p-5 gap-5">
                <h1 className="text-xl md:text-3xl font-bold">Live Control</h1>
                <div>
                    <label>Tournament Name:</label>
                    <input value={tournamentName} onChange={(e) => setTournamentName(e.target.value)} className="w-[200px] md:w-[500px] bg-gray-200 border-1 rounded-md ml-5 p-2" type="text" placeholder="Tournament Name" />
                </div>

                <div>
                    <label>Team 1:</label>
                    <input value={team1} onChange={(e) => setTeam1(e.target.value)} className="w-[200px] md:w-[500px] bg-gray-200 border-1 rounded-md ml-5 p-2" type="text" placeholder="Team 1" />
                </div>

                <div>
                    <label>Team 2:</label>
                    <input value={team2} onChange={(e) => setTeam2(e.target.value)} className="w-[200px] md:w-[500px] bg-gray-200 border-1 rounded-md ml-5 p-2" type="text" placeholder="Team 2" />
                </div>

                <div>
                    <label>Venue:</label>
                    <input value={venue} onChange={(e) => setVenue(e.target.value)} className="w-[200px] md:w-[500px] bg-gray-200 border-1 rounded-md ml-5 p-2" type="text" placeholder="Venue" />
                </div>

                <div>
                    <label>Video Url:</label>
                    <input value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} className="w-[200px] md:w-[500px] bg-gray-200 border-1 rounded-md ml-5 p-2" type="text" placeholder="Video Url" />
                </div>

                <div className="flex gap-10">
                    <button onClick={handleCreate} className="w-[150px] h-[40px] bg-gray-200 hover:bg-gray-400 mt-10 rounded-md">Create</button>

                    <button onClick={() => navigate("/admin")} className="w-[150px] h-[40px] bg-gray-200 hover:bg-gray-400 mt-10 rounded-md">Back</button>

                </div>
            </div>
            <div>
                <ul className="list bg-base-100 rounded-box shadow-md">
  
                    <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">All lives</li>

                    <div>
                        {
                            allLiveData?.data.map((live, index) => (
                                <li className="list-row" key={live._id}>
                                    <div className="w-[100dvw]">
                                        <div>{live.tournamentName}</div>
                                        <div className="text-xs uppercase font-semibold opacity-60">{live.team1} vs {live.team2}</div>
                                    </div>
                                    <button onClick={() => navigate(`/admin/livecontrol/${live._id}`)} className="btn btn-square btn-ghost">Edit</button>
                                </li>
                            ))
                        }
                    </div>
                    
                    
                    
                </ul>
            </div>
        </div>
    );
};

export default LiveControl;