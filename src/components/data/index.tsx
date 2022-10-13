import React from 'react'
import Dialog from '@mui/material/Dialog'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import { http } from '../../api/requests'
import { Button, List, Rating } from '@mui/material'
import styles from '../../scss/data.module.scss'
import useToast from '../../hooks/useToast'
import Toast from '../toast'
import DataCard from '../card'
import useForm from '../../hooks/useForm'
import generateFormTextField from '../textField'

const DisplayData = ({
	isOpen,
	isReadOnly,
	id,
	handleDataDialog,
	handleDataChange,
	handleSetAlertOpen,
	handlePersistDataTable,
}: DataDialogProps) => {
	const { form, setForm, handleChangeForm } = useForm()
	const { toastProps, handleCloseToast, handleShowToast } = useToast()

	const handleSaveData = () => {
		const doSaveData = async () => {
			try {
				await http.updateItem(form)
				handlePersistDataTable({ id: form.id as number, title: form.title })
				handleShowToast('Produto atualizado com sucesso.', 'success')
			} catch (error) {
				handleShowToast((error as Error).message, 'error')
			}
		}
		doSaveData()
	}

	const fetchData = async () => {
		try {
			handleShowToast('Carregando...', 'info')
			const response = await http.getSingle(id)
			setForm(response)
		} catch (error) {
			handleShowToast((error as Error).name, 'error')
		}
	}

	React.useEffect(() => {
		if (isOpen) fetchData()
		return () => setForm({} as Data)
	}, [isOpen])

	return (
		<div>
			<Dialog fullScreen open={isOpen} onClose={() => handleDataDialog(false)}>
				<AppBar>
					<Toolbar sx={{ backgroundColor: '#153b50ff' }}>
						<div className={styles.toolbarData}>
							<Button
								variant="contained"
								color="warning"
								onClick={() => handleDataDialog(false)}
							>
								Cancelar
							</Button>
							<Button
								variant="contained"
								color="success"
								disabled={isReadOnly}
								onClick={handleSaveData}
							>
								Salvar
							</Button>
							<Button
								variant="contained"
								color="success"
								disabled={!isReadOnly}
								onClick={handleDataChange}
							>
								Alterar
							</Button>
							<Button
								variant="contained"
								color="error"
								disabled={!isReadOnly}
								onClick={() => handleSetAlertOpen({ id, title: form.title as string })}
							>
								Excluir
							</Button>
						</div>
					</Toolbar>
				</AppBar>
				<List>
					<div className={styles.dataContent}>
						<img src={form.thumbnail} alt={form.title} />
						<div className={styles.rating}>
							<Rating
								size="large"
								name="rating"
								defaultValue={Math.round(form.rating * 2) / 2}
								value={Math.round(form.rating * 2) / 2}
								precision={0.5}
								readOnly
							/>
						</div>
						{Object.keys(form).map((key, i) => {
							const value = form[key as keyof Data]
							return isReadOnly && (key as keyof Data) === 'images' ? (
								<DataCard cards={value as string[]} key={`data-card${i}`} />
							) : (
								generateFormTextField({ key, value, isReadOnly, handleChangeForm })
							)
						})}
					</div>
				</List>
			</Dialog>
			<Toast
				severity={toastProps.severity}
				message={toastProps.message}
				isOpen={toastProps.isOpen}
				onClose={handleCloseToast}
			/>
		</div>
	)
}

export default DisplayData
