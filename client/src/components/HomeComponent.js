import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

class HomeComponent extends Component{
  state={
    coffees: []
  }

  
  async componentDidMount(){
    /* En el componentDidMount hacemos el fetch con la herramienta axios,
      Esto por que el recurso(la data) debe estár lista antes de pintar
      en la vista, esto por el tema de asincronicidad y por la naturaleza 
      de react */
    try{
      const coffees = await axios
      .get(`http://localhost:3000/api/coffees`)
    this.setState({
      /*  la información viene en coffeed.data por que axios te devuelve muchas
          cosas entre ellas ese objeto data con el resultado */
      coffees: coffees.data
    })
    }catch(err){
      console.log(err)
    }
  }

  render(){
    return <div className="app-wrapper">
    <h1>Coffee List</h1>
    <span>Click on any to see more info about it!</span>
    <ul>
      {
        this.state.coffees.map((coffee, idx) => {
            return <Link to={`/coffee/${coffee._id}`} key={idx}>
              <li>{coffee.name}</li>
            </Link>
        })
      }
    </ul>
  </div>
  }
}

export default HomeComponent