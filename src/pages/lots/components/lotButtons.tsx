import * as React from "react";
import { Link } from "react-router-dom";
import LotInterface from "../../../interfaces/lot";
import OrderInterface from "../../../interfaces/order";

interface Props {
  lotId: string;
  deleteLot: Function;
  executeOrder: Function;
  receiveOrder: Function;
  lot: LotInterface | undefined;
  userId: number;
  isWinner: boolean;
  onSetLot: Function;
  order: OrderInterface | undefined;
}

const LotButtons: React.FC<Props> = ({
  lotId,
  deleteLot,
  executeOrder,
  receiveOrder,
  lot,
  userId,
  isWinner,
  onSetLot,
  order
}) => {
  const isOwner = !!lot && !!lot.user && userId === lot.user.id;
  const isBuyer = !!lot && !!lot.user && userId !== lot.user.id;
  return (
    <>
      {/* user is owner and lot.status === "pending" */}
      {isOwner && !!lot && lot.status === "pending" && (
        <div className="lot_options">
          <small>
            You may change or delete lot, lot is not processed until you push "Set the lot" button. After that you won't
            change anything.
          </small>
          <button
            className="lot_options_set_lot_button"
            onClick={() => {
              if (window.confirm(`Set Lot to Auction? You won't be able to edit or delete it`)) {
                onSetLot(lotId);
              }
            }}
          >
            Set the lot
          </button>
          <Link className="lot_options_edit_lot_button" to={{ pathname: `/lots/${lot.id}/edit` }}>
            Update a lot
          </Link>
          <button
            className="lot_options_delete_lot_button"
            onClick={() => {
              if (window.confirm(`Are you confirm you wont to delete lot ${lotId}`)) {
                deleteLot(lotId);
              }
            }}
          >
            Delete a lot
          </button>
        </div>
      )}

      {/* usr is not owner and lot.status === "inProcess" */}
      {isBuyer && !!lot && lot.status === "inProcess" && (
        <div className="lot_options">
          <Link className="lot_options_make_bid_button" to={{ pathname: `/lots/${lot.id}/make_bid` }}>
            Make a bid
          </Link>
        </div>
      )}

      {/* usr is buyer, winner && lot.status === "closed" && no order */}
      {isWinner && !!lot && lot.status === "closed" && !order && (
        <div className="lot_options">
          <Link className="lot_options_checkout_button" to={{ pathname: `/lots/${lot.id}/order` }}>
            Checkout
          </Link>
        </div>
      )}

      {/* usr is buyer, winner && lot.status === "closed" && order === 'pending' */}
      {isWinner && !!lot && lot.status === "closed" && !!order && order.status === "pending" && (
        <div className="lot_options">
          <Link className="lot_options_update_order_button" to={{ pathname: `/lots/${lot.id}/order` }}>
            Edit Order
          </Link>
        </div>
      )}

      {/* if i'm a lot's owner, buyer set order (=== "pending") */}
      {isOwner && !!lot && !!order && order.status === "pending" && (
        <div className="lot_options">
          <button
            className="lot_options_execute_lot_button"
            onClick={() => {
              if (window.confirm(`Are you sure to execute lot '${lot.title}'(${lot.id})`)) {
                executeOrder(lotId);
              }
            }}
          >
            Execute Order
          </button>
        </div>
      )}

      {/* if i'm a lot's buyer and order on a way ( status === "sent") */}
      {isBuyer && !!lot && !!order && order.status === "sent" && (
        <div className="lot_options">
          <button
            className="lot_options_receive_lot_button"
            onClick={() => {
              if (window.confirm(`Are you sure to mark lot '${lot.title}'(${lot.id}) as received.`)) {
                receiveOrder(lotId);
              }
            }}
          >
            Receive Order
          </button>
        </div>
      )}
    </>
  );
};

export default LotButtons;
