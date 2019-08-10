export const SUFIXES = {
  PENDING: 'PENDING',
  SUCCESS: 'SUCCESS',
  FAILURE: 'FAILURE',
};

export function getAction(actionName: string): object {
  
  return { 
    request: `${actionName}/${SUFIXES.PENDING}`,
    success: `${actionName}/${SUFIXES.SUCCESS}`,
    failure: `${actionName}/${SUFIXES.FAILURE}`
  };
}