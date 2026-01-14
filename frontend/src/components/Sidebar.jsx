import icon from "../assets/overall_man_icon.png"
import Timer from "./Timer";
function Sidebar({message, handleNewGame, startTime, endTime, error}) {


  return (
    <aside className="sidebar">
      <h2>Find this person!</h2>

      <img src={icon} alt="Target person to find" />

      <p>
        Find the person shown in the icon in the picture on the left and click them.
        Click “New Game” to start.
      </p>

      <Timer startTime={startTime} endTime={endTime} />

      {message && <div className="message">{message}</div>}
      {error && <div className="error-message">{error}</div>}

      <button type="button" onClick={handleNewGame}>New Game</button>
    </aside>
  );
}


export default Sidebar;