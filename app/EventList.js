import React, {
	Component,
} from 'react';

import {
	StyleSheet,
	Text,
	View,	
	Image,
	ListView
} from 'react-native';

const ENDPOINT = ``;

class EventList extends Component {
	constructor(props) {
		super(props);
		const ds = new ListView.DataSource({
			rowHasChanged: (r1, r2) => r1 !== r2
		});
		this.state = {
			dataSource: ds.cloneWithRows(['a', 'b', 'c', 'd', 'e'])
		}
	}

	componentDidMount() {
		this._refreshData();
	}

	_refreshData() {
		fetch(ENDPOINT)
			.then((response) => response.json())
			.then((rjson) => {
				this.setState({
					dataSource: this.state.dataSource.cloneWithRows(rjson)
				});
			});
	}

	_renderRow(rowData) {
		return <Text style={styles.row}>{rowData}</Text>;
	}

	render() {
		return (
			<ListView
				dataSource={this.state.dataSource}
				renderRow={this._renderRow} />
		);
	}
}

const styles = StyleSheet.create({
	row: {
		flex: 1,
		fontSize: 24,
		padding: 42,
		borderWidth: 1,
		borderColor: '#DDDDDD'
	}
});

export default EventList;