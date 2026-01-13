import express from "express";
import * as gameController from "../controllers/gameController.js";

const gameRouter = express.Router();

gameRouter.post("/new", gameController.startGame);
gameRouter.post("/:gameId/end", gameController.endGame);

export default gameRouter;