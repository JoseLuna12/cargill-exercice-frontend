import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

import Home from './pages/home'
import CreateFarm from './pages/createFarm'
import EditFarm from './pages/editFarm'
import Farm from './pages/viewFarm'
import Test from './pages/test'
import CreatePond from './pages/createPond'
import EditPond from './pages/editPond'

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/createFarm" exact component={CreateFarm} />
        <Route path="/editFarm/:id" exact component={EditFarm} />
        <Route path="/farm/:id" exact component={Farm} />
        <Route path="/test/:id" exact component={Test} />
        <Route path="/createPond/:id" exact component={CreatePond} />
        <Route path="/editPond/:id" exact component={EditPond} />
      </Switch>
    </Router>
  );
}

export default App;
