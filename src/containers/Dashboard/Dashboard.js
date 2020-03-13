import React, { Component } from 'react'
import InfoCards from '../../components/InfoCards/InfoCards'
import axios from '../../axios-firebase'

export class Dashboard extends Component {
	state = {
		statusOverview: [],
		cardsLoading: true
	}

	componentDidMount() {
		axios.get('/cards.json').then(res => {
			console.log(res.data)
			this.setState({ statusOverview: res.data, cardsLoading: false })
		})
	}

	render() {
		return (
			<div style={{ margin: '40px' }}>
				<InfoCards cardsData={this.state.statusOverview} loading={this.state.cardsLoading} />
			</div>
		)
	}
}

export default Dashboard
