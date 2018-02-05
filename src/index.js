import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

const subdivisionFactor = {
  '4': 1,
  '8': 2,
  '8t': 3,
  '16': 4,
  '16t': 6,
  '32': 8,
}

class ProMetronome extends PureComponent {
  
  state = {
    qNote: 1,
    subNote: 1,
  }

  update = () => {
    if (this.state.subNote < subdivisionFactor[this.props.subdivision]) {
      this.setState(prevState => ({ subNote: prevState.subNote + 1 }))
    }
    else {
      this.setState(prevState => ({
        qNote: prevState.qNote === 4 ? 1 : prevState.qNote + 1,
        subNote: 1
      }))
    }
  }

  calculateInterval = (bpm, subdivision) => {
    return Math.floor(60000 / (bpm * subdivisionFactor[subdivision]))
  }

  componentDidMount() {
    this.timerID = setInterval(
      this.update,
      this.calculateInterval(this.props.bpm, this.props.subdivision),
    )    
  }

  componentWillReceiveProps(nextProps) {
    clearInterval(this.timerID)
    this.timerID = setInterval(
      this.update,
      this.calculateInterval(nextProps.bpm, nextProps.subdivision),
    )    
  }

  componentWillUnmount() {
    clearInterval(this.timerID)
  }

  render() {
    return this.props.render(this.props, this.state)
  }
}

ProMetronome.propTypes = {
  bpm: PropTypes.number,
  subdivision: PropTypes.oneOf(['4', '8', '8t', '16', '16t', '32']),
  render: PropTypes.func.isRequired,
}

ProMetronome.defaultProps = {
  bpm: 80,
  subdivision: '4',
}

export default ProMetronome
