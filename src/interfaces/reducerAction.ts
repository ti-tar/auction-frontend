export default interface ReducerActionInterface {
  type?: string;
  payload?: {
    resources?: [];
    resource?: any;
    meta: {};
  };
}
