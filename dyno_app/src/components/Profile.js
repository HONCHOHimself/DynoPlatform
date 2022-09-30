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
		axios.get('http://localhost:8000/client/current-user/profile/' + localStorage.getItem('token') + '/').then(res => {
			this.setState({ profile: res.data })
		})
	}
	render() {
		return (
			<div className="profile">
				{
					localStorage.getItem('color_mode') === 'light' ?
					<img src={default_light} alt="User Default - Light Mode" /> :
					<img src={default_dark} alt="User Default - Dark Mode" style={{ border: '2px solid #2B7A78', borderRadius: '100%' }} />
				}
			</div>
		)
	}
}

export default Profile;
