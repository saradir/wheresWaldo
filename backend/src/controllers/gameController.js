const games = {}

export function startGame(req, res){
     const gameId = crypto.randomUUID();
     const startTime = Date.now();
     const endTime = null;
     const status = "ongoing"

    const game = {gameId, startTime, endTime, status};
    games[gameId] = game;
    return res.json(game);
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

