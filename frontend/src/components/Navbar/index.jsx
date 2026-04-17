import { BiMenuAltRight } from "react-icons/bi";
import "./index.css"

const Navbar = () => {
    const temp = 1

    return (
        <ul className="navbar">
            <li className="logo-container nav-item">
                <img src="https://res.cloudinary.com/dvzcnvazm/image/upload/v1776409805/1._KoinX_Logo_mzwuh2.png" className="app-logo" alt="koinx logo" /> 
            </li>
            <li className="nav-item menu-icon">
                <button type="button" className="menu-btn">
                    <BiMenuAltRight size={30} />
                </button>
            </li>
        </ul>
    )
}

export default Navbar;