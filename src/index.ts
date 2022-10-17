import { getMetaData, deploysByDay } from "./getMetaData";

const deploys = getMetaData();
console.log(deploys[0]);

// Deploy Frequency Number
const totalDeploys = deploys.length - 1;
const successDeploys = deploys.filter((dep) => dep.type === "success").length;
console.log(`Deploy Success Rate: ${successDeploys / totalDeploys}`);

// Deploy By Day
const byDay = deploysByDay();
console.log(byDay);
