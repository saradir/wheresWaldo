import { useState } from "react";

export function useGame(){
    const [error, setError] = useState(null);
    const [inGame, setInGame] = useState(false);
    const [game, setGame] = useState(null);
    

    async function fetchGame(){
        try{
            const response = await fetch(`${import.meta.env.VITE_API_SERVER}/api/games/new`,{
            method: "post",
        });

        const data = await response.json();

        if(!response.ok){
            setError(data.message);
            return;
        }
        return data;
        }
        catch (err){
            setError(err.message);
        }
    }

    async function endGameOnServer(){
        try{
        const response = await fetch(`${import.meta.env.VITE_API_SERVER}/api/games/${game.gameId}/end`,
            {method: "post"}
        );

        const data = await response.json();

        if(!response.ok){
            setError(data.message);
            return;
        }
        return data;
        } catch(err){
            setError(err.message);
        }
    }

    async function startGame(){
        const game = await fetchGame();
        if (!game) return;       
        setGame(game);
        setInGame(true);
        setError(null);
    }


    async function endGame(){
        if(!game) return;
        const result = await endGameOnServer();
        setGame({...game, endTime: result.endTime, score: result.elapsedTime, id: result.gameId})
        setInGame(false);
    }

    function playMove(coords){
        if(!inGame) return;
        if(calculateHit(coords, game.target)) {
            return true;
        }
        return false;
    }

    function calculateHit(coords, target) {
        return (
            coords.x >= target.left &&
            coords.x <= target.left + target.width &&
            coords.y >= target.top &&
            coords.y <= target.top + target.height
        );
    }

    async function submitScore(name){
        try{
            const response = await fetch(`${import.meta.env.VITE_API_SERVER}/api/games/${game.id}/saveRecord`,
            {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },            
                body: JSON.stringify({playerName: name}),
                }
            );
            const data =  await response.json();

            if(!response.ok){
                setError(data.message);
                return;
            }
            return data;
        } catch (err){
            setError(err.message);
        }
    }

    return{
        game, 
        inGame,
        error,
        startGame,
        endGame,
        playMove,
        submitScore
    }
}