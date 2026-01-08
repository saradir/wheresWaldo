import crowdImg from "../assets/crowd.png";
import { useRef, useState } from "react";
import "../styles/Image.css"

function Homepage(){

    const [showHitbox, setShowHitbox] = useState(false);
    const [hitboxDims, setHitboxDims] = useState(null);
    const HITBOX_WIDTH = 0.05;
    const HITBOX_HEIGHT = 0.05;
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
        setShowHitbox(true);
        console.log(coords);
        setHitboxDims(getHitbox(coords));

    }
    const imgRef = useRef(null);
    return(
        <>
            <div className="image-wrapper">
                <img src={crowdImg} ref={imgRef} alt="crowd" onClick={(e) => handleClick(e)} />
            </div>

            { showHitbox && <div className="hitbox" style={{
                left: `${hitboxDims.left}px`,
                top: `${hitboxDims.top}px`,
                width: `${hitboxDims.width}px`,
                height: `${hitboxDims.height}px`

            }}>
                </div>}
        </>
    )
}

export default Homepage;