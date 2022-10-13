import {
	Button,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TablePagination,
	TableRow,
} from '@mui/material'
import React from 'react'
import { http } from '../../api/requests'
import useToast from '../../hooks/useToast'
import styles from '../../scss/table.module.scss'
import AddProduct from '../add'
import AlertDialog from '../confirm'
import DisplayData from '../data'
import Toast from '../toast'

const AppTable = () => {
	const { toastProps, handleCloseToast, handleShowToast } = useToast()
	const [isAddOpen, setIsAddOpen] = React.useState(false)
	const [page, setPage] = React.useState(0)
	const [rowsPerPage, setRowsPerPage] = React.useState(10)
	const [data, setData] = React.useState<TableDataItem[]>([])
	const [isAlertShown, setIsAlertShown] = React.useState(false)
	const [currentItem, setCurrentItem] = React.useState<TableDataItem>({
		id: -1,
		title: '',
	})

	const handleChangePage = (e: unknown, newPage: number) => setPage(newPage)

	const handleSetAlertOpen = (props: TableDataItem) => {
		if (dataDialogProps.isOpen) {
			setDataDialogProps({ ...dataDialogProps, isOpen: false })
		}
		setCurrentItem(props)
		setIsAlertShown(true)
	}

	const handleConfirmDelete = () => {
		setIsAlertShown(false)
		handleDeleteItem(currentItem.id)
	}

	const handleDataChange = () =>
		setDataDialogProps({ ...dataDialogProps, isReadOnly: false })

	const handleDataDialogReadOnly = () => handleDataDialog(true, true)

	const handleDataDialog = (isOpen = true, isReadOnly = false) =>
		setDataDialogProps({ ...dataDialogProps, isOpen, isReadOnly })

	const handlePersistDataTable = ({ id, title }: TableDataItem) => {
		setData((data) => {
			const index = data.findIndex((e) => e.id === id)
			data[index] = { ...data[index], title }
			return data
		})
		setDataDialogProps({ ...dataDialogProps, isOpen: false })
	}

	const [dataDialogProps, setDataDialogProps] = React.useState<DataDialogProps>({
		id: -1,
		isOpen: false,
		isReadOnly: false,
		handleDataDialog,
		handleDataChange,
		handleSetAlertOpen,
		handlePersistDataTable,
	})

	const handleChangeRowsPerPage = ({
		target,
	}: React.ChangeEvent<HTMLInputElement>) => {
		setRowsPerPage(+target.value)
		setPage(0)
	}

	const handleDeleteItem = async (e: number) => {
		try {
			const isDeleted = await http.deleteItem(e)
			if (isDeleted) {
				setData((data) => data.filter((el) => el.id !== e))
				handleShowToast('Excluido com sucesso!', 'success')
			}
		} catch (error) {
			handleShowToast((error as Error).message, 'error')
		}
	}

	const handleAddProduct = () => setIsAddOpen(true)

	const handleAddFormConfirm = (e: TableDataItem) => {
		setData([...data, e])
		setIsAddOpen(false)
		handleShowToast('Produto inserido com sucesso', 'success')
	}

	const doTableFetch = async () => {
		try {
			handleShowToast('Carregando...', 'info')
			const response = await http.getList()
			setData(response)
		} catch (error) {
			handleShowToast((error as Error).message, 'error', null)
		}
	}

	React.useEffect(() => {
		doTableFetch()
	}, [])

	return (
		<>
			<Paper sx={{ width: '100%', overflow: 'hidden' }}>
				<TableContainer sx={{ maxHeight: '30rem' }}>
					<Table stickyHeader aria-label="sticky table">
						<TableHead>
							<TableRow>
								<TableCell key={'name'}>Nome do produto</TableCell>
								<TableCell key={'actions'} align={'center'} sx={{ width: '5rem' }}>
									Ações
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{data
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.map(({ id, title }) => {
									return (
										<TableRow hover key={id}>
											<TableCell>{title}</TableCell>
											<TableCell>
												<div className={styles.actionButtons}>
													<span
														title="Visualizar"
														className={styles.data}
														onClick={() => {
															setCurrentItem({ id, title })
															handleDataDialogReadOnly()
														}}
													></span>
													<span
														title="Editar"
														className={styles.edit}
														onClick={() => {
															setCurrentItem({ id, title })
															handleDataDialog()
														}}
													></span>
													<span
														title="Excluir"
														className={styles.delete}
														onClick={() => handleSetAlertOpen({ id, title })}
													></span>
												</div>
											</TableCell>
										</TableRow>
									)
								})}
						</TableBody>
					</Table>
				</TableContainer>
				<TablePagination
					labelRowsPerPage={''}
					rowsPerPageOptions={[5, 10, 25]}
					component="div"
					count={data.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			</Paper>
			<DisplayData
				isOpen={dataDialogProps.isOpen}
				id={currentItem.id}
				isReadOnly={dataDialogProps.isReadOnly}
				handleDataDialog={handleDataDialog}
				handleDataChange={handleDataChange}
				handleSetAlertOpen={handleSetAlertOpen}
				handlePersistDataTable={handlePersistDataTable}
			/>
			<Toast
				severity={toastProps.severity}
				message={toastProps.message}
				isOpen={toastProps.isOpen}
				onClose={handleCloseToast}
			/>
			<AlertDialog
				isOpen={isAlertShown}
				handleConfirmDelete={handleConfirmDelete}
				handleClose={() => setIsAlertShown(false)}
				currentItemName={currentItem.title}
			/>
			<AddProduct
				isOpen={isAddOpen}
				handleClose={() => setIsAddOpen(false)}
				handleAddFormConfirm={handleAddFormConfirm}
			/>
			<Button
				sx={{ margin: '1rem 0' }}
				variant="contained"
				color="primary"
				onClick={handleAddProduct}
			>
				Adicionar novo
			</Button>
		</>
	)
}

export default AppTable
