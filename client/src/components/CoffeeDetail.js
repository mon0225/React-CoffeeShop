import React, {Component } from 'react'
import axios from 'axios'

class CoffeeDetail extends Component{
  state = {
    coffee: {}
  }
  componentDidMount() {
    let coffeeId = this.props.match.params.coffeeId;
    axios.get(`http://localhost:3000/api/coffees/${coffeeId}`)
      .then(res => {
        let coffee = res.data;
        this.setState({ coffee });
      })
    }
    render() {
      return (
        <div className="app-wrapper">
          <h1>{this.state.coffee.name}</h1><i>{this.state.coffee.brand}</i>
          <p>{this.state.coffee.description}</p>
          <span>{this.state.coffee.origin}</span>
        </div>
      )
    }
}

export default CoffeeDetail