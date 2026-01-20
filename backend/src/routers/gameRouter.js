import express from "express";
import * as gameController from "../controllers/gameController.js";
import { validateSaveRecord } from "../validators/saveRecordValidator.js";
const gameRouter = express.Router();

gameRouter.post("/new", gameController.startGame);
gameRouter.post("/:gameId/end", gameController.endGame);
gameRouter.post("/:gameId/saveRecord", validateSaveRecord, gameController.saveRecord);
gameRouter.get("/leaderboard", gameController.getLeaderboard);

export default gameRouter;