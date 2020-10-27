//Utility functions that adds key property into any table data object retrieve from the server
//Allowing to render antD table component

const addKey = tableData =>
	tableData.map((i, index) => {
		return { ...i, key: index }
	})

export default addKey
