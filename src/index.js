import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Howl } from 'howler'

import qNoteSoundFileMP3 from './sounds/click_qnote.mp3'
import qNoteSoundFileOGG from './sounds/click_qnote.ogg'
import qNoteSoundFileAAC from './sounds/click_qnote.aac'

import subNoteSoundFileMP3 from './sounds/click_subnote.mp3'
import subNoteSoundFileOGG from './sounds/click_subnote.ogg'
import subNoteSoundFileAAC from './sounds/click_subnote.aac'

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

  qNoteSound = new Howl({
    src: [qNoteSoundFileMP3, qNoteSoundFileOGG, qNoteSoundFileAAC],
    preload: true
  })

  subNoteSound = new Howl({
    src: [subNoteSoundFileMP3, subNoteSoundFileOGG, subNoteSoundFileAAC],
    preload: true
  })

  update = () => {
    if (this.state.subNote < subdivisionFactor[this.props.subdivision]) {
      if (this.props.soundEnabled)
        this.subNoteSound.play()

      this.setState(prevState => ({ 
        subNote: prevState.subNote + 1
      }))
    }
    else {
      if (this.props.soundEnabled)
        this.qNoteSound.play()

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
  soundEnabled: PropTypes.bool,
  render: PropTypes.func.isRequired,
}

ProMetronome.defaultProps = {
  bpm: 80,
  subdivision: '4',
  soundEnabled: true,  
}

export default ProMetronome
