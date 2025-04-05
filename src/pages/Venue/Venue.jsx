import { useGetVenueQuery } from "../../api/venueApi";

function Venue(){
    const {data} = useGetVenueQuery();
    const venueData = data?.data;

    return (
        <div className="w-full">
            <div className="flex flex-col items-center justify-center p-12">
                <h1 className="text-xl md:text-3xl font-bold">Venues</h1>
                <div className="flex flex-col justify-center items-start mt-10 mb-10 p-5">
                    {
                        venueData.map((Venue) => (
                            <div>
                                <div className="flex flex-col justify-center items-center mb-10">
                                    <h1 className="text-xl md:text-3xl font-bold">{Venue.venueName}</h1>
                                    <img src={Venue.venueImage} alt={Venue.venueName} className="w-full h-50 md:h-96 object-cover" />
                                    <p className="text-lg mt-2">{Venue.venueLocation}</p>
                                    <a href={Venue.venueLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline mt-2">View Venue</a>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default Venue;