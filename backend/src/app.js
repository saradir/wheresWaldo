import express from "express";
import cors from "cors";
import { corsOptions } from "./config/corsOptions.js";
import  gameRouter  from "./routers/gameRouter.js";
import 'dotenv/config';


const app = express();
console.log(corsOptions);
app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) =>{
    res.json({
        message:"Welcome"
    });
})


app.use(express.json());
app.use("/api/games", gameRouter);


app.listen(PORT, () => console.log(`Server started on ${PORT}`));

export default app;
