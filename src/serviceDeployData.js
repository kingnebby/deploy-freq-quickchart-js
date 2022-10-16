const serviceDeployList = [
  {
    // success
    version: "1.0.0",
    buildStatus: "success",
    date: undefined,
    buildNumber: undefined,
  },
  {
    // success
    version: "1.0.0",
    buildStatus: "success",
    date: undefined,
    buildNumber: undefined,
  },
  {
    // fail
    version: "1.1.0",
    buildStatus: "failed",
    date: undefined,
    buildNumber: undefined,
  },
  {
    // success
    version: "1.1.0",
    buildStatus: "success",
    date: undefined,
    buildNumber: undefined,
  },
  {
    // rollback
    version: "1.0.0",
    buildStatus: "success",
    date: undefined,
    buildNumber: undefined,
  },
  {
    // redeploy
    version: "1.0.0",
    buildStatus: "success",
    date: undefined,
    buildNumber: undefined,
  },
];

// add dates
serviceDeployList.forEach((deploy, index) => {
  const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;
  deploy.date = new Date(Date.now() + index * ONE_DAY_IN_MS);
  deploy.buildNumber = index + 1;
});

// export function getDeploys() {
function getDeploys() {
  return serviceDeployList;
}
