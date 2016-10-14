import 'react-native';
import React from 'react';
import Map from '../shared/components/map';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(
    <Map 
      items={[]}
      getMapItems={()=>{}}
      selectedItem={{}}/>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
