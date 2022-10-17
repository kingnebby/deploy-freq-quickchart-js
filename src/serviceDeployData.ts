export type ServiceDeploy = {
  version: string;
  buildStatus: string;
  date: Date;
  buildNumber: number;
};

const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;
const serviceDeployList: Partial<ServiceDeploy>[] = [
  {
    // success
    version: "1.0.0",
    buildStatus: "success",
    date: new Date(Date.now() + 1 * ONE_DAY_IN_MS),
  },
  {
    // success
    version: "1.0.0",
    buildStatus: "success",
    date: new Date(Date.now() + 1 * ONE_DAY_IN_MS),
  },
  {
    // fail
    version: "1.1.0",
    buildStatus: "failed",
    date: new Date(Date.now() + 4 * ONE_DAY_IN_MS),
  },
  {
    // success
    version: "1.1.0",
    buildStatus: "success",
    date: new Date(Date.now() + 4 * ONE_DAY_IN_MS),
  },
  {
    // rollback
    version: "1.0.0",
    buildStatus: "success",
    date: new Date(Date.now() + 4 * ONE_DAY_IN_MS),
  },
  {
    // redeploy
    version: "1.0.0",
    buildStatus: "success",
    date: new Date(Date.now() + 5 * ONE_DAY_IN_MS),
  },
];

// add dates
serviceDeployList.forEach((deploy, index) => {
  deploy.buildNumber = index + 1;
});

// export function getDeploys() {
export function getDeploys(): ServiceDeploy[] {
  return serviceDeployList as ServiceDeploy[];
}
