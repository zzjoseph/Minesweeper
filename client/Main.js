import React from 'react';
import ReactDOM from 'react-dom';
import Container from './Container';

class Main extends React.Component {
	render() {
		return (
			<Container />
		);
	}
}

ReactDOM.render(<Main/>, document.getElementById('main'));
