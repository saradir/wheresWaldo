import { Link} from "react-router-dom";
import "../styles/Navbar.css"
function Navbar(){


    return(
        <div className="navbar">
            
            <nav className="nav">
                <Link to={'/'}>Homepage </Link>
                <Link to={'/leaderboard'}>Leaderboard</Link>
            </nav>

        </div>
    )
}

export default Navbar