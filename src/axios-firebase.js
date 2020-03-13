import axios from 'axios'

const instance = axios.create({
	baseURL: 'https://nmr-control-dash.firebaseio.com/'
})

export default instance
