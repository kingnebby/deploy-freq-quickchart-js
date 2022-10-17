import { getMetaData, deploysByDay } from "./getMetaData";
import { chartDeployCount } from "./qchart";

const deploys = getMetaData();

// Deploy Frequency Number
const totalDeploys = deploys.length - 1;
const successDeploys = deploys.filter((dep) => dep.type === "success").length;
console.log(`Deploy Success Rate: ${successDeploys / totalDeploys}`);

// Deploy By Day
const byDay = deploysByDay();
// console.log(byDay);

chartDeployCount(
  byDay.map((el) => el.day),
  byDay.map((el) => el.goodCount),
  byDay.map((el) => el.badCount)
);
