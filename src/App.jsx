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
        <CharacterSelectCard />
      </div>
    )
  }
}

export default App
