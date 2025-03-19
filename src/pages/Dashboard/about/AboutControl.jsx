import { useEffect, useState } from "react";
import { useCreateAboutMutation, useGetAboutQuery, useUpdateAboutMutation } from "../../../api/aboutApi";
import { useNavigate } from "react-router-dom";

function AboutControl(){
    const navigate = useNavigate();
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');

    const onChangeHandler = (event) => {
        const file = event.target.files?.[0];
        if(file){
            setImage(file);
        }
    };

    const createHandler = async () => {
        const formData = new FormData();
        formData.append("description", description);
        formData.append("image", image);

        await updateAbout(formData);
    };

    const {data: aboutDataFromApi, refetch} = useGetAboutQuery();
    const aboutDataFromApiData = aboutDataFromApi?.data[0];

    const [updateAbout, {isSuccess, isError}] = useUpdateAboutMutation();

    useEffect(() => {
        setImage(null);
        setDescription(aboutDataFromApiData?.description || "");
    }, [aboutDataFromApiData]);

    //const [createAbout, {isSuccess, isError}] = useCreateAboutMutation();

    

    useEffect(() => {
        if(isSuccess){
            alert("Data saved successfully");
            refetch();
        };
        if(isError){
            alert("Error saving data");
        };
    }, [isSuccess, isError]);
    return (
        <div>
            <div className="flex flex-col justify-center items-center mt-10 mb-10 p-5">
                <h1 className="text-xl md:text-3xl font-bold">About Controller</h1>
                <div className="mt-10">
                    <label>Image:</label>
                    <input onChange={onChangeHandler} className="w-[200px] md:w-[500px] bg-gray-200 border-1 rounded-md ml-5 p-2" type="file" placeholder="imageUrl" />
                </div>
                <div className="mt-10">
                    <label>Description:</label>
                    <input value={description} onChange={(e) => setDescription(e.target.value)} className="w-[200px] md:w-[500px] bg-gray-200 border-1 rounded-md ml-5 p-2 overflow-y-auto
                    " type="text" />
                </div>

                <button onClick={createHandler} className="w-[150px] h-[40px] bg-gray-200 hover:bg-gray-400 mt-10 rounded-md">Update</button>
                <button onClick={() => navigate("/admin")} className="w-[150px] h-[40px] bg-gray-200 hover:bg-gray-400 mt-10 rounded-md">Back</button>
            </div>
        </div>
    );
};

export default AboutControl;