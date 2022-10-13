import React from 'react'

const useToast = () => {
	const [toastProps, setToastProps] = React.useState<ToastProps>({
		isOpen: false,
		message: '',
		severity: 'info',
	})

	const handleCloseToast = () => setToastProps({ ...toastProps, isOpen: false })
	const handleShowToast = (
		message: string,
		severity: ToastPropsSeverity,
		autoHideDuration?: number | null
	) => {
		setToastProps({
			isOpen: true,
			message,
			severity,
			autoHideDuration,
		})
	}

	return { toastProps, setToastProps, handleCloseToast, handleShowToast }
}

export default useToast
