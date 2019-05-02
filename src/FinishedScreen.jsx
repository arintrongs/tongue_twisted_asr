import React from 'react'

class FinishedScreen extends React.Component {
  constructor(props) {
    super(props)
    this.finishedScreen = React.createRef()
  }
  componentDidMount() {
    this.finishedScreen.current.focus()
  }
  handleKeyDown = e => {
    if (e.key === 'Enter') {
      this.props.stopGame()
    }
  }
  render() {
    return (
      <div className="finished-screen" ref={this.finishedScreen} onKeyPress={this.handleKeyDown} tabIndex="0">
        <div>จบเกม</div>
        <div>คะแนน : {this.props.score.toFixed(2)}</div>
        <div className="back-button">กดปุ่ม "เอ็นเทอร์" เพื่อกลับสู่หน้าแรก</div>
      </div>
    )
  }
}
export default FinishedScreen
