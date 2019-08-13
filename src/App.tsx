import React from 'react';
import './App.css';

// pages
import Lots from './pages/lots/lots';

// components
import NanMenu from './components/navmenu/navmenu';
import { Switch, Route } from 'react-router';

const App: React.FC = () => {
  return (
    <div className="App">
      <NanMenu />
      <Switch>
        <Route exact path="/" component={Lots} />
        <Route exact path="/lots" component={Lots} />
      </Switch>
    </div>
  );
}

export default App;
