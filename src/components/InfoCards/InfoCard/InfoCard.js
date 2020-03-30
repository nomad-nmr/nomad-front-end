import React from 'react'
import { Card, Row, Col, Tag } from 'antd'
import TrafficLights from '../../TrafficLights/TrafficLights'
import classes from './InfoCard.module.css'

const InfoCard = props => {
  const { automationStatus, name, model, busyUntil, dayExpt, nightExpt, probe } = props.data

  const cardColor = automationStatus === 'Running' ? '#52c41a' : '#ff4d4f'
  const cardBackgroundColor = automationStatus === 'Running' ? '#f6ffed' : '#fff1f0'

  //Setting up traffic lights for cards dynamically

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
              <TrafficLights />
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
      }
    >
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
    </Card>
  )
}

export default InfoCard
