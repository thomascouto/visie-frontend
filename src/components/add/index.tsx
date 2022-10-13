import React from 'react'
import { http } from '../../api/requests'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import useForm from '../../hooks/useForm'
import useToast from '../../hooks/useToast'
import Toast from '../toast'
import generateFormTextField from '../textField'

const AddProduct = ({
	isOpen,
	handleClose,
	handleAddFormConfirm,
}: AddProductProps) => {
	const { form, setForm, handleChangeForm } = useForm()
	const { toastProps, handleCloseToast, handleShowToast } = useToast()

	React.useEffect(() => {
		if (form.id && form.id > 0) {
			const { id, title } = form
			handleAddFormConfirm({ id, title })
		}
	}, [form.id])

	const simpleValidation = () => {
		let isValid = false

		Object.keys(form).map((e) => {
			const value = form[e as keyof Data] as string
			if (value && value.length > 0) isValid = true
			else isValid = false
		})
		return isValid
	}

	const handlePostForm = () => {
		const doPost = async () => {
			try {
				if (simpleValidation()) {
					handleShowToast('Cadastrando novo produto...', 'info')
					const response = await http.addItem(form)
					setForm(response)
				} else handleShowToast('Verifique os campos do formulário', 'error')
			} catch (error) {
				handleShowToast((error as Error).name, 'error')
			}
		}
		doPost()
	}

	return (
		<div>
			<Dialog open={isOpen} onClose={handleClose}>
				<DialogTitle>Novo produto</DialogTitle>
				<DialogContent>
					{Object.keys(form).map((key) => {
						const value = form[key as keyof Data]
						return generateFormTextField({ key, value, handleChangeForm })
					})}
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color={'error'}>
						Cancelar
					</Button>
					<Button onClick={handlePostForm}>Adicionar</Button>
				</DialogActions>
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

export default AddProduct
