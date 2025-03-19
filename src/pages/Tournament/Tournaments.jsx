import { useNavigate } from "react-router-dom";
import { useGetTournamentQuery } from "../../api/tournamentApi";


function Tournament(){
    const navigate = useNavigate();

    const {data, refetch} = useGetTournamentQuery();
    const tournamentList = data?.data;
    return(
        <div>
            <div className="flex flex-col mb-10 justify-center items-center mt-10">
                <h1 className="text-xl md:text-3xl font-bold">DHAKA'S RISING STARS</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-10">
                    {
                        tournamentList?.map((tournament) => (
                            <Card onClick={() => navigate(`/tournament/${tournament._id}/fixtures`)} data={tournament} key={tournament._id} />
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default Tournament;

function Card({onClick, data}){
    return(
        <div onClick={onClick} className="cursor-pointer hover:shadow-lg transform hover:scale-105 duration-300 ease-in-out">
            <div className="card bg-base-100 w-80 shadow-sm">
                <figure>
                    <img
                    src={data.tournamentLogo || "/logo.png"}
                    alt="Logo" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">
                        {data.tournamentName}
                    <div className="badge badge-secondary">{data.tournamentType}</div>
                    </h2>
                </div>
            </div>
        </div>
    );
};