import React from 'react'
import { connect } from 'react-redux'
import { Alert, Row, Col, Tag, Switch, Button, Space } from 'antd'

import TrafficLights from '../../TrafficLights/TrafficLights'

import { deleteHolders, toggleAvailableOnDash } from '../../../store/actions'

import classes from './StatusBanner.module.css'

const statusBanner = props => {
	const { busyUntil, dayExpt, nightExpt } = props.data.status.summary
	const bannerType = props.data.available ? 'success' : 'error'
	const { authToken, instrId, checkedHolders, accessLvl, data, tabData } = props

	const switchElement = (
		<Switch
			checked={data.available}
			checkedChildren='On'
			unCheckedChildren='Off'
			onChange={() => props.toggleAvailable(instrId, authToken)}
		/>
	)

	const cancelButton = (
		<Button onClick={() => props.deleteHoldersHandler(authToken, instrId, checkedHolders)}>
			Cancel Selected
		</Button>
	)

	const resetButton = (
		<Button
			danger
			onClick={() => {
				const holders = tabData
					.filter(row => row.status === 'Completed' || row.status === 'Error')
					.map(row => row.holder)
				props.deleteHoldersHandler(authToken, instrId, holders)
			}}>
			Reset
		</Button>
	)

	return (
		<Alert
			type={bannerType}
			message={
				<Row className={classes.Banner}>
					<Col className={classes.Switch} span={4}>
						<Space size='large'>
							{accessLvl && cancelButton}
							{accessLvl === 'admin' && resetButton}
							{accessLvl === 'admin' && switchElement}
						</Space>
					</Col>
					<Col span={16} offset={2}>
						<ul>
							<li>
								<strong>Busy until: </strong>
								{busyUntil === 'No Jobs' ? (
									<Tag color='green' style={{ fontWeight: '700' }}>
										{busyUntil}
									</Tag>
								) : (
									busyUntil
								)}
							</li>

							<li>
								<strong>Day Experiments: </strong>
								{dayExpt}
							</li>
							<li>
								<strong>Night Experiments: </strong>
								{nightExpt}
							</li>
						</ul>
					</Col>

					<Col span={2}>
						<div className={classes.TrafficLights}>
							<TrafficLights type='horizontal' data={props.data} />
						</div>
					</Col>
				</Row>
			}
		/>
	)
}

const mapStateToProps = state => {
	return {
		accessLvl: state.auth.accessLevel,
		authToken: state.auth.token,
		tabData: state.dash.statusTableData,
		checkedHolders: state.dash.statusTabChecked,

		//sumData was added to force re-render after using switch
		sumData: state.dash.statusSummaryData
	}
}

const mapDispatchToProps = dispatch => {
	return {
		toggleAvailable: (instrId, token) => dispatch(toggleAvailableOnDash(instrId, token)),
		deleteHoldersHandler: (token, instrId, holders) => dispatch(deleteHolders(token, instrId, holders))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(statusBanner)
