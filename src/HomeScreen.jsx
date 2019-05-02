import React, { ReactDOM } from 'react'
import './HomeScreen.css'

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
      <div className="home-container" onKeyPress={this.handleKeyDown} ref={this.homeContainer} tabIndex="0">
        <div className="logo">Logo</div>
        <div className="start">กดปุ่ม "เอ็นเทอร์" เพื่อเริ่มเกม</div>
      </div>
    )
  }
}

export default HomeScreen
