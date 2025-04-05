import { use, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateVenueMutation, useDeleteVenueMutation, useGetVenueQuery } from "../../../api/venueApi";

function VenueControl(){
    const navigate = useNavigate();
    const [venueName, setVenueName] = useState("");
    const [venueLocation, setVenueLocation] = useState("");
    const [venueLink, setVenueLink] = useState("");
    const [venueImage, setVenueImage] = useState("");

    const [createVenue, { isSuccess, isError }] = useCreateVenueMutation();

    const {data, refetch} = useGetVenueQuery();
    const venueData = data?.data;

    const [deleteVenue, {isSuccess: deleteSuccess, isError: deleteError}] = useDeleteVenueMutation();


    const onChangeHandler = (event) => {
        const file = event.target.files?.[0];
        if(file){
            setVenueImage(file);
        }
    };

    const createHandler = async () => {
        const formData = new FormData();
        formData.append("venueName", venueName);
        formData.append("venueLocation", venueLocation);
        formData.append("venueLink", venueLink);
        formData.append("venueImage", venueImage);


        await createVenue(formData);
        // Call the API to create the venue
        // await createVenue(formData);
    };

    const deleteHandler = async (id) => {
        await deleteVenue(id);
    };

    useEffect(() => {
        if(isSuccess) {
            alert("Create Success");
            refetch();
        }
        if(isError){
            alert("Create Failed");
        }
    }, [isSuccess, isError]);

    useEffect(() => {
        if(deleteSuccess){
            refetch();
        }
        if(deleteError){
            alert("Delete Failed");
        }
    }, [deleteSuccess, deleteError]);

    return (
        <div className="w-full">
            <div className="flex flex-col justify-center items-center mt-10 mb-10 p-5">
                <h1 className="text-xl md:text-3xl font-bold">Venue Control</h1>
                <div>
                    <div className="flex flex-col gap-5 mt-5">
                        <label>Venue Name:</label>
                        <input value={venueName} onChange={(e) => setVenueName(e.target.value)} type="text" className="w-[300px] md:w-[600px] border-1 border-gray-300 rounded-md p-2" />
                    </div>

                    <div className="flex flex-col gap-5 mt-5">
                        <label>Venue Location:</label>
                        <input value={venueLocation} onChange={(e) => setVenueLocation(e.target.value)} type="text" className="w-[300px] md:w-[600px] border-1 border-gray-300 rounded-md p-2" />
                    </div>

                    <div className="flex flex-col gap-5 mt-5">
                        <label>Venue Link:</label>
                        <input value={venueLink} onChange={(e) => setVenueLink(e.target.value)} type="text" className="w-[300px] md:w-[600px] border-1 border-gray-300 rounded-md p-2" />
                    </div>

                    <div className="flex flex-col gap-5 mt-5">
                        <label>Venue Image:</label>
                        <input onChange={onChangeHandler} type="file" className="w-[300px] md:w-[600px] border-1 border-gray-300 rounded-md p-2" />
                    </div>

                </div>

                <div className="flex gap-5 mt-5">
                    <button onClick={createHandler} className="w-[150px] h-[40px] bg-gray-200 hover:bg-gray-400 mt-10 rounded-md">Create</button>
                    <button onClick={() => navigate(`/admin`)} className="w-[150px] h-[40px] bg-gray-200 hover:bg-gray-400 mt-10 rounded-md">Back</button>
                </div>
            </div>

            <div className="p-10">
                <h1 className="text-xl md:text-3xl font-bold">Venue List</h1>
                <div>
                    <ul className="list rounded-box shadow-md bg-gray-200 hover:bg-gray-400">
  
                        <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">Venue List</li>

                        <div>
                            {
                                venueData?.map((venue) => (
                                        <li className="list-row m-2" key={venue._id}>
                                            <div><img className="size-10 rounded-box" src={venue.venueImage}/></div>
                                            <div>
                                            <div>{venue.venueName}</div>
                                            </div>
                                            <div className="flex gap-5">
                                                <button onClick={() => deleteHandler(venue._id)} className="btn btn-square btn-ghost w-[100px]">Delete</button>
                                                <button className="btn btn-square btn-ghost w-[100px]">
                                                    <a href={venue.venueLink} target="_blank">Visit</a>
                                                </button>
                                            </div>
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

export default VenueControl;