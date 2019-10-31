import { UserInterface } from "./user";
import OrderInterface from "./order";
import LotInterface from "./lot";

export default interface BidsInterface {
  id: number;
  proposedPrice: number;
  bidCreationTime?: number;
  user: UserInterface;
  order: OrderInterface;
  lot: LotInterface;
}
