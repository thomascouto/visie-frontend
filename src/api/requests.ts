import axios from 'axios'

const baseURL = 'https://dummyjson.com/products'
const timeout = 10000
const instance = axios.create({
	baseURL,
	timeout,
	responseType: 'json',
})

const getList = async (): Promise<TableDataItem[]> => {
	return await instance
		.get<TableData>('?limit=30&select=title')
		.then(({ status, data }) => {
			if (status === 200 && data.products.length > 0) return data.products
			return []
		})
		.catch((err) => {
			throw new Error(err)
		})
}

const getFullList = async (): Promise<Data[]> => {
	return await instance
		.get<{ products: Data[] }>('?limit=10')
		.then(({ status, data }) => {
			if (status === 200) return data.products
			throw new Error()
		})
		.catch(() => {
			throw new Error('Erro ao carregar produtos.')
		})
}

const getSingle = async (id: number): Promise<Data> => {
	return await instance
		.get<Data>(id.toString())
		.then(({ status, data }) => {
			if (status === 200 && data) return data
			throw new Error('Erro ao buscar informações')
		})
		.catch((err) => {
			throw new Error(err)
		})
}

const deleteItem = async (id: number): Promise<boolean> => {
	return await instance
		.delete<DeleteRequest>(id.toString())
		.then(({ status, data }) => {
			if (status === 200 && data.isDeleted) return true
			throw new Error()
		})
		.catch(() => {
			throw new Error(`Erro ao excluir item com o id ${id}.`)
		})
}

const updateItem = async (props: Data): Promise<void> => {
	if (props.id)
		await instance
			.patch<Data>(props.id.toString(), { data: props })
			.then(({ status }) => {
				if (status === 200) return
				throw new Error()
			})
			.catch((err) => {
				throw new Error(`Erro ao atualizar item com o id ${props.id}`)
			})
	else throw new Error('Id é requerido para atualizar o produto.')
}

const addItem = async (props: Data): Promise<Data> => {
	return await instance
		.post<Data>('/add', props)
		.then(({ status, data }) => {
			if ((status === 200 || status === 201) && data) return data
			throw new Error()
		})
		.catch(() => {
			throw new Error('Erro ao inserir novo produto no sistema.')
		})
}

export const http = {
	getFullList,
	getList,
	getSingle,
	deleteItem,
	updateItem,
	addItem,
}
