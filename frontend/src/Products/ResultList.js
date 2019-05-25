import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import queryString from 'query-string';
import Currency from 'react-currency-formatter';

import api from './../Services/Api';
import Search from './Search';
import Helmet from 'react-helmet';
import NotFound from '../Components/NotFound';

import './../styles/css/Breadcrumb.css';
import './../styles/css/Product.css';

export default class ResultList extends Component{

    constructor(props){
        super(props);
        this.state = {
            isLoading: true,
            search: '',
            products: [],
            categories: []
        }

        this.loadProducts = this.loadProducts.bind(this)
        this.renderProduct = this.renderProduct.bind(this)
    }

    componentDidMount(){
        
        const values = queryString.parse( this.props.location.search )
        this.setState({ search : values.search })
        this.loadProducts(values.search)

    }

    loadProducts( query ){

        this.setState({isLoading:true})
        api.searchProducts(query)
            .then((res)=>{
                this.setState({
                    isLoading: false,
                    products: res.data.items,
                    categories: res.data.categories
                })
                localStorage.setItem("categories",res.data.categories)
            }).catch((error)=>{
                console.log(error)
            });
    }

    renderProduct( product ){
        let urlProduct = 'items/' + product.id;
        return (
            <li key={product.id}>
                <Link to={urlProduct} title={product.title + "detail"} >
                    <img className="productImg" src={ product.picture } alt={ "Image " +product.title} />
                    <div className="info">
                        <div className="price">
                            <Currency pattern="! ###,### " quantity={product.price.amount} currency={product.price.currency} />
                            { product.free_shipping === true && 
                                <img className="shipping" src="../assets/ic_shipping.png" srcSet="../assets/ic_shipping.png 1x, ../assets/ic_shipping@2x.png 2x" alt="Mercado Livre" />
                            }
                            </div>
                        <h2>{product.title}</h2>
                    </div>
                    <p className="locale">{product.state}</p>
                </Link>
            </li>
        )
    }

    renderCategories( category, idx ){
        return(
            <li key={idx}>{category}</li>
        )
    }

    render(){

        let products = this.state.products;
        let categories = this.state.categories;
        let searchWords =  queryString.parse( this.props.location.search ).search;

        return(
            <React.Fragment>

                { !this.state.isLoading &&
                    <Helmet>
                        <meta charset="utf-8" />
                        <title>{searchWords + ' en Mercado Libre'}</title>
                        <meta content={'Encuentre ' + searchWords +' en el Mercado Libre Argentina. Descubre la mejor forma de comprar online.'} name="description" />
                        <meta content={window.location.origin + window.location.pathname} name="canonical" />
                    </Helmet>
                }
                
                <Search query={ searchWords } />

                <div className="mainContent">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 col-md-10 offset-md-1">

                                <ul className="breadCrumb">
                                    { categories.map(this.renderCategories) }
                                </ul>

                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 col-md-10 offset-md-1">
                               
                                <div className="searchResult">
                                    { this.state.isLoading &&
                                        <div className="loading"><span>Carregando</span></div>
                                    }
                                    { !this.state.isLoading &&
                                    <ul className="resultList">
                                        { products.map(this.renderProduct) }
                                    </ul>
                                    }

                                </div>

                                { !this.state.isLoading && products.length === 0 &&
                                    <NotFound />
                                }

                            </div>
                        </div>
                    </div>
                </div>

            </React.Fragment>
        )
    }
}