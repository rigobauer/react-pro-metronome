import React, { Component } from 'react'
import { render } from 'react-dom'

import ProMetronome from '../../src'

class Demo extends Component {
  
  state = {
    bpm1: 90,
    bpm2: 70,
  }
  
  componentDidMount() {
    setTimeout(() => {
      this.setState({ bpm1: 150 })
    }, 5000)
  }

  metronomeStyle1 = (props, state) => (
    <div style={{ border: '1px solid black' }}>
      <div>BPM: {props.bpm}</div>
      <div>SUBDIVISION: {props.subdivision}</div>
      <div>QUARTER NOTE: {state.qNote}</div>
      <div>SUBDIVISION NOTE: {state.subNote}</div>
    </div>
  )

  metronomeStyle2 = (props, state) => (
    <div style={{ display: 'inline-block', color: 'red', border: '1px solid red' }}>
      <div>bpm: {props.bpm}</div>
      <button onClick={() => {
        if (this.state.bpm2 > 1)
          this.setState(prevState => ({ bpm2: prevState.bpm2 - 1 }))
      }}>
        -
      </button>{' '}
      <button onClick={() => {
        if (this.state.bpm2 < 160)
          this.setState(prevState => ({ bpm2: prevState.bpm2 + 1 }))
      }}>
        +
      </button>
      <div>subdivision: {props.subdivision}</div>
      <div>quarter note: {state.qNote}</div>
      <div>subdivision note: {state.subNote}</div>
      
    </div>
  )
  
  render() {
    return (
      <div>
        <h1>react-pro-metronome Demo</h1>
        <ProMetronome
          bpm={this.state.bpm1}
          subdivision="4"
          soundEnabled={false}
          render={this.metronomeStyle1}
        />
        <br/>
        <ProMetronome
          bpm={this.state.bpm2}
          subdivision="8t"
          render={this.metronomeStyle2}
        />
      </div>
    )
  }
}

render(<Demo />, document.querySelector('#demo'))
