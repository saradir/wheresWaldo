import { useEffect, useState } from "react";

function Timer({startTime}){


    const elapsed = startTime? Date.now() - startTime : 0
    const [tick, setTick] = useState(0);

    function formatTime(){
        const totalSeconds = Math.floor(elapsed / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60

        const secondsString = (seconds < 10)? `0${seconds}` : `${seconds}`
        const minutesString = (minutes < 10)? `0${minutes}`: `${minutes}`
        return {minutesString, secondsString}
    }
    useEffect(() => {
        if(!startTime) return;
        const interval = setInterval(() => setTick(v => v + 1), 1000);
    
        return () => clearInterval(interval);
    }, [startTime]);

    return(

        <p className="timer">{formatTime().minutesString}:{formatTime().secondsString}</p>
  
    )
}

export default Timer;