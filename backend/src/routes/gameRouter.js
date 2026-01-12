import express from "express";


const gameRouter = express.Router();

gameRouter.post("/new", gameController.startGame);
gameRouter.post("/finish", gameController.endGame);