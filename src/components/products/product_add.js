import React, {Component} from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import Modal from '../modal'
import {formatMoney} from "../../helpers";

class ProductAdd extends Component{
    constructor(props){
        super(props);

        this.state = {
            qty: 1,
            modalOpen: false,
            totalPrice: 0,
            cartQty: 0
        };

        this.incrementQty=this.incrementQty.bind(this);
        this.decrementQty=this.decrementQty.bind(this);
        this.addToCart=this.addToCart.bind(this);
        this.goToCart=this.goToCart.bind(this);
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
        const {productId, updateCart} = this.props;
        const {qty} = this.state;

        axios.get(`/api/addcartitem.php?product_id=${productId}&quantity=${qty}`).then(response=>{
            /*console.log('Add to cart response:', response);*/
            const { cartCount, cartTotal} = response.data;
            updateCart(cartCount);

            this.setState({
                modalOpen: true,
                cartQty: cartCount,
                totalPrice: cartTotal
            })

        });
    }
    closeModal = ()=>{
        this.setState({
            modalOpen: false,
            qty: 1
        });
    };
    goToCart(){
        this.props.history.push('/cart');
    }
    render(){
        const {qty, modalOpen, cartQty, totalPrice} = this.state;

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

                <Modal defaultAction={this.closeModal} secondaryAction={this.goToCart} secondaryActionText='View Cart' isOpen={modalOpen} defaultActionText='Continue Shopping'>
                    <h1 className="center">{qty} Item{qty > 1 && 's'} Added to Cart</h1>

                        <div className="row">
                            <div className="col s6>">Cart Total Items:</div>
                            <div className="col s6 left-align">{cartQty}</div>
                        </div>
                        <div className="row">
                            <div className="col s6>">Cart Total Price:</div>
                            <div className="col s6 left-align">{formatMoney(totalPrice)}</div>
                        </div>

                </Modal>
            </div>
        )
    }
}

export default withRouter(ProductAdd);