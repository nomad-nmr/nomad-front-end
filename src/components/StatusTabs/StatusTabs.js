import React from 'react'
import { Tabs } from 'antd'
import TrafficLightsContext from '../../context/trafficLights-context'
import StatusBanner from './StatusBanner/StatusBanner'
import StatusTable from './StatusTable/StatusTable'
import classes from './StatusTabs.module.css'

const { TabPane } = Tabs

const StatusTabs = props => {
  const TabsArr = props.overview.map(tab => {
    const fontColor = tab.automationStatus === 'Running' ? '#52c41a' : '#f5222d'
    const { errors, running, availableHolders } = tab
    return (
      <TabPane
        tab={<div style={{ fontSize: '1.2rem', color: fontColor, padding: '0px 5px' }}>{tab.name}</div>}
        key={tab.id.toString()}
      >
        <TrafficLightsContext.Provider
          value={{ errors: errors, running: running, availableHolders: availableHolders }}
        >
          <StatusBanner data={tab} />
        </TrafficLightsContext.Provider>
        <div className={classes.StatusTable}>
          <StatusTable data={props.tableData} />
        </div>
      </TabPane>
    )
  })

  return (
    <Tabs
      className={classes.StatusTabs}
      tabBarGutter={15}
      animated={true}
      activeKey={props.activeTab}
      onTabClick={key => props.clicked(key)}
    >
      {TabsArr}
    </Tabs>
  )
}

export default StatusTabs
