import axios from 'axios'

const instance = axios.create({
	baseURL: 'http://chpc-tl12-3.st-andrews.ac.uk/api'
})

export default instance
