import React from 'react'
import { Card, CardMedia } from '@mui/material'
import styles from '../../scss/card.module.scss'

const DataCard = ({ cards }: DataCardProps) => (
	<div className={styles.card}>
		{cards &&
			cards.map((e, i) => (
				<a target={'_blank'} href={e} key={`link${i}`}>
					<Card key={`card-img${i}`} sx={{ padding: '1rem', cursor: 'pointer' }}>
						<CardMedia
							key={`card-media${i}`}
							component="img"
							height="100"
							image={e}
						/>
					</Card>
				</a>
			))}
	</div>
)

export default DataCard
