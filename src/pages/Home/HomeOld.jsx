import { useNavigate } from "react-router-dom";
import CountDown from "../../components/Extra/CountDown";
import { useGetNewsQuery } from "../../api/newsApi";
import { useGetAllMatchesQuery, useGetTournamentQuery } from "../../api/tournamentApi";
import { useGetLiveQuery } from "../../api/liveApi";
import { div } from "motion/react-client";

function Home(){
    const navigate = useNavigate();
    const {data: news} = useGetNewsQuery();
    const newsList = news?.news;

    const {data: match} = useGetAllMatchesQuery();
    const matchData = match?.data;

    const matchList = matchData?.slice().sort((a, b) => new Date(b.date) - new Date(a.date)) || [];

    const {data: liveMatch} = useGetLiveQuery();
    const liveData = liveMatch?.data;

    const {data: tournament } = useGetTournamentQuery();
    const tournamentData = tournament?.data;


    return(
        <div>
            <div className="ml-5 mr-5 md:flex md:flex-col md:justify-center md:items-center lg:ml-30 lg:mr-30 mt-0 mb-10 p-5">
                <div className="flex justify-center items-center">
                    <img src={"/logo.png"} alt="" className="mt-0 h-[400px] w-[400px]" />
                </div>
                <div className="h-[200px] w-full md:w-[500px]  mb-10 lg:ml-60 lg:mr-60 bg-gray-400 rounded-md flex flex-col justify-around items-center">
                    <h1 className="text-xl md:text-3xl font-bold text-red-500">WE ARE LAUNCHING!!!</h1>
                    <CountDown />
                </div>

                <div className="card lg:card-side bg-base-100 shadow-md border-1">
                    <div className="relative w-full h-[315px]">
                        <iframe
                            className="w-full h-full" 
                            src={matchList[0]?.videoUrl || "https://www.youtube.com/embed/396-VyGW5Os?si=06dfSxON5kx6BbSq"}
                            title="YouTube video player"
                            allowFullScreen
                        ></iframe>
                    </div>
                    <div className="card-body">
                        <h2 className="card-title">Today's exiting match!!!</h2>
                        <p>Click the button to watch the highlights. You really cannot miss it!!!</p>
                        <div className="card-actions justify-end">
                        <button onClick={() => navigate("/highlights")} className="btn btn-primary">Watch Highlights</button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
                    {
                        matchList?.map((match) => (
                            <div key={match._id}>
                                {
                                    match?.isPlayed ? (
                                        <div onClick={() => navigate(`/highlights/${match._id}/${match.tournament._id}`)}  className="cursor-pointer hover:shadow-lg transform hover:scale-105 duration-300 ease-in-out mt-10">
                                            <div className="card bg-base-100 w-80 shadow-sm">
                                                <figure>
                                                    <iframe
                                                        src={match.videoUrl || "https://images.unsplash.com/photo-1612838320302-4b3b3b3b3b3b"}
                                                        allowFullScreen
                                                    ></iframe>
                                                </figure>
                                                <div className="card-body">
                                                    <h2 className="card-title">
                                                        {match.matchTeam1} vs {match.matchTeam2}
                                                    </h2>
                                                </div>
                                            </div>
                                        </div>
                                    ) : null
                                }
                            </div>
                        ))
                    }
                </div>

                <div id="livePart" className="flex flex-col justify-center items-center mt-10">
                    <h1 className="font-bold text-md md:text-3xl">Live Matches of Dhaka's Rising Star</h1>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
                        {
                            liveData?.map((live) => (
                                <div key={live._id} className="card w-80 bg-base-100 card-xl shadow-sm">
                                    <div className="card-body">
                                        <h2 className="card-title">{live?.team1} vs {live?.team2}</h2>
                                        <p>Live From : {live?.venue}</p>
                                        <div className="justify-end card-actions">
                                        <button className="btn btn-primary">
                                            <a href={live.videoUrl}>Watch Now</a>
                                        </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>

                <div id="newsPart" className="flex flex-col justify-center items-center mt-10">
                    <h1 className="font-bold text-md md:text-3xl mt-10">Latest News</h1>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
                        {newsList?.map((news) => {
                            const formattedDate = new Date(news?.newsDate).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            });

                            return (
                                <a key={news._id} className="cursor-pointer border-1 rounded-md hover:shadow-lg transform hover:scale-105 duration-300 ease-in-out" href={news.newsLink} target="_blank">
                                    <figure>
                                        <img src={news?.newsImage} alt="news" />
                                    </figure>
                                    <div className="card-body">
                                        <h2 className="card-title">{news?.newsTitle}</h2>
                                        <h2 className="text-xl font-semibold">{news?.newsDescription}</h2>
                                        <p className="text-gray-500 text-sm">{formattedDate}</p>
                                    </div>
                                </a>
                            );
                        })}
                    </div>
                </div>

                <div id="tournamentsPart" className="mt-10 flex flex-col gap-10 justify-center items-center">
                    <div>
                        <h1 className="font-bold text-md md:text-3xl">Teams</h1>
                        <div className="carousel carousel-center rounded-box">
                            {
                                tournamentData?.teams?.map((team) => (
                                    <div className="carousel-item" key={team._id}>
                                        <div className="flex flex-col gap-2 justify-center items-center" onClick={() => navigate(`/${tournamentData?._id}/${team._id}`)}>
                                            <img src={team?.teamLogo} alt="teams" className="h-[200px] w-[200px] m-5" />
                                            <p>{team.teamName}</p>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>

                <div id="partners" className="flex flex-col justify-center items-center mt-10">
                    <h1 className="font-bold text-md md:text-3xl">Our Partners</h1>
                    <div className="flex flex-wrap gap-4 justify-center items-center mt-5">
                        <img src="/bff.jpg" alt="bff" className="h-[80px] w-[80px] md:h-[150px] md:w-[150px]" />
                        <img src="/tguc.jpg" alt="bff" className="h-[80px] w-[80px] md:h-[150px] md:w-[150px]" />
                        <img src="/fs.jpg" alt="bff" className="h-[80px] w-[80px] md:h-[150px] md:w-[150px]" />
                        <img src="/fifa.png" alt="bff" className="h-[80px] w-[80px] md:h-[150px] md:w-[150px]" />
                        <img src="/afc.jpg" alt="bff" className="h-[80px] w-[80px] md:h-[150px] md:w-[150px]" />
                    </div>
                </div>


                <div id="sponsors" className="flex flex-col justify-center items-center mt-10">
                    <h1 className="font-bold text-md md:text-3xl">Our Sponsors</h1>
                    <div className="flex flex-wrap gap-4 justify-center items-center mt-5">
                        <img src="/fresh.png" alt="bff" className="h-[80px] w-[80px] md:h-[150px] md:w-[150px]" />
                        <img src="/prime.png" alt="bff" className="h-[80px] w-[80px] md:h-[150px] md:w-[150px]" />
                        <img src="/dr.jpg" alt="bff" className="h-[80px] w-[80px] md:h-[150px] md:w-[150px]" />
                    </div>
                </div>


                <div id="venueSponsors" className="flex flex-col justify-center items-center mt-10">
                    <h1 className="font-bold text-md md:text-3xl">Our Venue Sponsor</h1>
                    <div className="flex flex-wrap gap-4 justify-center items-center mt-5">
                        <img src="/fg.jpg" alt="bff" className="h-[80px] w-[80px] md:h-[150px] md:w-[150px]" />
                    </div>
                </div>





            </div>
        </div>
    );
}

export default Home;