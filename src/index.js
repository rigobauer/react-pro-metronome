import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Howl } from 'howler'

import click3SoundFileMP3 from './sounds/click3.mp3'
import click3SoundFileOGG from './sounds/click3.ogg'
import click3SoundFileAAC from './sounds/click3.aac'

import click2SoundFileMP3 from './sounds/click2.mp3'
import click2SoundFileOGG from './sounds/click2.ogg'
import click2SoundFileAAC from './sounds/click2.aac'

import click1SoundFileMP3 from './sounds/click1.mp3'
import click1SoundFileOGG from './sounds/click1.ogg'
import click1SoundFileAAC from './sounds/click1.aac'


class ProMetronome extends PureComponent {
  
  state = {
    qNote: 1,
    subNote: 1,
  }

  clickSounds = [
    new Howl({
      src: [click1SoundFileMP3, click1SoundFileOGG, click1SoundFileAAC],
      preload: true,
    }),
    new Howl({
      src: [click2SoundFileMP3, click2SoundFileOGG, click2SoundFileAAC],
      preload: true,
    }),
    new Howl({
      src: [click3SoundFileMP3, click3SoundFileOGG, click3SoundFileAAC],
      preload: true,
    })
  ]

  update = () => {

    const { soundEnabled, soundPattern, subdivision } = this.props
    const { qNote, subNote } = this.state

    if (soundEnabled && soundPattern.length === 4*subdivision) {
      const soundLevel = soundPattern.charAt((qNote-1)*subdivision + subNote - 1)
      if (soundLevel > 0 && soundLevel <= 3)
        this.clickSounds[soundLevel-1].play()
    }

    if (subNote < subdivision) {
      this.setState(prevState => ({ 
        subNote: prevState.subNote + 1
      }))
    }
    else {
      this.setState(prevState => ({
        qNote: prevState.qNote === 4 ? 1 : prevState.qNote + 1,
        subNote: 1
      }))
    }
  }

  calculateInterval = (bpm, subdivision) => {
    return Math.floor(60000 / (bpm * subdivision))
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
  subdivision: PropTypes.number,
  soundEnabled: PropTypes.bool,
  soundPattern: PropTypes.string,
  render: PropTypes.func.isRequired,
}

ProMetronome.defaultProps = {
  bpm: 80,
  subdivision: 1,
  soundEnabled: false,
  soundPattern: '',
}

export default ProMetronome
