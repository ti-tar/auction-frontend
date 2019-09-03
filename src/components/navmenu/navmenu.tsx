import React from 'react';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';

// actions
import * as userActions from '../../domain/user/actions';

import "./navmenuStyles.css";

interface Props {
  token?: string;
  firstName?: string;
  logout: any;
}

const NavMenu: React.FC<Props> = (props) => {
    const { token: isAuthenticated, firstName, logout } = props;

    return (
      <header className={'NavMenu'}>

        <Link
          to={{ pathname: '/' }}
          className={'logo'}
        >
          Auction Marketplace
        </Link>

        <ul className={'buttons'}>
          {!!isAuthenticated ? (
            <>
              <li>
                  hello, {firstName}
              </li>
              <li>
                <Link to={{pathname: '/lots/create'}}>
                  Create Lot
                </Link>
              </li>
              <li>
                <Link to={{pathname: '/lots'}}>
                  All Lots
                </Link>
              </li>
              <li>
                <Link to={{pathname: '/lots/own'}}>
                  My Lots
                </Link>
              </li>
              <li>
                <button onClick={() => {
                  logout();
                }}>
                  Log out
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to={{pathname: '/auth/signup'}}>
                  Sign Up
                </Link>
              </li>
              <li>
                <Link to={{pathname: '/auth/login'}}>
                  Login
                </Link>
              </li>
            </>
            )
          }
        </ul>
      </header>
    )
};

export default compose(
  connect(
  (state: any): {token: string, firstName: string | undefined} => ({
    firstName: state.user.firstName,
    token: state.user.token,
  }),
  {
    logout: (history: Function) => ({ type: userActions.logout.request, history }),
  }),
)(NavMenu);