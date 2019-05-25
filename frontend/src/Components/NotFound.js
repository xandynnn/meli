import React, { Component } from 'react';

export default class NotFound extends Component{
    render(){
        return(
            <React.Fragment>
                <div className="jumbotron">
                    <h1 className="display-4">No hay publicaciones que coincidan con tu búsqueda.</h1>
                    <p className="lead">Compruebe la ortografía de la palabra y vuelva a intentarlo.</p>
                    <hr className="my-4" />
                    <ul>
                        <li>Revisá la ortografía de la palabra.</li>
                        <li>Utilizá palabras más genéricas o menos palabras.</li>
                        <li>Navega por las categorías para encontrar un producto similar.</li>
                    </ul>
                </div>
            </React.Fragment>
        )
    }
}

