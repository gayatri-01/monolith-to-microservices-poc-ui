



function Research() {


  return (
    <div style={{ color: "black" }}>
      <br />
      <br />
      <br />
      <br />
    <h4>There is rich literature on the various approaches and in-market tools for Microservices Decomposition. Majorly, they involve Clustering algorithms and Graph-Based approaches.</h4>
    <br />
    <div className="approach-description">
    One of the in-market, widely used tools is <b>IBM’s Mono2Micro</b> tool.  It uses machine learning to analyse Java-based Monoliths and assists in their automatic decomposition to microservices. Along with candidate microservices, it provides recommendations for refactoring as well to simplify the migration process. It uses a combination of static & run-time analysis data to determine the most suitable microservice groupings. It is an enterprise solution that works well mostly for IBM based environments and tech stacks such as IBM Websphere and Open Liberty.
  </div>
  <div className="approach-description">Another one is the <b>AWS Microservices Extractor</b> tool for .NET based monoliths. It provides visualization, recommendations and automatic decompositions. It works by integrating AWS Migration Hub and AWS Toolkit for Visual Studio. It allows for a decomposition that is cloud-native, thus allowing seamless migration to AWS Cloud tools. However the tool works majorly for .NET applications and is AWS centric.</div>
  <div className="approach-description">One of the other popular researches, cited by many in this domain is, the <b>Service Cutter</b>. It is  an open-source tool designed to decompose monolithic applications into microservices based on various criteria such as entity-relationship models, source code dependencies, business processes and runtime interactions, thus using architectural heuristics as well as user-defined inputs to propose microservice candidates. It leverages many graph clustering algorithms. However, it does require manual refinement and domain knowledge to achieve high quality results. </div>
  <div className="approach-description">Another tool, <b>CARGO (Context-Aware Recommendation for Microservice Decomposition)</b>, is a semi-automated tool for monolith decompositions, that leverages static and dynamic analysis to factor in class interactions, data interactions, data-access patterns, domain-driven design principles by applying graph clustering techniques to propose microservice candidates. Its key feature is context-awareness which helps developers to customise decomposition strategies based on business constraints, performance challenges and maintainability concerns.It requires manual validations to align with real-world business needs.</div>

  </div>
  );
}

export default Research;
