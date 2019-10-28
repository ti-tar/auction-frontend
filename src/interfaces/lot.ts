import BidsInterface from "./bid";

export default interface LotInterface {
  id: number;
  title: string;
  image?: string;
  description?: string;
  status: string;
  createAt: string;
  currentPrice: number;
  estimatedPrice: number;
  endTime: string;
  user: any;
  bids: BidsInterface[] | null;
}
