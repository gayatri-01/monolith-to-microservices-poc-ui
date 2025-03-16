import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation(); // Get the current active route

  return (
    <nav className="navbar">
      <ul>
        <li className={location.pathname === "/" ? "active" : ""}>
          <Link to="/">Home</Link>
        </li>
        <li className={location.pathname === "/research" ? "active" : ""}>
          <Link to="/research">Research</Link>
        </li>
        <li className={location.pathname === "/approaches" ? "active" : ""}>
          <Link to="/approaches">PoC</Link>
        </li>
        <li className={location.pathname === "/evaluation" ? "active" : ""}>
          <Link to="/evaluation">Evaluation</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
