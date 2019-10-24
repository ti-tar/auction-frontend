import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { Link, NavLink, RouteComponentProps } from "react-router-dom";
import Paginate from "react-paginate";
import qs from "qs";
import * as lotsActions from "../../domain/lots/actions";
import { StateInterface } from "../../domain";
import "./styles/lotsStyles.scss";

const Lots: React.FunctionComponent<RouteComponentProps> = props => {
  const {
    match: { url },
    history,
    location: { search }
  } = props;
  const queryString = search.startsWith("?") ? search.slice(1) : search;
  const { page = 1 } = qs.parse(queryString);

  const lots = useSelector((state: StateInterface) => state.lots.resources);
  const { total, perPage } = useSelector(
    (state: StateInterface) => state.lots.meta
  );
  const isLoading = useSelector(
    (state: StateInterface) => state.lots.isLoading
  );
  const userId = useSelector((state: StateInterface) => state.user.id);

  const dispatch = useDispatch();

  const getFilter = (url: string) => {
    switch (url) {
      case "/lots/own/lots":
        return "ownLots";
      case "/lots/own/bids":
        return "ownBids";
      case "/lots":
        return "all";
      default:
        return "all";
    }
  };

  useEffect(() => {
    dispatch({
      type: lotsActions.fetchLots.request,
      payload: { filter: getFilter(url), page }
    });
  }, [dispatch, url, page]);

  const handlePageClick = (data: { selected: number }) => {
    history.push({
      pathname: url,
      search: data.selected ? `?page=${data.selected + 1}` : ""
    });
  };

  return (
    <section className="lots">
      <ul className="lotsNav">
        <li>
          <NavLink to={{ pathname: "/lots" }} exact>
            All Lots inProcess
          </NavLink>
        </li>
        <li>
          <NavLink to={{ pathname: "/lots/own/lots" }} exact>
            My Lots
          </NavLink>
        </li>
        <li>
          <NavLink to={{ pathname: "/lots/own/bids" }} exact>
            Lots With My Bids
          </NavLink>
        </li>
      </ul>

      {!isLoading &&
        !!lots &&
        lots.map(lot => (
          <div className="lot" key={`${lot.id} ${lot.title}`}>
            <div className="lot__img">
              {userId === lot.user.id && (
                <div className="your_lot">Your lot</div>
              )}
              <div className="image_place">
                <img
                  src={`${process.env.REACT_APP_STATIC_API_URL}/images/lots/thumb/${lot.image}`}
                  alt={lot.title}
                />
              </div>
            </div>
            <div className="lot__product">
              <h3>
                <Link to={{ pathname: `/lots/${lot.id}` }}>
                  {lot.title} ({lot.status}){" "}
                </Link>
              </h3>
              <h6>Description:</h6>
              <p>{lot.description}</p>
              <h6>Owner:</h6>
              <p>
                {lot.user.firstName}, {lot.user.email}
              </p>
            </div>
            <div className="lot__info">
              <div>
                <span>Current Price</span>
                <span>{lot.currentPrice} $</span>
              </div>
              <div>
                <span>Estimated Price</span>
                <span>{lot.estimatedPrice} $</span>
              </div>
              <div>
                <span>End Time</span>
                <span>{moment(lot.endTime).format("DD MMM YY, hh:mm:ss")}</span>
              </div>
            </div>
          </div>
        ))}

      {!!lots && total > lots.length && (
        <div className={"pagination"}>
          <Paginate
            pageCount={Math.ceil(total / perPage)}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            breakLabel={"..."}
            initialPage={page - 1}
          />
        </div>
      )}

      {!isLoading && lots.length === 0 && <h1> you have no lots yet</h1>}
    </section>
  );
};

export default Lots;
