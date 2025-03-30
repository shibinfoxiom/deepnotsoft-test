import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import MenuPage from "./pages/MenuPage"
import AdminPage from "./pages/AdminPage"
import Footer from "./components/Footer"
import "./App.css"

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<MenuPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App

