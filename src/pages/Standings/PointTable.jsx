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

    return(
        <div>
            <div className="flex flex-col mb-10 justify-center items-center mt-10">
                <h1 className="text-xl md:text-3xl font-bold">Standings of Teams in Tournaments</h1>
                <div>
                    <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
                        <table className="table">
                            {/* head */}
                            <thead>
                            <tr>
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
                                    sortedTeams?.map((team, index) => (
                                        <tr key={team._id}>
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

                <div>
                    <button onClick={() => navigate(`/standings`)} className="w-[150px] h-[40px] bg-gray-200 hover:bg-gray-400 mt-10 rounded-md">Back</button>
                </div>
            </div>
        </div>
    );
};

export default PointTable;