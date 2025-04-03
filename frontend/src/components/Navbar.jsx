"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import logo from "../assets/logo.png"

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-top">
          <Link to="/" className="navbar-logo">
            <img src={logo || "/placeholder.svg?height=40&width=40"} alt="Deep Net Soft" className="logo" />
            <div className="logo-text">
              <span className="logo-deep">DEEP</span>
              <span className="logo-net">NET</span>
              <span className="logo-soft">SOFT</span>
            </div>
          </Link>
          <button className="mobile-menu-toggle" onClick={toggleMobileMenu} aria-label="Toggle menu">
            <div className={`hamburger ${mobileMenuOpen ? "open" : ""}`}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>
        </div>
        <ul className={`nav-menu ${mobileMenuOpen ? "open" : ""}`}>
          <li className="nav-item">
            <Link to="/" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
              HOME
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
              MENU
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
              MAKE A RESERVATION
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
              CONTACT US
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/admin" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
              ADMIN
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar

