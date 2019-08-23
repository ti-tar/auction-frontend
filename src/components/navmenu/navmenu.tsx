import React from 'react';
import { Link } from 'react-router-dom';

import "./navmenuStyles.css";


const NavMenu: React.FC = () => {
  const isAuthenticated = false;

    return <header className={'NavMenu'}>

        <Link
          to={{pathname: '/'}}
          className={'logo'}
        >
          Auction Marketplace
        </Link>

        <ul className={'buttons'}>
          {isAuthenticated ? (
            <>
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
                <Link to={{pathname: '/lots'}}>
                  My Lots
                </Link>
              </li>
              <li>
                <Link to={{pathname: '/logout'}}>
                  Log out
                </Link>
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
      </header>;
  }

export default NavMenu;