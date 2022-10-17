import QuickChart from "quickchart-js";

export function chartDeployCount(
  xAxis: string[],
  successByDay: number[],
  failByDay: number[]
) {
  const labels = xAxis;

  const myChart = new QuickChart();
  myChart.setConfig({
    type: "bar",
    data: {
      labels,
      datasets: [
        {
          label: "Failed Deploys",
          data: failByDay,
          backgroundColor: "rgba(241, 46, 48, 0.78)",
        },
        {
          label: "Success Deploys",
          data: successByDay,
          backgroundColor: "rgba(46, 120, 242, 0.78)",
        },
      ],
    },
    options: {
      scales: {
        xAxes: [
          {
            stacked: true,
          },
        ],
        yAxes: [
          {
            stacked: true,
          },
        ],
      },
    },
  });
  myChart.setFormat("svg");
  myChart.toFile("./tmp/qchart.svg");
}

// myChart.setDevicePixelRatio(2.0)
