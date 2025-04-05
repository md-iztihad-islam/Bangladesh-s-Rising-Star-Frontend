import { useNavigate, useParams } from "react-router-dom";
import { useGetMatchByTournamentQuery } from "../../api/tournamentApi";

function Fixtures(){
    const navigate = useNavigate();
    const params = useParams();

    const tournamentId = params.tournamentId;

    const {data} = useGetMatchByTournamentQuery(tournamentId);

    const matchList = data?.data;
    console.log(matchList);

    return(
        <div>
            <div className="flex flex-col justify-center items-center mt-10 mb-10 p-5">
                <h1 className="text-xl md:text-3xl font-bold">
                    {matchList?.length > 0 ? `${matchList[0].tournament.tournamentName} ${matchList[0].tournament.tournamentType} Fixture` : "Loading Fixtures..."}
                </h1>


                <div id="groupStage" className="mt-5 md:w-[700px] flex flex-col justify-center items-center">
                    <h1 className="text-xl font-bold">Group Stage</h1>
                    <div className="overflow-x-auto">
                        <table className="table">
                            {/* head */}
                            <thead>
                            <tr>
                            </tr>
                            </thead>
                            <tbody>
                                <div className="mt-5 rounded-md">
                                    {
                                        matchList?.filter(match => match.stage === "Group").map((match, index) => (
                                            match.isPlayed ? (
                                                <tr key={index} className=" mt-5 hover:bg-gray-400 border-b border-b-gray-400">
                                                    <td>
                                                        <img src={match.matchTeam1Logo} className="w-[80px] h-[80px] md:w-[150px] md:h-[150px]" alt="" />
                                                    </td>
                                                    <td>
                                                        <span>{match.team01Goal} - {match.team02Goal}</span>
                                                    </td>
                                                    <td>
                                                        <img src={match.matchTeam2Logo} className="w-[80px] h-[80px] md:w-[150px] md:h-[150px]" alt="" />
                                                    </td>
                                                    <td>
                                                        <div className="text-sm md:text-lg">
                                                            {new Date(match?.matchDate).toLocaleDateString("en-GB", {
                                                                day: "2-digit",
                                                                month: "2-digit",
                                                                year: "numeric",
                                                            })}
                                                        </div>                                                       
                                                    </td>
                                                </tr>
                                            ) : (
                                                <tr key={index} className=" mt-5 hover:bg-gray-400 border-b border-b-gray-400">
                                                    <td>
                                                        <img src={match.matchTeam1Logo} className="w-[80px] h-[80px] md:w-[150px] md:h-[150px]" alt="" />
                                                    </td>
                                                    <td>
                                                        <div className="text-xs md:text-lg w-[60px]">
                                                            {new Date(`1970-01-01T${match?.matchTime}`).toLocaleTimeString("en-US", {
                                                                hour: "numeric",
                                                                minute: "numeric",
                                                                hour12: true,
                                                            })}
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <img src={match.matchTeam2Logo} className="w-[80px] h-[80px] md:w-[150px] md:h-[150px]" alt="" />
                                                    </td>
                                                    <td>
                                                        <div className="text-xs md:text-lg">
                                                            {new Date(match?.matchDate).toLocaleDateString("en-GB", {
                                                                day: "2-digit",
                                                                month: "2-digit",
                                                                year: "numeric",
                                                            })}
                                                        </div>                                                       
                                                    </td>
                                                </tr>
                                            )
                                        ))
                                    }
                                </div>
                            </tbody>
                        </table>
                    </div>
                </div>


                <div id="qualifyStage" className="mt-5 md:w-[700px] flex flex-col justify-center items-center">
                    <h1 className="text-xl font-bold">Qualifier Stage</h1>
                    <div className="overflow-x-auto">
                        <table className="table">
                            {/* head */}
                            <thead>
                            <tr>
                            </tr>
                            </thead>
                            <tbody>
                                <div className="mt-5 rounded-md">
                                    {
                                        matchList?.filter(match => match.stage === "QF").map((match, index) => (
                                            match.isPlayed ? (
                                                <tr key={index} className=" mt-5 hover:bg-gray-400 border-b border-b-gray-400">
                                                    <td>
                                                        <img src={match.matchTeam1Logo} className="w-[80px] h-[80px] md:w-[150px] md:h-[150px]" alt="" />
                                                    </td>
                                                    <td>
                                                        <span>{match.team01Goal} - {match.team02Goal}</span>
                                                    </td>
                                                    <td>
                                                        <img src={match.matchTeam2Logo} className="w-[80px] h-[80px] md:w-[150px] md:h-[150px]" alt="" />
                                                    </td>
                                                    <td>
                                                        <div className="text-sm md:text-lg w-[200px]">
                                                            {new Date(match?.matchDate).toLocaleDateString("en-GB", {
                                                                day: "2-digit",
                                                                month: "2-digit",
                                                                year: "numeric",
                                                            })}
                                                        </div>                                                       
                                                    </td>
                                                </tr>
                                            ) : (
                                                <tr key={index} className=" mt-5 hover:bg-gray-400 border-b border-b-gray-400">
                                                    <td>
                                                        <img src={match.matchTeam1Logo} className="w-[80px] h-[80px] md:w-[150px] md:h-[150px]" alt="" />
                                                    </td>
                                                    <td>
                                                        <div className="text-xs md:text-lg w-[60px]">
                                                            {new Date(`1970-01-01T${match?.matchTime}`).toLocaleTimeString("en-US", {
                                                                hour: "numeric",
                                                                minute: "numeric",
                                                                hour12: true,
                                                            })}
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <img src={match.matchTeam2Logo} className="w-[80px] h-[80px] md:w-[150px] md:h-[150px]" alt="" />
                                                    </td>
                                                    <td>
                                                        <div className="text-xs md:text-lg">
                                                            {new Date(match?.matchDate).toLocaleDateString("en-GB", {
                                                                day: "2-digit",
                                                                month: "2-digit",
                                                                year: "numeric",
                                                            })}
                                                        </div>                                                       
                                                    </td>
                                                </tr>
                                            )
                                        ))
                                    }
                                </div>
                            </tbody>
                        </table>
                    </div>
                </div>


                <div id="semiStage" className="mt-5 md:w-[700px] flex flex-col justify-center items-center">
                    <h1 className="text-xl font-bold">Semi Finals</h1>
                    <div className="overflow-x-auto">
                        <table className="table">
                            {/* head */}
                            <thead>
                            <tr>
                            </tr>
                            </thead>
                            <tbody>
                                <div className="mt-5 rounded-md">
                                    {
                                        matchList?.filter(match => match.stage === "Semi").map((match, index) => (
                                            match.isPlayed ? (
                                                <tr key={index} className=" mt-5 hover:bg-gray-400 border-b border-b-gray-400">
                                                    <td>
                                                        <img src={match.matchTeam1Logo} className="w-[80px] h-[80px] md:w-[150px] md:h-[150px]" alt="" />
                                                    </td>
                                                    <td>
                                                        <span>{match.team01Goal} - {match.team02Goal}</span>
                                                    </td>
                                                    <td>
                                                        <img src={match.matchTeam2Logo} className="w-[80px] h-[80px] md:w-[150px] md:h-[150px]" alt="" />
                                                    </td>
                                                    <td>
                                                        <div className="text-sm md:text-lg w-[200px]">
                                                            {new Date(match?.matchDate).toLocaleDateString("en-GB", {
                                                                day: "2-digit",
                                                                month: "2-digit",
                                                                year: "numeric",
                                                            })}
                                                        </div>                                                       
                                                    </td>
                                                </tr>
                                            ) : (
                                                <tr key={index} className=" mt-5 hover:bg-gray-400 border-b border-b-gray-400">
                                                    <td>
                                                        <img src={match.matchTeam1Logo} className="w-[80px] h-[80px] md:w-[150px] md:h-[150px]" alt="" />
                                                    </td>
                                                    <td>
                                                        <div className="text-xs md:text-lg w-[60px]">
                                                            {new Date(`1970-01-01T${match?.matchTime}`).toLocaleTimeString("en-US", {
                                                                hour: "numeric",
                                                                minute: "numeric",
                                                                hour12: true,
                                                            })}
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <img src={match.matchTeam2Logo} className="w-[80px] h-[80px] md:w-[150px] md:h-[150px]" alt="" />
                                                    </td>
                                                    <td>
                                                        <div className="text-xs md:text-lg">
                                                            {new Date(match?.matchDate).toLocaleDateString("en-GB", {
                                                                day: "2-digit",
                                                                month: "2-digit",
                                                                year: "numeric",
                                                            })}
                                                        </div>                                                       
                                                    </td>
                                                </tr>
                                            )
                                        ))
                                    }
                                </div>
                            </tbody>
                        </table>
                    </div>
                </div>




                <div id="finalStage" className="mt-5 md:w-[700px] flex flex-col justify-center items-center">
                    <h1 className="text-xl font-bold">Final</h1>
                    <div className="overflow-x-auto">
                        <table className="table">
                            {/* head */}
                            <thead>
                            <tr>
                            </tr>
                            </thead>
                            <tbody>
                                <div className="mt-5 rounded-md">
                                    {
                                        matchList?.filter(match => match.stage === "Final").map((match, index) => (
                                            match.isPlayed ? (
                                                <tr key={index} className=" mt-5 hover:bg-gray-400 border-b border-b-gray-400">
                                                    <td>
                                                        <img src={match.matchTeam1Logo} className="w-[80px] h-[80px] md:w-[150px] md:h-[150px]" alt="" />
                                                    </td>
                                                    <td>
                                                        <span>{match.team01Goal} - {match.team02Goal}</span>
                                                    </td>
                                                    <td>
                                                        <img src={match.matchTeam2Logo} className="w-[80px] h-[80px] md:w-[150px] md:h-[150px]" alt="" />
                                                    </td>
                                                    <td>
                                                        <div className="text-sm md:text-lg w-[200px]">
                                                            {new Date(match?.matchDate).toLocaleDateString("en-GB", {
                                                                day: "2-digit",
                                                                month: "2-digit",
                                                                year: "numeric",
                                                            })}
                                                        </div>                                                       
                                                    </td>
                                                </tr>
                                            ) : (
                                                <tr key={index} className=" mt-5 hover:bg-gray-400 border-b border-b-gray-400">
                                                    <td>
                                                        <img src={match.matchTeam1Logo} className="w-[80px] h-[80px] md:w-[150px] md:h-[150px]" alt="" />
                                                    </td>
                                                    <td>
                                                        <div className="text-xs md:text-lg">
                                                            {new Date(`1970-01-01T${match?.matchTime}`).toLocaleTimeString("en-US", {
                                                                hour: "numeric",
                                                                minute: "numeric",
                                                                hour12: true,
                                                            })}
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <img src={match.matchTeam2Logo} className="w-[80px] h-[80px] md:w-[150px] md:h-[150px]" alt="" />
                                                    </td>
                                                    <td>
                                                        <div className="text-xs md:text-lg w-[60px]">
                                                            {new Date(match?.matchDate).toLocaleDateString("en-GB", {
                                                                day: "2-digit",
                                                                month: "2-digit",
                                                                year: "numeric",
                                                            })}
                                                        </div>                                                       
                                                    </td>
                                                </tr>
                                            )
                                        ))
                                    }
                                </div>
                            </tbody>
                        </table>
                    </div>
                </div>

                
            </div>
        </div>
    );
};

export default Fixtures;