import React, { Component } from 'react'
import { render } from 'react-dom'

import ProMetronome from '../../src'

class Demo extends Component {
  
  state = { bpm: 90 }
  
  componentDidMount() {
    setTimeout(() => {
      this.setState({ bpm: 150 })
    }, 5000)
  }

  metronomeStyle1 = (props, state) => (
    <div style={{ border: '1px solid black' }}>
      <div>BPM: {props.bpm}</div>
      <div>SUBDIVISION: {props.subdivision}</div>
      <div>QUARTER NOTE: {state.qNote}</div>
    </div>
  )

  metronomeStyle2 = (props, state) => (
    <div style={{ color: 'red', border: '1px solid red' }}>
      <div>bpm: {props.bpm}</div>
      <div>subdivision: {props.subdivision}</div>
      <div>quarter note: {state.qNote}</div>
    </div>
  )
  
  render() {
    return (
      <div>
        <h1>react-pro-metronome Demo</h1>
        <ProMetronome
          bpm={this.state.bpm}
          subdivision={16}
          render={this.metronomeStyle1}
        />
       
      </div>
    )
  }
}

render(<Demo />, document.querySelector('#demo'))
