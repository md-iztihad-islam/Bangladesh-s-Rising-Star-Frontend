import { useNavigate } from "react-router-dom";
import { useGetTournamentQuery } from "../../api/tournamentApi";

function Standings(){
    const navigate = useNavigate();
    const {data} = useGetTournamentQuery();
    const tournamentData = data?.data;
    return(
        <div>
            <div className="flex flex-col mb-10 justify-center items-center mt-10">
                <h1 className="text-xl md:text-3xl font-bold">Tournaments</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
                    {
                        tournamentData?.map((tournament) => <Card key={tournament._id} data={tournament} onClick={() => navigate(`pointtable/${tournament._id}`)} />)
                    }
                </div>
            </div>
        </div>
    );
};

export default Standings;

function Card({onClick, data}){
    return(
        <div onClick={onClick} className="cursor-pointer hover:shadow-lg transform hover:scale-105 duration-300 ease-in-out">
            <div className="card bg-base-100 w-80 shadow-sm">
                <figure>
                    <img
                        src={data?.tournamentLogo || "https://images.unsplash.com/photo-1612838320302-4b3b3b3b3b3b"}
                        alt="Shoes"
                    />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">
                        {data.tournamentName}
                    </h2>
                    <h2 className="card-title">
                        {data.tournamentType}
                    </h2>
                </div>
            </div>
        </div>
    );
};