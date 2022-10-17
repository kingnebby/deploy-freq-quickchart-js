import { getDeploys, ServiceDeploy } from "./serviceDeployData";
import { groupBy } from "lodash";
import { differenceInDays, addDays } from "date-fns";

type DeployMeta = ServiceDeploy & {
  type: string;
  deployDay: string;
};

export function getMetaData() {
  const deploys = getDeploys() as DeployMeta[];

  // Determine meta data
  deploys.forEach((nextDeploy, index) => {
    // get day
    nextDeploy.deployDay = nextDeploy.date.toISOString().split("T")[0];

    // IRL we would look up the last known build from the db and start there. here, there's no
    // history so we just start from 0
    if (index === 0) {
      nextDeploy.type = nextDeploy.buildStatus;
      return;
    }
    let lastDeploy = deploys[index - 1];

    // if failed, it just fails.
    if (nextDeploy.buildStatus === "failed") {
      nextDeploy.type = "failed";
      return;
    }

    // if same as last build, tag as redeploy
    if (
      nextDeploy.version === lastDeploy.version &&
      lastDeploy.type === "failed"
    ) {
      nextDeploy.type = "success";
      return;
    }
    if (
      nextDeploy.version === lastDeploy.version &&
      lastDeploy.type !== "failed"
    ) {
      nextDeploy.type = "redeploy";
      return;
    }

    // IRL this is a db call
    // if version does not equal last version, but exists, it's rollback
    for (let cursor = index; cursor--; cursor >= 0) {
      let previousDeploy = deploys[cursor];
      if (previousDeploy.version === nextDeploy.version) {
        nextDeploy.type = "rollback";
        return;
      }
    }

    nextDeploy.type = "success";
  });

  return deploys;
}

export function deploysByDay() {
  const deploys = getMetaData();
  const depsByDay = groupBy(deploys, "deployDay");
  const depsPerDay: { day: string; count: number }[] = [];
  const days = Object.keys(depsByDay);

  days.forEach((day, index) => {
    if (index === 0) {
      depsPerDay.push({
        day: day,
        count: depsByDay[day].length,
      });
      return;
    }
    // fill in data
    let previousDay = days[index - 1];
    let daysSinceLastDeploy =
      differenceInDays(new Date(day), new Date(previousDay)) - 1;
    if (daysSinceLastDeploy > 0) {
      new Array(daysSinceLastDeploy).fill(true).forEach((_val, index) =>
        depsPerDay.push({
          day: addDays(new Date(previousDay), index + 1)
            .toISOString()
            .split("T")[0],
          count: 0,
        })
      );
    }
    // capture this data
    depsPerDay.push({
      day: day,
      count: depsByDay[day].length,
    });
  });
  return depsPerDay;
}
