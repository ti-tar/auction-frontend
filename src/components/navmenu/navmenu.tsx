import React, { useState, useRef, useEffect } from "react";
import { NavLink, withRouter, RouteComponentProps } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as userActions from "../../domain/user/actions";
import { StateInterface } from "../../domain";
import "./navmenuStyles.scss";

const useSideClick = (toggleBtnRef: any, setIsOpen: any) => {
  useEffect(() => {
    const outsideClick = (e: any) => {
      if (toggleBtnRef.current && !toggleBtnRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    window.addEventListener("click", outsideClick);
    return () => {
      window.removeEventListener("click", outsideClick);
    };
  }, [setIsOpen, toggleBtnRef]);
};

const MenuBtn = (props:any) => {
  const toggleBtnRef = useRef(null);
  useSideClick(toggleBtnRef, props.setIsOpen);
  return (
    <div className="toggleDropDownBtn" ref={toggleBtnRef} onClick={props.toggleDropDown}>&#9776;</div>
  );
}

const NavMenu: React.FC<RouteComponentProps> = props => {
  const { history } = props;
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropDown = () => {
    setIsOpen(!isOpen);
  };

  const firstName = useSelector(
    (state: StateInterface) => state.user.firstName
  );
  const token = useSelector((state: StateInterface) => state.user.token);
  const dispatch = useDispatch();
  const logout = () => dispatch({ type: userActions.logout.request, history });


  return (
    <header className={"NavMenu"}>
      <NavLink to={{ pathname: "/" }} className={"logo"}>
        Auction Marketplace   {!!token ? `(User: ${firstName})` : ''}
      </NavLink>

      <MenuBtn
        toggleDropDown={toggleDropDown}
        setIsOpen={setIsOpen}
       />

      <ul className={`buttons ${!isOpen || "opened"}`}>
        {!!token ? (
          <>
            <li>
              <NavLink to={{ pathname: "/lots/create" }}>Create Lot</NavLink>
            </li>
            <li>
              <NavLink to={{ pathname: "/lots" }} exact>All Lots</NavLink>
            </li>
            <li>
              <NavLink to={{ pathname: "/lots/own/lots" }}>My Lots</NavLink>
            </li>
            <li>
              <NavLink to={{ pathname: "/lots/own/bids" }}>
                Lots My Bids
              </NavLink>
            </li>
            <li>
              <button onClick={logout}>Log out</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink to={{ pathname: "/auth/signup" }}>Sign Up</NavLink>
            </li>
            <li>
              <NavLink to={{ pathname: "/auth/login" }}>Login</NavLink>
            </li>
          </>
        )}
      </ul>
    </header>
  );
};

export default withRouter(NavMenu);
