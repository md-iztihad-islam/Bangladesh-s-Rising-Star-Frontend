import { useNavigate, useParams } from "react-router-dom";
import { useGetTeamByIdQuery } from "../../api/tournamentApi";

function TeamPlayers(){
    const navigate = useNavigate();
    const params = useParams();

    const { tournamentId, teamId } = params;

    const {data} = useGetTeamByIdQuery({tournamentId, teamId});
    const teamData = data?.data;
    return (
        <div>
            <div className="flex flex-col justify-center items-center mt-10 mb-10 p-5">
                <h1 className="text-xl md:text-3xl font-bold mb-5">{teamData?.institutionName}</h1>
                <img src={teamData?.teamLogo} className="w-[300px] h-[300px]" alt="" />
                <div className="text-justify mb-5 md:p-12">
                    {teamData?.teamDescription}
                </div>
                <h1 className="text-xl md:text-3xl font-bold">Player's of {teamData?.institutionName}</h1>
                <div className="mt-10">
                    <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
                        <table className="table">
                            {/* head */}
                            <thead>
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Position</th>
                            </tr>
                            </thead>
                            <tbody>
                            {/* row 1 */}
                                {
                                    teamData?.playersRegistrationNo?.map((player, index) => (
                                        <tr key={index}>
                                            <th>{index + 1}</th>
                                            <td>{player.name}</td>
                                            <td>{player.position}</td>
                                        </tr>
                                    ))
                                }                
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeamPlayers;