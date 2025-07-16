import { Link } from "react-router-dom";
import "../css/navbar.css";
import { GiMagnifyingGlass } from "react-icons/gi";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";
import { ThemeToggle } from "./ThemeToggle";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => setMenuOpen(!menuOpen);

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <Link to="/" className="style-logo">
                    <div className="logo style-logo"><GiMagnifyingGlass /> Lupa dos Gastos</div>
                </Link>

                <div className={`menu ${menuOpen ? "open" : ""}`}>
                    <ul>
                        <li><Link to="/" className="nav-link">Home</Link></li>
                        <li><Link to="/partidos" className="nav-link">Partidos</Link></li>
                        <li><Link to="/proposicoes" className="nav-link">Proposições</Link></li>
                    </ul>
                </div>
            </div>

            <div className="navbar-right">
                <ThemeToggle />
                <button className="hamburger" onClick={toggleMenu}>
                    <GiHamburgerMenu size={24} />
                </button>
            </div>
        </nav>

    );
};

export default Navbar;
