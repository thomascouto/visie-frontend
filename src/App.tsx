import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Broken from './components/broken'
import Layout from './components/layout'
import ListItens from './components/listitens'
import AppTable from './components/table'
import styles from './scss/index.module.scss'

const App = () => (
	<div className={styles.main}>
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route path="/" element={<AppTable />} />
				<Route path="list" element={<ListItens />} />
			</Route>
			<Route path="*" element={<Broken />} />
		</Routes>
	</div>
)

export default App
