import React from 'react'
import { Tabs } from 'antd'
import classes from './StatusTabs.module.css'

const { TabPane } = Tabs

const StatusTabs = props => {
	const TabsArr = props.overview.map(tab => {
		const fontColor = tab.automationStatus === 'Running' ? '#52c41a' : '#f5222d'
		return (
			<TabPane tab={<div style={{ fontSize: '1.2rem', color: fontColor }}>{tab.name}</div>} key={tab.id.toString()}>
				{tab.name}
			</TabPane>
		)
	})

	return (
		<Tabs
			className={classes.StatusTabs}
			tabBarGutter={8}
			type='card'
			// size='large'
			animated={true}
			activeKey={props.activeTab}
			onTabClick={key => props.clicked(key)}
		>
			{TabsArr}
		</Tabs>
	)
}

export default StatusTabs
