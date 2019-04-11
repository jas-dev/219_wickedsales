import React, {Component} from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';

class ProductAdd extends Component{
    constructor(props){
        super(props);

        this.state = {
            qty: 1
        };

        this.incrementQty=this.incrementQty.bind(this);
        this.decrementQty=this.decrementQty.bind(this);
        this.addToCart=this.addToCart.bind(this);
    }
    incrementQty(){
        this.setState({
            qty: this.state.qty+1
        })
    }
    decrementQty(){
        if(this.state.qty >1){
            this.setState({
                qty: this.state.qty-1
            })
        }

    }
    addToCart(){
        /*console.log('add', this.state.qty, 'product to cart ID:', this.props.productId);*/
        const {productId} = this.props;
        const {qty} = this.state;
        axios.get(`/api/addcartitem.php?product_id=${productId}&quantity=${qty}`).then(response=>{
            /*console.log('Add to cart response:', response);*/
            this.props.history.push('/cart');
        })
    }
    render(){
        return(
            <div className="right-align add-to-cart">
                <span className="qty-container">
                    <button className="btn btn-small btn-floating purple lighten-1">
                        <i className="material-icons" onClick={this.decrementQty}>remove</i>
                    </button>
                    <span className="product-qty">{this.state.qty}</span>
                    <button className="btn btn-small btn-floating purple lighten-1">
                        <i className="material-icons" onClick={this.incrementQty}>add</i>
                    </button>
                </span>

                <button className="btn purple darken-2">
                    <i className="material-icons" onClick={this.addToCart}>add_shopping_cart</i>
                </button>
            </div>

        )
    }
}

export default withRouter(ProductAdd);