import React from 'react';
import axios from 'axios';

import '../styles/register.css';

import default_light from '../images/default-light.png';
import default_dark from '../images/default-dark.png';

import user_icon from '../icons/user-solid.svg';
import email_icon from '../icons/at-solid.svg';
import password_icon from '../icons/lock-solid.svg';

// React Components
class Register extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			error: '',
			username: '',
			username_invalid: [false, ''],
			email: '',
			email_invalid: [false, ''],
			password: '',
		}
		this.changeInput = this.changeInput.bind(this)
		this.submitRegisterForm = this.submitRegisterForm.bind(this)
	}
	changeInput(element) {
		if (element.target.name === 'username') {
			this.setState({ username: element.target.value })
			setTimeout(() => {
				axios.post('http://localhost:8000/form-validation/check-username/', {
					username: this.state.username,
				}).then(res => {
					if (res.data === true) {
						this.setState({ username_invalid: [false, ''] })
					} else {
						this.setState({ username_invalid: [true, res.data] })
					}
				})
			})
		} else if (element.target.name === 'email') {
			this.setState({ email: element.target.value })
			setTimeout(() => {
				axios.post('http://localhost:8000/form-validation/check-email/', {
					email: this.state.email,
				}).then(res => {
					if (res.data === true) {
						this.setState({ email_invalid: [false, ''] })
					} else {
						this.setState({ email_invalid: [true, res.data] })
					}
				})
			}, 500)
		} else if (element.target.name === 'password') {
			this.setState({ password: element.target.value })
		}
	}
	submitRegisterForm(form) {
		form.preventDefault()
		const FormData = require('form-data')
		const form_data = new FormData()
		form_data.append('username', this.state.username)
		form_data.append('email', this.state.email)
		form_data.append('password', this.state.password)
		localStorage.getItem('color_mode') === 'light' ?
		form_data.append('color_mode', 'light') :
		form_data.append('color_mode', 'dark')
		axios.post('http://localhost:8000/auth/register/', form_data).then(res => {
			if (res.data === false) {
				this.setState({ error: 'User already exists.' })
			} else {
				this.setState({ error: '', username: '', email: '', password: '' })
				this.props.loginUser(res.data)
			}
		})
	}
	render() {
		return (
			<form onSubmit={this.submitRegisterForm} className={ localStorage.getItem('color_mode') === 'light' ? 'light-register-form' : 'dark-register-form'} action="POST">
				{
					localStorage.getItem('color_mode') === 'light' ?
					<img src={default_light} alt="Dyno Platform Default User - Light Mode" /> :
					<img src={default_dark} style={{
						border: '2px solid #2B7A78',
						borderRadius: '100%',
					}} alt="Dyno Platform Default User - Dark Mode" />
				}
				{
					this.state.error ?
					<p className="error">{this.state.error}</p> :
					null
				}
				<h1>Create Account</h1>
				<div>
					<img src={user_icon} alt="Dyno - Username Icon" style={{
						position: 'absolute',
						top: '',
						botton: '',
						right: '',
						left: '',
						marginTop: '25px',
						marginLeft: '18px',
						color: '#3AAFA9',
						width: '14px'
					}} />
					{
						this.state.username_invalid[0] ?
						<input style={{ border: '1px solid #DC3545', }} type="text" name="username" onChange={e => {this.changeInput(e)}} placeholder="Username" minLength="4" maxLength="18" required /> :
						<input type="text" name="username" onChange={e => {this.changeInput(e)}} placeholder="Username" minLength="4" maxLength="18" required />
					}
					{
						this.state.username_invalid[0] === true ?
						<small className="input-error">{this.state.username_invalid[1]}</small> :
						null
					}
				</div>
				<div>
					<img src={email_icon} alt="Dyno - Email Icon" style={{
						position: 'absolute',
						top: '',
						botton: '',
						right: '',
						left: '',
						marginTop: '25px',
						marginLeft: '18px',
						color: '#3AAFA9',
						width: '16px'
					}} />
					{
						this.state.email_invalid[0] ?
						<input style={{ border: '1px solid #DC3545', }} type="email" name="email" onChange={e => {this.changeInput(e)}} placeholder="Email address" minLength="4" maxLength="36" required /> :
						<input type="email" name="email" onChange={e => {this.changeInput(e)}} placeholder="Email address" minLength="4" maxLength="36" required />
					}
					{
						this.state.email_invalid[0] === true ?
						<small className="input-error">{this.state.email_invalid[1]}</small> :
						null
					}
				</div>
				<div>
					<img src={password_icon} alt="Dyno - Password Icon" style={{
						position: 'absolute',
						top: '',
						botton: '',
						right: '',
						left: '',
						marginTop: '25px',
						marginLeft: '18px',
						color: '#3AAFA9',
						width: '14px'
					}} />
					<input type="password" name="password" onChange={e => {this.changeInput(e)}} placeholder="Password" minLength="8" maxLength="24" required />
				</div>
				<div>
					<input type="submit" value="Register" />
				</div>
				<p>Already have an account? <span className="login-button" onClick={
					this.props.goToLoginPage
				}>Login</span></p>
			</form>
		)
	}
}

export default Register;
