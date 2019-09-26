export const SUFIXES = {
  PENDING: "PENDING",
  SUCCESS: "SUCCESS",
  FAILURE: "FAILURE"
};

interface ActionCreator {
  request: string;
  success: string;
  failure: string;
}

export function getAction(actionName: string): ActionCreator {
  return {
    request: `${actionName}/${SUFIXES.PENDING}`,
    success: `${actionName}/${SUFIXES.SUCCESS}`,
    failure: `${actionName}/${SUFIXES.FAILURE}`
  };
}
