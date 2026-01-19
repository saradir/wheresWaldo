import { useEffect, useState } from "react";
import "../styles/Leaderboard.css"
import LeaderboardTable from "./LeaderboardTable.jsx"

function Leaderboard(){
    const [error, setError] = useState(null);
    const [scores, setScores] = useState(null);
    const [loading, setLoading] = useState(false);

    async function fetchScores(){
        setLoading(true);
        try{
            const response = await fetch(`${import.meta.env.VITE_API_SERVER}/api/games/leaderboard`);
            const data = await response.json();

            if(!response.ok){
                setError(data.message || 'Failed to fetch leaderboard');
                return;
            }
            setScores(data);

        } catch (err){
            setError(err.message);
            return;
        } finally{
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchScores();
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
