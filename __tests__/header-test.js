import 'react-native';
import React from 'react';
import MainHeader from '../shared/components/MainHeader';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(
      <MainHeader
        tabview_index={0}
        tabview_routes={[
          {key: '1', title: 'All'},
          {key: '2', title: 'Events'},
          {key: '3', title: 'Facilities'}
        ]}
        categorizeItems={()=>{}}
        setTabViewIndex={()=>{}}
      />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
