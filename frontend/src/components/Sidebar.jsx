import icon from "../assets/overall_man_icon.png"

function Sidebar() {
  return (
    <aside className="sidebar">
      <h2>Find this person!</h2>

      <img src={icon} alt="Target person to find" />

      <div className="timer">00:00</div>

      <button type="button">Start Again!</button>
    </aside>
  );
}


export default Sidebar;