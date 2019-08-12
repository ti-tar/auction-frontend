export const SUFIXES = {
  PENDING: 'PENDING',
  SUCCESS: 'SUCCESS',
  FAILURE: 'FAILURE',
};

interface actionCreator {
  request: string,
  success: string,
  failure: string,
}

export function getAction(actionName: string): actionCreator {
  return { 
    request: `${actionName}/${SUFIXES.PENDING}`,
    success: `${actionName}/${SUFIXES.SUCCESS}`,
    failure: `${actionName}/${SUFIXES.FAILURE}`
  };
}
