function Tracker({
  completedAlgorithms,
  setCompletedAlgorithms,
}) {
  return (
    <div>
      <h2>Algorithms Completed</h2>

      {completedAlgorithms.map((algo, index) => (
        <p key={index}>✓ {algo}</p>
      ))}

      <h3>
        Progress: {completedAlgorithms.length}/7
      </h3>

      <div
        style={{
          width: "300px",
          height: "25px",
          backgroundColor: "#444",
          borderRadius: "20px",
          margin: "20px auto",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${(completedAlgorithms.length / 7) * 100}%`,
            height: "100%",
            backgroundColor: "limegreen",
            transition: "0.5s",
          }}
        />
      </div>

      <h3>
        {Math.round(
          (completedAlgorithms.length / 7) * 100
        )}
        % Complete
      </h3>

      <button
        onClick={() => {
          localStorage.removeItem(
            "completedAlgorithms"
          );

          setCompletedAlgorithms([]);
        }}
      >
        Reset Progress
      </button>
    </div>
  );
}

export default Tracker;