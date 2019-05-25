import React from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Search from '../Products/Search';
import ResultList from '../Products/ResultList';
import Detail from '../Products/Detail';
import Error from '../Pages/Error';

const Routes = () => (
	<div className="App">
		<BrowserRouter>
			<Switch>
				<Route exact path='/' component={Search} />
                <Route exact path='/items/:id' component={Detail} />
				<Route exact path='/items' component={ResultList} />
				<Route component={Error} />
			</Switch>
		</BrowserRouter>
	</div>
);

export default Routes;