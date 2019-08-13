import lotInterface from './lot';

export default interface lotsReducerInterface {
  resources: lotInterface[] | [],
  resource?: lotInterface | {},
  isLoading: boolean,
}