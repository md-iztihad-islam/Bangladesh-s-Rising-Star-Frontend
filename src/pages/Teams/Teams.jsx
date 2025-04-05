import { useParams } from "react-router-dom";
import { useGetTournamentByIdQuery } from "../../api/tournamentApi";

function Teams(){
    const params = useParams();
    const idOfTournament = params.tournamentId;

    const {data} = useGetTournamentByIdQuery(idOfTournament);
    const tournamentData = data?.data;
    return(
        <div className="w-full p-12">
            <div className="flex flex-col justify-center items-center">
                <h1 className="text-xl md:text-3xl font-bold">Teams Of {tournamentData?.tournamentName} {tournamentData?.tournamentType}</h1>
                <div>
                    {
                        tournamentData?.teams?.length > 0 ? (
                            <div className="flex flex-col gap-5 mt-5">
                                {
                                    tournamentData?.teams?.map((team) => (
                                        <div className="flex gap-5 justify-between items-center" key={team._id}>
                                            <img src={team.teamLogo} alt="" />
                                            <p className="text-lg md:text-2xl font-semibold">{team.teamName}</p>
                                        </div>
                                    ))
                                }
                            </div>
                        ) : (
                            <h1 className="text-xl md:text-3xl font-bold">No Teams Found</h1>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default Teams;