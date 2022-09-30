import React from 'react';
import axios from 'axios';

import InputResults from '../components/InputResults.js';

import '../styles/search-bar.css';

import search_icon from '../icons/magnifying-glass-solid.svg';
import arrow_down_icon from '../icons/chevron-down-solid.svg';

class SearchBar extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			results: [],
			search_input: '',
		}
		this.searchResults = this.searchResults.bind(this)
	}
	searchResults() {
		setTimeout(() => {
			axios.post('http://localhost:8000/client/input-results/', {
				letter: this.state.search_input
			}).then(res => {
				if (res.data === false) {
					this.setState({ results: [] })
				} else {
					this.setState({ results: res.data })
				}
			})
		}, 500)
	}
	render() {
		return (
			<form className="search-bar">
				<div className="input">
					{
						this.state.search_input ?
						<img src={arrow_down_icon} style={{
							width: '20px',
							position: 'absolute',
							top: '',
							botton: '',
							righ17252At: '',
							left: '',
							marginTop: '21px',
							marginLeft: '18px',
						}} onClick={() => {
							this.setState({ search_input: '' })
						}} alt="Dyno - Slide Down Icon" /> :
						<img src={search_icon} style={{
							width: '20px',
							position: 'absolute',
							top: '',
							botton: '',
							righ17252At: '',
							left: '',
							marginTop: '21px',
							marginLeft: '18px',
						}} alt="Dyno - Search Icon" />
					}
					{
						localStorage.getItem('color_mode') === 'light' ?
						<input onChange={element => {
							this.setState({ search_input: element.target.value })
							this.searchResults(element.target.value)
						}} type="text" placeholder="Username" style={{
							marginBottom: this.state.search_input ? '400px' : '',
							backgroundColor: '#DEF2F1',
							border: '0',
							borderRadius: '15px',
							marginTop: '10px',
							color: '#17252A',
						}} minLength="4" maxLength="18" value={this.state.search_input} required /> :
						<input onChange={element => {
							this.setState({ search_input: element.target.value })
							this.searchResults(element.target.value)
						}} type="text" placeholder="Username" style={{
							marginBottom: this.state.search_input ? '400px' : '',
							backgroundColor: '#17252A',
							border: '1px solid #3AAFA9',
							borderRadius: '15px',
							marginTop: '9px',
							color: '#FEFFFF',
						}} minLength="4" maxLength="18" value={this.state.search_input} required />
					}
				</div>
				{
					this.state.search_input ?
					<div className="results">
						{
							this.state.results.length > 0 ?
							this.state.results.map(user => {
								return <InputResults user={user} />
							}) :
							localStorage.getItem('color_mode') === 'light' ?
							<div className="result" style={{ display: 'grid', }}>
								No results.
							</div> :
							<div className="result" style={{
								backgroundColor: '#17252A',
								border: '1px solid #3AAFA9',
								color: '#3AAFA9',
								display: 'grid',
							}}>
								No results.
							</div>
						}
					</div> :
					null
				}
			</form>
		)
	}
}

export default SearchBar;
