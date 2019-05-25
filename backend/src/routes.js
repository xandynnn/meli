require('dotenv').config();

const routes = require('express').Router();
const axios = require('axios');
const apiUrl = process.env.API_URL;

const author = {"name":"Alexandre","lastname":"Mattos"}

//
//	Endpoin Items - Get all items
//
routes.get('/api/items', (request, response) =>{

	let searchQuery = request.query.q;
    let urlItems =  apiUrl + '/sites/MLA/search?q=' + searchQuery;

	let products = axios.get(urlItems);

	products
		.then(function(res){ 
			
			let data = res.data;
			let arrayItems = data.results;
			let items = [];

			arrayItems
			.filter( (items, index) => {
				return index < 4
			})			
			.map( product => {
                items.push({
                    'id': product.id,
                    'title': product.title,
                    "price": {
                        "currency": product.currency_id,
                        "amount": product.price,
                        "decimals": 2
                    },
                    "picture": product.thumbnail,
                    "condition": product.condition,
                    "free_shipping": product.shipping.free_shipping,
                    "state": product.address.state_name
                });
            });

			let categories = [];
			if ( data.filters.length ){
				
				let arrayCategories = data.filters[0].values[0].path_from_root;

				arrayCategories.map(
					category => {
						categories.push(category.name);
					}
				);

			}
				
			response.send({ author: author, categories: categories, items: items });

		});

});

//
//	Endpoin Detail - Get Item By ID
//
routes.get('/api/items/:id',( request, response) =>{

	let id = request.params.id;

	let urlItem = apiUrl + '/items/' + id;
	let urlDescription = urlItem + '/description';

	let product = axios.get(urlItem);
	let description = axios.get(urlDescription);

	description.then(function(res) {

		let description = res.data.plain_text;

		product.then(function(res){
			
			let data = res.data;
			let item = {
				"id": data.id,
				"title": data.title,
				"price": {
					"currency": data.currency_id,
					"amount": data.price,
					"decimals": 2
				},
				"picture": data.pictures[0].url,
				"condition": data.condition,
				"free_shipping": data.shipping.free_shipping,
				"sold_quantity": data.sold_quantity,
				"description": description
			};

			response.send({ author: author, item: item });

		})
	}).catch( err => {
		response.status(404).send({
			error: {
				error: 404,
				message: 'Producto no encontrado. '
			}
		});
		
		response.status(500).send({
			error: 500,
			message:'Error interno del servidor.'
		});
	});

});

module.exports = routes;