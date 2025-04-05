import { useNavigate, useParams } from "react-router-dom";
import { useGetMatchByIdQuery, useUpdateMatchMutation } from "../../../api/tournamentApi";
import { useEffect, useState } from "react";
import { form } from "motion/react-client";

function UpdateMatch(){
    const navigate = useNavigate();
    const params = useParams();

    const [matchNo, setMatchNo] = useState("");
    const [matchDate, setMatchDate] = useState("");
    const [matchTime, setMatchTime] = useState("");
    const [matchVenue, setMatchVenue] = useState("");
    const [matchTeam1, setMatchTeam1] = useState("");
    const [matchTeam2, setMatchTeam2] = useState("");
    const [matchTeam1Logo, setMatchTeam1Logo] = useState("");
    const [matchTeam2Logo, setMatchTeam2Logo] = useState("");
    const [isPlayed, setIsPlayed] = useState(false);
    const [team01Goal, setTeam01Goal] = useState(0);
    const [team02Goal, setTeam02Goal] = useState(0);
    const [videoUrl, setVideoUrl] = useState("");
    const [stage, setStage] = useState("");

    const { tournamentId, matchId } = params;

    const {data, refetch} = useGetMatchByIdQuery({tournamentId, matchId});

    const [updateMatch, {isSuccess, isError}] = useUpdateMatchMutation();

    const onChangeHandler01 = (event) => {
        const file = event.target.files?.[0];
        if(file){
            setMatchTeam1Logo(file);
        }
    };

    const onChangeHandler02 = (event) => {
        const file = event.target.files?.[0];
        if(file){
            setMatchTeam2Logo(file);
        }
    };

    const matchData = data?.data;

    useEffect(() => {
        if(matchData){
            setMatchNo(matchData.matchNo);
            setMatchDate(matchData.matchDate);
            setMatchTime(matchData.matchTime);
            setMatchVenue(matchData.matchVenue);
            setMatchTeam1(matchData.matchTeam1);
            setMatchTeam2(matchData.matchTeam2);
            setIsPlayed(matchData.isPlayed || false);
            setTeam01Goal(matchData.team01Goal || 0);
            setTeam02Goal(matchData.team02Goal || 0);
            setVideoUrl(matchData.videoUrl || "");
            setStage(matchData.stage || "");

            // If matchTeam1Logo is a URL, store it separately
            if (typeof matchData.matchTeam1Logo === "string") {
                setMatchTeam1Logo(matchData.matchTeam1Logo); // Keep URL for preview
            }
            if (typeof matchData.matchTeam2Logo === "string") {
                setMatchTeam2Logo(matchData.matchTeam2Logo);
            }
            }
    }, [matchData]);


    const updateHandler = async () => {
        const formData = new FormData();
        formData.append("matchNo", matchNo);
        formData.append("matchDate", matchDate);
        formData.append("matchTime", matchTime);
        formData.append("matchVenue", matchVenue);
        formData.append("matchTeam1", matchTeam1);
        formData.append("matchTeam1Logo", matchTeam1Logo);
        formData.append("matchTeam2", matchTeam2);
        formData.append("matchTeam2Logo", matchTeam2Logo);
        formData.append("isPlayed", isPlayed);
        formData.append("team01Goal", team01Goal);
        formData.append("team02Goal", team02Goal);
        formData.append("videoUrl", videoUrl);
        formData.append("stage", stage);

        await updateMatch({tournamentId, matchId, matchData: formData});
    };

    useEffect(() => {
        if(isSuccess){
            navigate(`/admin/tournamentcontrol/addmatch/${tournamentId}`);
            refetch();
        }
        if(isError){
            alert("Match Update Failed");
        }
    }, [isSuccess, isError]);
    return (
        <div>
            <div className="flex flex-col justify-center items-center mt-10 mb-10 p-5">
                <h1 className="text-xl md:text-3xl font-bold">Update Match</h1>
                <div className="flex flex-col gap-5 mt-5 mb-5">
                    <div className="flex flex-col gap-5 mt-5">
                        <label>Match No:</label>
                        <input value={matchNo} onChange={(e) => setMatchNo(e.target.value)} type="text" className="w-[300px] md:w-[600px] border-1 border-gray-300 rounded-md p-2" />
                    </div>

                    <div className="flex flex-col gap-5 mt-5">
                        <label>Match Date:</label>
                        <input value={matchDate} onChange={(e) => setMatchDate(e.target.value)} type="date" className="w-[300px] md:w-[600px] border-1 border-gray-300 rounded-md p-2" />
                    </div>

                    <div className="flex flex-col gap-5 mt-5">
                        <label>Match Time:</label>
                        <input value={matchTime} onChange={(e) => setMatchTime(e.target.value)} type="time" className="w-[300px] md:w-[600px] border-1 border-gray-300 rounded-md p-2" />
                    </div>

                    <div className="flex flex-col gap-5 mt-5">
                        <label>Match Venue:</label>
                        <input value={matchVenue} onChange={(e) => setMatchVenue(e.target.value)} type="text" className="w-[300px] md:w-[600px] border-1 border-gray-300 rounded-md p-2" />
                    </div>

                    <div className="flex flex-col gap-5 mt-5">
                        <label>Team 01:</label>
                        <input value={matchTeam1} onChange={(e) => setMatchTeam1(e.target.value)} type="text" className="w-[300px] md:w-[600px] border-1 border-gray-300 rounded-md p-2" />
                    </div>

                    <div className="flex flex-col gap-5 mt-5">
                        <label>Team-01 Logo:</label>
                        <input onChange={onChangeHandler01} type="file" className="w-[300px] md:w-[600px] border-1 border-gray-300 rounded-md p-2" />
                    </div>

                    <div className="flex flex-col gap-5 mt-5">
                        <label>Team 02:</label>
                        <input value={matchTeam2} onChange={(e) => setMatchTeam2(e.target.value)} type="text" className="w-[300px] md:w-[600px] border-1 border-gray-300 rounded-md p-2" />
                    </div>

                    <div className="flex flex-col gap-5 mt-5">
                        <label>Team-02 Logo:</label>
                        <input onChange={onChangeHandler02} type="file" className="w-[300px] md:w-[600px] border-1 border-gray-300 rounded-md p-2" />
                    </div>

                    <div className="flex flex-col gap-5 mt-5">
                        <label>Stage:</label>
                        <input value={stage} onChange={(e) => setStage(e.target.value)} type="text" placeholder="Group/QF/Semi/Final" className="w-[300px] md:w-[600px] border-1 border-gray-300 rounded-md p-2" />
                    </div>

                    <div className="flex flex-col gap-5 mt-5">
                        <label>Is Played</label>
                        <select value={isPlayed} onChange={(e) => setIsPlayed(JSON.parse(e.target.value))} className="select select-info">
                            <option value="" disabled={true}>Choose one</option>
                            <option value={true}>YES</option>
                            <option value={false}>NO</option>
                        </select>
                    </div>

                    <div className="flex flex-col gap-5 mt-5">
                        <label>Team 01 Goal:</label>
                        <input value={team01Goal} onChange={(e) => setTeam01Goal(e.target.value)} type="number" className="w-[300px] md:w-[600px] border-1 border-gray-300 rounded-md p-2" />
                    </div>

                    <div className="flex flex-col gap-5 mt-5">
                        <label>Team 02 Goal:</label>
                        <input value={team02Goal} onChange={(e) => setTeam02Goal(e.target.value)} type="number" className="w-[300px] md:w-[600px] border-1 border-gray-300 rounded-md p-2" />
                    </div>

                    <div className="flex flex-col gap-5 mt-5">
                        <label>Highlight Link:</label>
                        <input value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} type="text" className="w-[300px] md:w-[600px] border-1 border-gray-300 rounded-md p-2" />
                    </div>
                </div>

                

                <div className="flex gap-5 mt-5">
                    <button onClick={updateHandler} className="w-[150px] h-[40px] bg-gray-200 hover:bg-gray-400 mt-10 rounded-md">Update</button>
                    <button onClick={() => navigate(`/admin/tournamentcontrol/addmatch/${tournamentId}`)} className="w-[150px] h-[40px] bg-gray-200 hover:bg-gray-400 mt-10 rounded-md">Back</button>
                </div>


            </div>
        </div>
    )
};

export default UpdateMatch;