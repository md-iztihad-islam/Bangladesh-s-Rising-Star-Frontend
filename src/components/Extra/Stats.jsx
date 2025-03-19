function Stats(){
    return(
        <div className="w-full">
            <div className="stats shadow">
                <div className="stat place-items-center w-[200px]">
                    <div className="stat-title">Players</div>
                    <div className="stat-value text-secondary">200</div>
                </div>

                <div className="stat place-items-center w-[200px]">
                    <div className="stat-title">New Registers</div>
                    <div className="stat-value">100</div>
                </div>
            </div>
        </div>
    );
};

export default Stats;