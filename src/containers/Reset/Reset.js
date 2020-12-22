import React, { useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Form, Spin, Button, Space, Input } from 'antd'

import classes from './Reset.module.css'
import { getPasswdReset, postNewPasswd } from '../../store/actions'

const layout = {
	labelCol: {
		span: 8
	},
	wrapperCol: {
		span: 16
	}
}
const tailLayout = {
	wrapperCol: {
		offset: 8,
		span: 16
	}
}

const Reset = props => {
	const [form] = Form.useForm()
	const history = useHistory()
	const { getPassReset } = props
	const formRef = useRef({})

	const token = props.match.params.token

	const { userName, fullName } = props

	useEffect(() => {
		getPassReset(token)
		formRef.current.setFieldsValue({
			username: userName,
			fullName: fullName,
			token: token
		})
	}, [getPassReset, token, userName, fullName])

	// const [passwd, setPasswd] = useState('')
	// const [confirmPass, setConfirmPass] = useState({ value: '' })

	// const onConfirmPasswdChange = value => {
	// 	console.log(value)
	// 	setConfirmPass({ value })
	// 	// if (passwd === confirmPass.value) {
	// 	// 	setConfirmPass({ ...confirmPass, validateStatus: 'success', errorMsq: null })
	// 	// } else {
	// 	// 	setConfirmPass({ ...confirmPass, validateStatus: 'error', errorMsq: 'Passwords do not match!' })
	// 	// }
	// 	console.log(passwd, confirmPass)
	// }

	//Users added to the system through autoFeed function will miss certain properties in the database.
	//Following fields get rendered if userName is undefined to allow users to add the additional information
	//TODO add more fields here for other properties like occupation that will be added to model in future.

	return (
		<div className={classes.container}>
			<h1>{fullName ? 'Reset Password' : 'Register a New Account'}</h1>
			<Spin tip='Loading ...' spinning={props.loading}>
				<Form
					className={classes.form}
					{...layout}
					name='passReset'
					form={form}
					ref={formRef}
					onFinish={values => props.postNewPass(values)}>
					<Form.Item name='username' label='Username'>
						<Input disabled />
					</Form.Item>

					<Form.Item
						name='fullName'
						label='Full Name'
						hidden={fullName}
						rules={[{ required: true, whitespace: true, message: "User's full Name is required" }]}>
						<Input />
					</Form.Item>

					<Form.Item
						name='password'
						label='Password'
						rules={[
							{ required: true, message: 'Please input your Password!' },
							{
								pattern: new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'),
								message:
									'Password must have minimum eight characters, at least one letter, one number and one special character'
							}
						]}>
						<Input.Password />
					</Form.Item>
					<Form.Item
						name='confirmPass'
						label='Confirm Password'
						rules={[
							{ required: true, message: 'Please confirm your Password!' },
							({ getFieldValue }) => ({
								validator(rule, value) {
									if (!value || getFieldValue('password') === value) {
										return Promise.resolve()
									}

									return Promise.reject('The passwords do not match!')
								}
							})
						]}>
						<Input.Password />
					</Form.Item>
					<Form.Item name='token' hidden>
						<Input />
					</Form.Item>
					<Form.Item {...tailLayout}>
						<Space size='large'>
							<Button type='primary' htmlType='submit'>
								Submit
							</Button>
							<Button onClick={() => history.push('/')}>Back Home</Button>
						</Space>
					</Form.Item>
				</Form>
			</Spin>
		</div>
	)
}

const mapStateToProps = state => {
	return {
		userName: state.auth.resetUsername,
		fullName: state.auth.resetFullName,
		loading: state.auth.loading
	}
}

const mapDispatchToProps = dispatch => {
	return {
		getPassReset: token => dispatch(getPasswdReset(token)),
		postNewPass: data => dispatch(postNewPasswd(data))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Reset)
