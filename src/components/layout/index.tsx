import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import styles from '../../scss/layout.module.scss'

const Layout = () => (
	<>
		<div className={styles.container}>
			<div className={styles.menu}>
				<Link to={'/'}>
					<p>Principal</p>
				</Link>
				<Link to={'/list'}>
					<p>Lista</p>
				</Link>
			</div>
			<main>
				<Outlet />
			</main>
		</div>
	</>
)

export default Layout
