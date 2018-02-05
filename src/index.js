import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

class ProMetronome extends PureComponent {
  
  state = {
    qNote: 1,
  }

  update = () => {
    this.setState((prevState) => (
      { qNote: prevState.qNote === 4 ? 1 : prevState.qNote + 1 }
    ))
  }

  componentDidMount() {
    this.timerID = setInterval(this.update, Math.floor(60000/this.props.bpm))    
  }

  componentWillReceiveProps(nextProps) {
    clearInterval(this.timerID)
    this.timerID = setInterval(this.update, Math.floor(60000/nextProps.bpm))    
  }

  componentWillUnmount() {
    clearInterval(this.timerID)
  }

  render() {
    return this.props.render(this.props, this.state)
  }
}

ProMetronome.propTypes = {
  bpm: PropTypes.number.isRequired,
  subdivision: PropTypes.number,
}

ProMetronome.defaultProps = {
  bpm: 80,
  subdivision: 4,
}

export default ProMetronome
