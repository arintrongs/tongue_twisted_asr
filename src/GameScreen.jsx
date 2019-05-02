import React from 'react'
import './GameScreen.css'
import Grandma from './Grandma'
import GameDetails from './GameDetails'
import Enemy from './Enemy'
import websocket from 'websocket'
import _ from 'lodash'
import { dict } from './dict'

var w3c = websocket.w3cwebsocket
class GameScreen extends React.Component {
  state = {
    utterance: [],
    current_utt: 0,
    hitpoint: 5,
    score: 0,
    time: 5,
    lastTimeStamp: new Date(),
    countdown: 3,
    isTimerBarRunning: false,
    secDiff: 0,
    refreshed: false
  }
  async componentDidMount() {
    const interval = setInterval(async () => {
      if (this.state.countdown === 1) {
        clearInterval(interval)
        await this.start()
      }
      this.setState({ countdown: this.state.countdown - 1, lastTimeStamp: new Date() })
    }, 1000)

    const timerChecker = setInterval(async () => {
      const timeDiff = Date.now() - this.state.lastTimeStamp.getTime()
      const secDiff = timeDiff / 1000
      if (secDiff > this.state.time) {
        this.setState({
          hitpoint: this.state.hitpoint - 1,
          lastTimeStamp: new Date(),
          current_utt: this.state.current_utt + 1
        })
      }
      this.setState({ secDiff })
    }, 50)
  }
  computeMinED = (reference, candidate) => {
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
          dp[i + 1][j + 1] = dp[i][j]
        } else {
          dp[i + 1][j + 1] = Math.min(dp[i][j], Math.min(dp[i + 1][j], dp[i][j + 1])) + 1
        }
      }
    }

    var mn = 1000

    for (var j = 1; j <= candidate.length; j++) {
      mn = Math.min(mn, dp[reference.length][j])
    }
    var st,
      en = 0

    for (var j = 1; j <= candidate.length; j++) {
      mn = Math.min(mn, dp[reference.length][j])
      if (mn === dp[reference.length][j]) {
        en = j
      }
    }

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
    return [((reference.length - mn) / candidate.length) * 100, st - 1, en - 1]
  }
  handleUtterance = e => {
    const hypotheses = _.get(JSON.parse(e.data), 'result.hypotheses', [])

    const utterance = _.head(hypotheses.sort((a, b) => (_.get(a, 'likelihood', 0), _.get(b, 'likelihood', 0))))
    if (utterance !== undefined) {
      const utt_list = utterance.transcript.split(' ')
      const [result_acc, st, en] = this.computeMinED(
        utt_list.slice(0, utt_list.length - 1),
        dict[this.state.current_utt].split(' ')
      )

      this.setState({ utterance: utt_list.slice(st, en + 1).join(' ') })
      if (result_acc >= 80) {
        const timeDiff = Date.now() - this.state.lastTimeStamp.getTime()
        const secDiff = timeDiff / 1000
        if (secDiff <= this.state.time) {
          this.setState({
            current_utt: this.state.current_utt + 1,
            utterance: '',
            lastTimeStamp: new Date(),
            time: this.state.time - this.state.current_utt / 5,
            score: this.state.score + (100 * 1) / this.state.time
          })
        }
      }
    }
    // client.close()
  }
  recordAudio = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    const mediaRecorder = new MediaRecorder(stream)
    var client = new w3c('ws://localhost:8080/client/ws/speech')

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
  stop = async mediaRecorder => {
    await mediaRecorder.stop()
  }
  record = async () => {
    await this.recordAudio()
  }
  render() {
    return (
      <div className="screen">
        {/* {this.state.countdown > 0 ? <div className="countdown">{this.state.countdown}</div> : null} */}
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
          />
          <div className="entities">
            <Grandma />
            <Enemy />
          </div>
        </div>
        <div className="ground" />
      </div>
    )
  }
}

export default GameScreen
