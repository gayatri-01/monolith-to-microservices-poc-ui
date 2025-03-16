import React from "react";
// import "./Evaluation.css"; // Import CSS for styling

const evaluationData = [
  { id: 1, category: "Static Analysis", approach: "Call Graph with Clustering Algorithm", modularity: 0.2083, coupling: 0.5833, cohesion: 0.4167, color: "#b0c4ff" },
  { id: 2, category: "Static Analysis", approach: "OpenAPI Embedding Based Clustering", modularity: 0.3744, coupling: "NA", cohesion: "NA", color: "#b0c4ff" },
  { id: 3, category: "Static Analysis", approach: "Dependency Graph with AST, GNN and Clustering", modularity: 0.1972, coupling: 1.0000, cohesion: 0.5175, color: "#b0c4ff" },
  { id: 4, category: "Database Aware Analysis", approach: "Dependency Graph considering Data Sources with AST,GNN and Clustering Algorithm", modularity: 0.1644, coupling: 0.0000, cohesion: 0.3006, color: "#ffedb0" },
  { id: 5, category: "Lexical Analysis", approach: "Functional Semantics Similarities using Code2Vec and Clustering", modularity: 0.4990, coupling: 0.2609, cohesion: 0.6409, color: "#e8b0c4" },
  { id: 6, category: "Dynamic Analysis", approach: "Web Server Access Logs with Clustering Algorithm", modularity: 0.3333, coupling: 0.8000, cohesion: 0.2000, color: "#ffb27f" },
];

const Evaluation: React.FC = () => {
  return (
    <div className="evaluation-container">
      <br />
      <br />
      <h3>Evaluation of PoC Approaches</h3>
      <table className="evaluation-table">
        <thead>
          <tr>
            <th>PoC Approach Number</th>
            <th>Approach Category</th>
            <th>Approach Name</th>
            <th>Modularity Score</th>
            <th>Coupling Score</th>
            <th>Cohesion Score</th>
          </tr>
        </thead>
        <tbody>
          {evaluationData.map((item, index) => (
            <React.Fragment key={item.id}>
              {/* Section Break */}
              {index > 0 && evaluationData[index - 1].category !== item.category && <tr className="section-break"><td colSpan={6}></td></tr>}
              
              {/* Table Row */}
              <tr>
                <td>{item.id}</td>
                <td style={{ backgroundColor: item.color }}>{item.category}</td>
                <td>{item.approach}</td>
                <td>{item.modularity}</td>
                <td>{item.coupling}</td>
                <td>{item.cohesion}</td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Evaluation;
