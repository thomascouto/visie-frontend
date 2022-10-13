import { TextField } from '@mui/material'

const numberTypes = ['price', 'discountPercentage', 'rating', 'stock']

const generateFormTextField = ({
	key,
	value,
	handleChangeForm,
	isReadOnly = false,
}: GenerateFieldProps) => (
	<TextField
		key={key}
		id={key}
		name={key}
		onChange={handleChangeForm}
		margin="dense"
		value={value}
		label={key.charAt(0).toUpperCase() + key.slice(1)}
		type={numberTypes.includes(key) ? 'number' : 'text'}
		multiline={key === 'images' ? true : false}
		rows={key === 'images' ? 3 : 1}
		disabled={isReadOnly}
		fullWidth
		required
	/>
)

export default generateFormTextField
