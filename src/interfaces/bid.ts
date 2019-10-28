import { UserInterface } from "./user";
import OrderInterface from "./order";

export default interface BidsInterface {
  id: number;
  proposedPrice: number;
  bidCreationTime?: number;
  user: UserInterface;
  order: OrderInterface;
}
