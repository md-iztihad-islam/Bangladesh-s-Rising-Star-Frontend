import { useNavigate } from "react-router-dom";
import { useGetAllMatchesQuery } from "../../api/tournamentApi";

function WatchHighlights(){
    const navigate = useNavigate();
    const {data} = useGetAllMatchesQuery();

    const matchList = data?.data;

    return(
        <div>
           <div className="flex flex-col mb-10 justify-center items-center mt-10">
                <h1 className="text-xl md:text-3xl font-bold">Highlights</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
                    {
                        matchList?.map((match) => (
                            <div key={match._id}>
                                {
                                    match.isPlayed ? (
                                        <Card onClick={() => navigate(`/highlights/${match._id}/${match.tournament._id}`)} data={match} />
                                    ) : null
                                }
                            </div>
                        ))
                    }
                </div>
           </div>
        </div>
    );
};

export default WatchHighlights;


function Card({onClick, data}){
    return(
        <div onClick={onClick} className="cursor-pointer hover:shadow-lg transform hover:scale-105 duration-300 ease-in-out">
            <div className="card bg-base-100 w-80 shadow-sm">
                <figure>
                    <iframe
                        src={data.videoUrl || "https://images.unsplash.com/photo-1612838320302-4b3b3b3b3b3b"}
                        alt="Shoes"
                    ></iframe>
                </figure>
                <div className="card-body">
                    <h2 className="card-title">
                        {data.matchTeam1} vs {data.matchTeam2}
                    </h2>
                </div>
            </div>
        </div>
    );
};