export function validateSaveRecord(req, res, next) {

    const gameId = Number(req.params.gameId)
    const {playerName} = req.body;

    // Validate gameId param in URL
    if(!Number.isInteger(gameId) || gameId <= 0){
        return res.status(400).json({
            message: "Invalid game ID"
        });
    }

    // Validate player's name

    if (typeof playerName !== "string") {
        return res.status(400).json({ message: "Invalid name" });
    }

    const trimmed = playerName.trim();

    if (trimmed.length < 1 || trimmed.length > 20) {
        return res.status(400).json({
        message: "Name must be between 1 and 20 characters"
        });
    }

    req.params.gameId = gameId;
    req.body.playerName = trimmed;
    next();
}