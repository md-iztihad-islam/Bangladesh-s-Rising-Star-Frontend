import { useNavigate, useParams } from "react-router-dom";
import { useGetMatchByIdQuery } from "../../api/tournamentApi";

function HighlightVideo(){
    const navigate = useNavigate();
    const params = useParams();

    const matchId = params.matchId;
    const tournamentId = params.tournamentId;

    const {data} = useGetMatchByIdQuery({matchId, tournamentId});

    const matchData = data?.data;

    return(
        <div className="flex justify-center items-center">
            <div className="flex justify-center items-center max-w-4xl w-full">
                <div className="flex flex-col gap-5">
                    <h1 className="text-xl md:text-3xl font-bold">Highlight</h1>
                    <h2 className="text-lg md:text-2xl font-bold">{matchData?.tournament.tournamentName}: {matchData?.matchTeam1} vs {matchData?.matchTeam2} (Match No:{matchData?.matchNo})</h2>
                    <div className="md:w-[800px] md:h-[500px] mb-10 border-5 rounded-md">
                        <iframe
                            className="w-full h-full"
                            src={matchData?.videoUrl || "https://www.youtube.com/embed/9bZkp7q19f0"} 
                            title="YouTube video player" 
                            allowFullScreen
                        ></iframe>
                    </div>
                    
                    <button onClick={() => navigate("/highlights")} className="m-10 w-[150px] h-[40px] bg-gray-200 hover:bg-gray-400 mt-10 rounded-md">Back</button>
                </div>
            </div>
        </div>
    );
};

export default HighlightVideo;