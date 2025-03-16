import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Overview from "./pages/Overview";
import Approaches from "./pages/Approaches";
import Research from "./pages/Research";
import Evaluation from "./pages/Evaluation";

function App() {
  return (
    <Router>
      <Navbar />  {/* ✅ Move Navbar here */}
      <div className="container">
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/approaches" element={<Approaches />} />
          <Route path="/research" element={<Research />} />
          <Route path="/evaluation" element={<Evaluation />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
