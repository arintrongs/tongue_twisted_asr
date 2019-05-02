import React from 'react'
import Gudako from './sprites/gudako.png'

class Enemy extends React.Component {
  render() {
    return (
      <div>
        <img src={Gudako} />
      </div>
    )
  }
}

export default Enemy
