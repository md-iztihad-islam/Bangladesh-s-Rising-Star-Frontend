import { useNavigate, useParams } from "react-router-dom";
import { useGetTournamentByIdQuery } from "../../api/tournamentApi";

function PointTable(){
    const navigate = useNavigate();
    const params = useParams();
    const {tournamentId} = params;

    const {data} = useGetTournamentByIdQuery(tournamentId);
    const tournamentData = data?.data;

    // Sort teams by points first, then goal difference if points are the same
    const sortedTeams = tournamentData?.teams?.slice().sort((a, b) => {
        if (b.points !== a.points) {
            return b.points - a.points; // Higher points first
        }
        return b.goalsDifference - a.goalsDifference; // If points are same, sort by GD
    }) || [];

    // Separate teams into Group A and Group B
    const groupATeams = sortedTeams.filter(team => team.teamGroup === "1");
    const groupBTeams = sortedTeams.filter(team => team.teamGroup === "2");

    return(
        <div>
            <div className="flex flex-col mb-10 justify-center items-center mt-10">
                <h1 className="text-xl md:text-3xl font-bold">Standings of Teams in Tournaments</h1>
                <div className="flex flex-col justify-center items-center">
                    <div id="groupA" className="flex flex-col gap-5 mt-5">
                        <h2 className="text-lg font-bold">Group 01</h2>
                        <div className="overflow-x-auto w-screen rounded-box border border-base-content/5 bg-base-100">
                            <table className="table text-xs md:text-md">
                                {/* head */}
                                <thead>
                                <tr className="text-xs md:text-md">
                                    <th>Position</th>
                                    <th>Team</th>
                                    <th>GS</th>
                                    <th>GC</th>
                                    <th>GD</th>
                                    <th>Points</th>
                                </tr>
                                </thead>
                                <tbody>
                                    {
                                        groupATeams?.map((team, index) => (
                                            <tr key={team._id} className="text-xs md:text-md">
                                                <th>{index+1}</th>
                                                <td>{team?.teamName}</td>
                                                <td>{team?.goalsScored}</td>
                                                <td>{team?.goalsConceded}</td>
                                                <td>{team?.goalsDifference}</td>
                                                <td>{team?.points}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div id="groupB" className="flex flex-col gap-5 mt-5">
                        <h2 className="text-lg font-bold">Group 02</h2>
                        <div className="overflow-x-auto w-screen rounded-box border border-base-content/5 bg-base-100">
                            <table className="table text-xs md:text-md">
                                {/* head */}
                                <thead>
                                <tr className="text-xs md:text-md">
                                    <th>Position</th>
                                    <th>Team</th>
                                    <th>GS</th>
                                    <th>GC</th>
                                    <th>GD</th>
                                    <th>Points</th>
                                </tr>
                                </thead>
                                <tbody>
                                    {
                                        groupBTeams?.map((team, index) => (
                                            <tr key={team._id} className="text-xs md:text-md">
                                                <th>{index+1}</th>
                                                <td>{team?.teamName}</td>
                                                <td>{team?.goalsScored}</td>
                                                <td>{team?.goalsConceded}</td>
                                                <td>{team?.goalsDifference}</td>
                                                <td>{team?.points}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    
                </div>

                <div>
                    <button onClick={() => navigate(`/standings`)} className="w-[150px] h-[40px] bg-gray-200 hover:bg-gray-400 mt-10 rounded-md">Back</button>
                </div>
            </div>
        </div>
    );
};

export default PointTable;