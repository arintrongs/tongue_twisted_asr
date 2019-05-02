import React from 'react'
import './GameDetails.css'
import heart from './sprites/heart.png'
class GameDetails extends React.Component {
  renderHearts = () => {
    const hearts = []
    for (let i = 0; i < this.props.hitpoint; i++) {
      hearts.push(<img key={i} className="heart" alt="" src={heart} />)
    }
    return hearts
  }
  paddingZeroes = val => {
    if (val < 99999) return ('0000000' + val).slice(-6)
    return val
  }
  render() {
    return (
      <div className="container">
        <div className="hit-point">พลังชีวิต : {this.renderHearts()}</div>
        <div className="sentences-display">
          {this.props.current_utt}
          <div className="timer">
            <div
              // key={Math.random()}
              className={'timer-bar ' + (this.props.isTimerBarRunning ? 'timer-bar-running' : '')}
              style={{
                animationDuration: `${this.props.time}s`,
                animationIterationCount: 'infinite'
              }}
            />
            <div className="center-bar" />
          </div>
          {this.props.speech}
        </div>
        <div className="score">คะแนน : {this.paddingZeroes(this.props.score)}</div>
      </div>
    )
  }
}
export default GameDetails
