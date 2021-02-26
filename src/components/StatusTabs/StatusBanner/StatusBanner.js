import React from 'react'
import { Alert, Row, Col, Tag, Switch } from 'antd'
import TrafficLights from '../../TrafficLights/TrafficLights'
import classes from './StatusBanner.module.css'

const statusBanner = props => {
	const { busyUntil, dayExpt, nightExpt } = props.data.status.summary
	const bannerType = props.data.available ? 'success' : 'error'

	const switchElement = (
		<Switch
			checked={props.data.available}
			checkedChildren='On'
			unCheckedChildren='Off'
			onChange={() => props.onSwitch(props.data._id, props.authToken)}
		/>
	)

	return (
		<Alert
			type={bannerType}
			message={
				<Row className={classes.Banner}>
					<Col className={classes.Switch} span={2}>
						{props.accessLevel && switchElement}
					</Col>
					<Col span={18} offset={2}>
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

export default statusBanner
