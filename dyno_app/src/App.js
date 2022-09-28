import React from 'react';

import './styles/index.css';

import Login from './components/Login.js';
import Register from './components/Register.js';

// React Components
class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			token: localStorage.getItem('token'),
			color_mode: localStorage.getItem('color_mode'),
			auth_page: true,
			loading_login_page: true,
			loading_register_page: true,
		}
		this.goToLoginPage = this.goToLoginPage.bind(this)
		this.goToRegisterPage = this.goToRegisterPage.bind(this)
		this.turnToDarkMode = this.turnToDarkMode.bind(this)
		this.turnToLightMode = this.turnToLightMode.bind(this)
	}
	goToLoginPage() {
		this.setState({ auth_page: true })
		this.setState({ loading_login_page: true })
	}
	goToRegisterPage() {
		this.setState({ auth_page: false })
		this.setState({ loading_register_page: true })
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
		setInterval(() => {
			this.setState({ loading_login_page: false })
		}, 1000)
		setInterval(() => {
			this.setState({ loading_register_page: false })
		}, 1000)
	}
	render() {
		return (
			<main style={{ backgroundColor: this.state.color_mode === 'light' ? '' : '#17252A' }}>
				<header>
					<span onClick={
							localStorage.getItem('color_mode') === 'light' ? this.turnToDarkMode : this.turnToLightMode
						}>
						<span className={
							localStorage.getItem('color_mode') === 'light' ? 'fa-regular fa-moon' : 'fa-solid fa-moon'
							} style={{
							fontSize: '30px',
							color: '#3AAFA9',
						}}></span>
					</span>
				</header>
				{
					this.state.auth_page ?
					<div>
						{
							this.state.loading_login_page ?
							<div style={{
								position: 'fixed',
								bottom: '0',
								width: '100%',
								height: '50%',
							}}>
								<i className="fa-solid fa-spinner" style={{
									fontSize: '40px',
									color: '#3AAFA9',
									display: 'block',
									marginLeft: 'auto',
									marginRight: 'auto',
									width: '100%',
								}}></i>
							</div> :
							<Login goToRegisterPage={this.goToRegisterPage} />
						}
					</div> :
					<div>
						{
							this.state.loading_register_page ?
							<div style={{
								position: 'fixed',
								bottom: '0',
								width: '100%',
								height: '50%',
							}}>
								<i className="fa-solid fa-spinner" style={{
									fontSize: '40px',
									color: '#3AAFA9',
									display: 'block',
									marginLeft: 'auto',
									marginRight: 'auto',
									width: '100%',
								}}></i>
							</div> :
							<Register goToLoginPage={this.goToLoginPage} />
						}
					</div>
				}
			</main>
		)
	}
}

export default App;
