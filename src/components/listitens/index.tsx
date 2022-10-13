import Rating from '@mui/material/Rating'
import React from 'react'
import { http } from '../../api/requests'
import styles from '../../scss/itenslist.module.scss'

const ListItens = () => {
	const [data, setData] = React.useState<Data[]>([])

	React.useEffect(() => {
		const fetchData = async () => {
			const res = await http.getFullList()
			setData(res)
		}
		fetchData()
	}, [])

	return (
		<div className={styles.listContainer}>
			{data && data.length > 0 ? (
				data.map((e, i) => {
					return (
						<ul key={i} className={styles.card}>
							<span className={styles.heart}></span>
							<li className={styles.cardContent}>
								<div className={styles.cardImage}>
									<img src={e.thumbnail} />
								</div>
								<div className={styles.cardText}>
									<p>
										{e.brand} {e.title}
									</p>
									<Rating size="small" name="read-only" value={e.rating} readOnly />
									<p className={styles.description}>{e.description}</p>
									<div className={styles.prices}>
										<p>{e.price}</p>
										<p className={styles.discount}>
											{((e.discountPercentage / 100) * e.price + e.price).toFixed(2)}
										</p>
									</div>
									<p className={styles.stock}>Stock {e.stock}</p>
								</div>
							</li>
						</ul>
					)
				})
			) : (
				<p>Nenhum elemento encontrado.</p>
			)}
		</div>
	)
}

export default ListItens
