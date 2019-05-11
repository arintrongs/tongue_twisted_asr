import React from 'react'
import './GameScreen.css'
import Grandma from './Grandma'
import GameDetails from './GameDetails'
import Enemy from './Enemy'
import websocket from 'websocket'
import _ from 'lodash'
import FinishedScreen from './FinishedScreen'

import { dict } from './dict'
import { withBackendUrl } from './utils'

const initialState = {
  utterance: [],
  current_utt: 0,
  hitpoint: 5,
  score: 0,
  time: 8,
  lastTimeStamp: new Date(),
  countdown: 3,
  isTimerBarRunning: false,
  secDiff: 0,
  refreshed: false,
  correct: 0,
  isFinished: false,
  isCorrect: false,
  isWrong: false,
  dict: []
}
var w3c = websocket.w3cwebsocket
class GameScreen extends React.Component {
  state = initialState

  async componentDidMount() {
    const new_dict = this.shuffle(dict)
    this.setState({ dict: new_dict })
    const interval = setInterval(async () => {
      if (this.state.countdown === 1) {
        clearInterval(interval)
        this.setState({ lastTimeStamp: new Date() })
        await this.start()
      }
      this.setState({ countdown: this.state.countdown - 1, lastTimeStamp: new Date() })
    }, 1000)

    const timerChecker = setInterval(async () => {
      const timeDiff = Date.now() - this.state.lastTimeStamp.getTime()
      const secDiff = timeDiff / 1000

      if (secDiff > this.state.time) {
        if (this.state.current_utt === this.state.dict.length - 2) {
          const new_dict = this.shuffle(dict)
          this.setState({ dict: new_dict, current_utt: 0 })
        }
        if (this.state.hitpoint === 1) {
          const score = this.state.score
          this.setState(initialState)
          this.setState({ isFinished: true, score })
          clearInterval(timerChecker)
          return
        }
        this.setState({
          hitpoint: this.state.hitpoint - 1,
          lastTimeStamp: new Date(),
          current_utt: this.state.current_utt + 1,
          isWrong: true
        })
        setTimeout(() => {
          this.setState({ isWrong: false })
        }, 500)
      }
      this.setState({ secDiff })
    }, 50)
  }
  shuffle = a => {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[a[i], a[j]] = [a[j], a[i]]
    }
    return a
  }
  computeMinED = (reference, candidate, percent) => {
    var dp = Array.from(Array(reference.length + 1), () => new Array(candidate.length + 1))

    for (var i = 0; i <= reference.length; i++) {
      dp[i][0] = i
    }

    for (var i = 0; i <= candidate.length; i++) {
      dp[0][i] = 0
    }

    if (candidate.length == 0) {
      return 0
    }

    for (var j = 0; j < candidate.length; j++) {
      if (reference[0] === candidate[j]) {
        dp[1][j + 1] = 0
      } else {
        dp[1][j + 1] = 1
      }
    }

    for (var i = 1; i < reference.length; i++) {
      for (var j = 0; j < candidate.length; j++) {
        if (reference[i] === candidate[j]) {
          dp[i + 1][j + 1] = Math.min(dp[i][j], Math.min(dp[i + 1][j], dp[i][j + 1]) + 1)
        } else {
          dp[i + 1][j + 1] = Math.min(dp[i][j], Math.min(dp[i + 1][j], dp[i][j + 1])) + 1
        }
      }
    }

    var mn = 1000
    var st,
      en = 0

    for (var j = 1; j <= candidate.length; j++) {
      mn = Math.min(mn, dp[reference.length][j])
      if (mn === dp[reference.length][j]) {
        en = j
      }
    }
    // console.log(reference, candidate, reference.length - mn)
    if ((reference.length - mn) / reference.length >= percent) {
      var i = reference.length
      var j = en

      while (i > 1 && j > 1) {
        if (reference[i - 1] == candidate[j - 1]) {
          i--
          j--
        } else {
          if (dp[i][j] - 1 == dp[i - 1][j]) {
            i--
          } else if (dp[i][j] - 1 == dp[i - 1][j - 1]) {
            i--
            j--
          } else {
            j--
          }
        }
      }

      st = j

      return [true, (reference.length - mn) / reference.length, st - 1, en - 1]
    } else {
      en = candidate.length
      st = Math.max(1, en - 5)
      // console.log(st - 1, en - 1)
      return [false, (reference.length - mn) / reference.length, st - 1, en - 1]
    }
  }
  handleUtterance = e => {
    if (this.state.isFinished) return
    const hypotheses = _.get(JSON.parse(e.data), 'result.hypotheses', [])

    const utterance = _.head(hypotheses.sort((a, b) => (_.get(a, 'likelihood', 0), _.get(b, 'likelihood', 0)))) || []
    if (utterance !== undefined) {
      const utt_list = utterance.transcript.split(' ')
      const [success, acc, st, en] = this.computeMinED(
        this.state.dict[this.state.current_utt].split(' '),
        utt_list.slice(0, utt_list.length - 1),
        0.8
      )

      this.setState({ utterance: utt_list.slice(st, en + 1).join(' ') })
      if (success) {
        const timeDiff = Date.now() - this.state.lastTimeStamp.getTime()
        const secDiff = timeDiff / 1000
        if (secDiff <= this.state.time) {
          this.setState({
            current_utt: this.state.current_utt + 1,
            utterance: [],
            lastTimeStamp: new Date(),
            time: Math.max(4, 8 - this.state.correct ** 2 * 0.03),
            score: this.state.score + (10000 / this.state.time) * acc,
            refreshed: false,
            correct: this.state.correct + 1,
            isCorrect: true
          })
          setTimeout(() => {
            this.setState({ isCorrect: false })
          }, 500)
          this.setState({ refreshed: true })
        }
      }
    }
    // client.close()
  }
  recordAudio = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    const mediaRecorder = new MediaRecorder(stream)
    var client = new w3c(withBackendUrl('/client/ws/speech'))
    this.setState({ mediaRecorder: this.state.mediaRecorder })
    mediaRecorder.addEventListener('dataavailable', async event => {
      client.send(event.data)
    })
    client.onmessage = this.handleUtterance
    mediaRecorder.start()
    this.setState({ isTimerBarRunning: true, refreshed: true })
    setInterval(async () => {
      mediaRecorder.requestData()
    }, 250)
  }
  start = async () => {
    await this.recordAudio()
  }
  record = async () => {
    await this.recordAudio()
  }

  renderFinishedScreen = () => {
    this.finishedScreen.current.focus()
  }
  renderCountdownScreen = () => {
    return <div className="countdown">{this.state.countdown}</div>
  }
  render() {
    return (
      <div className="screen">
        {this.state.countdown > 0 && !this.state.isFinished ? this.renderCountdownScreen() : null}
        {this.state.isFinished ? <FinishedScreen score={this.state.score} stopGame={this.props.stopGame} /> : null}
        {/* <div class="sliding-background" /> */}
        <div className="top-screen">
          <GameDetails
            current_utt={dict[this.state.current_utt]}
            speech={this.state.utterance}
            hitpoint={this.state.hitpoint}
            score={this.state.score}
            time={this.state.time}
            secDiff={this.state.time - this.state.secDiff}
            isTimerBarRunning={this.state.isTimerBarRunning}
            refreshed={this.state.refreshed}
            isCorrect={this.state.isCorrect}
            isWrong={this.state.isWrong}
          />
        </div>
        <div className="entities">
          <Grandma />
          <Enemy />
        </div>

        <div className="ground" />
      </div>
    )
  }
}

export default GameScreen
