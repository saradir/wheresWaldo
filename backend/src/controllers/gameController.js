const games = {}
const targets = []
const target_001 = {
            id: "001",
            name: "overall_man",
            left:0.431640625,
            top: 0.7036196319750567,
            width: 0.0869140625,
            height: 0.2626953125
        }

targets.push(target_001);

// Randomly selects target to find
function getTarget(){
    const index = Math.round(Math.random() * targets.length);
    return targets[index];
}
export function startGame(req, res){
     const gameId = crypto.randomUUID();
     const startTime = Date.now();
     const endTime = null;
     const status = "ongoing"
    const target = getTarget();
    const game = {gameId, startTime, endTime, status};
    games[gameId] = game;
    return res.json({...game, target});
}

export function endGame(req, res){

    const endTime = Date.now();
    const game = games[req.body.gameId];
    if(!game)  return res.status(404).json({
        message: "game not found"
    });
    if(game.status === "finished"){
        return res.status(400).json({
            message: "invalid request"
        });
    }

    game.status = "finished";
    game.endTime = endTime;

    return res.status(200).json({
        message: "game finished",
        elapsedTime: endTime - game.startTime
    });
}

