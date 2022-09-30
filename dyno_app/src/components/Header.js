import React from 'react';

import '../styles/header.css';

import moon_solid from '../icons/moon-solid.svg';
import moon_regular from '../icons/moon-regular.svg';
import logout from '../icons/door-open-solid.svg';

// React Components
class Header extends React.Component {
	render() {
		return (
			localStorage.getItem('token') ?
			<header style={{ justifyContent: 'space-between' }}>
				<span onClick={this.props.logoutUser}>
					<img src={logout} alt="Dyno - Logout" style={{ width: '24px' }} />
				</span>
				{
					localStorage.getItem('color_mode') === 'light' ?
					<span onClick={this.props.turnToDarkMode}>
						<img src={moon_regular} alt="Dyno - Color Mode" style={{ width: '21px' }} />
					</span> :
					<span onClick={this.props.turnToLightMode}>
						<img src={moon_solid} alt="Dyno - Color Mode" style={{ width: '21px' }} />
					</span>
				}
			</header> :
			<header style={{ justifyContent: 'flex-end' }}>
				{
					localStorage.getItem('color_mode') === 'light' ?
					<span onClick={this.props.turnToDarkMode}>
						<img src={moon_regular} alt="Dyno - Color Mode" style={{ width: '21px' }} />
					</span> :
					<span onClick={this.props.turnToLightMode}>
						<img src={moon_solid} alt="Dyno - Color Mode" style={{ width: '21px' }} />
					</span>
				}
			</header>
		)
	}
}

export default Header;
