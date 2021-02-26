import React from 'react'
// import { connect } from 'react-redux'

import { Card, Row, Col, Tag, Switch } from 'antd'

import TrafficLights from '../../TrafficLights/TrafficLights'
import classes from './InfoCard.module.css'

const InfoCard = props => {
	const { name, model, probe, available, _id } = props.data
	const { busyUntil, dayExpt, nightExpt } = props.data.status.summary
	const cardColor = available ? '#52c41a' : '#ff4d4f'
	const cardBackgroundColor = available ? '#f6ffed' : '#fff1f0'

	const switchElement = (
		<div className={classes.Switch}>
			<Switch
				checked={available}
				checkedChildren='On'
				unCheckedChildren='Off'
				onChange={() => {
					props.onSwitch(_id, props.authToken)
				}}
			/>
		</div>
	)

	return (
		<Card
			className={classes.InfoCard}
			hoverable
			headStyle={{ backgroundColor: cardColor }}
			bodyStyle={{
				borderBottom: `2px solid ${cardColor}`,
				borderRadius: '4px',
				backgroundColor: cardBackgroundColor,
				padding: '12px 0px 0px 20px'
			}}
			title={
				<Row>
					<Col span={6}>
						<div className={classes.trafficLights}>
							<TrafficLights data={props.data} />
						</div>
					</Col>
					<Col span={18}>
						<div className={classes.CardHead}>
							<h2>{name}</h2>
							<h4>{model}</h4>
							<h4>[{probe}]</h4>
						</div>
					</Col>
				</Row>
			}>
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
			{props.accessLevel === 'admin' && switchElement}
		</Card>
	)
}

export default InfoCard
