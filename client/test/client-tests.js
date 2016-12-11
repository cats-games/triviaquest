import React from 'react';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import Grid from '../src/components/Grid';

describe("A suite", function() {
  it("contains spec with an expectation", function() {
    expect(shallow(<Grid />).contains(<div id="grid" />)).to.equal(true);
  });

  /*it("contains spec with an expectation", function() {
    expect(shallow(<Foo />).is('.foo')).to.equal(true);
  });

  it("contains spec with an expectation", function() {
    expect(mount(<Foo />).find('.foo').length).to.equal(1);
  });*/
});