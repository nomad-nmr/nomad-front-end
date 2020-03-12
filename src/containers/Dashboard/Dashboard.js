import React, { Component } from 'react'
import InfoCards from '../../components/InfoCards/InfoCards'

export class Dashboard extends Component {
	state = {
		statusOverview: [
			{
				id: 1,
				name: 'Alec',
				model: 'Bruker AVIII 500',
				capacity: 60,
				automationStatus: 'Running',
				busyUntil: 'Thu 11:46',
				dayExpt: '00:04',
				nightExpt: '00:00'
			},
			{
				id: 2,
				name: 'Felix',
				model: 'Bruker AVIII HD 500',
				capacity: 60,
				automationStatus: 'unknown',
				busyUntil: 'Thu 11:46',
				dayExpt: '00:04',
				nightExpt: '00:00'
			}
		]
	}

	render() {
		return (
			<div style={{ margin: '40px' }}>
				<InfoCards cardsData={this.state.statusOverview} />
			</div>
		)
	}
}

export default Dashboard
