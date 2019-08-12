import React from 'react';
import { Link } from 'react-router-dom';

import "./navmenuStyles.css";


const NavMenu: React.FC = () => (
  <header className={'NavMenu'}>

    <Link 
      to={{ pathname: '/' }} 
      className={'logo'} 
    >
      Auction Marketplace
    </Link>
  
    <ul className={'buttons'}>
      <li>
        <Link to={{ pathname: 'lots/crete' }}>
          Create Lot
        </Link>
      </li>
      <li>
        <Link to={{ pathname: 'lots' }}>
          All Lots
        </Link>
      </li>
      <li>
        <Link to={{ pathname: 'lots' }}>
          My Lots
        </Link>
      </li>
      <li>
        <Link to={{ pathname: 'logout' }}>
          Log out
        </Link>
      </li>
    </ul>
  
  </header>
);

export default NavMenu;