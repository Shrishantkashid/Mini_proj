import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{ padding: "10px", background: "#eee" }}>
      <Link to="/dashboard" style={{ marginRight: 10 }}>Dashboard</Link>
      <Link to="/skills" style={{ marginRight: 10 }}>Skills</Link>
      <Link to="/match" style={{ marginRight: 10 }}>Match</Link>
      <Link to="/sessions" style={{ marginRight: 10 }}>Sessions</Link>
    </nav>
  );
}

export default Navbar;
