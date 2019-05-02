import React from 'react'
import './App.css'
import GameScreen from './GameScreen'
import HomeScreen from './HomeScreen'
import CharacterSelectCard from './CharacterSelectCard'

class App extends React.Component {
  state = {
    isStart: false,
    isSelected: false
  }
  startGame = () => {
    this.setState({ isStart: true })
  }
  stopGame = () => {
    this.setState({ isStart: false })
  }

  selectChar = () => {
    this.setState({ isSelected: true })
  }
  render() {
    return (
      <div className="App">
        {!this.state.isStart ? (
          <HomeScreen startGame={this.startGame} />
        ) : !this.state.isSelected ? (
          <CharacterSelectCard selectChar={this.selectChar} />
        ) : (
          <GameScreen isStart={this.state.isStart} stopGame={this.stopGame} />
        )}
      </div>
    )
  }
}

export default App
