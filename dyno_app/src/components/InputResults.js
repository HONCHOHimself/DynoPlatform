import React from 'react';
import axios from 'axios';

import '../styles/input-results.css';

import default_light from '../images/default-light.png';
import default_dark from '../images/default-dark.png';

class InputResults extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			profile: {}
		}
	}
	componentDidMount() {
		setTimeout(() => {
			axios.get('http://localhost:8000/client/user-result/profile/' + this.props.user.id + '/').then(res => {
				this.setState({ profile: res.data })
			})
		}, 500)
	}
	render() {
		return (
			<div className={localStorage.getItem('color_mode') === 'light' ? 'light_mode_result' : 'dark_mode_result'}>
				{
					this.state.profile.profile_picture ?
					null :
					this.state.profile.color_mode === false ?
					<img src={default_dark} style={{
						border: '1px solid #2B7A78',
						borderRadius: '100%',
					}} alt="Dyno Platform Default User - Dark Mode" /> :
					<img src={default_light} style={{
						border: '1px solid #FEFFFF',
						borderRadius: '100%',
					}} alt="Dyno Platform Default User - Light Mode" />
				}
				<h1>{this.props.user.username}</h1>
				{this.state.profile.verified_user}
			</div>
		)
	}
}

export default InputResults;
