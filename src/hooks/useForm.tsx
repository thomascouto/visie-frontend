import { useState } from 'react'

export default function useForm() {
	const [form, setForm] = useState<Data>({
		brand: '',
		category: '',
		description: '',
		thumbnail: '',
		title: '',
		discountPercentage: 0,
		price: 0,
		stock: 0,
		rating: 0,
		images: [],
	})

	const handleChangeForm = ({
		target,
	}: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = target
		setForm({
			...form,
			[name]: value,
		})
	}
	return { form, setForm, handleChangeForm }
}
