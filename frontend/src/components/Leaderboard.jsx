import { useEffect, useState } from "react";
import "../styles/Leaderboard.css"
import LeaderboardTable from "./LeaderboardTable.jsx"
import { fetchScores } from "../services/leaderboardService.js";
function Leaderboard(){
    const [error, setError] = useState(null);
    const [scores, setScores] = useState(null);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        let cancelled = false;
        setLoading(true);
        fetchScores()
            .then(data => {
                if(!cancelled) setScores(data);
            })
            .catch((err) => {
                setError(err.message);               
            })
            .finally(() => {
                if(!cancelled) setLoading(false);
            })
        
        return () => {
            cancelled = true;
        }
    }, []);

    if(error) return <p>{error}</p>
    if(loading) return <p>Loading...</p>

    return(
        <div className="leaderboard-page">
            <div className="leaderboard-container">
                <h1>Leaderboard</h1>
                <LeaderboardTable scores={scores} />

            </div>
        </div>
    );
}


export default Leaderboard;   
