import QuickChart from "quickchart-js";

const myChart = new QuickChart();
myChart.setConfig({
  type: "bar",
  data: {
    labels: ["Hello world", "Foo bar"],
    datasets: [{ label: "Foo", data: [1, 2] }],
  },
});

// myChart.toFile("./tmp/qchart.png");
// myChart.setDevicePixelRatio(2.0)
