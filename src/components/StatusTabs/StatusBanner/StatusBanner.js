import React from 'react'
import { Alert, Row, Col, Tag } from 'antd'
import TrafficLights from '../../TrafficLights/TrafficLights'
import classes from './StatusBanner.module.css'

const statusBanner = props => {
	const { busyUntil, dayExpt, nightExpt } = props.data.status.summary
	const bannerType = props.data.available ? 'success' : 'error'
	return (
		<Alert
			type={bannerType}
			message={
				<Row className={classes.Banner}>
					<Col span={20} offset={2}>
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
