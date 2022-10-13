import React from 'react'
import { Snackbar, Alert } from '@mui/material'
import useToast from '../../hooks/useToast'

const Toast = ({
	message,
	severity,
	isOpen,
	onClose,
	autoHideDuration = 2000,
}: ToastProps & { onClose: () => void }) => (
	<Snackbar
		open={isOpen}
		autoHideDuration={autoHideDuration}
		anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
		onClose={onClose}
	>
		<Alert severity={severity} sx={{ width: '100%' }}>
			{message}
		</Alert>
	</Snackbar>
)

export default Toast
