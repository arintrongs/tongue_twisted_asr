import React from 'react'
import './App.css'
import GameScreen from './GameScreen'
import HomeScreen from './HomeScreen'

class App extends React.Component {
  state = {
    isStart: false
  }
  startGame = () => {
    this.setState({ isStart: true })
  }
  stopGame = () => {
    this.setState({ isStart: false })
  }
  render() {
    return (
      <div className="App">
        {!this.state.isStart ? (
          <GameScreen isStart={this.state.isStart} stopGame={this.stopGame} />
        ) : (
          <HomeScreen startGame={this.startGame} />
        )}
      </div>
    )
  }
}

export default App
