import { useEffect } from "react";
import { useGetAboutQuery } from "../api/aboutApi";

function About(){
    const {data, refetch} = useGetAboutQuery();

    const aboutData = data?.data[0];

    useEffect(() => {
        refetch();
    }, [aboutData]);

    return(
        <div className="flex justify-center items-center mb-10">
            <div className="flex justify-center items-center max-w-4xl w-full p-4">
                <div className="flex flex-col gap-2">
                    <h1 className="text-xl md:text-3xl font-bold ml-5 mt-5">About</h1>
                    <img src="/logo.png" className="w-[300px] h-[300px]" alt="" />
                    {/* <img src={aboutData?.image} alt="" className="mb-5" />
                    <p className="text-justify m-5">{aboutData?.description}</p> */}
                    <div className="text-justify">
                        <p>
                            The DHAKA’s RISING STARS, an inter school football tournament, is a landmark initiative by Bangladesh Football Federation (BFF), aimed at nurturing young football talent and fostering a sense of school community through football. This event is designed to promote the values of teamwork, resilience, and fair play among school students, while providing a platform for future stars of Bangladeshi football to showcase their potential and learn the professional standards of FIFA at an early age. 
                        </p>
                        <p>
                            <b>The key objectives for this initiative are:</b>
                        </p>
                        <p>
                            <b>Community Building:</b> Strengthen bonds among Dhaka’s schools and their communities.
                        </p>
                        <p>
                            <b>Talent Development:</b> Inspire and support the next generation of footballers, who wish to have careers as professional footballers.
                        </p>
                        <p>
                            <b>Pathway to Excellence:</b> Provide opportunities for players to be scouted by professional teams and academies.     
                        </p>
                        <p>
                            <b>The key highlights for this initiative are:</b>
                        </p>
                        <p>
                            Organized by Bangladesh Football Federation (BFF) with Flyers Sports & The Growing Up Club  
                        </p>
                        <p>
                            <b>Goal:</b> Promote youth development, foster sportsmanship, and build community spirit  
                        </p>
                        <p>
                            <b>Target Participants:</b> Schools from Dhaka (Private & Public Schools)
                        </p>
                        <p>
                            <b>Age Groups:</b> U12 & U14 for both Boys & Girls
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;