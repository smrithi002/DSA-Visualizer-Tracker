function PerformancePanel({ executionTime }) {
  return (
    <div
      style={{
        marginTop: "20px",
        padding: "20px",
        border: "1px solid white",
        borderRadius: "10px",
        width: "300px",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <h3>Performance</h3>
      <p>Execution Time: {executionTime}</p>
    </div>
  );
}

export default PerformancePanel;