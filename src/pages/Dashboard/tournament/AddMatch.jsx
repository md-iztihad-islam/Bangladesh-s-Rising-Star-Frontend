import { use, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAddmatchMutation, useAddPlayerMutation, useGetMatchByTournamentQuery, useGetTeamQuery, useTeamPlayerQuery } from "../../../api/tournamentApi";

function AddMatch(){
    const navigate = useNavigate();
    const params = useParams();
    const tournamentId = params.tournamentId;

    const [matchNo, setMatchNo] = useState("");
    const [matchDate, setMatchDate] = useState("");
    const [matchTime, setMatchTime] = useState("");
    const [matchVenue, setMatchVenue] = useState("");
    const [matchTeam1, setMatchTeam1] = useState("");
    const [matchTeam2, setMatchTeam2] = useState("");
    const [stage, setStage] = useState("");

    const matchData = {
        matchNo,
        matchDate,
        matchTime,
        matchVenue,
        matchTeam1,
        matchTeam2,
        stage,
    };

    const {data, refetch} = useGetMatchByTournamentQuery(tournamentId);
    const matchList = data?.data;

    const [addMatch, {isSuccess, isError}] = useAddmatchMutation();

    const addHandler = async () => {
        await addMatch({ tournamentId, matchData });
    };
    useEffect(() => {
        if(isSuccess){
            setMatchNo("");
            setMatchDate("");
            setMatchTime("");
            setMatchVenue("");
            setMatchTeam1("");
            setMatchTeam2("");
            refetch();
        }
        if(isError){
            alert("Error Occured");
        }
    }, [isSuccess, isError]);

    
    
    return (
        <div>
            <div className="flex flex-col justify-center items-center mt-10 mb-10 p-5">
                <h1 className="text-xl md:text-3xl font-bold">Add Match</h1>
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
                        <label>Team 02:</label>
                        <input value={matchTeam2} onChange={(e) => setMatchTeam2(e.target.value)} type="text" className="w-[300px] md:w-[600px] border-1 border-gray-300 rounded-md p-2" />
                    </div>

                    <div className="flex flex-col gap-5 mt-5">
                        <label>Stage:</label>
                        <input value={stage} onChange={(e) => setStage(e.target.value)} type="text" className="w-[300px] md:w-[600px] border-1 border-gray-300 rounded-md p-2" />
                    </div>
                </div>

                <div className="flex gap-5 mt-5">
                    <button onClick={addHandler} className="w-[150px] h-[40px] bg-gray-200 hover:bg-gray-400 mt-10 rounded-md">Add</button>
                    <button onClick={() => navigate(`/admin/tournamentcontrol`)} className="w-[150px] h-[40px] bg-gray-200 hover:bg-gray-400 mt-10 rounded-md">Back</button>
                </div>


            </div>



            <div>
                <div className="overflow-x-auto p-10">
                    <table className="table">
                        {/* head */}
                        <thead>
                        <tr>
                            <th></th>
                            <th>Team 01</th>
                            <th>Team 02</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Venue</th>
                            <th>Stage</th>
                            <th>Score</th>
                            <th>Update</th>
                        </tr>
                        </thead>
                        <tbody>
                            {
                                matchList?.map((match, index) => (
                                    <tr key={match._id}>
                                        <th>{index + 1}</th>
                                        <td>{match.matchTeam1}</td>
                                        <td>{match.matchTeam2}</td>
                                        <td>{match.matchDate}</td>
                                        <td>{match.matchTime}</td>
                                        <td>{match.matchVenue}</td>
                                        <td>{match.stage}</td>
                                        <td>
                                            {
                                                !match.isPlayed ? ("Yet to Play") : (match.team01Goal + " - " + match.team02Goal)    
                                            }
                                        </td>
                                        <td>
                                            <button onClick={() => navigate(`/admin/tournamentcontrol/addmatch/${tournamentId}/${match._id}`)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Update</button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
};

export default AddMatch;