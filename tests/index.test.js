import React from 'react'
import { shallow, mount } from 'enzyme'
import { expect } from 'chai'
import sinon from 'sinon'

import ProMetronome from 'src/'

describe('<ProMetronome />', () => {

  it('should shallow render a <ProMetronome /> as null', () => {
    const wrapper = shallow(<ProMetronome render={(props, state) => null }/>)
    expect(wrapper.html())
      .to.equal(null)
  })

  it('should shallow render a <ProMetronome /> printing the default bpm', () => {
    const wrapper = shallow(<ProMetronome render={(props, state) => <div>{props.bpm}</div> }/>)
    expect(wrapper.html())
      .to.equal('<div>80</div>')
  })

  it('should shallow render a <ProMetronome /> printing the configured bpm and subdivision', () => {
    const wrapper = shallow(
      <ProMetronome
        bpm={120}
        subdivision={3}
        render={(props, state) => <div>{props.bpm}/{props.subdivision}</div> }
      />
    )
    expect(wrapper.html())
      .to.equal('<div>120/3</div>')
  })

  it('should shallow render a <ProMetronome /> printing quarter notes and 16th notes', () => {
    let clock = sinon.useFakeTimers()
    sinon.spy(ProMetronome.prototype, 'render')
    sinon.spy(ProMetronome.prototype, 'componentWillReceiveProps')
    sinon.spy(ProMetronome.prototype, 'componentWillUnmount')

    let interval = Math.floor(60000/(80*4))
    const wrapper = mount(
      <ProMetronome
        bpm={80}
        subdivision={4}
        render={(props, state) => <div>{state.qNote}/{state.subNote}</div> }
      />
    )

    expect(wrapper.text())
      .to.equal('1/1')
    clock.tick(interval + 5)
    expect(wrapper.text())
      .to.equal('1/2')
    clock.tick(interval + 5)
    expect(wrapper.text())
      .to.equal('1/3')
    clock.tick(interval + 5)
    expect(wrapper.text())
      .to.equal('1/4')
    clock.tick(interval + 5)
    expect(wrapper.text())
      .to.equal('2/1')
    clock.tick(interval + 5)
    expect(wrapper.text())
      .to.equal('2/2')
    clock.tick(10*interval + 5)
    expect(wrapper.text())
      .to.equal('4/4')
    clock.tick(interval + 5)
    expect(wrapper.text())
      .to.equal('1/1')
    
    wrapper.setProps({ bpm: 100, subdivision: 2 })
    expect(ProMetronome.prototype.componentWillReceiveProps.calledOnce).to.equal(true)
    interval = Math.floor(60000/(100*2))
    clock.tick(interval + 5)
    expect(wrapper.text())
      .to.equal('1/2')

    expect(ProMetronome.prototype.render.callCount)
      .to.equal(19)
    expect(ProMetronome.prototype.componentWillUnmount.notCalled).to.equal(true)
    wrapper.unmount()
    expect(ProMetronome.prototype.componentWillUnmount.calledOnce).to.equal(true)

    clock.restore()
    
  })

  it('should shallow render a <ProMetronome /> and check soundPattern type and length errors', () => {
    sinon.stub(console, 'error')

    let interval = Math.floor(60000/(80*4))
    const wrapper = mount(
      <ProMetronome
        bpm={80}
        subdivision={2}
        soundPattern={32323232}
        render={(props, state) => <div>{state.qNote}/{state.subNote}</div> }
      />
    )

    sinon.assert.callCount(console.error, 1)
    sinon.assert.calledWithMatch(console.error,'Warning: Failed prop type: Invalid prop `soundPattern` of type `number` supplied to ProMetronome, expected `string`.')
    console.error.resetHistory()
    wrapper.setProps({ soundPattern: '323232323' })
    sinon.assert.callCount(console.error, 1)
    sinon.assert.calledWithMatch(console.error,'Warning: Failed prop type: Invalid prop `soundPattern` with length 9 supplied to ProMetronome. Length value doesn\'t match with the subdivision, expected 8.')
    console.error.resetHistory()
    wrapper.setProps({ soundPattern: '32323232' })
    sinon.assert.notCalled(console.error)

    console.error.restore()
  })

})