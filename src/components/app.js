import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min';
import '../assets/css/app.scss';
import React, {Component} from 'react';
import { Route, Switch } from 'react-router-dom';
import ProductRoutes from './products';
import Home from './home';
import Nav from './nav';
import NotFound from './404';
import Cart from './cart';
import axios from 'axios'
import AccountRoutes from './account';

class App extends Component{
    constructor(props){
        super(props);

        this.state = {
            cartItems: 0
        };

        this.updateCartItems=this.updateCartItems.bind(this);
    }
    updateCartItems(count){
        this.setState({
            cartItems: count
        })
    }
    componentDidMount() {
        this.getCartItemsCount()
    }

    async getCartItemsCount(){
        const response = await axios.get('/api/getcartitemcount.php');
        /*console.log('response:', response);*/
        this.updateCartItems(response.data.itemCount)
    }

    render(){
        return(
            <div>
                <Nav cartItems={this.state.cartItems}/>

                <div className="container">
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/products" render={(routingProps)=>{
                            return <ProductRoutes{...routingProps} updateCart={this.updateCartItems}/>
                        }} />
                        <Route path="/cart" component={Cart}/>
                        <Route path="/account" component={AccountRoutes}/>
                        <Route component={NotFound} />
                    </Switch>
                </div>
            </div>
        );
    }
}


export default App;
