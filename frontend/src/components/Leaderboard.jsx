import { useEffect, useState } from "react";

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
        <div className="leaderboard">
            <ul>
                {scores?.map((score) => (
                    <li key={score.id}>
                        {score.playerName} -- {score.time}
                    </li>
                ))}
            </ul>
        </div>
    )
}


export default Leaderboard;   
