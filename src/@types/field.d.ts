interface GenerateFieldProps {
	key: string
	value: any
	isReadOnly?: boolean
	handleChangeForm: ({
		target,
	}: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}
