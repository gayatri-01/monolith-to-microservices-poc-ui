import { useNavigate } from "react-router-dom";
function Overview() {
  const navigate = useNavigate(); // Hook for navigation
  return (
    <div className="p-8">
      {/* AI Header */}
      <div className="ai-header">
        AI-Driven Monolith to Microservices Decomposition
        <span>
          A PoC for Revolutionizing Monolith-to-Microservices with Unsupervised
          Learning
        </span>
        <br />
        {/* <span className="ai-counter">+1023 microservices identified</span> */}
        <div className="ai-buttons">
          {/* Use onClick with navigate */}
          <button
            className="gradient-btn"
            onClick={() => navigate("/research")}
          >
            Research Overview
          </button>
          <button
            className="gradient-btn"
            onClick={() => navigate("/approaches")}
          >
            PoC Overview
          </button>
        </div>
        <div className="project-info">
          <h3>A Dissertation Project</h3>
          <p className="author">By</p>
          <p className="name">Gayatri Srinivasan Mahalakshmi</p>
          <p className="id">2023MT93014</p>
          <p className="course">MTech Software Engineering, BITS WILP</p>
        </div>
      </div>
    </div>
  );
}

export default Overview;
