import React, { Component } from 'react';
import ContactData from './containers/ContactData/ContactData';
import {Switch, Route} from 'react-router-dom';
import Layout from '../src/components/Layout/Layout';
import Orders from '../src/containers/Orders/Orders';
import Tables from '../src/containers/Tables/Tables';

class App extends Component {
  render() {
    return (
      <Layout>
        <Switch>
          <Route path='/chooseTable' component={Tables} />
          <Route path='/orders' component={Orders} />
          <Route path='/' exact component={ContactData} />
        </Switch>
      </Layout> 
    );
  }
}

export default App;
