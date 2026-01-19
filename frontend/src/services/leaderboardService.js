    export async function fetchScores(){

            const response = await fetch(`${import.meta.env.VITE_API_SERVER}/api/games/leaderboard`);
            const data = await response.json();

            if(!response.ok){
                throw new Error(data.message || "Failed to fetch leaderboard");
            }

            return data;
        }
            

