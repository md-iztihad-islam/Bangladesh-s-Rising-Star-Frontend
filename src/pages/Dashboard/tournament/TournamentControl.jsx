import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateTournamentMutation, useDeleteTournamentMutation, useGetTournamentQuery } from "../../../api/tournamentApi";

function TournamentControl(){
    const navigate = useNavigate();
    const [ tournamentName, setTournamentName ] = useState("");
    const [ tournamentType, setTournamentType ] = useState("");
    const [ openningDate, setOpenningDate ] = useState("");
    const [ closingDate, setClosingDate ] = useState("");
    const [ tournamentLogo, setTournamentLogo ] = useState("");

    const onChangeHandler = (event) => {
        const file = event.target.files?.[0];
        if(file){
            setTournamentLogo(file);
        }
    };

    

    const [createTournament, {isSuccess, isError}] = useCreateTournamentMutation();

    const createHandler = async () => {
        const formData = new FormData();
        formData.append("tournamentName", tournamentName);
        formData.append("tournamentType", tournamentType);
        formData.append("openningDate", openningDate);
        formData.append("closingDate", closingDate);
        formData.append("tournamentLogo", tournamentLogo); // ✅ File must be appended to FormData
    
        await createTournament(formData);
    };
    

    const {data: tournamentData, refetch} = useGetTournamentQuery();

    const tournamentList = tournamentData?.data;

    useEffect(() => {
        if(isSuccess){
            refetch();
            setTournamentName("");
            setTournamentType("");
            setOpenningDate("");
            setClosingDate("");
            setTournamentLogo("");
        }
        if(isError){
            alert("Create Failed");
        }
    }, [isSuccess, isError]);

    const [deleteTournament, {isSuccess: deleteSuccess, isError: deleteError}] = useDeleteTournamentMutation();

    const deleteHandler = async (id) => {
        await deleteTournament(id);
    };

    useEffect(() => {
        if(deleteSuccess){
            refetch();
        }
        if(deleteError){
            alert("Delete Failed");
        }
    }, [deleteSuccess, deleteError]);


    return (
        <div>
            <div className="flex flex-col justify-center items-center mt-10 mb-10 p-5">
                <h1 className="text-xl md:text-3xl font-bold">Tournament Control</h1>
                <div>
                    <div className="flex flex-col gap-5 mt-5">
                        <label>Tournament Name:</label>
                        <input value={tournamentName} onChange={(e) => setTournamentName(e.target.value)} type="text" className="w-[300px] md:w-[600px] border-1 border-gray-300 rounded-md p-2" />
                    </div>

                    <div className="flex flex-col gap-5 mt-5">
                        <label>Tournament Type</label>
                        <input value={tournamentType} onChange={(e) => setTournamentType(e.target.value)} placeholder="U-12 or U-14" type="text" className="w-[300px] md:w-[600px] border-1 border-gray-300 rounded-md p-2" />
                    </div>

                    <div className="flex flex-col gap-5 mt-5">
                        <label>Openning Date:</label>
                        <input value={openningDate} onChange={(e) => setOpenningDate(e.target.value)} type="date" className="w-[300px] md:w-[600px] border-1 border-gray-300 rounded-md p-2" />
                    </div>

                    <div className="flex flex-col gap-5 mt-5">
                        <label>Closing Date:</label>
                        <input value={closingDate} onChange={(e) => setClosingDate(e.target.value)} type="date" className="w-[300px] md:w-[600px] border-1 border-gray-300 rounded-md p-2" />
                    </div>

                    <div className="flex flex-col gap-5 mt-5">
                        <label>Tournament Logo:</label>
                        <input onChange={onChangeHandler} type="file" className="w-[300px] md:w-[600px] border-1 border-gray-300 rounded-md p-2" />
                    </div>
                </div>

                <div className="flex gap-10">
                    <button onClick={createHandler} className="w-[150px] h-[40px] bg-gray-200 hover:bg-gray-400 mt-10 rounded-md">Create</button>
                    <button onClick={() => navigate("/admin")} className="w-[150px] h-[40px] bg-gray-200 hover:bg-gray-400 mt-10 rounded-md">Back</button>
                </div>
            </div>

            <div className="p-10">
                <h1 className="text-xl md:text-3xl font-bold">Tournament List</h1>
                <div>
                    <ul className="list rounded-box shadow-md bg-gray-200 hover:bg-gray-400">
  
                        <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">Tournament List</li>

                        <div>
                            {
                                tournamentList?.map((tournament) => (
                                    <li className="list-row m-2" key={tournament._id}>
                                        <div><img className="size-10 rounded-box" src={tournament?.tournamentLogo}/></div>
                                        <div>
                                        <div>{tournament.tournamentName}</div>
                                        <div className="text-xs uppercase font-semibold opacity-60">{tournament.tournamentType}</div>
                                        </div>
                                        <div className="flex gap-5">
                                            <button onClick={() => deleteHandler(tournament._id)} className="btn btn-square btn-ghost w-[100px]">Delete</button>
                                            <button onClick={() => navigate(`addmatch/${tournament._id}`)} className="btn btn-square btn-ghost w-[100px]">Add Match</button>
                                            <button onClick={() => navigate(`addteam/${tournament._id}`)} className="btn btn-square btn-ghost w-[100px]">Add Team</button>
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

export default TournamentControl;