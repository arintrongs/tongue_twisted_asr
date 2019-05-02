import React from 'react'
import './HomeScreen.css'
import logo from './assets/img/logo.png'
import CharacterSelectCard from './CharacterSelectCard'

class HomeScreen extends React.Component {
  render() {
    return (
      <div className="home-container">
        {/* <div className="logo"> */}
        {/* <img className="logo" src={logo} /> */}
        {/* </div> */}
        <CharacterSelectCard />
        <div className="start">กดปุ่มใดๆ เพื่อเริ่มเกม</div>
      </div>
    )
  }
}

export default HomeScreen
