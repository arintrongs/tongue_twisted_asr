import React, { Component } from 'react'
import cap from './assets/img/cap.gif'
import strange from './assets/img/strange.gif'
import ironman from './assets/img/ironman.gif'
import thor from './assets/img/thor.gif'
import spiderman from './assets/img/spiderman.gif'

import './CharacterSelectCard.css'

class CharacterSelectCard extends Component {
  constructor() {
    super()
  }

  handleSelect = e => {
    console.log(e)
    localStorage.setItem('Selected', e)
  }

  render() {
    return (
      <div className="card-container">
        <p> Select Character </p>
        <div className="char-container">
          <img src={cap} className="char-pic" onClick={() => this.handleSelect('cap')} />
          <img src={strange} className="char-pic" onClick={() => this.handleSelect('strange')} />
          <img src={ironman} className="char-pic" onClick={() => this.handleSelect('ironman')} />
          <img src={thor} className="char-pic" onClick={() => this.handleSelect('thor')} />
          <img src={spiderman} className="char-pic" onClick={() => this.handleSelect('spiderman')} />
        </div>
      </div>
    )
  }
}

export default CharacterSelectCard
