import BidsInterface from "./bid";

export enum OrderDeliveryType {
  pending = "pending",
  royalMail = "Royal Mail",
  unitedStatesPostalService = "United States Postal Service",
  dhlExpress = "DHL Express"
}

export default interface Order {
  id: number;
  arrivalLocation: string;
  type: OrderDeliveryType;
  status: string;
  bid: BidsInterface;
}
