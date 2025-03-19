import { useGetLiveQuery } from "../api/liveApi";

function WatchLive(){
    const {data} = useGetLiveQuery();
    const liveData = data;
    console.log(liveData);
    return(
        <div className="flex justify-center items-center">
            <div className="flex justify-center items-center max-w-4xl w-full">
                <div className="flex flex-col gap-5">
                    <h1 className="text-xl md:text-3xl font-bold">Live</h1>
                    <div className="md:w-[800px] mb-10 rounded-md flex flex-col gap-10">
                        {
                            liveData?.map((live) => (
                                    <div className="h-full" key={live._id}>
                                        <h1 className="text-xl md:text-3xl font-bold">{live.tournamentName}</h1>
                                        <p>{live.team1} vs {live.team2}</p>
                                        <p>{live.venue}</p>
                                        <iframe
                                            className="w-full h-96 md:h-[500px] rounded-md mb-10"
                                            src={live.videoUrl} 
                                            title="YouTube video player" 
                                            allowFullScreen
                                        ></iframe>
                                        <hr />
                                    </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WatchLive;