import React, { Component } from 'react'
import { render } from 'react-dom'

import ProMetronome from '../../src'

class Demo extends Component {
  
  state = { bpm: 90 }
  
  componentDidMount() {
    setTimeout(() => {
      console.log('IN')
      this.setState({ bpm: 150 })
    }, 5000)
  }
  
  render() {
    return (
      <div>
        <h1>react-pro-metronome Demo</h1>
        <ProMetronome
          bpm={this.state.bpm}
          subdivision={16}
          render={(props, state) => (
            <div style={{ border: '1px solid black' }}>
              <div>BPM: {props.bpm}</div>
              <div>SUBDIVISION: {props.subdivision}</div>
              <div>QUARTER NOTE: {state.qNote}</div>
            </div>
          )}
        />
        <br/>
        <ProMetronome
          bpm={100}
          subdivision={8}
          render={(props, state) => (
            <div style={{ color: 'red', border: '1px solid red' }}>
              <div>bpm: {props.bpm}</div>
              <div>subdivision: {props.subdivision}</div>
              <div>quarter note: {state.qNote}</div>
            </div>
          )}
        />
      </div>
    )
  }
}

render(<Demo />, document.querySelector('#demo'))
