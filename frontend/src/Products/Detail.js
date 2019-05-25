import React, { Component } from 'react';

import api from './../Services/Api';
import Search from './Search';
import Currency from 'react-currency-formatter';
import Helmet from 'react-helmet';
import Error404 from '../Components/Error404';

import './../styles/css/Breadcrumb.css';
import './../styles/css/Product.css';

const conditions = {
    'new': 'Nuevo',
    'used': 'Usado'
}

class Detail extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            isLoading: true,
            product: {},
            error: false,
            categories: []
        }
        this.loadProduct = this.loadProduct.bind(this);
    }

    componentDidMount(){
        this.loadProduct( this.props.match.params.id );
    }

    loadProduct( id ){

        this.setState({isLoading:true});
        api.loadProductById(id)
            .then((res)=>{
                this.setState({
                    isLoading: false,
                    product: res.data.item,
                    categories: localStorage.getItem("categories")
                })
            }).catch((error)=>{
                console.log( error.response.statusText );
                this.setState({
                    isLoading: false,
                    error:true
                })
            });
    }

    calcDecimal( number ){
        let res = "";
        for ( let x = 1; x <= number; x++ ){ res += 0 } 
        return res;
    }

    renderCategories( category, idx ){
        return(
            <li key={idx}>{category}</li>
        )
    }

    render(){

        let product = this.state.product;
        let categories = this.state.categories;
        let canonical = window.location.origin + window.location.pathname;

        return(
            <React.Fragment>

                <Search />

                { !this.state.isLoading && !this.state.error &&
                    <Helmet>
                        <meta charset="utf-8" />
                        <title>{product.title + ' en Mercado Libre'}</title>
                        <meta content={product.title + '. Mercado Libre Argentina - Donde comprar y vender de todo'} name="description" />
                        <meta content={canonical} name="canonical" />
                    </Helmet>
                }

                <div className="mainContent">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 col-md-10 offset-md-1">
  
                                { this.state.isLoading &&
                                    <div className="loading"><span>Carregando</span></div>
                                }
                                
                                { !this.state.isLoading && !this.state.error &&
                                    <React.Fragment>

                                        <ul className="breadCrumb">
                                            { categories.split(",").map(this.renderCategories) }
                                        </ul>
  
                                        <div id="produto">
                                            <div className="row">
                            
                                                <div className="col-12 col-sm-7 col-lg-9 npl">
                                                    
                                                    <img src={product.picture} className="imgProduct" alt={product.title} />
 
                                                </div>
                                                <div className="col-12 col-sm-5 col-lg-3 npr">
                                                    <p className="sold">{conditions[product.condition]} - {product.sold_quantity} vendidos</p>
                                                    <h1>{product.title}</h1>
                                                    <div className="price">
                                                    <span className="value"><Currency pattern="! ###,### " quantity={product.price.amount} currency={product.price.currency} /></span>
                                                    <span className="decimals">{ this.calcDecimal(product.price.decimals) }</span>
                                                    </div>
                                                    <div className="boxBtn">
                                                        <a href={canonical} className="btn btnBuy" title="Comprar">Comprar</a>
                                                    </div>
                                                </div>

                                                <div className="col-12 col-sm-12 col-lg-9 npl">
                                                    { product.description && 
                                                    <div className="description">
                                                        <h2>Descripción del producto</h2>
                                                        <p><code>{product.description}</code></p>
                                                    </div>
                                                    }
                                                </div>
                            
                                            </div>
                                        </div>

                                    </React.Fragment>
                                }
                                { !this.state.isLoading && this.state.error &&
                                   <Error404 />
                                }

                            </div>
                        </div>
                    </div>
                </div>

            </React.Fragment>
        )
    }

}

export default Detail;