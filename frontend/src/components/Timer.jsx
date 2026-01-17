import { useEffect, useState } from "react";

function Timer({startTime, endTime, active}){

    
    const elapsed = startTime? Date.now() - startTime : 0
    const [tick, setTick] = useState(0);


    function formatTime(time){
        const totalSeconds = Math.floor(time / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60

        const secondsString = (seconds < 10)? `0${seconds}` : `${seconds}`
        const minutesString = (minutes < 10)? `0${minutes}`: `${minutes}`
        return `${minutesString}:${secondsString}`
    }
    useEffect(() => {
        if(!active) return;
        const interval = setInterval(() => setTick(v => v + 1), 1000);
    
        return () => clearInterval(interval);
    });

    return(
        endTime
        ? <p className="timer">{formatTime(endTime - startTime)}</p>
        : <p className="timer">{formatTime(elapsed)}</p>
  
    )
}

export default Timer;