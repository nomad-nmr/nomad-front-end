import React, { useEffect, useState, useRef, Fragment } from 'react'
import { connect } from 'react-redux'
import { Form, Input, DatePicker, Button, Select, Row, Col, Space, Tooltip, Switch } from 'antd'
import { SearchOutlined, CloseOutlined } from '@ant-design/icons'

import SelectGrpUsr from '../Forms/SelectGrpUsr/SelectGrpUsr'
import solvents from '../../misc/solvents'
import {
  fetchInstrumentList,
  fetchParamSets,
  fetchGroupList,
  fetchUserList,
  getDataAccess
} from '../../store/actions'

const { Option } = Select
const { RangePicker } = DatePicker

const SearchForm = props => {
  const { fetchInstList, authToken, fetchParamSets, fetchGrpList, fetchDataAccess, dataAccess, grpList } =
    props

  const [form] = Form.useForm()
  const [instrumentId, setInstrumentId] = useState(null)
  const [grpInactiveChecked, setGrpInactiveChecked] = useState(false)
  const [usrInactiveChecked, setUsrInactiveChecked] = useState(false)

  const formRef = useRef({})

  useEffect(() => {
    fetchInstList(authToken)
    fetchParamSets(authToken, { instrumentId: null, searchValue: '' })
    fetchDataAccess(authToken)
    fetchGrpList(authToken, false)
    return () => {
      form.resetFields()
    }
  }, [fetchInstList, fetchParamSets, authToken, form, dataAccess, fetchGrpList, fetchDataAccess])

  const solventOptions = solvents.map((solvent, i) => (
    <Option value={solvent} key={i}>
      {solvent}
    </Option>
  ))

  let groupList = []

  switch (dataAccess) {
    case 'admin':
      groupList = grpList
      break
    case 'admin-b':
      groupList = grpList.filter(entry => entry.isBatch)
      break
    case 'group':
      groupList = grpList.filter(entry => entry.name === props.grpName)
      break
    default:
      break
  }

  if (grpInactiveChecked) {
    groupList = groupList.filter(grp => !grp.isActive)
  }

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
        {dataAccess !== 'user' && (
          <Fragment>
            <Col span={3}>
              <Form.Item
                label='Inactive Groups'
                name='inactiveGrp'
                tooltip='if ON select from inactive groups'
                valuePropName='checked'
              >
                <Switch
                  onChange={checked => {
                    fetchGrpList(authToken, checked)
                    setGrpInactiveChecked(checked)
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={3}>
              <Form.Item
                label='Inactive Users'
                name='inactiveUsr'
                tooltip='if ON select from inactive users'
                valuePropName='checked'
              >
                <Switch
                  onChange={checked => {
                    // props.fetchUsrList(authToken, checked)
                    setUsrInactiveChecked(checked)
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={10}>
              <SelectGrpUsr
                userList={props.usrList}
                groupList={groupList}
                token={authToken}
                onGrpChange={props.fetchUsrList}
                formRef={formRef}
                search={true}
                inactiveUsrList={usrInactiveChecked}
              />
            </Col>
          </Fragment>
        )}

        <Col span={2}>
          <Space size='large'>
            <Form.Item>
              <Button type='primary' htmlType='submit' icon={<SearchOutlined />}>
                Search
              </Button>
            </Form.Item>
            <Form.Item>
              <Tooltip title='Reset Form'>
                <Button danger shape='circle' icon={<CloseOutlined />} onClick={() => form.resetFields()} />
              </Tooltip>
            </Form.Item>
          </Space>
        </Col>
      </Row>
    </Form>
  )
}

const mapStateToProps = state => ({
  authToken: state.auth.token,
  dataAccess: state.search.dataAccess,
  instList: state.instruments.instrumentList,
  paramSets: state.paramSets.paramSetsData,
  grpList: state.groups.groupList,
  usrList: state.users.userList,
  grpName: state.auth.groupName
})

const mapDispatchToProps = dispatch => ({
  fetchInstList: token => dispatch(fetchInstrumentList(token)),
  fetchParamSets: (token, searchParams) => dispatch(fetchParamSets(token, searchParams)),
  fetchGrpList: (token, showInactive) => dispatch(fetchGroupList(token, showInactive)),
  fetchUsrList: (token, groupId, showInactive, search) =>
    dispatch(fetchUserList(token, groupId, showInactive, search)),
  fetchDataAccess: token => dispatch(getDataAccess(token))
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchForm)
