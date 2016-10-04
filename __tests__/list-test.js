import 'react-native';
import React from 'react';
import {
	Text,
	ListView
} from 'react-native';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders list correctly', () => {
  const ds = new ListView.DataSource({
	rowHasChanged: (r1, r2) => r1 !== r2
  });

  const dataItem = [{
	 'description'    : 'alaska',
	 'lat': 37.565398,
	 'lng': 126.9907941,
	 'address'        : '광화문 명당',
	 'createdDate'    : 'Wed Mar 25 2015 09:00:00 GMT+0900 (KST)',
	 'modifiedDate': 'Wed Mar 25 2015 09:00:00 GMT+0900 (KST)'
  }];

	
  const dataSource = ds.cloneWithRows(dataItem);


  let _renderRow = function() {
	return <Text>description test</Text>;
  };

  const tree = renderer.create(
    <ListView
		dataSource={dataSource}
		renderRow={_renderRow}
		enableEmptySections={true} />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
