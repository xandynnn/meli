import React, { Component } from 'react';

import Search from './../Products/Search';
import Error404 from './../Components/Error404';

export default class Error extends Component{
    render(){
        return(
            <React.Fragment>

                <Search />

                <div className="mainContent">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 col-md-10 offset-md-1">
                               
                               <Error404 />

                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}