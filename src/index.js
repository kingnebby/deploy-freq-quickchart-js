// import { getDeploys } from "./serviceDeployData.js";

const deploys = getDeploys();

// Determine meta data
deploys.forEach((nextDeploy, index) => {
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

console.log(deploys);
