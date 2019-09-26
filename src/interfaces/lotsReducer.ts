import LotInterface from "./lot";

export default interface LotsReducerInterface {
  resources: LotInterface[] | [];
  resource?: LotInterface | {};
  isLoading: boolean;
}
