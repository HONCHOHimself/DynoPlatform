import React from 'react';

import './styles/index.css';

import Header from './components/Header.js';
import Login from './components/Login.js';
import Register from './components/Register.js';
import Profile from './components/Profile.js';
import SearchBar from './components/SearchBar.js';

// React Components
class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			token: localStorage.getItem('token'),
			color_mode: localStorage.getItem('color_mode'),
			auth_page: true,
		}
		this.goToLoginPage = this.goToLoginPage.bind(this)
		this.goToRegisterPage = this.goToRegisterPage.bind(this)
		this.turnToDarkMode = this.turnToDarkMode.bind(this)
		this.turnToLightMode = this.turnToLightMode.bind(this)
		this.loginUser = this.loginUser.bind(this)
		this.logoutUser = this.logoutUser.bind(this)
	}
	goToLoginPage() {
		this.setState({ auth_page: true })
	}
	goToRegisterPage() {
		this.setState({ auth_page: false })
	}
	turnToDarkMode() {
		localStorage.setItem('color_mode', 'dark')
		this.setState({ color_mode: localStorage.getItem('color_mode') })
	}
	turnToLightMode() {
		localStorage.setItem('color_mode', 'light')
		this.setState({ color_mode: localStorage.getItem('color_mode') })
	}
	componentDidMount() {
		if (localStorage.getItem('color_mode')) {
			this.setState({ color_mode: localStorage.getItem('color_mode') })
		} else {
			localStorage.setItem('color_mode', 'light')
		}
	}
	loginUser(token) {
		localStorage.setItem('token', token)
		this.setState({ token: localStorage.getItem('token') })
	}
	logoutUser() {
		localStorage.removeItem('token')
		this.setState({ token: localStorage.getItem('token') })
	}
	render() {
		return (
			<main style={{
				backgroundColor: this.state.color_mode === 'light' ? '' : '#17252A',
			}}>
				<Header turnToDarkMode={this.turnToDarkMode} turnToLightMode={this.turnToLightMode} logoutUser={this.logoutUser} />
				{
					this.state.token ?
					<Profile turnToDarkMode={this.turnToDarkMode} turnToLightMode={this.turnToLightMode} /> :
					this.state.auth_page ?
					<Login goToRegisterPage={this.goToRegisterPage} loginUser={t => {this.loginUser(t)}} /> :
					<Register goToLoginPage={this.goToLoginPage} loginUser={t => {this.loginUser(t)}} />
				}
				{
					this.state.token ?
					<SearchBar /> :
					null
				}
			</main>
		)
	}
}

export default App;
