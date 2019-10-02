import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Context from './Components/Context';
import Lyrics from './Components/Lyrics';

export class App extends Component {
  render() {
    return (
      <Context>
      <Router>
      <React.Fragment>
            <Navbar />
          <div className="container mt-4">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/lyrics/track/:id" component={Lyrics} />
            </Switch>
          </div>
      </React.Fragment>
      </Router>
      </Context>
    )
  }
}

export default App
