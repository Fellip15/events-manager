import "./navbar.css"
import { Link } from "react-router-dom";

const Navbar = props => {
    return (
        <div className="navbar-body">
            <ul className="navbar">
                <li className="navbar-li">
                    <Link to="/" className="navbar-link">Home</Link>
                </li>
                <li className="navbar-li">
                    <Link to="/login" className="navbar-link">Sign in</Link>
                </li>
                <li className="navbar-li">
                    <Link to="/register" className="navbar-link">Sign up</Link>
                </li>
                <li className="navbar-li">
                    <Link to="/myEvents" className="navbar-link">My Events</Link>
                </li>
            </ul>
        </div>
    )
}

export default Navbar