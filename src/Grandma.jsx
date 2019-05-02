import React from 'react'
import MaincharImg from './sprites/main-char.png'
import cap from './assets/img/cap.gif'
import strange from './assets/img/strange.gif'
import ironman from './assets/img/ironman.gif'
import thor from './assets/img/thor.gif'
import spiderman from './assets/img/spiderman.gif'

class Grandma extends React.Component {
  handleSelect = () => {
    const char = localStorage.getItem('Selected')
    if (char === 'cap') {
      return <img alt="" style={{ width: '200px', marginBottom: '-20px' }} src={cap} />
    } else if (char === 'strange') {
      return <img alt="" style={{ width: '200px', marginBottom: '-20px' }} src={strange} />
    } else if (char === 'ironman') {
      return <img alt="" style={{ width: '200px', marginBottom: '-20px' }} src={ironman} />
    } else if (char === 'thor') {
      return <img alt="" style={{ width: '200px', marginBottom: '-20px' }} src={thor} />
    } else if (char === 'spiderman') {
      return <img alt="" style={{ width: '200px', marginBottom: '-20px' }} src={spiderman} />
    }
  }
  render() {
    return <div>{this.handleSelect()}</div>
  }
}
export default Grandma
