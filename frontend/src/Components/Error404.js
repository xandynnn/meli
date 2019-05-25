import React, {Component} from 'react';
import { Link } from 'react-router-dom';

export default class Erro404 extends Component{
    render(){
        return(
            <div className="jumbotron">
                <h1 className="display-4">404</h1>
                <p className="lead">Parece que la página no existe</p>
                <hr className="my-4" />
                <p><Link to={'/'} title="Ir a la Página principal">Ir a la Página principal</Link></p>
            </div>
        )
    }
}