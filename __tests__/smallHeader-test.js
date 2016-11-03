import 'react-native';
import React from 'react';
import SmallHeader from '../shared/components/smallHeader';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(
    <SmallHeader
      btnRight={''}
      handleBtnLeft={()=>{}}
      handleBtnRight={()=>{}}
      headerText={'testing small header'}
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
