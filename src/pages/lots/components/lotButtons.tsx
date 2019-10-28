import * as React from "react";
import { Link } from "react-router-dom";
import LotInterface from "../../../interfaces/lot";
import OrderInterface from "../../../interfaces/order";

interface Props {
  lotId: string;
  deleteLot: Function;
  lot: LotInterface | undefined;
  userId: number;
  isWinner: boolean;
  onSetLot: Function;
  order: OrderInterface | undefined;
}

const LotButtons: React.FC<Props> = ({
  lotId,
  deleteLot,
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
            You may change or delete lot, lot is not processed until you push
            "Set the lot" button. After that you won't change anything.
          </small>
          <button
            className="lot_options_set_lot_button"
            onClick={() => {
              if (
                window.confirm(
                  `Set Lot to Auction? You won't be able to edit or delete it`
                )
              ) {
                onSetLot(lotId);
              }
            }}
          >
            Set the lot
          </button>
          <Link
            className="lot_options_edit_lot_button"
            to={{ pathname: `/lots/${lot.id}/edit` }}
          >
            Update a lot
          </Link>
          <button
            className="lot_options_delete_lot_button"
            onClick={() => {
              if (
                window.confirm(
                  `Are you confirm you wont to delete lot ${lotId}`
                )
              ) {
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
          <Link
            className="lot_options_make_bid_button"
            to={{ pathname: `/lots/${lot.id}/make_bid` }}
          >
            Make a bid
          </Link>
        </div>
      )}

      {/* usr is buyer, winner && lot.status === "closed" */}
      {isWinner && !!lot && lot.status === "closed" && (
        <div className="lot_options">
          <Link
            className="lot_options_checkout_button"
            to={{ pathname: `/lots/${lot.id}/order` }}
          >
            {!!order ? "Edit Order" : "Checkout"}
          </Link>
        </div>
      )}
    </>
  );
};

export default LotButtons;
