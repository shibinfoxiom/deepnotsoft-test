import { Link } from "react-router-dom"
import logo from "../assets/logo.png"

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img src={logo || "/placeholder.svg"} alt="Deep Net Soft" className="logo" />
          <div className="logo-text">
            <span className="logo-deep">DEEP</span>
            <span className="logo-net">NET</span>
            <span className="logo-soft">SOFT</span>
          </div>
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              HOME
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/" className="nav-link">
              MENU
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/" className="nav-link">
              MAKE A RESERVATION
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/" className="nav-link">
              CONTACT US
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/admin" className="nav-link">
              ADMIN
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar

