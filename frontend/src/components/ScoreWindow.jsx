import "../styles/ScoreWindow.css"

function ScoreWindow({score}){

    if(!score) return null;
    return(
        <div className="score-window" onClick={e => e.stopPropagation()}>
          <div className="content">
              
            <p>
                Congrats! Your time is 
                <span className="time"> {score}ms</span>
            </p>
              <p>Enter your name to submit score:</p>
              <input type="text" id="name" name="name" required></input>
          </div>
            <div className="controls">
                <button type="button">Submit result</button>
                <button type="button">Skip</button>
            </div>
        </div>
    )
}

export default ScoreWindow;