import React from 'react'
import { shallow, mount } from 'enzyme'
import { expect } from 'chai'
import sinon from 'sinon'

import ProMetronome from 'src/'

describe('<ProMetronome />', () => {

  it('should shallow render a default <ProMetronome /> as null', () => {
    const wrapper = shallow(<ProMetronome render={(props, state) => null }/>)
    expect(wrapper.html())
      .to.equal(null)
  })

  it('should shallow render a default <ProMetronome /> printing the default bpm', () => {
    const wrapper = shallow(<ProMetronome render={(props, state) => <div>{props.bpm}</div> }/>)
    expect(wrapper.html())
      .to.equal('<div>80</div>')
  })

  it('should shallow render a default <ProMetronome /> printing the configured bpm and subdivision', () => {
    const wrapper = shallow(
      <ProMetronome
        bpm={120}
        subdivision="8t"
        render={(props, state) => <div>{props.bpm}/{props.subdivision}</div> }
      />
    )
    expect(wrapper.html())
      .to.equal('<div>120/8t</div>')
  })

  /*it('should shallow render a ProMetronome just with baseline as a single div', () => {
    const wrapper = shallow(<ProMetronome base="testing" />)
    expect(wrapper.type())
      .to.equal('div')
    expect(wrapper.text())
      .to.equal('testing')
  })

  it('should shallow render a ProMetronome with baseline and subscript', () => {
    const wrapper = shallow(<ProMetronome base="testing" sub="rocks" />)
    expect(wrapper.childAt(0).html())
      .to.equal('<div style="font-size:1em;display:flex;flex-flow:row nowrap;align-items:stretch">' +
                  '<div>testing</div>' +
                  '<div style="font-size:0.5em;display:flex;flex-flow:column nowrap;justify-content:space-between;padding-left:0.1em">' +
                    '<div></div>' +
                    '<div>rocks</div>' +
                  '</div>' +
                '</div>')
  })

  it('should shallow render a ProMetronome component with all basic values', () => {
    const wrapper = shallow(<ProMetronome base="baseline" sup="superscript" sub="subscript" />)
    expect(wrapper.childAt(0).html())
      .to.equal('<div style="font-size:1em;display:flex;flex-flow:row nowrap;align-items:stretch">' +
                  '<div>baseline</div>' +
                  '<div style="font-size:0.5em;display:flex;flex-flow:column nowrap;justify-content:space-between;padding-left:0.1em">' +
                    '<div>superscript</div>' +
                    '<div>subscript</div>' +
                  '</div>' +
                '</div>')
  })

  it('should shallow render a ProMetronome component with a class', () => {
    const wrapper = shallow(<ProMetronome className="testing rocks" base="baseline" sup="superscript" sub="subscript" />)
    expect(wrapper.type())
      .to.equal('div')
    expect(wrapper.hasClass('testing') && wrapper.hasClass('rocks'))
      .to.equal(true)
  })

  it('should shallow render a ProMetronome component with inline styles that overwrite the default display inline-block mode', () => {
    const wrapper = shallow(<ProMetronome style={{ display: 'block' }} base="baseline" sup="superscript" sub="subscript" />)
    expect(wrapper.prop('style').display)
      .to.deep.equal('block')
  })

  it('should mounts <Abc2SvgDrums /> with a simple abcNotation', () => {
    sinon.spy(ProMetronome.prototype, 'render')
    const wrapper = mount(<ProMetronome base="baseline" sup="superscript" sub="subscript" />)
    expect(ProMetronome.prototype.render.callCount)
      .to.equal(1)
    wrapper.setProps({ base: 'baseline', sup: 'superscript', sub: 'subscript' })
    expect(ProMetronome.prototype.render.callCount)
      .to.equal(1)
    wrapper.setProps({ base: 'newbaseline', sup: 'superscript', sub: 'subscript' })
    expect(ProMetronome.prototype.render.callCount)
      .to.equal(2)
  })*/

})