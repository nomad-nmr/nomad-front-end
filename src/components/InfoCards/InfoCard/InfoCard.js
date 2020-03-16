import React from 'react'
import { Card } from 'antd'
import classes from './InfoCard.module.css'

const InfoCard = props => {
	const { automationStatus, name, model, busyUntil, dayExpt, nightExpt } = props.data
	const cardColor = automationStatus === 'Running' ? '#52c41a' : '#ff4d4f'
	const cardBackgroundColor = automationStatus === 'Running' ? '#f6ffed' : '#fff1f0'
	return (
		<Card
			className={classes.InfoCard}
			hoverable
			headStyle={{ backgroundColor: cardColor }}
			bodyStyle={{
				borderBottom: `2px solid ${cardColor}`,
				borderRadius: '4px',
				backgroundColor: cardBackgroundColor,
				padding: '15px'
			}}
			title={
				<div className={classes.CardHead}>
					<h2>{name}</h2>
					<h4>{model}</h4>
				</div>
			}>
			<ul>
				<li>
					<strong>Automation Status: </strong>
					{automationStatus}
				</li>
				<li>
					<strong>Busy until: </strong>
					{busyUntil}
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
		</Card>
	)
}

export default InfoCard
