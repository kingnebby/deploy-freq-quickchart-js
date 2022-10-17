import fs from "fs";
import googleChartsNode from "google-charts-node";

// Define your chart drawing function
function drawChart() {
  const data = google.visualization.arrayToDataTable([
    ["City", "2010 Population"],
    ["New York City, NY", 8175000],
    ["Los Angeles, CA", 3792000],
    ["Chicago, IL", 2695000],
    ["Houston, TX", 2099000],
    ["Philadelphia, PA", 1526000],
  ]);

  const options = {
    title: "Population of Largest U.S. Cities",
    chartArea: { width: "50%" },
    hAxis: {
      title: "Total Population",
      minValue: 0,
    },
    vAxis: {
      title: "City",
    },
  };

  const chart = new google.visualization.BarChart(container);
  chart.draw(data, options);
}

// Render the chart to image
const image = await googleChartsNode.render(drawChart, {
  // console.log(image.buffer());
  width: 400,
  height: 300,
});

fs.writeFileSync("./tmp/google-chart.png", image);
