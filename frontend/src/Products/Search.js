import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';

import './../styles/css/Search.css';

class Search extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            isLoading: false,
            search: ''
        }
    }

    componentDidMount(){
  
        let searchParam = this.props.query;
        if ( searchParam ){
            this.setState({search: searchParam});
            this.refs.search.value = searchParam;
        }
    }

    render(){
        let canonical = window.location.origin;
        return(
            <header role="banner">
                <Helmet>
                    <meta charset="utf-8" />
                    <title>Mercado Libre Argentina</title>
                    <meta content="Mercado Libre Argentina" name="description" />
                    <meta content={canonical} name="canonical" />
                </Helmet>
                <div className="searchBar">
                    <div className="container">
                        <div className="row">
                            <div className="col-2 col-md-1 offset-md-1">
                                <Link to={'/'} title="Mercado Libre - Página de inicio">
                                    <img className="logo" src="../assets/Logo_ML.png" srcSet="../assets/Logo_ML.png 1x, ../assets/Logo_ML@2x.png 2x" alt="Mercado Livre" />
                                </Link>
                            </div>
                            <div className="col-10 col-md-9 searchBox">
                                <form action="/items">
                                    <div className="form-group">
                                        <input type="text" placeholder="Nunca dejes de buscar" className="inputSearch" ref="search" name="search"></input>
                                        <button type="submit" className="btn btnSubmit" title="Buscar">
                                            <img src="../assets/ic_Search.png" srcSet="../assets/ic_Search.png 1x, ../assets/ic_Search@2x.png 2x" alt="Mercado Livre" />
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        )
    }

}

export default Search;