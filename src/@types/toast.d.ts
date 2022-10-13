interface ToastProps {
	severity: ToastPropsSeverity
	message: string
	isOpen: boolean
	autoHideDuration?: null | number
}

type ToastPropsSeverity = 'error' | 'success' | 'info'
