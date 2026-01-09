import crowdImg from "../assets/crowd.png";
import { useRef, useState } from "react";
import "../styles/Image.css"
import "../styles/homepage.css"
import "../styles/sidebar.css"
function Homepage(){

    const [showHitbox, setShowHitbox] = useState(false);
    const [hitboxDims, setHitboxDims] = useState(null);

    const [mode, setMode] = useState("play");
    const [startPoint, setStart] = useState(null);
    const [endPoint, setEnd] = useState(null);

    const HITBOX_WIDTH = 0.05;
    const HITBOX_HEIGHT = 0.05;


    const overallMan = {
            left:0.431640625,
            top: 0.7036196319750567,
            width: 0.0869140625,
            height: 0.2626953125
        }

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

    function calculateHit(coords, target) {
    return (
        coords.x >= target.left &&
        coords.x <= target.left + target.width &&
        coords.y >= target.top &&
        coords.y <= target.top + target.height
    );
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

    function handleClick(e){

        const coords = getCoords(e);

        if(mode==="auth"){
            
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
        console.log(coords);
        setHitboxDims(getHitbox(coords));
        if(calculateHit(coords, overallMan)) console.log("good!");

    }
    const imgRef = useRef(null);
    return(


        <div className="homepage">
            <nav>
                placeholder
            </nav>
            <div className="content-container">
                <div className="image-column">
                    <div className="image-wrapper">
                        <img src={crowdImg} ref={imgRef} alt="crowd" onClick={(e) => handleClick(e)} />
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
                <div className="sidebar">
                    Placeholder
                </div>
            </div>
        </div>
    )
}

export default Homepage;