import React, { useEffect, useState, useRef } from 'react'
import { connect } from 'react-redux'
import { Form, Input, DatePicker, Button, Select, Row, Col, Space } from 'antd'
import { SearchOutlined, CloseOutlined } from '@ant-design/icons'

import SelectGrpUsr from '../Forms/SelectGrpUsr/SelectGrpUsr'
import solvents from '../../misc/solvents'
import { fetchInstrumentList, fetchParamSets, fetchGroupList, fetchUserList } from '../../store/actions'

const { Option } = Select
const { RangePicker } = DatePicker

const SearchForm = props => {
  const { fetchInstList, authToken, fetchParamSets, fetchGrpList, accessLvl } = props

  const [form] = Form.useForm()
  const [instrumentId, setInstrumentId] = useState(null)

  const formRef = useRef({})

  useEffect(() => {
    fetchInstList(authToken)
    fetchParamSets(authToken, { instrumentId: null, searchValue: '' })
    if (accessLvl === 'admin') {
      fetchGrpList(authToken)
    }
    return () => {
      form.resetFields()
    }
  }, [fetchInstList, fetchParamSets, authToken, form, accessLvl, fetchGrpList])

  const solventOptions = solvents.map((solvent, i) => (
    <Option value={solvent} key={i}>
      {solvent}
    </Option>
  ))

  //Generating Option list for Select element
  let instOptions = []
  if (props.instList) {
    instOptions = props.instList.map(i => (
      <Option value={i.id} key={i.id}>
        {i.name}{' '}
      </Option>
    ))
  }

  let refinedParamSets = props.paramSets
  if (instrumentId) {
    refinedParamSets = props.paramSets.filter(paramSet =>
      paramSet.availableOn.includes(instrumentId.toString())
    )
  }

  const paramSetsOptions = refinedParamSets.map((paramSet, i) => (
    <Option value={paramSet.name} key={i}>
      {`${paramSet.description} [${paramSet.name}]`}
    </Option>
  ))

  return (
    <Form
      form={form}
      ref={formRef}
      onFinish={values => props.submitHandler(values)}
      style={{ margin: '0 40px 0 40px' }}
    >
      <Row justify='center' gutter={32}>
        <Col span={4}>
          <Form.Item label='Instrument' name='instrumentId'>
            <Select allowClear={true} onChange={value => setInstrumentId(value)}>
              {instOptions}
            </Select>
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label='Parameter Set' name='paramSet'>
            <Select allowClear={true}>{paramSetsOptions}</Select>
          </Form.Item>
        </Col>
        <Col span={3}>
          <Form.Item name='solvent' label='Solvent'>
            <Select allowClear={true}>{solventOptions}</Select>
          </Form.Item>
        </Col>
        <Col span={5}>
          <Form.Item label='Title' name='title'>
            <Input allowClear={true} placeholder='Experiment Title' />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label='Date Range' name='dateRange'>
            <RangePicker allowClear={true} />
          </Form.Item>
        </Col>
      </Row>
      <Row justify='center' gutter={32}>
        {accessLvl === 'admin' && (
          <Col span={10}>
            <SelectGrpUsr
              userList={props.usrList}
              groupList={props.grpList}
              token={authToken}
              onGrpChange={props.fetchUsrList}
              formRef={formRef}
            />
          </Col>
        )}

        <Col span={2}>
          <Space size='large'>
            <Form.Item>
              <Button type='primary' htmlType='submit' icon={<SearchOutlined />}>
                Search
              </Button>
            </Form.Item>
            <Form.Item>
              <Button danger shape='circle' icon={<CloseOutlined />} onClick={() => form.resetFields()} />
            </Form.Item>
          </Space>
        </Col>
      </Row>
    </Form>
  )
}

const mapStateToProps = state => ({
  authToken: state.auth.token,
  accessLvl: state.auth.accessLevel,
  instList: state.instruments.instrumentList,
  paramSets: state.paramSets.paramSetsData,
  grpList: state.groups.groupList,
  usrList: state.users.userList
})

const mapDispatchToProps = dispatch => ({
  fetchInstList: token => dispatch(fetchInstrumentList(token)),
  fetchParamSets: (token, searchParams) => dispatch(fetchParamSets(token, searchParams)),
  fetchGrpList: token => dispatch(fetchGroupList(token)),
  fetchUsrList: (token, groupId, showInactive) => dispatch(fetchUserList(token, groupId, showInactive))
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchForm)
