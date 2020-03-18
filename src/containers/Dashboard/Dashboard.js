import React, { Component } from 'react'
import InfoCards from '../../components/InfoCards/InfoCards'
import StatusTabs from '../../components/StatusTabs/StatusTabs'
import { Spin, Empty, Modal } from 'antd'
import axios from '../../axios-firebase'

export class Dashboard extends Component {
	state = {
		statusOverview: [],
		cardsLoading: true,
		activeTab: 1
	}

	getStatusOverview() {
		axios
			.get('/cards.json')
			.then(res => {
				console.log(res.data)
				this.setState({ statusOverview: res.data, cardsLoading: false })
			})
			.catch(err =>
				Modal.error({
					title: 'Error message',
					content: `${err}`
				})
			)
	}

	componentDidMount() {
		this.getStatusOverview()
	}

	tabChangeHandler = tabId => {
		console.log(tabId)
		this.setState({ activeTab: tabId })
	}

	render() {
		const noData = (
			<>
				<Empty style={{ margin: '30px' }} />
				<Spin size='large' />
			</>
		)
		return (
			<>
				{this.state.cardsLoading ? (
					noData
				) : (
					<InfoCards cardsData={this.state.statusOverview} clicked={this.tabChangeHandler} />
				)}
				<StatusTabs
					activeTab={this.state.activeTab.toString()}
					overview={this.state.statusOverview}
					clicked={this.tabChangeHandler}
				/>
			</>
		)
	}
}

export default Dashboard
