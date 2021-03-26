import React, { useEffect, useRef } from 'react'
import { connect } from 'react-redux'

import { Table, Space, Button, Tag, Drawer } from 'antd'
import { fetchParamSets, fetchInstrumentList, toggleParamsForm, addParamSet } from '../../store/actions'
import ParamSetForm from '../../components/Forms/ParamSetForm/ParamSetForm'

const ParamSets = props => {
	const { fetchParamSets, fetchInstrList, authToken, instrumentId, searchValue } = props

	const formRef = useRef({})

	useEffect(() => {
		window.scrollTo(0, 0)
		fetchParamSets(authToken, { instrumentId, searchValue })
	}, [fetchParamSets, authToken, instrumentId, searchValue])

	//Hook loads instrument list for select input
	useEffect(() => {
		fetchInstrList(authToken)
	}, [fetchInstrList, authToken])

	const renderParams = record => {
		const paramArr = record.map(param => (
			<Tag key={param.name} color={param.value ? 'green' : 'red'}>
				<span>
					{param.name}: {param.value}
				</span>
			</Tag>
		))
		return <div>{paramArr}</div>
	}

	const columns = [
		{
			title: 'Name',
			dataIndex: 'name',
			sorter: (a, b) => a.name.localeCompare(b.name)
		},
		{
			title: 'Description',
			dataIndex: 'description'
		},

		{
			title: 'Default Parameters',
			dataIndex: 'defaultParams',
			render: record => renderParams(record)
		},
		{
			title: 'Custom Parameters',
			dataIndex: 'customParams'
		},
		{
			title: 'Usage Count',
			dataIndex: 'count',
			align: 'center'
		},
		{
			title: 'Actions',
			align: 'center',
			render: record => (
				<Space>
					<Button
						size='small'
						type='link'
						onClick={() => {
							// props.toggleUsrDrawer(true)
							// setTimeout(() => formRef.current.setFieldsValue(record), 200)
						}}>
						Edit
					</Button>
					<Button
						size='small'
						type='link'
						onClick={() => {
							// props.toggleUsrDrawer(true)
							// setTimeout(() => formRef.current.setFieldsValue(record), 200)
						}}>
						Delete
					</Button>
				</Space>
			)
		}
	]

	return (
		<div style={{ margin: '30px 20px 70px 20px' }}>
			<Table
				size='small'
				columns={columns}
				dataSource={props.tableData}
				pagination={false}
				loading={props.loading}
			/>
			<Drawer
				width='600'
				visible={props.showForm}
				placement='right'
				onClose={() => {
					props.toggleShowForm()
					formRef.current.resetFields()
				}}>
				<ParamSetForm
					instruments={props.instrList}
					formRef={formRef}
					toggleDrawer={props.toggleShowForm}
					addHandler={props.addParamSetHandler}
					token={props.authToken}
				/>
			</Drawer>
		</div>
	)
}

const mapStateToProps = state => ({
	tableData: state.paramSets.paramSetsTabData,
	loading: state.paramSets.loading,
	authToken: state.auth.token,
	instrumentId: state.paramSets.instrumentId,
	searchValue: state.paramSets.searchValue,
	showForm: state.paramSets.formVisible,
	instrList: state.instruments.instrumentList
})

const mapDispatchToProps = dispatch => ({
	fetchParamSets: (token, searchParams) => dispatch(fetchParamSets(token, searchParams)),
	fetchInstrList: token => dispatch(fetchInstrumentList(token)),
	toggleShowForm: () => dispatch(toggleParamsForm()),
	addParamSetHandler: (token, data) => dispatch(addParamSet(token, data))
})

export default connect(mapStateToProps, mapDispatchToProps)(ParamSets)
