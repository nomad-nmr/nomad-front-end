import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Modal, Form, Input, Button, Space } from 'antd'
import moment from 'moment'

import SearchExpsTable from '../../components/SearchComponents/SearchExpsTable'
import {
  fetchExperiments,
  openAuthModal,
  resetChecked,
  toggleDownloadModal,
  updateCheckedDatasets,
  updateCheckedExps,
  downloadExps
} from '../../store/actions'

import classes from './Search.module.css'

const Search = props => {
  const { authToken, openModal, fetchExps, tabData, mdlVisible, checked } = props

  const defaultZipFileName = 'NOMAD_download-' + moment().format('YY-MM-DD_HH:mm')

  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    window.scrollTo(0, 0)
    if (!authToken) {
      openModal()
    } else {
      const searchParams = {
        currentPage,
        //Page size hardcoded to limit number of experiments available to download
        pageSize: 20
      }
      fetchExps(authToken, searchParams)
    }
  }, [authToken, openModal, fetchExps, currentPage])

  const downloadHandler = values => {
    let expsArr = []
    checked.forEach(entry => {
      expsArr = [...expsArr, ...entry.exps]
    })
    props.downloadExps(expsArr, values.zipFileName, authToken)
  }

  return (
    <div className={classes.Container}>
      {authToken && (
        <SearchExpsTable
          data={tabData}
          loading={props.loading}
          checkedDatasetsHandler={props.updCheckedDatasets}
          checkedExpsHandler={props.updCheckedExps}
          checked={props.checked}
          resetCheckedState={props.resetChecked}
          currentPage={currentPage}
          total={props.total}
          pageHandler={setCurrentPage}
        />
      )}
      <Modal visible={mdlVisible} onCancel={props.tglModal} width={600} footer={null}>
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          style={{ marginTop: 40 }}
          onFinish={values => downloadHandler(values)}
          initialValues={{ zipFileName: defaultZipFileName }}
        >
          <Form.Item
            label='File Name'
            name='zipFileName'
            rules={[
              {
                required: true,
                message: 'Please input download file name!'
              }
            ]}
          >
            <Input addonAfter='.zip' />
          </Form.Item>
          <Form.Item style={{ textAlign: 'center', display: 'flex', justifyContent: 'center' }}>
            <Space size='large'>
              <Button type='primary' htmlType='submit'>
                Download
              </Button>
              <Button onClick={props.tglModal}>Cancel</Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

const mapStateToProps = state => ({
  authToken: state.auth.token,
  tabData: state.search.tableData,
  loading: state.search.loading,
  checked: state.search.checked,
  mdlVisible: state.search.showDownloadModal,
  total: state.search.total
})

const mapDispatchToProps = dispatch => ({
  openModal: () => dispatch(openAuthModal()),
  fetchExps: (token, searchParams) => dispatch(fetchExperiments(token, searchParams)),
  updCheckedDatasets: payload => dispatch(updateCheckedDatasets(payload)),
  updCheckedExps: payload => dispatch(updateCheckedExps(payload)),
  resetChecked: () => dispatch(resetChecked()),
  tglModal: () => dispatch(toggleDownloadModal()),
  downloadExps: (expIds, fileName, token) => dispatch(downloadExps(expIds, fileName, token))
})

export default connect(mapStateToProps, mapDispatchToProps)(Search)
