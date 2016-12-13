import React from 'react';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import Counter from '../src/Counter';

describe("A suite", function() {
  it("should be a div with class name 'counter'", function() {
    var wrapper = mount(<Counter />);
    expect(wrapper.find('div').hasClass('counter')).to.equal(true);
  });

  it("should increment the counter by 1 on every click", function() {
    var wrapper = mount(<Counter />);
    expect(wrapper.find('.counter').length).to.equal(1);
    expect(wrapper.find('.counter').text()).to.equal('0');
    wrapper.find('.counter').simulate('click');
    expect(wrapper.find('.counter').text()).to.equal('1');
    wrapper.find('.counter').simulate('click');
    expect(wrapper.find('.counter').text()).to.equal('2');
  });
});
