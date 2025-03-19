import { useNavigate, useParams } from "react-router-dom";
import { useDeleteLiveMutation, useGetLiveByIdQuery, useUpdateLiveMutation } from "../../../api/liveApi";
import { useEffect, useState } from "react";

function EditLive(){
    const params = useParams();
    const liveId = params.id;
    const navigate = useNavigate();

    const [tournamentName, setTournamentName] = useState('');
    const [team1, setTeam1] = useState('');
    const [team2, setTeam2] = useState('');
    const [venue, setVenue] = useState('');
    const [videoUrl, setVideoUrl] = useState('');

    const {data} = useGetLiveByIdQuery(liveId);

    const [updateLive, {isSuccess, isError}] = useUpdateLiveMutation();

    const [deleteLive, {isSuccess: deleteSuccess, isError: deleteError}] = useDeleteLiveMutation();

    const liveData = data?.data;

    useEffect(() => {
        if(data?.data){
            setTournamentName(data?.data.tournamentName);
            setTeam1(data?.data.team1);
            setTeam2(data?.data.team2);
            setVenue(data?.data.venue);
            setVideoUrl(data?.data.videoUrl);
        }
    }, [data]);

    const liveDataUpdate = {
        tournamentName,
        team1,
        team2,
        venue,
        videoUrl
    };

    const handleSave = async () => {
        await updateLive({id: liveId, liveData: liveDataUpdate});
    };

    useEffect(() => {
        if(isSuccess){
            alert("Data saved successfully");
        };
        if(isError){
            alert("Error saving data");
        };
    }, [isSuccess, isError]);

    const handleDelete = async () => {
        await deleteLive(liveId);
        navigate("/dashboard/livecontrol");
    };

    useEffect(() => {
        if(deleteSuccess){
            navigate("/dashboard/livecontrol");
        };
        if(deleteError){
            alert("Error deleting data");
        };
    }, [deleteSuccess, deleteError]);

    return(
        <div>
            <div className="flex flex-col justify-center items-center mt-10 mb-10 p-5 gap-5">
                <h1 className="text-xl md:text-3xl font-bold">Edit Live</h1>
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
                    <button onClick={handleSave} className="w-[150px] h-[40px] bg-gray-200 hover:bg-gray-400 mt-10 rounded-md">Save</button>
                    <button onClick={handleDelete} className="w-[150px] h-[40px] bg-gray-200 hover:bg-gray-400 mt-10 rounded-md">Delete</button>
                    <button onClick={() => navigate("/admin/livecontrol")} className="w-[150px] h-[40px] bg-gray-200 hover:bg-gray-400 mt-10 rounded-md">Back</button>
                </div>
            </div>
        </div>
    );
};

export default EditLive;