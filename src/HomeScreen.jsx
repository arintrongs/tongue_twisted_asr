import React from 'react'
import './HomeScreen.css'
import logo from './assets/img/logo.png'

class HomeScreen extends React.Component {
  constructor(props) {
    super(props)
    this.homeContainer = React.createRef()
  }
  componentDidMount() {
    this.homeContainer.current.focus()
  }
  handleKeyDown = e => {
    if (e.key === 'Enter') {
      this.props.startGame()
    }
  }
  render() {
    return (
      <div className="fixed-container">
        <div className="home-container" onKeyPress={this.handleKeyDown} ref={this.homeContainer} tabIndex="0">
          <div className="title"> ทั้งก์ ทวิสต์</div>
          <img alt="" className="logo" src={logo} />
          <div className="start">กดปุ่ม "เอ็นเทอร์" เพื่อเริ่มเกม</div>
        </div>
        <div className="background" />
      </div>
    )
  }
}

export default HomeScreen
