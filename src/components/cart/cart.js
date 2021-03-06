import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {formatMoney} from '../../helpers'
import './cart.scss';

class Cart extends Component{
    state = {
        items: [],
        meta: {}
    };
    componentDidMount() {
        this.getCartData();
    }
    async getCartData(){
        const {data = {}} = await axios.get('/api/getcartitems.php');
        /*console.log('cart items:', data);*/

        if(data.success){
            this.setState({
                items: data.cartItems,
                meta: data.cartMetaData
            })
        }
    }
    render(){
        const {items, meta}= this.state;
        let totalItems = 0;

        const cartItems = items.map(item=>{
            totalItems += item.quantity;
            const itemTotalPrice = formatMoney(item.quantity * item.price);
            /*console.log("item obj:",item);*/
            return (
                <tr key={item.id}>
                    <td>
                        <img src={`/dist/${item.image}`} alt={`${item.name} product image`}/>
                    </td>
                    <td>{item.name}</td>
                    <td>{formatMoney(item.price)}</td>
                    <td>{item.quantity}</td>
                    <td>{itemTotalPrice}</td>
                </tr>
            )
        });


        return(
            <div className='cart'>
                <h1 className='center'>Shopping Cart</h1>
                <Link to='/products'>Continue Shopping</Link>
                <div className='total-items'>Total Items is {totalItems}</div>
                <table>
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Product Name</th>
                            <th>Price Each</th>
                            <th>Quantity</th>
                            <th>Item Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems}
                        <tr>
                            <td className='total-price' colSpan='5'>
                                Total: {formatMoney(meta.total)}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Cart;