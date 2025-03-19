import { useNavigate, useParams } from "react-router-dom";
import { useGetMatchByIdQuery, useGetTeamByIdQuery, useUpdateMatchMutation, useUpdateTeamMutation } from "../../../api/tournamentApi";
import { useEffect, useState } from "react";

function UpdateMatch(){
    const navigate = useNavigate();
    const params = useParams();

    const { tournamentId, teamId } = params;

    const [matchPlayed, setMatchPlayed] = useState(0);
    const [matchWon, setMatchWon] = useState(0);
    const [matchLost, setMatchLost] = useState(0);
    const [matchDraw, setMatchDraw] = useState(0);
    const [goalsScored, setGoalsScored] = useState(0);
    const [goalsConceded, setGoalsConceded] = useState(0);
    const [goalsDifference, setGoalsDifference] = useState(0);
    const [points, setPoints] = useState(0);

    const {data, refetch} = useGetTeamByIdQuery({tournamentId, teamId});
    const teamData = data?.data;

    const [updateTeam, {isSuccess, isError}] = useUpdateTeamMutation();

    useEffect(() => {
        if(teamData){
            setMatchPlayed(teamData.matchPlayed);
            setMatchWon(teamData.matchWon);
            setMatchLost(teamData.matchLost);
            setMatchDraw(teamData.matchDraw);
            setGoalsScored(teamData.goalsScored);
            setGoalsConceded(teamData.goalsConceded);
            setGoalsDifference(teamData.goalsDifference);
            setPoints(teamData.points);
        }
    }, [teamData]);

    const teamObject = {
        matchPlayed,
        matchWon,
        matchLost,
        matchDraw,
        goalsScored,
        goalsConceded,
        goalsDifference,
        points
    };

    const updateHandler = async () => {
        await updateTeam({ tournamentId, teamId, teamObject });
        navigate(`/admin/tournamentcontrol/addteam/${tournamentId}`);
    };

    useEffect(() => {
        if(isSuccess){
            refetch();
        }
        if(isError){
            alert("Update Failed");
        }
    }, [isSuccess, isError]);

    return (
        <div>
            <div className="flex flex-col justify-center items-center mt-10 mb-10 p-5">
                <h1 className="text-xl md:text-3xl font-bold">Update Match</h1>
                <div className="flex flex-col gap-5 mt-5 mb-5">
                    <div className="flex flex-col gap-5 mt-5">
                        <label>Match Played:</label>
                        <input value={matchPlayed} onChange={(e) => setMatchPlayed(e.target.value)} type="number" className="w-[300px] md:w-[600px] border-1 border-gray-300 rounded-md p-2" />
                    </div>

                    <div className="flex flex-col gap-5 mt-5">
                        <label>Match Won:</label>
                        <input value={matchWon} onChange={(e) => setMatchWon(e.target.value)} type="number" className="w-[300px] md:w-[600px] border-1 border-gray-300 rounded-md p-2" />
                    </div>

                    <div className="flex flex-col gap-5 mt-5">
                        <label>Match Lost:</label>
                        <input value={matchLost} onChange={(e) => setMatchLost(e.target.value)} type="number" className="w-[300px] md:w-[600px] border-1 border-gray-300 rounded-md p-2" />
                    </div>

                    <div className="flex flex-col gap-5 mt-5">
                        <label>Match Draw:</label>
                        <input value={matchDraw} onChange={(e) => setMatchDraw(e.target.value)} type="number" className="w-[300px] md:w-[600px] border-1 border-gray-300 rounded-md p-2" />
                    </div>

                    <div className="flex flex-col gap-5 mt-5">
                        <label>Goal Scored:</label>
                        <input value={goalsScored} onChange={(e) => setGoalsScored(e.target.value)} type="number" className="w-[300px] md:w-[600px] border-1 border-gray-300 rounded-md p-2" />
                    </div>

                    <div className="flex flex-col gap-5 mt-5">
                        <label>Goal Conceded:</label>
                        <input value={goalsConceded} onChange={(e) => setGoalsConceded(e.target.value)} type="number" className="w-[300px] md:w-[600px] border-1 border-gray-300 rounded-md p-2" />
                    </div>

                    <div className="flex flex-col gap-5 mt-5">
                        <label>Goal Difference:</label>
                        <input value={goalsDifference} onChange={(e) => setGoalsDifference(e.target.value)} type="number" className="w-[300px] md:w-[600px] border-1 border-gray-300 rounded-md p-2" />
                    </div>

                    <div className="flex flex-col gap-5 mt-5">
                        <label>Points:</label>
                        <input value={points} onChange={(e) => setPoints(e.target.value)} type="number" className="w-[300px] md:w-[600px] border-1 border-gray-300 rounded-md p-2" />
                    </div>
                </div>

                

                <div className="flex gap-5 mt-5">
                    <button onClick={updateHandler}  className="w-[150px] h-[40px] bg-gray-200 hover:bg-gray-400 mt-10 rounded-md">Update</button>
                    <button onClick={() => navigate(`/admin/tournamentcontrol/addteam/${tournamentId}`)} className="w-[150px] h-[40px] bg-gray-200 hover:bg-gray-400 mt-10 rounded-md">Back</button>
                </div>


            </div>
        </div>
    )
};

export default UpdateMatch;