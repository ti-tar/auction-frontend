import { UserInterface } from "./user";

export default interface BidsInterface {
  id: number;
  proposedPrice: number;
  bidCreationTime?: number;
  user: UserInterface;
}
