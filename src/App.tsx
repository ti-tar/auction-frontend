import React from 'react';
import './App.css';
// pages
import Main from './pages/main';

import Login from "./pages/auth/login";
import SignUp from "./pages/auth/signup";

import Lots from './pages/lots/lots';
import LotsEdit from './pages/lots/lotsEdit';
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

	      <Route exact path="/auth/login" component={Login} />
	      <Route exact path="/auth/signup" component={SignUp} />

	      <Route exact path="/lots/create" component={LotsEdit} />
	      <Route exact path="/lots/:id" component={LotsDetails} />
	      <Route exact path="/lots" component={Lots} />
	      <Route exact path="/" component={Main} />
      </Switch>
    </div>
  );
};

export default App;
