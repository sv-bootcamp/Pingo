import 'react-native';
import React from 'react';
import Setting from '../shared/components/Setting';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
	const tree = renderer.create(
		<Setting/>
	).toJSON();
	expect(tree).toMatchSnapshot();
});
