import Sidebar from "./Sidebar";
import { useRef, useState } from "react";
import { useGame } from "../hooks/useGame";

import "../styles/Image.css"
import "../styles/Homepage.css"
import "../styles/Sidebar.css"
import ScoreForm from "./ScoreForm";
import { Modal } from "./Modal";
import LeaderboardTable from "./LeaderboardTable";
import { fetchScores } from "../services/leaderboardService";

function Homepage(){

    const [showHitbox, setShowHitbox] = useState(false);
    const [hitboxDims, setHitboxDims] = useState(null);
    const [message, setMessage] = useState(null);
    const [timerActive, setTimerActive] = useState(false);
    const [showModal, setShowModal] = useState(null); // "leaderboard"/"scoreform"
    const [scores, setScores] = useState(null);
    const IS_AUTHORING = false; // used for editing mode
    const [startPoint, setStart] = useState(null);
    const {game, inGame, startGame, endGame, playMove, error, submitScore } = useGame();
    const [currentScore, setCurrentScore] = useState(null);

    const imgRef = useRef(null);

    const HITBOX_WIDTH = 0.05;
    const HITBOX_HEIGHT = 0.05;





    // Returns normalized coordinates between 0 and 1
    function getCoords(e){

        const img = imgRef.current;
        if(!img) return null;

        const rect = img.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;

        return {
            x: Math.min(Math.max(x, 0), 1),
            y: Math.min(Math.max(y, 0), 1), // clamp results between 0 and 1
        }

    }

    // Used in authoring mode to draw boxes around characters and log to console their normalized borders
    function getBorderBox(startPoint, endPoint){
        
        const img = imgRef.current;
        if(!img) return null;

        const rect = img.getBoundingClientRect();

        const width = Math.abs(startPoint.x - endPoint.x) * rect.width; 
        const height = Math.abs(startPoint.y - endPoint.y) * rect.height;


        const left = Math.min(startPoint.x, endPoint.x) * rect.width
        const top = Math.min(startPoint.y, endPoint.y) * rect.height;

        console.log(`Normalized borders are - 
            left:${left/rect.width},
            top: ${top/rect.height},
            width: ${width/rect.width},
            height: ${height/rect.width}`)
        return {
            left, top, width, height
        }
    }

    function getHitbox(coords){



        const img = imgRef.current;
        if(!img) return null;

        const rect = img.getBoundingClientRect();



        const width = HITBOX_WIDTH * rect.width;
        const height = HITBOX_HEIGHT * rect.height;

        const left = coords.x * rect.width - width / 2;
        const top = coords.y * rect.height - height / 2;

        
        return {
            left, top, width, height
        }
    }

    async function handleClick(e){
        if(!inGame) return;
        const coords = getCoords(e);

        if(IS_AUTHORING){
            
            if(!startPoint){
                setStart(coords);
                setShowHitbox(false);
                return;
            }
            if(startPoint){
                const dims = getBorderBox(startPoint, coords);               
                setHitboxDims(dims);
                setShowHitbox(true);
                setStart(null);
                return;
            }
        }
        setShowHitbox(true);
        setHitboxDims(getHitbox(coords));

        const hit = playMove(coords);
        if(hit){
            setMessage("Good!");
            setTimerActive(false);
            endGame();
            setShowModal("scoreform")
            return;
        }
        else{setMessage("Not quite!");}
    }

    async function handleNewGame(){
        await startGame();
        setTimerActive(true);
        setShowHitbox(false);
        setMessage(null);
    }

    async function handleSubmitScore(name){
        const score = await submitScore(name);
        setCurrentScore(score);
        openLeaderboardModal();
    }

    async function openLeaderboardModal() {
        try{
            const data = await fetchScores();
            setScores(data);
            setShowModal("leaderboard");
  
        } catch (err){
            setMessage(err.message);
        }
    }


    return(


        <div className="homepage">

            {showModal === "scoreform" && 
                <Modal setShowModal={setShowModal}>
                    <ScoreForm score={game.score} handleSubmit={handleSubmitScore}/>
                </Modal>
            }

            {showModal === "leaderboard" &&
                <Modal setShowModal={setShowModal}>
                    <LeaderboardTable scores={scores} currentScore={currentScore}/>
                </Modal>
            }
            <div className="content-container">
                
                <div className="image-column">
                    <div className="image-wrapper">
                        <img src={"/crowd.png"} ref={imgRef} alt="crowd" onClick={(e) => handleClick(e)} />
                        <div className="overlay">
                            { showHitbox && <div className="hitbox" style={{
                                left: `${hitboxDims.left}px`,
                                top: `${hitboxDims.top}px`,
                                width: `${hitboxDims.width}px`,
                                height: `${hitboxDims.height}px`
                                }}>
                            </div>}
                        </div>
                    </div>
                </div>
                <Sidebar handleNewGame={handleNewGame} startTime={game? new Date(game.startTime).getTime(): 0} endTime={game? new Date(game.endTime).getTime(): 0} message={message} error={error} iconId={game?.target.id || "000"} timerActive={timerActive}/>
            </div>
        </div>
    )
}

export default Homepage;
