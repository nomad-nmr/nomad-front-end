const { override, fixBabelImports, addLessLoader } = require('customize-cra')

module.exports = override(
	fixBabelImports('import', {
		libraryName: 'antd',
		libraryDirectory: 'es',
		style: true
	}),
	addLessLoader({
		javascriptEnabled: true,
		modifyVars: {
			'@layout-header-background': '#ffffff',
			'@layout-body-background': '#fff',
			'@layout-header-padding': '0px',
			'@menu-dark-bg': '#001529'
			// '@border-radius-base': '4px'
		}
	})
)
