import React from 'react';
import renderer from 'react-test-renderer';
import App from './App';

test('should render the app name on Header', () => {
  const tree = renderer.create(<App />).toJSON();
  expect(tree).toMatchSnapshot();
});
