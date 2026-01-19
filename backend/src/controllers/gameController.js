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
    const score = null;
    const target = getTarget();
    const game = {gameId, startTime, endTime, score};
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
    game.endTime = endTime;
    const elapsedTime = game.endTime - game.startTime;

    try{
        const row = await prisma.game.create({
            data:{
                startedAt: game.startTime,
                finishedAt: game.endTime,
                elapsedTime
            }
        });
        return res.status(200).json({
            message: "game finished",
            elapsedTime,
            gameId: row.id,
            endTime
        });
    }
    catch (err){
        next(err);
    }
}

export async function saveRecord(req, res, next){

    try{
        const game = await prisma.game.findUnique({
            where:{
                id: Number(req.params.gameId)
            }
        });

        if(!game){
            return res.status(404).json({
                message: "invalid request"
            });
        }

        const score = await prisma.score.create({
            data:{
                time: game.elapsedTime,
                playerName: req.body.playerName,
                gameId: game.id              
            }
        });


        // Calculate rank for current score
        const betterScoresCount = await prisma.score.count({
           where: {
                OR: [
                    { time: { lt: score.time } },
                    {
                    time: score.time,
                    createdAt: { lt: score.createdAt }
                    }
                ]
            }

        });

        const rankedScore = {...score, rank: betterScoresCount + 1}


        return res.status(200).json({
            score:rankedScore
        });
    } catch (err){
        next(err);
    }
}

// return top 10 results
export async function getLeaderboard(req, res, next){
    try{
        const leaderboard = await prisma.score.findMany({
        orderBy: {
            time: "asc",
        },
        select: {
            id: true,
            playerName: true,
            time: true,
            createdAt: true
        },
        take: 10,
        });

        return res.status(200).json(
            leaderboard
        )
    } catch (err){
        next(err);
    }
}

