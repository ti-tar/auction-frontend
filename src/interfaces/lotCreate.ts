export default interface LotCreateInterface {
  title: string;
  image?: string;
  description?: string;
  currentPrice: number | string;
  estimatedPrice: number | string;
  endTime: string;
}
