import React from 'react'
import { Result, Button } from 'antd'

const error404 = props => (
  <Result
    status='404'
    title='404'
    subTitle='Sorry, the page you visited does not exist.'
    extra={
      <Button type='primary' onClick={() => props.history.push({ pathname: '/' })}>
        Back Home
      </Button>
    }
  />
)

export default error404
