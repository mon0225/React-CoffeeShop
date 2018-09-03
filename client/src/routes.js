import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

import HomeComponent from './components/HomeComponent'
import CoffeeDetail from './components/CoffeeDetail'

export default () => <Router>
  <Switch>
    <Route exact path='/' component={HomeComponent}/>
    <Route path='/coffee/:coffeeId' component={CoffeeDetail}/>
  </Switch>
</Router>