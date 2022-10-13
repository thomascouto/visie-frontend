interface Data {
	id?: number
	title: string
	description: string
	price: number
	discountPercentage: number
	rating: number
	stock: number
	brand: string
	category: string
	thumbnail: string
	images: string[]
}

interface DataDialogProps {
	isOpen: boolean
	isReadOnly: boolean
	id: number
	handleDataChange: () => void
	handleDataDialog: (isOpen: boolean) => void
	handleSetAlertOpen: (props: TableDataItem) => void
	handlePersistDataTable: (props: TableDataItem) => void
}
