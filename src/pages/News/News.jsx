import { useNavigate } from "react-router-dom";
import { useGetNewsQuery } from "../../api/newsApi";

function News(){
    const navigate = useNavigate();

    const {data} = useGetNewsQuery();
    const newsList = data?.news?.slice().sort((a, b) => new Date(b.newsDate) - new Date(a.newsDate));

    return(
        <div>
            <div className="flex flex-col justify-center items-center mt-10 mb-10 p-5">
                <h1 className="text-xl md:text-3xl font-bold">News</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
                        {newsList?.map((news) => {
                            const formattedDate = new Date(news?.newsDate).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            });

                            return (
                                <a key={news._id} className="cursor-pointer w-[320px] h-[350px] border-1 rounded-md hover:shadow-lg transform hover:scale-105 duration-300 ease-in-out" href={news.newsLink || "link"} target="_blank">
                                    <figure>
                                        <img src={news?.newsImage || "https://fifpro.org//media/fhmfhvkx/messi-world-cup.jpg?rxy=0.48356841796117644,0.31512414378031967&width=880&height=440&rnd=133210253587130000"} className="h-[200px] w-[320px] rounded-md" alt="news" />
                                    </figure>
                                    <div className="card-body h-[200px] w-[320px]">
                                        <h2 className="text-lg font-semibold">{news?.newsTitle || ""}</h2>
                                        <h2 className="text-md font-semibold overflow-hidden h-[45px]">{news?.newsDescription || ""}</h2>
                                        <p>{formattedDate}</p>
                                    </div>
                                </a>
                            );
                        })}
                </div>
            </div>
        </div>
    );
};

export default News;