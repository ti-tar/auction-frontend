import React from 'react';
import './App.css';
// pages

import Lots from './pages/lots/lots';
import LotsCreate from './pages/lots/lotsCreate';
import LotsDetails from './pages/lots/lotDetails';

// declare toasts
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// components
import NanMenu from './components/navmenu/navmenu';
import { Switch, Route } from 'react-router-dom';


const App: React.FC = () => {
  return (
    <div className="App">
      <ToastContainer />
      <NanMenu />
      <Switch>
	      <Route path="/lots/create" component={LotsCreate} />
	      <Route path="/lots/:id" component={LotsDetails} />
	      <Route exact path="/lots" component={Lots} />
	      <Route exact path="/" component={Lots} />
      </Switch>
    </div>
  );
};

export default App;
