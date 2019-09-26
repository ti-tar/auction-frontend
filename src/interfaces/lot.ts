export default interface LotInterface {
  id: number;
  title: string;
  image?: string;
  description?: string;
  status: string;
  createAt: string;
  currentPrice: number;
  estimatedPrice: number;
  startTime: string;
  endTime: string;
  user: any;
}
