import { Link} from "react-router-dom";
import "../styles/Navbar.css"
function Navbar(){


    return(
        <nav className="navbar">
            <Link to={'/'}>Homepage </Link>
            <Link to={'/leaderboard'}>Leaderboard</Link>

        </nav>
    )
}

export default Navbar