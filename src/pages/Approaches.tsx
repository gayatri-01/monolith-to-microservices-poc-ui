import { useState } from "react";

const approaches = [
  {
    title: "[POC 1 - Static Analysis] Call Graph with Clustering Algorithm",
    steps: [
      "Parse the dependencies between classes",
      "Represent as a graph structure",
      "Apply Spectral Clustering with KMeans Algorithm",
      "Apply Louvain Clustering Algorithm",
    ],
    summary:
      "It leverages call graph analysis to capture metadata such as Function Calls between classes & Import statements in classes to identify relationships between the various classes of the monolith. The relationship is then represented as a graph structure, with the nodes representing the classes and the edges connecting the related classes as per above identified metadata.",
    monolith: "An ECommerce Application",
    monolithLink:
      "https://github.com/gayatri-01/monolith-to-microservices/tree/main/POC1/Monolith",
    pros: [
      "Captures the functional dependencies correctly",
      "Works well for strongly connected microservices",
      "Can we scaled well",
    ],
    cons: [
      "Call Graphs may not represent the monolith completely, there could be some noise",
      "Overhead for large codebases",
      "Prone to over-segmentation",
    ],
    codeLink:
      "https://github.com/gayatri-01/monolith-to-microservices/tree/main/POC1",
    paper:
      "Migration of monolithic systems to microservices: : A systematic mapping study",
    paperLink: "https://dl.acm.org/doi/10.1016/j.infsof.2024.107590",
    enhancements: [
      "Louvain Clustering Approach to automatically determine number of candidate microservices",
    ],
  },
  {
    title: "[POC 2 - Static Analysis] OpenAPI Embedding Based Clustering",
    steps: [
      "Consider the OpenAPI Specifications",
      "Extract & Process API Operation Names",
      "Convert Operation Names to Numerical Embeddings",
      "Apply Affinity Propagation Clustering Algorithm",
      "Choose the best results",
    ],
    summary:
      "While the previous call graph approach considered the dependencies between modules and helped to identify potential service boundaries, it lacked visibility into external interactions such as API Endpoints. So, the current approach that considers API Interfaces, can be leveraged for the decomposition of Enterprise Monoliths with well defined API Interfaces, whose definitions can be represented as an OpenAPI specification.",
    monolith: "OpenAPI Specifications of ECommerce & Twitter Applications",
    monolithLink:
      "https://github.com/gayatri-01/monolith-to-microservices/blob/main/POC2",
    pros: [
      "Semantic Aware API Grouping - considers the meaning of API Operation Names",
      "Aligns microservices with Business Functionalities as API Operations are often business driven",
    ],
    cons: [
      "This does not analyse API Request/Response Payloads, which may further give better insights",
      "Does not capture API Execution Frequency",
    ],
    codeLink:
      "https://github.com/gayatri-01/monolith-to-microservices/tree/main/POC2",
    paper: "Microservices Identification Through Interface Analysis",
    paperLink: "https://link.springer.com/chapter/10.1007/978-3-319-67262-5_2",
    enhancements: [
      "Pre-processing was applied on Operation Names to enhance the embeddings",
      "GloVe Embeddings was experimented with instead of proposed approach of FastText & Word2Vec",
    ],
  },
  {
    title:
      "[POC 3 - Static Analysis] Dependency Graph with AST, GNN and Clustering Algorithm",
    steps: [
      "Parse the Monolith using AST",
      "Generate Dependency JSON mapping",
      "Create Hetereogeneous Graph from the JSON Mappings",
      "Apply Kmeans on the graph",
      "Use GNN to create embeddings from the Hetero Graph",
      "Apply Kmeans on the embeddings",
    ],
    summary:
      "In this approach we leverage a dependency graph generated using AST parsing and GNN to capture the dependencies between classes and resources. The GNN model learns the embeddings of the nodes in the graph and the clustering algorithm groups the nodes into microservices based on the embeddings.",
    monolith: "DayTrader - A Trading Application",
    monolithLink: "https://github.com/siamaksade/daytrader",
    pros: [
      "Captures Multi–Hop dependencies",
      "Captures multiple types of dependencies",
      "Maintains the semantic relationship between classes & resources",
    ],
    cons: [
      "Depends on the quality of Graph Construction. GNN will learn incorrect embeddings in case there are missing dependencies or incorrect resolutions",
      "Requires careful hyperparameter tuning",
      "Still not very data-aware",
    ],
    codeLink:
      "https://github.com/gayatri-01/monolith-to-microservices/tree/main/POC3",
    paper:
      "Monolith to Microservices: Representing Application Software through Heterogeneous Graph Neural Network",
    paperLink: "https://arxiv.org/abs/2112.01317",
    enhancements: [
      "Using AST for generating dependency graph",
      "Identifying and removing the orphan nodes from the Dependency Graph to avoid data-skewing",
      "Post-Processing to correctly mark the ResourceNames against the ResourceNodes",
      "Experimenting with KMeans on Hetero Graph vs KMeans on GNN Class Embeddings of Hetero Graphs",
    ],
  },
  {
    title:
      "[POC 4 - Static Analysis] Dependency Graph considering Data Sources with AST,GNN and Clustering Algorithm",
    steps: [
      "Continue with the Heterogeneous Graph from the previous approach",
      "Add edges between classes with common resources",
      "Use GNN to create embeddings from the Hetero Graph",
      "Apply Kmeans on the embeddings",
    ],
    summary:
      "While analysing the results of the previous approach, we can see that some of the microservices depend on overlapping resources which goes against one of the major principles of microservices - Each microservice must have its own data resources with well-defined ownership, and  ensure minimal resource sharing between the services.So, we need to enhance the above approach to make it more “Database-Aware” such that there is less resource overlap.",
    monolith: "DayTrader - A Trading Application",
    monolithLink: "https://github.com/siamaksade/daytrader",
    pros: ["Database-Aware Monolith Decomposition"],
    cons: [
      "The Database Dependencies are perceived from AST by checking for classes which refer to “java.sql”. The parser might need enhancements when using different types of data repositories.",
    ],
    codeLink:
      "https://github.com/gayatri-01/monolith-to-microservices/tree/main/POC4",
    paper:
      "Monolith to Microservices: Representing Application Software through Heterogeneous Graph Neural Network",
    paperLink: "https://arxiv.org/abs/2112.01317",
    enhancements: [
      "Database-Aware decomposition by creating enhanced edges between classes with common resources",
    ],
  },
  {
    title:
      "[POC 5 - Lexical Analysis] Functional Semantics Similarities using Code2Vec and Clustering",
    steps: [
      "Extract all Methods from the Monolith",
      "Convert Methods to Code Vectors using Code2Vec",
      "Apply Louvain Clustering Algorithm on the Code Vectors",
    ],
    summary:
      "The idea here is to leverage the functional similarities between various functions of the monolith and then accordingly clustering the semantically similar classes together",
    monolith: "A Blog Application",
    monolithLink: "https://github.com/Raysmond/SpringBlog",
    pros: [
      "Better represents the function be retaining its meaning and workflow by leveraging Code2Vec model",
      "Lexical Analysis helps to find similarities using the semantics of the functions, apart from just dependencies between them",
    ],
    cons: [
      "Generation of Code Vectors for huge monoliths can be a mammoth task",
    ],
    codeLink:
      "https://github.com/gayatri-01/monolith-to-microservices/tree/main/POC5",
    paper:
      "A Microservice Decomposition Method Through Using Distributed Representation of Source Code",
    paperLink:
      "https://www.researchgate.net/publication/349141459_A_Microservice_Decomposition_Method_Through_Using_Distributed_Representation_of_Source_Code",
    enhancements: [
      "Function-Level grouping instead of Class-Level grouping, to have more granularity",
    ],
  },
  {
    title:
      "[POC 6 - Dynamic Analysis] Web Server Access Logs with Clustering Algorithm",
    steps: [
      "Collect Web Server Access Logs",
      "Extract log lines of interest",
      "Build a DiGraph" ,
      "Apply Louvain Clustering Algorithm",
    ],
    summary:
      "The previous microservice decomposition approaches rely on static analysis, whereas this research proposes a log-based dynamic analysis approach using user interaction patterns with the web server to determine service boundaries.",
    monolith: "A Sample Backend of a Monlith Bank Server",
    monolithLink:
      "https://github.com/gayatri-01/monolith-to-microservices/blob/main/POC6/app.py",
    pros: [
      "Captures real-world dependencies based on user interactions",
      "Identifies critical and frequently used services",
    ],
    cons: [
      "Requires well-structured logs",
      "Short-Lived or unused services may get ignored",
    ],
    codeLink:
      "https://github.com/gayatri-01/monolith-to-microservices/tree/main/POC6",
    paper:
      "Unsupervised Learning Approach for Web Application Auto-Decomposition into Microservices",
    paperLink:
      "https://www.researchgate.net/publication/331198800_Unsupervised_Learning_Approach_for_Web_Application_Auto-Decomposition_into_Microservices",
    enhancements: [
      "Edge weights are considered to factor in the frequency of calls",
      "Weak dependencies are identified and excluded while building the graph",
    ],
  },
];

