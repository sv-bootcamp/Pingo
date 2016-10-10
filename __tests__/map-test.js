import 'react-native';
import React from 'react';
import Map from '../shared/components/map';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(
    <Map 
      markers={[]}
      getMapMarkers = {() => {}}/>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
