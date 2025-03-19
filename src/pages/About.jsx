import { useEffect } from "react";
import { useGetAboutQuery } from "../api/aboutApi";

function About(){
    const {data, refetch} = useGetAboutQuery();

    const aboutData = data?.data[0];

    useEffect(() => {
        refetch();
    }, [aboutData]);

    return(
        <div className="flex justify-center items-center">
            <div className="flex justify-center items-center max-w-4xl w-full">
                <div className="flex flex-col gap-5">
                    <h1 className="text-xl md:text-3xl font-bold ml-5 mt-5 mb-5">About</h1>
                    <img src={aboutData?.image} alt="" className="mb-5" />
                    <p className="text-justify m-5">{aboutData?.description}</p>
                </div>
            </div>
        </div>
    );
}

export default About;