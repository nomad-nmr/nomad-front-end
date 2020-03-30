import React from 'react'
import { Alert, Row, Col, Tag } from 'antd'
import TrafficLights from '../../TrafficLights/TrafficLights'
import classes from './StatusBanner.module.css'

const statusBanner = props => {
  const { automationStatus, busyUntil, dayExpt, nightExpt } = props.data
  const bannerType = automationStatus === 'Running' ? 'success' : 'error'
  return (
    <Alert
      type={bannerType}
      message={
        <Row className={classes.Banner}>
          <Col span={20} offset={2}>
            <ul>
              <li>
                <strong>Automation Status: </strong>
                {automationStatus}
              </li>
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
            <div className={classes.TraficLights}>
              <TrafficLights type='horizontal' />
            </div>
          </Col>
        </Row>
      }
    />
  )
}

export default statusBanner
