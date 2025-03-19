import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateNewsMutation, useDeleteNewsMutation, useGetNewsQuery } from "../../../api/newsApi";

function NewsControl(){
    const navigate = useNavigate();

    const [newsId, setNewsId] = useState('');
    const [newsTitle, setNewsTitle] = useState('');
    const [newsDescription, setNewsDescription] = useState('');
    const [newsDate, setNewsDate] = useState('');
    const [newsImage, setNewsImage] = useState('');
    const [newsLink, setNewsLink] = useState('');

    const {data, refetch} = useGetNewsQuery();

    const newsData = data?.news;

    const [createNews, {isSuccess, isError}] = useCreateNewsMutation();

    const newsObject = {
        newsId,
        newsTitle,
        newsDescription,
        newsDate,
        newsImage,
        newsLink
    };

    const createHandler = async () => {
        await createNews(newsObject);
        setNewsId('');
        setNewsTitle('');
        setNewsDescription('');
        setNewsDate('');
        setNewsImage('');
        setNewsLink('');
    };

    useEffect(() => {
        if(isSuccess){
            refetch();
        };
        if(isError){
            alert("Error saving data");
        };
    }, [isSuccess, isError]);

    const [deleteNews, {isSuccess: deleteSuccess, isError: deleteError}] = useDeleteNewsMutation();

    const deleteHandler = async (newsId) => {
        await deleteNews(newsId);
    };

    useEffect(() => {
        if(deleteSuccess){
            refetch();
        };
        if(deleteError){
            alert("Error deleting data");
        };
    }, [deleteSuccess, deleteError]);

    return (
        <div>
            <div className="flex flex-col justify-center items-center mt-10 mb-10 p-5">
                <h1 className="text-xl md:text-3xl font-bold">News Control</h1>
                <div>
                    <div className="flex flex-col gap-5">
                        <label>News ID:</label>
                        <input value={newsId} onChange={(e) => setNewsId(e.target.value)} type="text" className="w-[300px] md:w-[600px] border-1 border-gray-300 rounded-md p-2" />
                    </div>

                    <div className="flex flex-col gap-5">
                        <label>News Title</label>
                        <input value={newsTitle} onChange={(e) => setNewsTitle(e.target.value)} type="text" className="w-[300px] md:w-[600px] border-1 border-gray-300 rounded-md p-2" />
                    </div>

                    <div className="flex flex-col gap-5">
                        <label>News Description</label>
                        <input value={newsDescription} onChange={(e) => setNewsDescription(e.target.value)} type="text" className="w-[300px] md:w-[600px] border-1 border-gray-300 rounded-md p-2" />
                    </div>

                    <div className="flex flex-col gap-5">
                        <label>News Date</label>
                        <input value={newsDate} onChange={(e) => setNewsDate(e.target.value)} type="date" className="w-[300px] md:w-[600px] border-1 border-gray-300 rounded-md p-2" />
                    </div>

                    <div className="flex flex-col gap-5">
                        <label>News Image</label>
                        <input value={newsImage} onChange={(e) => setNewsImage(e.target.value)} type="text" className="w-[300px] md:w-[600px] border-1 border-gray-300 rounded-md p-2" />
                    </div>
                    
                    <div className="flex flex-col gap-5">
                        <label>News Link</label>
                        <input value={newsLink} onChange={(e) => setNewsLink(e.target.value)} type="text" className="w-[300px] md:w-[600px] border-1 border-gray-300 rounded-md p-2" />
                    </div>
                </div>

                <div className="flex gap-10">
                    <button onClick={createHandler} className="w-[150px] h-[40px] bg-gray-200 hover:bg-gray-400 mt-10 rounded-md">Create</button>
                    <button onClick={() => navigate("/admin")} className="w-[150px] h-[40px] bg-gray-200 hover:bg-gray-400 mt-10 rounded-md">Back</button>
                </div>
            </div>

            <div className="p-10">
                <h1 className="text-xl md:text-3xl font-bold">News List</h1>
                <div>
                    <ul className="list rounded-box shadow-md bg-gray-200 hover:bg-gray-400">
  
                        <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">All News</li>

                        <div>
                            {
                                newsData?.map((news) => (
                                    <li className="list-row m-2" key={news._id}>
                                        <div><img className="size-10 rounded-box" src={news?.newsImage}/></div>
                                        <div>
                                        <div>{news?.newsTitle}</div>
                                        <div className="text-xs uppercase font-semibold opacity-60">{news?.newsDate}</div>
                                        </div>
                                        <button onClick={() => deleteHandler(news._id)} className="btn btn-square btn-ghost w-[100px]">Delete</button>
                                    </li>
                                ))
                            }
                        </div>
  
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default NewsControl;