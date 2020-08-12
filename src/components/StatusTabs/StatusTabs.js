import React from 'react'
import { Tabs } from 'antd'
import StatusBanner from './StatusBanner/StatusBanner'
import StatusTable from './StatusTable/StatusTable'
import classes from './StatusTabs.module.css'

const { TabPane } = Tabs

const statusTabs = (props) => {
	const TabsArr = props.summaryData.map((tab) => {
		const fontColor = tab.automationStatus === 'Running' ? '#52c41a' : '#f5222d'

		return (
			<TabPane
				tab={<div style={{ fontSize: '1.2rem', color: fontColor, padding: '0px 5px' }}>{tab.name}</div>}
				key={tab.id.toString()}>
				<StatusBanner data={tab} />
				<div className={classes.StatusTable}>
					<StatusTable data={props.tableData} loading={props.tableLoading} />
				</div>
			</TabPane>
		)
	})

	return (
		<Tabs
			className={classes.StatusTabs}
			tabBarGutter={15}
			activeKey={props.activeTab}
			animated={false}
			onChange={(key) => props.clicked(key)}
			centered>
			{TabsArr}
		</Tabs>
	)
}

export default statusTabs
