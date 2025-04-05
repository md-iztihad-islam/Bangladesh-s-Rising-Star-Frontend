import { useNavigate } from "react-router-dom";
import { useGetNewsQuery } from "../../api/newsApi";
import { useGetAllMatchesQuery, useGetTournamentQuery } from "../../api/tournamentApi";

function Home() {

    const navigate = useNavigate();
    const {data: news} = useGetNewsQuery();
    const newsList = news?.news;

    const sortedNews = newsList?.slice().sort((a, b) => new Date(b.newsDate) - new Date(a.newsDate));
    const latestNews = sortedNews?.slice(0, 6);

    const {data: tournamentData} = useGetTournamentQuery();
    const tournamentList = tournamentData?.data;

    const {data: matchData} = useGetAllMatchesQuery();
    const matchList = matchData?.data;
    const sortedMatch = matchList?.slice().sort((a, b) => new Date(b.newsDate) - new Date(a.newsDate));
    const matches = sortedMatch?.slice(0, 6);

    return (
        <div className="w-full min-h-screen flex flex-col">
            {/* About Section */}
            <div className="flex flex-col md:flex-row md:gap-10 justify-center items-center w-full h-[500px] px-10 text-white md:text-blue-800" style={{backgroundImage: "url('/aboutbg.jpg')", backgroundSize: "cover", backgroundPosition: "center"}}>
                {/* Logo Section */}
                <div className="w-[150px] h-[150px] md:h-full md:w-[25%] flex items-center justify-center">
                    <img src="/logo.png" className="h-full md:h-[80%] w-auto object-contain" alt="Logo" />
                </div>

                {/* Text Section */}
                <div className="md:h-full md:w-[65%] flex items-center">
                    <p className="text-justify text-sm md:text-lg font-medium leading-relaxed">
                        <strong>The DHAKA’s RISING STARS</strong>, an inter-school football tournament, is a landmark initiative by the <strong>Bangladesh Football Federation (BFF)</strong>, aimed at nurturing young football talent and fostering a sense of school community through football. This event promotes teamwork, resilience, and fair play among school students, while providing a platform for future stars of Bangladeshi football to showcase their potential and learn professional standards at an early age.
                    </p>
                </div>
            </div>

            {/* News Section */}
            <div className="p-10">


                <div id="newsPart" className="flex flex-col justify-center items-center">
                    <h1 className="font-bold text-md md:text-3xl mt-10">Latest News</h1>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
                        {latestNews?.map((news) => {
                            // const formattedDate = new Date(news?.newsDate).toLocaleDateString("en-US", {
                            //     year: "numeric",
                            //     month: "long",
                            //     day: "numeric",
                            // });

                            return (
                                <a key={news._id} className="z-0 cursor-pointer w-[320px] h-[310px] border-1 rounded-md hover:shadow-lg transform hover:scale-105 duration-300 ease-in-out" href={news.newsLink || "link"} target="_blank">
                                    <figure>
                                        <img src={news?.newsImage || "https://fifpro.org//media/fhmfhvkx/messi-world-cup.jpg?rxy=0.48356841796117644,0.31512414378031967&width=880&height=440&rnd=133210253587130000"} className="h-[200px] w-[320px] rounded-md" alt="news" />
                                    </figure>
                                    <div className="card-body h-[200px] w-[320px]">
                                        <h2 className="text-lg font-semibold">{news?.newsTitle || "Nothing"}</h2>
                                        <h2 className="text-md font-semibold overflow-hidden h-[45px]">{news?.newsDescription || "hello i am a boy i live in dhaka"}</h2>
                                    </div>
                                </a>
                            );
                        })}
                    </div>
                </div>


            </div>


            {/* Teams Section */}

            <div className="p-10 w-full">

                <div id="tournamentsPart" className="w-full">


                    <div className="flex flex-col gap-10 justify-center items-center w-full">
                        <h1 className="font-bold text-md md:text-3xl">Teams Of U-12</h1>
                        <div className="carousel carousel-center rounded-box w-full">
                            {
                                tournamentList?.[0]?.teams?.map((team) => (
                                    <div className="carousel-item" key={team._id}>
                                        <div className="flex flex-col gap-2 justify-center items-center w-full" onClick={() => navigate(`/${tournamentData?._id}/${team._id}`)}>
                                            <img src={team.teamLogo || "https://cdn.freebiesupply.com/images/large/2x/manchester-city-logo-png-transparent.png"} alt="teams" className="h-[100px] w-[100px] md:h-[200px] md:w-[200px] m-5" />
                                            <p className="text-sm md:text-xl font-light">{team.teamName}</p>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>


                    <div className="flex flex-col gap-10 justify-center items-center mt-10 w-full">
                        <h1 className="font-bold text-md md:text-3xl">Teams of U-14</h1>
                        <div className="carousel carousel-center rounded-box w-full">
                            {
                                tournamentList?.[1]?.teams.map((team) => (
                                    <div className="carousel-item" key={team._id}>
                                        <div className="flex flex-col gap-2 justify-center items-center w-full" onClick={() => navigate(`/${tournamentData?._id}/${team._id}`)}>
                                            <img src={team.teamLogo || "https://cdn.freebiesupply.com/images/large/2x/manchester-city-logo-png-transparent.png" }alt="teams" className="h-[100px] w-[100px] md:h-[200px] md:w-[200px] m-5" />
                                            <p className="text-sm md:text-xl font-light">{team.teamName}</p>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>


                </div>

            </div>



            {/* Partner Section */}


            <div className="p-10">

                <div id="partners" className="flex flex-col justify-center items-center mt-10">
                    <h1 className="font-bold text-md md:text-3xl">Our Partners</h1>
                    <div className="flex flex-wrap gap-4 md:gap-20 justify-center items-center mt-5">
                        <img src="/bff.jpg" alt="bff" className="h-[80px] w-[80px] md:h-[150px] md:w-[150px]" />
                        <img src="/tguc.jpg" alt="bff" className="h-[80px] w-[80px] md:h-[150px] md:w-[150px]" />
                        <img src="/fs.jpg" alt="bff" className="h-[80px] w-[80px] md:h-[150px] md:w-[150px]" />
                        <img src="/fifa.png" alt="bff" className="h-[80px] w-[80px] md:h-[150px] md:w-[150px]" />
                        <img src="/afc.jpg" alt="bff" className="h-[80px] w-[80px] md:h-[150px] md:w-[150px]" />
                    </div>
                </div>

            </div>



            {/* Sponsor Section */}


            <div className="p-10">

                <div id="sponsors" className="flex flex-col justify-center items-center">
                    <h1 className="font-bold text-md md:text-3xl">Our Sponsors</h1>
                    <div className="flex flex-wrap gap-4 md:gap-20 justify-center items-center mt-5">
                        <img src="/fresh.png" alt="bff" className="h-[80px] w-[80px] md:h-[150px] md:w-[150px]" />
                        <img src="/prime.png" alt="bff" className="h-[80px] w-[80px] md:h-[150px] md:w-[150px]" />
                        <img src="/dr.jpg" alt="bff" className="h-[80px] w-[80px] md:h-[150px] md:w-[150px]" />
                    </div>
                </div>

            </div>



            {/* Highlight Section */}

            <div className="p-10 flex flex-col justify-center items-center">

                <h1 className="font-bold text-md md:text-3xl hover:bg-gray-400 cursor-pointer h-[60px] w-[200px] flex justify-center items-center rounded-md" onClick={() => navigate("/highlights")}>Highlights</h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
                    {
                        matches?.map((match) => (
                            <div key={match._id}>
                                {
                                    match.isPlayed ? (
                                        <div onClick={() => navigate(`/highlights/${match._id}/${match.tournament._id}`)}  className="cursor-pointer hover:shadow-lg transform hover:scale-105 duration-300 ease-in-out mt-10">
                                            <div className="card bg-base-100 w-80 shadow-sm flex justify-center items-center">
                                                <figure>
                                                    <iframe
                                                        src={match.videoUrl || "https://www.youtube.com/embed/wZPnZzKJuFI?si=-E-PNe18OVTwU9CQ"}
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

            </div>

            {/* Fixture Section */}

            <div className="p-10 w-full">
                <div className="flex flex-col gap-10 justify-center items-center w-full md:p-10">
                    <h1 className="text-xl md:text-3xl font-bold">Fixtures</h1>
                    <div className="flex flex-col md:flex-row gap-5 w-full">
                        <div className="w-full md:w-[50%] md:border-r md:border-r-gray-500">
                            <h2 className="text-lg md:text-2xl font-bold">U-12</h2>
                            <div>
                                {
                                    sortedMatch?.filter((match) => match?.tournament.tournamentType === "U-12" && match?.isPlayed === false).slice(0,4).map((match) => (
                                        <div key={match._id} className="flex flex-wrap justify-center items-center gap-2 md:gap-10 border-b border-b-gray-500 p-3 md:p-10">
                                            <div>
                                                <img src={match.matchTeam1Logo} className="w-[60px] h-[60px] md:w-[150px] md:h-[150px]" alt="" />
                                            </div>

                                            <div className="text-sm md:text-lg">
                                                {new Date(`1970-01-01T${match?.matchTime}`).toLocaleTimeString("en-US", {
                                                    hour: "numeric",
                                                    minute: "numeric",
                                                    hour12: true,
                                                })}
                                            </div>

                                            <div>
                                                <img src={match.matchTeam2Logo} className="w-[60px] h-[60px] md:w-[150px] md:h-[150px]" alt="" />
                                            </div>

                                            <div className="text-sm md:text-lg">
                                                {new Date(match?.matchDate).toLocaleDateString("en-GB", {
                                                    day: "2-digit",
                                                    month: "2-digit",
                                                    year: "numeric",
                                                })}
                                            </div>

                                        </div>
                                    ))
                                }
                            </div>
                        </div>

                        <div className="w-full md:w-[50%] md:border-r md:border-r-gray-500">
                            <h2 className="text-lg md:text-2xl font-bold">U-14</h2>
                            <div>
                                {
                                    sortedMatch?.filter((match) => match?.tournament.tournamentType === "U-14" && match?.isPlayed === false).slice(0,4).map((match) => (
                                        <div key={match._id} className="flex flex-wrap justify-center items-center gap-2 md:gap-10 border-b border-b-gray-500 p-3 md:p-10">
                                            <div>
                                                <img src={match.matchTeam1Logo} className="w-[60px] h-[60px] md:w-[150px] md:h-[150px]" alt="" />
                                            </div>

                                            <div className="text-sm md:text-lg">
                                                {new Date(`1970-01-01T${match?.matchTime}`).toLocaleTimeString("en-US", {
                                                    hour: "numeric",
                                                    minute: "numeric",
                                                    hour12: true,
                                                })}
                                            </div>


                                            <div>
                                                <img src={match.matchTeam2Logo} className="w-[60px] h-[60px] md:w-[150px] md:h-[150px]" alt="" />
                                            </div>

                                            <div className="text-sm md:text-lg">
                                                {new Date(match?.matchDate).toLocaleDateString("en-GB", {
                                                    day: "2-digit",
                                                    month: "2-digit",
                                                    year: "numeric",
                                                })}
                                            </div>

                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>







        </div>
    );
}

export default Home;