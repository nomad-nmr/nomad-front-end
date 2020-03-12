import React from 'react'
import { List, Card } from 'antd'
import classes from './InfoCards.module.css'

const InfoCards = props => {
	return (
		//It could be refactored to add flex property using props.cardsData.map()
		//See some more discussion here https://github.com/ant-design/ant-design/issues/14407
		<List
			grid={{ gutter: 24, column: 6 }}
			dataSource={props.cardsData}
			renderItem={item => {
				const cardColor = item.automationStatus === 'Running' ? '#52c41a' : '#ff4d4f'
				return (
					<List.Item>
						<Card
							hoverable
							headStyle={{ backgroundColor: cardColor }}
							bodyStyle={{ border: `2px solid ${cardColor}` }}
							title={
								<div className={classes.CardHead}>
									<h2>{item.name}</h2>
									<h4>{item.model}</h4>
								</div>
							}>
							Card content
						</Card>
					</List.Item>
				)
			}}
		/>
	)
}

export default InfoCards
