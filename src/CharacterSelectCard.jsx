import React, { Component } from 'react'
import cap from './assets/img/cap.gif'
import strange from './assets/img/strange.gif'
import ironman from './assets/img/ironman.gif'
import thor from './assets/img/thor.gif'
import spiderman from './assets/img/spiderman.gif'
import './HomeScreen.css'
import './CharacterSelectCard.css'
const chars = ['cap', 'strange', 'ironman', 'thor', 'spiderman']
class CharacterSelectCard extends Component {
  state = {
    idx: 0
  }
  constructor(props) {
    super(props)
    this.container = React.createRef()
  }
  componentDidMount() {
    this.container.current.focus()
  }

  handleKeyPress = e => {
    if (e.key === 'Enter') {
      localStorage.setItem('Selected', chars[this.state.idx])
      this.props.selectChar()
    }
    if (e.keyCode === 37) {
      if (this.state.idx > 0) {
        this.setState({ idx: this.state.idx - 1 })
      }
    }
    if (e.keyCode === 39) {
      if (this.state.idx < 4) {
        this.setState({ idx: this.state.idx + 1 })
      }
    }
    e.preventDefault()
  }
  render() {
    return (
      <div
        className="fixed-container"
        tabIndex="0"
        ref={this.container}
        onKeyPress={this.handleKeyPress}
        onKeyDown={this.handleKeyPress}
      >
        <div className="char-select-container">
          <div className="card-container">
            <p className="card-title"> โปรดเลือกตัวละคร </p>
            <div className="char-container">
              {this.state.idx === 0 ? (
                <span className="selected">
                  <img alt="" src={cap} className="char-pic" onClick={() => this.handleSelect('cap')} />
                </span>
              ) : (
                <img alt="" src={cap} className="char-pic" onClick={() => this.handleSelect('cap')} />
              )}
              {this.state.idx === 1 ? (
                <span className="selected">
                  <img alt="" src={strange} className="char-pic" onClick={() => this.handleSelect('strange')} />
                </span>
              ) : (
                <img alt="" src={strange} className="char-pic" onClick={() => this.handleSelect('strange')} />
              )}
              {this.state.idx === 2 ? (
                <span className="selected">
                  <img alt="" src={ironman} className="char-pic" onClick={() => this.handleSelect('ironman')} />
                </span>
              ) : (
                <img alt="" src={ironman} className="char-pic" onClick={() => this.handleSelect('ironman')} />
              )}
              {this.state.idx === 3 ? (
                <span className="selected">
                  <img alt="" src={thor} className="char-pic" onClick={() => this.handleSelect('thor')} />
                </span>
              ) : (
                <img alt="" src={thor} className="char-pic" onClick={() => this.handleSelect('thor')} />
              )}
              {this.state.idx === 4 ? (
                <span className="selected">
                  <img alt="" src={spiderman} className="char-pic" onClick={() => this.handleSelect('spiderman')} />
                </span>
              ) : (
                <img alt="" src={spiderman} className="char-pic" onClick={() => this.handleSelect('spiderman')} />
              )}
            </div>
            <div className="select-text">กดปุ่ม "เอ็นเทอร์" เพื่อเลือกตัวละคร</div>
          </div>
        </div>
        <div className="background" />
      </div>
    )
  }
}

export default CharacterSelectCard
