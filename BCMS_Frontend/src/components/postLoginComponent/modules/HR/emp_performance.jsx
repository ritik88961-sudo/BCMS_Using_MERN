import { useEffect } from "react";

const EmpPerformance = () => {
  useEffect(() => {
    // Load the Google Charts library
    window.google.charts.load("current", { packages: ["corechart", "bar"] });
    window.google.charts.setOnLoadCallback(drawChart);
  }, []);

  // Function to draw the chart
  const drawChart = () => {
    // Example: Create the data for the chart
    const data = window.google.visualization.arrayToDataTable([
      ["Employee", "Performance"],
      ["John Doe", 80],
      ["Jane Smith", 70],
      ["Tom Hanks", 90],
    ]);

    // Chart options
    const options = {
      title: "Employee Performance Review",
      hAxis: { title: "Employee" },
      vAxis: { title: "Performance Score" },
      legend: { position: "none" },
    };

    // Create and draw the chart
    const chart = new window.google.visualization.BarChart(
      document.getElementById("performanceChart")
    );
    chart.draw(data, options);
  };

  return (
    <div>
      <h1>HR Module - Employee Performance</h1>
      <div
        id="performanceChart"
        style={{ width: "100%", height: "400px" }}
      ></div>
    </div>
  );
};

export default EmpPerformance;
