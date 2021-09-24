import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
import { Form, Button, Space, Tag, Divider, Input, Modal, message, Spin } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'

import SelectGrpUsr from '../../components/Forms/SelectGrpUsr/SelectGrpUsr'
import { fetchGroupList, fetchUserList, sendMessage } from '../../store/actions'

import classes from './Message.module.css'

const Message = props => {
  const [formRecipients] = Form.useForm()
  const [formMessage] = Form.useForm()

  const formRef = useRef({})

  const { fetchGrpList, authToken } = props

  const [recipients, setRecipients] = useState([])

  useEffect(() => {
    fetchGrpList(authToken)
  }, [fetchGrpList, authToken])

  // useEffect(() => {
  //   const usernameQuery = new URLSearchParams(location.search).get('username')

  //   }
  // }, [input])

  const infoModal = () =>
    Modal.info({
      title: 'Tip',
      content: (
        <div>
          <p>Add recipient with no group selected to address all active users</p>
          <p>
            Add recipient with no user selected to address all active users within selected group
          </p>
        </div>
      )
    })

  const isDuplicate = entry => recipients.find(recipient => recipient.id === entry.id)
  const sendsToAll = () => recipients.find(recipient => recipient.id === 'all')

  const addRecipientHandler = formData => {
    console.log(formData)
    //Validation to disable duplicate entries
    if (sendsToAll()) {
      return message.error(`The message is addressed to all active users already`)
    }
    if (!formData.groupId) {
      setRecipients([{ name: 'All Active Users', type: 'all', id: 'all' }])
    } else if (!formData.userId) {
      const group = props.grpList.find(grp => grp.id === formData.groupId)
      if (isDuplicate(group)) {
        return message.error(`Group ${group.name} already in the list`)
      }

      const newRecipients = [...recipients, { name: group.name, type: 'group', id: group.id }]
      setRecipients(newRecipients)
    } else {
      const user = props.usrList.find(usr => usr._id === formData.userId)
      if (isDuplicate(user)) {
        return message.error(`User ${user.username} already in the list`)
      }

      if (isDuplicate({ id: formData.groupId })) {
        return message.error(`User ${user.username} in a group that is already in the list`)
      }

      const newRecipients = [...recipients, { name: user.username, type: 'user', id: user._id }]
      setRecipients(newRecipients)
    }
  }

  const removeRecipientHandler = id => {
    const updatedRecipients = recipients.filter(recipient => recipient.id !== id)
    setRecipients(updatedRecipients)
  }

  const recipientsElement = recipients.map((recipient, index) => {
    const color =
      recipient.type === 'group' ? 'cyan' : recipient.type === 'user' ? 'green' : 'orange'
    return (
      <Tag
        key={index}
        closable
        className={classes.Tag}
        color={color}
        onClose={() => removeRecipientHandler(recipient.id)}
      >
        {recipient.name}
      </Tag>
    )
  })

  const formFinishHandler = formData => {
    if (recipients.length === 0) {
      return message.error('Message has no recipients!')
    }
    props.sendMsg(authToken, { ...formData, recipients })
    formMessage.resetFields()
    formRecipients.resetFields()
    setRecipients([])
  }

  return (
    <Spin spinning={props.sending} tip='Sending ...' size='large'>
      <Form
        form={formRecipients}
        ref={formRef}
        style={{ marginTop: 35 }}
        onFinish={values => addRecipientHandler(values)}
      >
        <Space size='large'>
          <SelectGrpUsr
            groupList={props.grpList}
            userList={props.usrList}
            onGrpChange={props.fetchUsrList}
            formRef={formRef}
            token={props.authToken}
          />
          <Button type='primary' style={{ marginBottom: 25 }} htmlType='submit'>
            Add Recipient
          </Button>
          <Button style={{ marginBottom: 25 }} onClick={() => formRecipients.resetFields()}>
            Cancel
          </Button>
          <div style={{ marginBottom: 25 }}>
            <QuestionCircleOutlined className={classes.Icon} onClick={infoModal} />
          </div>
        </Space>
        <div className={classes.Centered}>
          <Divider>Recipients</Divider>
          {recipientsElement}
          <Divider />
        </div>
      </Form>
      <Form
        form={formMessage}
        className={classes.Centered}
        onFinish={values => formFinishHandler(values)}
      >
        <Form.Item name='subject'>
          <Input placeholder='Subject' />
        </Form.Item>
        <Form.Item name='message' rules={[{ required: true, message: 'Message body is empty' }]}>
          <Input.TextArea
            showCount
            autoSize={{ minRows: 5, maxRows: 10 }}
            allowClear
            placeholder='Message Body'
          />
        </Form.Item>
        <Form.Item>
          <Space style={{ marginTop: 10 }}>
            <Button type='primary' htmlType='submit'>
              Send Message
            </Button>
            <Button
              onClick={() => {
                formMessage.resetFields()
              }}
            >
              Cancel
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Spin>
  )
}

const mapStateToProps = state => {
  return {
    grpList: state.groups.groupList,
    usrList: state.users.userList,
    authToken: state.auth.token,
    sending: state.message.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchGrpList: token => dispatch(fetchGroupList(token)),
    fetchUsrList: (token, groupId, showInactive) =>
      dispatch(fetchUserList(token, groupId, showInactive)),
    sendMsg: (token, data) => dispatch(sendMessage(token, data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Message)
