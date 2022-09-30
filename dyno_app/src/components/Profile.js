import React from 'react';
import axios from 'axios';

import '../styles/profile.css';

import default_light from '../images/default-light.png';
import default_dark from '../images/default-dark.png';

// React Components
class Profile extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			user: {},
			profile: {}
		}
	}
	componentDidMount() {
		axios.get('http://localhost:8000/client/current-user/' + localStorage.getItem('token') + '/').then(res => {
			this.setState({ user: res.data })
		})
	}
	render() {
		return (
			<div>
				{this.state.user.username}
			</div>
		)
	}
}

export default Profile;
