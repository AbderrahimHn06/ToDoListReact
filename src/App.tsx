import { Route, Routes, Link } from "react-router-dom";
import Home from "./Home";
import Settings from "./Settings";
import "./App.css";

export default function App() {
  return (
    <>
      <nav className="navbar">
        <div className="logo">LoanApp</div>

        <div className="nav-buttons">
          <Link to="/">
            <button className="nav-btn">Home</button>
          </Link>

          <Link to="/settings">
            <button className="nav-btn">Settings</button>
          </Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </>
  );
}
