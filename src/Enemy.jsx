import React from 'react'
import Gudako from './sprites/gudako.png'
import Thanos from './assets/img/thanos.gif'

class Enemy extends React.Component {
  render() {
    return (
      <div>
        <img style={{ width: '200px', transform: 'scaleX(-1)', marginBottom: '-20px' }} src={Thanos} />
        {/* <br />
        Thanos */}
      </div>
    )
  }
}

export default Enemy
