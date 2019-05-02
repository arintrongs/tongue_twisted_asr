import React from 'react'
import './App.css'
import GameScreen from './GameScreen'
import HomeScreen from './HomeScreen'
import CharacterSelectCard from './CharacterSelectCard'

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
        {this.state.isStart ? (
          <GameScreen isStart={this.state.isStart} stopGame={this.stopGame} />
        ) : (
          <HomeScreen startGame={this.startGame} />
        )}
        {/* <CharacterSelectCard /> */}
      </div>
    )
  }
}

export default App
