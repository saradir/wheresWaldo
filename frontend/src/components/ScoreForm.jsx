import { useState } from "react";
import "../styles/ScoreForm.css"

function ScoreForm({score, handleSubmit}){

    const [name, setName] = useState('');
    if(!score) return null;
    return(
        <div className="score-window" >
          <div className="content">
              
            <p>
                Congrats! Your time is 
                <span className="time"> {score}ms</span>
            </p>
              <p>Enter your name to submit score:</p>
              <input type="text" id="name" name="name" value={name} onChange={e => setName(e.target.value)} required></input>
          </div>
            <div className="controls">
                <button type="button" onClick={() => handleSubmit(name)}>Submit result</button>
            </div>
        </div>
    )
}

export default ScoreForm;