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

const MenuBtn = ({ setIsOpen, toggleDropDown }: any) => {
  const toggleBtnRef = useRef(null);
  useSideClick(toggleBtnRef, setIsOpen);
  return (
    <div className="toggleDropDownBtn" ref={toggleBtnRef} onClick={toggleDropDown}>
      &#9776;
    </div>
  );
};

const NavMenu: React.FC<RouteComponentProps> = ({ history }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropDown = () => {
    setIsOpen(!isOpen);
  };

  const dispatch = useDispatch();
  const { firstName, token } = useSelector((state: StateInterface) => state.user);
  const logout = () => dispatch({ type: userActions.logout.request, history });

  return (
    <header className={"NavMenu"}>
      <NavLink to={{ pathname: "/" }} className={"logo"}>
        Auction Marketplace {!!token ? `(User: ${firstName})` : "(not logged in)"}
      </NavLink>

      <MenuBtn toggleDropDown={toggleDropDown} setIsOpen={setIsOpen} />

      <ul className={`buttons ${!isOpen || "opened"}`}>
        <li>
          <NavLink to={{ pathname: "/lots" }} exact>
            Lots
          </NavLink>
        </li>
        {!!token ? (
          <>
            <li>
              <NavLink to={{ pathname: "/lots/create" }}>Create Lot</NavLink>
            </li>
            <li>
              <NavLink to={{ pathname: "/orders" }} exact>
                Orders
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
