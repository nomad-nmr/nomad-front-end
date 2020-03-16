import React, { Component } from 'react'
import InfoCards from '../../components/InfoCards/InfoCards'
import { Spin, Empty } from 'antd'
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
		const noData = (
			<>
				<Empty style={{ margin: '30px' }} />
				<Spin size='large' />
			</>
		)
		return <>{this.state.cardsLoading ? noData : <InfoCards cardsData={this.state.statusOverview} />}</>
	}
}

export default Dashboard
