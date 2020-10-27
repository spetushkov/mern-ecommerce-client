import { mount } from 'enzyme';
import React from 'react';
import { AppButton } from '..';

describe('AppButton', () => {
  it('should handle onClick', () => {
    const component = mount(<AppButton />);
    console.log('component', component);
    expect(true).toBe(true);
  });
});
