import React from 'react'
import MaincharImg from './sprites/main-char.png'
class Grandma extends React.Component {
  render() {
    return (
      <div>
        <img src={MaincharImg} />
        <br />
        Grandma
      </div>
    )
  }
}
export default Grandma
