import React from 'react';

import '../styles/register.css';

import default_light from '../images/default-light.png';
import default_dark from '../images/default-dark.png';

// React Components
class Register extends React.Component {
	render() {
		return (
			<form className={ localStorage.getItem('color_mode') === 'light' ? 'light-register-form' : 'dark-register-form'} action="POST">
				{
					localStorage.getItem('color_mode') === 'light' ?
					<img src={default_light} alt="Dyno Platform Default User - Light Mode" /> :
					<img src={default_dark} style={{
						border: '2px solid #2B7A78',
						borderRadius: '100%',
					}} alt="Dyno Platform Default User - Dark Mode" />
				}
				<h1>Create Account</h1>
				<div>
					<i className="fa-solid fa-user" style={{
						fontSize: '1em',
						position: 'absolute',
						top: '',
						botton: '',
						right: '',
						left: '',
						marginTop: '24px',
						marginLeft: '18px',
						color: '#3AAFA9',
					}}></i>
					<input type="text" name="username" placeholder="Username" minLength="4" maxLength="18" required />
				</div>
				<div>
					<i className="fa-solid fa-at" style={{
						fontSize: '1em',
						position: 'absolute',
						top: '',
						botton: '',
						right: '',
						left: '',
						marginTop: '24px',
						marginLeft: '18px',
						color: '#3AAFA9',
					}}></i>
					<input type="email" name="email" placeholder="Email address" minLength="4" maxLength="36" required />
				</div>
				<div>
					<i className="fa-solid fa-lock" style={{
						fontSize: '1em',
						position: 'absolute',
						top: '',
						botton: '',
						right: '',
						left: '',
						marginTop: '24px',
						marginLeft: '18px',
						color: '#3AAFA9',
					}}></i>
					<input type="password" name="password" placeholder="Password" minLength="8" maxLength="24" required />
				</div>
				<div>
					<i className="fa-solid fa-lock" style={{
						fontSize: '1em',
						position: 'absolute',
						top: '',
						botton: '',
						right: '',
						left: '',
						marginTop: '24px',
						marginLeft: '18px',
						color: '#3AAFA9',
					}}></i>
					<input type="password" name="password" placeholder="Confirm Password" minLength="8" maxLength="24" required />
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
