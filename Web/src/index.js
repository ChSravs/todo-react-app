import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import Home from './components/home'
import View from './components/view'
import Cart from './components/cart'
import Breach from './components/breach'
import adminLogin from './components/adminLogin'
import ButtonAppBar from './components/topBar'
import Login from './components/login'
import Signup from './components/signup'
import Dashboard from './components/dashboard'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import products from './reducers/products'
import cartlist from './reducers/cartlist'
import userdetails from './reducers/userdetails'
import thunk from 'redux-thunk'

const reducer = combineReducers({
    products,
    cartlist,
    userdetails
});

const store = createStore(
    reducer,
    compose(
        applyMiddleware(thunk)
    )
);

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <div>
            {/* <Route exact path="/" component={Breach} /> */}
                <Route path="/" component={ButtonAppBar} />
                <Route path="/admin" component={adminLogin} />
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/cart" component={Cart} />
                <Route path="/view:id" component={View} />
                <Route exact path="/" component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/signup" component={Signup} />
            </div>
        </Router>
    </Provider>,
    document.getElementById('root')
);