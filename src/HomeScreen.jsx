import React from 'react'
import './HomeScreen.css'

class HomeScreen extends React.Component {
  render() {
    return (
      <div className="home-container">
        <div className="logo">Logo</div>
        <div className="start">กดปุ่มใดๆ เพื่อเริ่มเกม</div>
      </div>
    )
  }
}

export default HomeScreen
