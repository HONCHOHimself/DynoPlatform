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
			current_user: {}
		}
	}
	componentDidMount() {
		axios.get('http://localhost:8000/client/current-user/' + localStorage.getItem('token') + '/').then(res => {
			this.setState({ current_user: res.data })
		})
	}
	render() {
		return (
			<div>
				{this.state.current_user.id}
				{this.state.current_user.profile_picture ? <img src="" /> : <p>No pic</p>}
				{this.state.current_user.color_mode ? <p>yes</p> : <p>no</p>}
				{this.state.current_user.verified_user ? <p>yes</p> : <p>no</p>}
				{this.state.current_user.user}
			</div>
		)
	}
}

export default Profile;
