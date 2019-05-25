import axios from 'axios';

const api = axios.create({
	baseURL: process.env.REACT_APP_API_URL + "/api/"
});

export const searchProducts = (query) => api.get('items?q=' + query);
export const loadProductById = (id) => api.get('items/' + id);

const apis = {
	searchProducts,
	loadProductById
};

export default apis;