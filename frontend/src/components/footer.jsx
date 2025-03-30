import logo from "../assets/logo.png"

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>CONNECT WITH US</h3>
          <p>
            <i className="phone-icon"></i> +91 9561842140
          </p>
          <p>
            <i className="email-icon"></i> info@deepnetsoft.com
          </p>
        </div>

        <div className="footer-logo">
          <img src={logo || "/placeholder.svg"} alt="Deep Net Soft" className="logo" />
          <div className="logo-text">
            <span className="logo-deep">DEEP</span>
            <span className="logo-net">NET</span>
            <span className="logo-soft">SOFT</span>
          </div>
        </div>

        <div className="footer-section">
          <h3>FIND US</h3>
          <p>First floor, Goa Infopark, Infopark 1397, Kakkanad</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

