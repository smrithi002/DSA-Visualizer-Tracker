function ComplexityPanel({ algorithmInfo }) {
  return (
    <div
      style={{
        marginTop: "30px",
        padding: "20px",
        border: "1px solid white",
        borderRadius: "10px",
        width: "300px",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <h3>{algorithmInfo.name}</h3>
      <p>Best Case: {algorithmInfo.best}</p>
      <p>Average Case: {algorithmInfo.average}</p>
      <p>Worst Case: {algorithmInfo.worst}</p>
      <p>Space Complexity: {algorithmInfo.space}</p>
    </div>
  );
}

export default ComplexityPanel;