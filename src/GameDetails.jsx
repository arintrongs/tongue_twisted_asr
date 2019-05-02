import React from 'react'
import './GameDetails.css'
import heart from './sprites/heart.png'

import { Tween } from 'react-gsap'
class GameDetails extends React.Component {
  renderHearts = () => {
    const hearts = []
    for (let i = 0; i < this.props.hitpoint; i++) {
      hearts.push(<img key={i} className="heart" alt="" src={heart} />)
    }
    return hearts
  }

  render() {
    return (
      <React.Fragment>
        <div className="hp-score-container">
          <div className="hit-point">พลังชีวิต : {this.renderHearts()}</div>

          <div className="score">คะแนน : {this.props.score.toFixed(2)}</div>
        </div>
        <div className="sentences-container">
          <div
            className={
              'sentences-display ' +
              (this.props.isCorrect ? 'correct-stroke ' : '') +
              (this.props.isWrong ? 'wrong-stroke' : '')
            }
          >
            {this.props.current_utt}
            <div className="timer">
              {this.props.isTimerBarRunning ? (
                <Tween
                  duration={this.props.time}
                  from={{ width: 700 }}
                  to={{ width: 0 }}
                  repeat={-1}
                  playState={this.props.refreshed ? 'play' : 'stop'}
                >
                  <div className="timer-bar" />
                </Tween>
              ) : (
                <div className="timer-bar" />
              )}

              <div className="center-bar" />
            </div>
            {this.props.speech}
          </div>
        </div>
      </React.Fragment>
    )
  }
}
export default GameDetails
