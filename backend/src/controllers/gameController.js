import { prisma } from "../config/prisma.js";
import targets from "../config/targets.js";
import { getIconSignedUrl } from "../services/iconService.js";

const games = {}

// Randomly selects target to find
function getTarget(){
    const index = Math.floor(Math.random() * targets.length);
    return targets[index];
}
export async function startGame(req, res){
     const gameId = crypto.randomUUID();
     const startTime = new Date();
     const endTime = null;
     const status = "ongoing"
    const target = getTarget();
    // const iconUrl = await getIconSignedUrl(`targets/${target.id}.png`);
    const game = {gameId, startTime, endTime, status};
    games[gameId] = game;
    return res.json({...game, target, });
}

export async function endGame(req, res, next){

    const endTime = new Date();
    const game = games[req.params.gameId];
    if(!game)  return res.status(404).json({
        message: "game not found"
    });
    if(game.status === "finished"){
        return res.status(400).json({
            message: "invalid request"
        });
    }

    game.status = "finished"; // probably no longer necessary
    game.endTime = endTime;
    const elapsedTime = game.endTime - game.startTime;

    try{
        await prisma.game.create({
            data:{
                startedAt: game.startTime,
                finishedAt: game.endTime,
                elapsedTime
            }
        })
    } catch (err){
        next(err);
    }

    return res.status(200).json({
        message: "game finished",
        elapsedTime
    });
}

