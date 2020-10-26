import React from 'react';
import renderer from 'react-test-renderer';
import { AppButton } from '..';

describe('AppButton', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<AppButton />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
