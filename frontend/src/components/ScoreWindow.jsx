import "../styles/ScoreWindow.css"

function ScoreWindow({score}){

    if(!score) return null;
    return(
        <div className="score-window">
            <p>Congrats! Your score is {score}</p>
        </div>
    )
}

export default ScoreWindow;