function ApproachCards() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [selectedApproach, setSelectedApproach] = useState<number | null>(null);

  return (
    <div>
      {/* Dropdown for selecting an approach */}
      <select
        className="approach-dropdown"
        onChange={(e) => {
          setSelectedApproach(parseInt(e.target.value));
          setSelectedIndex(null);
        }}
      >
        <option value="">Select an Approach</option>
        {approaches.map((approach, index) => (
          <option key={index} value={index}>
            {approach.title}
          </option>
        ))}
      </select>

      {/* Brief Approach Description */}
      {selectedApproach !== null && (
        <div style={{ marginTop: "40px" }}>
          <div className="approach-description">
            <p>{approaches[selectedApproach].summary}</p>
          </div>
          <div className="approach-description">
            <p>
              <b>Monolith Chosen:</b>{" "}
              <a href={approaches[selectedApproach].monolithLink}>
                {approaches[selectedApproach].monolith}
              </a>
            </p>
          </div>
          <div className="approach-description">
            <p>
              <b>Code Link: </b>
              {
                <a href={approaches[selectedApproach].codeLink}>
                  {approaches[selectedApproach].codeLink}
                </a>
              }
            </p>
          </div>
        </div>
      )}

      <div className="approach-container">
        {/* Show cards only when an approach is selected */}
        {selectedApproach !== null && (
          <div className="approach-list">
            {approaches[selectedApproach].steps.map((step, index) => (
              <div
                key={index}
                className={`approach-card ${
                  selectedIndex === index ? "active" : ""
                }`}
                onClick={() => setSelectedIndex(index)}
              >
                <h3>Step {index + 1}</h3>
                <p>{step}</p>
              </div>
            ))}
          </div>
        )}
        {/* Right Side: Details Panel */}
        <div
          className={`approach-details ${
            selectedIndex !== null ? "active" : ""
          }`}
        >
          {selectedApproach != null && selectedIndex !== null ? (
            <>
              {selectedIndex + 1 === 1 && selectedApproach + 1 === 1 ? (
                <div className="custom-div">
                  <img
                    src="/images/poc1_monolith_structure.png"
                    style={{ width: "300px" }}
                    className="custom-image"
                  />
                  <br />
                  <ul>
                    <b>Metadata considered: </b>
                    <li>The function calls between various classes</li>
                    <li>Import statements in each of the classes</li>
                  </ul>
                </div>
              ) : (
                <p></p>
              )}

              {selectedIndex + 1 === 2 && selectedApproach + 1 === 1 ? (
                <div className="custom-div">
                  <img
                    src="/images/poc1_callgraph.png"
                    style={{ width: "550px" }}
                    className="custom-image"
                  />
                </div>
              ) : (
                <p></p>
              )}

              {selectedIndex + 1 === 3 && selectedApproach + 1 === 1 ? (
                <div className="custom-div">
                  <b> Experimented with Number of clusters</b>
                  <br />
                  <b> Optimal number = 5</b>
                  <br />
                  <br />
                  <img
                    src="/images/poc1_cluster.png"
                    style={{ width: "550px" }}
                    className="custom-image"
                  />
                  <br />
                  <br />
                  <img
                    src="/images/poc1_table.png"
                    style={{ width: "550px" }}
                    className="custom-image"
                  />
                </div>
              ) : (
                <p></p>
              )}

              {selectedIndex + 1 === 4 && selectedApproach + 1 === 1 ? (
                <div className="custom-div">
                  <b>Automatically detrrmines number of clusters as 5</b>
                  <br />
                  <br />
                  <img
                    src="/images/poc1_cluster.png"
                    style={{ width: "550px" }}
                    className="custom-image"
                  />
                  <br />
                  <br />
                  <img
                    src="/images/poc1_table.png"
                    style={{ width: "550px" }}
                    className="custom-image"
                  />
                </div>
              ) : (
                <p></p>
              )}

              {selectedIndex + 1 === 1 && selectedApproach + 1 === 2 ? (
                <div className="custom-div">
                  <b> Excerpt from the OpenAPI Specifications</b>
                  <br />
                  <br />
                  <img
                    src="/images/poc2_twitter_yaml.png"
                    style={{ width: "550px" }}
                    className="custom-image"
                  />
                  <br />
                  <img
                    src="/images/poc2_ecommerce_yaml.png"
                    style={{ width: "550px" }}
                    className="custom-image"
                  />
                  <br />
                </div>
              ) : (
                <p></p>
              )}

              {selectedIndex + 1 === 2 && selectedApproach + 1 === 2 ? (
                <div className="custom-div">
                  <b>
                    {" "}
                    Extract Operation Names from "operationId" Node such as:
                  </b>
                  <br />
                  <ul>
                    <li>findTweetsById</li>
                    <li>createTweet</li>
                    <li>........</li>
                  </ul>
                  <br />
                  <br />
                  <b>
                    {" "}
                    If the node operationId node is not present, then generate
                    it using the HTTP Method Name & Path
                  </b>
                  <br />
                  <br />
                  <b>
                    {" "}
                    Use NLP & Split the operation names into meaningful words
                    such as{" "}
                    <span style={{ color: "green" }}>
                      createOrder → ["create", "order"]
                    </span>
                  </b>
                </div>
              ) : (
                <p></p>
              )}

              {selectedIndex + 1 === 3 && selectedApproach + 1 === 2 ? (
                <div className="custom-div">
                  <b>
                    Below algorithms were tried for converting Operation Names
                    into Numerical Embeddings
                  </b>
                  <br />
                  <br />
                  <ul>
                    <li>
                      <b>FastText:</b> It converts words into subword tokens to
                      identify out-of-vocabulary words, but then that adds
                      unnecessary complexity in our case.
                    </li>
                    <li>
                      <b>Word2Vec:</b> It relies on context-based learning but
                      does not capture word relationships effectively.
                    </li>
                    <li>
                      <b>GloVe:</b> It is pre-trained on a large corpus and
                      hence captures global word relationships rather than just
                      local context.
                    </li>
                  </ul>
                  <br />
                  <br />
                  So, the <b>GloVe pre-trained embeddings</b> were used to
                  provide numeral representations of words.
                  <br />
                  <br />
                  For <b>multi-word operation names</b>, the word embeddings are{" "}
                  <b>averaged</b> to create a single vector per operation.
                </div>
              ) : (
                <p></p>
              )}

              {selectedIndex + 1 === 4 && selectedApproach + 1 === 2 ? (
                <div className="custom-div">
                  <b>Affinity Propagation Clustering</b> - Automatically
                  clsuetrs by choosing the exemplars and then assigning the data
                  points to the exemplars.
                  <br />
                  <br />
                  <p>
                    We have used some <b>Hyperparameter Tuning for this:</b>
                  </p>
                  <br />
                  <br />
                  <img
                    src="/images/poc2_param_grid.png"
                    style={{ width: "250px" }}
                    className="custom-image"
                  />
                </div>
              ) : (
                <p></p>
              )}

              {selectedIndex + 1 === 5 && selectedApproach + 1 === 2 ? (
                <div className="custom-div">
                  <b>ecommerce.yaml clustering</b>
                  <br />
                  <br />
                  <img
                    src="/images/poc2_ecommerce_cluster.png"
                    style={{ width: "550px" }}
                    className="custom-image"
                  />
                  <img
                    src="/images/poc2_ecommerce_table.png"
                    style={{ width: "550px" }}
                    className="custom-image"
                  />
                  <br />
                  <br />
                  <b>twitter.yaml clustering</b>
                  <br />
                  <br />
                  <img
                    src="/images/poc2_twitter_cluster.png"
                    style={{ width: "550px" }}
                    className="custom-image"
                  />
                  <img
                    src="/images/poc2_twitter_table.png"
                    style={{ width: "550px" }}
                    className="custom-image"
                  />
                </div>
              ) : (
                <p></p>
              )}

              {selectedIndex + 1 === 1 && selectedApproach + 1 === 3 ? (
                <div className="custom-div">
                  <ul>
                    <b>Parsing Approaches: </b>
                    <li>Basic Method Scanning - Simple Call Graph</li>
                    <li>
                      Deep Structural Scanning - Abstract Syntax Tree (AST)
                    </li>
                  </ul>
                  <br />
                  <br />
                  <img
                    src="/images/poc3_java_class.png"
                    style={{ width: "550px" }}
                    className="custom-image"
                  />
                  <br />
                  <br />
                  <img
                    src="/images/poc3_ast.png"
                    style={{ width: "550px" }}
                    className="custom-image"
                  />
                  <br />
                  <br />
                </div>
              ) : (
                <p></p>
              )}

              {selectedIndex + 1 === 2 && selectedApproach + 1 === 3 ? (
                <div className="custom-div">
                  <img
                    src="/images/poc3_json_1.png"
                    style={{ width: "350px" }}
                    className="custom-image"
                  />
                  <img
                    src="/images/poc3_json_2.png"
                    style={{ width: "350px" }}
                    className="custom-image"
                  />
                </div>
              ) : (
                <p></p>
              )}

              {selectedIndex + 1 === 3 && selectedApproach + 1 === 3 ? (
                <div className="custom-div">
                  <img
                    src="/images/poc3_HeteroGraph.png"
                    style={{ width: "550px" }}
                    className="custom-image"
                  />
                </div>
              ) : (
                <p></p>
              )}

              {selectedIndex + 1 === 4 && selectedApproach + 1 === 3 ? (
                <div className="custom-div">
                  <img
                    src="/images/poc3_kmeans_1.png"
                    style={{ width: "550px" }}
                    className="custom-image"
                  />
                </div>
              ) : (
                <p></p>
              )}

              {selectedIndex + 1 === 5 && selectedApproach + 1 === 3 ? (
                <div className="custom-div">
                  <b>GNN Embeddings:</b>
                  <br />
                  <br />
                  <ul>
                    <li>Captures rich structural and relational information</li>
                    <li>
                      Learns representations for different node types based on
                      their interactions.
                    </li>
                    <li>
                      Able to better represent <b>"class"</b> &{" "}
                      <b>"resource"</b> nodes.
                    </li>
                    <li>
                      Able to better represent <b>"calls"</b> & <b>"access"</b>{" "}
                      edges
                    </li>
                  </ul>
                </div>
              ) : (
                <p></p>
              )}

              {selectedIndex + 1 === 6 && selectedApproach + 1 === 3 ? (
                <div className="custom-div">
                  <img
                    src="/images/poc3_kmeans_2.png"
                    style={{ width: "550px" }}
                    className="custom-image"
                  />
                  <br />
                  <br />
                  <img
                    src="/images/poc3_kmeans_table.png"
                    style={{ width: "550px" }}
                    className="custom-image"
                  />
                </div>
              ) : (
                <p></p>
              )}

              {selectedIndex + 1 === 1 && selectedApproach + 1 === 4 ? (
                <div className="custom-div">
                  <img
                    src="/images/poc3_HeteroGraph.png"
                    style={{ width: "550px" }}
                    className="custom-image"
                  />
                </div>
              ) : (
                <p></p>
              )}

              {selectedIndex + 1 === 2 && selectedApproach + 1 === 4 ? (
                <div className="custom-div">
                  <b>Enhanced Graph:</b>
                  <br />
                  <br />
                  <img
                    src="/images/poc4_HeteroGraph.png"
                    style={{ width: "550px" }}
                    className="custom-image"
                  />
                </div>
              ) : (
                <p></p>
              )}

              {selectedIndex + 1 === 3 && selectedApproach + 1 === 4 ? (
                <div className="custom-div">
                  <b>Enhanced GNN Embeddings:</b>
                  <br />
                  <br />
                  <ul>
                    <li>
                      The embeddings will now be enhacned due to new edges
                    </li>
                    <li>
                      Relationship between resoruce-shared classes is weighed in
                      more
                    </li>
                  </ul>
                </div>
              ) : (
                <p></p>
              )}
              {selectedIndex + 1 === 4 && selectedApproach + 1 === 4 ? (
                <div className="custom-div">
                  <img
                    src="/images/poc4_kmeans.png"
                    style={{ width: "550px" }}
                    className="custom-image"
                  />
                  <br />
                  <br />
                  <img
                    src="/images/poc4_kmeans_table.png"
                    style={{ width: "550px" }}
                    className="custom-image"
                  />
                </div>
              ) : (
                <p></p>
              )}

              {selectedIndex + 1 === 1 && selectedApproach + 1 === 5 ? (
                <div className="custom-div">
                  <b> Method 1 </b>
                  <br />
                  <br />
                  <img
                    src="/images/poc5_func1.png"
                    style={{ width: "550px" }}
                    className="custom-image"
                  />
                  <br />
                  <br />
                  <b> Method 2 </b>
                  <br />
                  <br />
                  <img
                    src="/images/poc5_func2.png"
                    style={{ width: "400px" }}
                    className="custom-image"
                  />
                  <br />
                  <br />
                  .......
                </div>
              ) : (
                <p></p>
              )}

              {selectedIndex + 1 === 2 && selectedApproach + 1 === 5 ? (
                <div className="custom-div">
                  <b>
                    Code2Vec - an open source model for generating code
                    embeddings
                  </b>
                  <br />
                  <br />
                  <img
                    src="/images/poc5_code_vectors.png"
                    style={{ width: "550px" }}
                    className="custom-image"
                  />
                </div>
              ) : (
                <p></p>
              )}

              {selectedIndex + 1 === 3 && selectedApproach + 1 === 5 ? (
                <div className="custom-div">
                  <b> Clustering Results: </b>
                  <br />
                  <br />
                  <img
                    src="/images/poc5_cluster.png"
                    style={{ width: "550px" }}
                    className="custom-image"
                  />
                  <br />
                  <br />
                  <img
                    src="/images/poc5_table.png"
                    style={{ width: "550px" }}
                    className="custom-image"
                  />
                </div>
              ) : (
                <p></p>
              )}

            {selectedIndex + 1 === 1 && selectedApproach + 1 === 6 ? (
                <div className="custom-div">
                  
                  <ul>
                    <b>Log Generation done using simulation script with 5000 user sessions covering diverse worlflows: </b>
                    <br />
                    <br />

                    <li><b>Basic Transactions:</b> Account creation, transfers, balance checks </li>
                    <li><b>Loan Requests:</b> Loan applications, credit score checks</li>
                    <li><b>E-commerce Transactions:</b> Order placement, order status checks</li>
                    <li><b>Fraud Detection: Unusual</b> transactions, security monitoring</li>
                  </ul>
                  <br />
                  <br />
                  <b>Sample Logs:</b>
                  <br />
                  <br />
                  <img
                    src="/images/poc6_samplelogs.png"
                    style={{ width: "550px" }}
                    className="custom-image"
                  />
                </div>
              ) : (
                <p></p>
              )}

              {selectedIndex + 1 === 2 && selectedApproach + 1 === 6 ? (
                <div className="custom-div">
                  
                  <ul>
                    <b>Regex is used to extract service-related log entries. Example Patterns: </b>
                    <br />
                    <br />

                    <li><b>Basic Transactions:</b> "Account created with ID: (\d+)"</li>
                    <li><b>Transaction:</b> "Transaction recorded: Transfer from (\d+) to (\d+) of amount \$(\d+\.?\d*)"</li>
                    <li><b>Loan Application:</b>  "Loan of \$(\d+\.?\d*) applied for account: (\d+)"</li>
                  </ul>

                </div>
              ) : (
                <p></p>
              )}

              {selectedIndex + 1 === 3 && selectedApproach + 1 === 6 ? (
                <div className="custom-div">
                  <b>Service Usage Statistics:</b>
                  <br />
                  <br />
                    account_creation: 4996 logs<br/>
                    customer_registration: 4991 logs<br/>
                    transaction: 1955 logs<br/>
                    loan: 544 logs<br/>
                    notification: 547 logs<br/>
                    <br/>
                    <br />

                    <b>Service Dependencies:</b>
                    <br />
                    <br />
                    account_creation -{">"} customer_registration (Weight: 8089)<br/>
                    account_creation -{">"} transaction (Weight: 1098)<br/>
                    customer_registration -{">"} transaction (Weight: 1861)<br/>
                    account_creation -{">"} loan (Weight: 547)<br/>
                    customer_registration -{">"} loan (Weight: 891)<br/>
                    loan -{">"} transaction (Weight: 47)<br/>
                    transaction -{">"} notification (Weight: 1496)<br/>
                    transaction -{">"} account_creation (Weight: 893)<br/>
                    notification -{">"} account_creation (Weight: 711)<br/>
                    transaction -{">"} customer_registration (Weight: 451)<br/>
                    notification -{">"} customer_registration (Weight: 442)<br/>
                    customer_registration -{">"} account_creation (Weight: 5365)<br/>
                    customer_registration -{">"} notification (Weight: 136)<br/>
                    loan -{">"} account_creation (Weight: 721)<br/>
                    loan -{">"} customer_registration (Weight: 450)<br/>
                    notification -{">"} transaction (Weight: 46)<br/>
                    account_creation -{">"} notification (Weight: 9)<br/>
                    notification -{">"} loan (Weight: 38)<br/>

                </div>
              ) : (
                <p></p>
              )}

              {selectedIndex + 1 === 4 && selectedApproach + 1 === 6 ? (
                <div className="custom-div">
                  <br />
                  <br />
                  <img
                    src="/images/poc6_cluster.png"
                    style={{ width: "550px" }}
                    className="custom-image"
                  />
                  <br />
                  <br />
                  <img
                    src="/images/poc6_table.png"
                    style={{ width: "550px" }}
                    className="custom-image"
                  />
                </div>
              ) : (
                <p></p>
              )}






















            </>
          ) : (
            <p>Select an approach to view details.</p>
          )}
        </div>
      </div>

      {selectedApproach !== null && (
        <div>
          <div className="approach-description">
            <p>
              <b>Pros:</b>
              <br />{" "}
            </p>
            {approaches[selectedApproach].pros.map((step) => (
              <div>
                <p>{step}</p>
              </div>
            ))}
          </div>
          <div className="approach-description">
            <p>
              <b>Cons:</b>
              <br />{" "}
            </p>
            {approaches[selectedApproach].cons.map((step) => (
              <div>
                <p>{step}</p>
              </div>
            ))}
          </div>
          <div className="approach-description">
            <p>
              This approach is inspired by the research -{" "}
              <a href={approaches[selectedApproach].paperLink}>
                {approaches[selectedApproach].paper}
              </a>
            </p>
            <br />
            <p>
              <b>Major enhancements over the inspired approach:</b>
              <br />{" "}
            </p>
            {approaches[selectedApproach].enhancements.map(
              (enhancement) => (
                <div>
                  <p>{enhancement}</p>
                </div>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ApproachCards;
