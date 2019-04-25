import types from './types'
import axios from 'axios';

export const checkAuth = () => async dispatch => {
    const resp = await axios.get('/api/check-auth.php');

    if(resp.data.success){
        dispatch({
            type: types.SIGN_IN,
            email: resp.data.email
        });
    }else{
        dispatch({
            type: types.SIGN_OUT
        });
    }
}

export function signIn(user){
    console.log('Sign In Action Create, user data:', user); /*an action is an object, every action must have at least one property. action gets dispateched to reducer. must return action*/

    return dispatch=>{
        axios.post('/api/sign-in', user).then(resp =>{
            console.log('Sign In resp:', resp);

            if(resp.data.success) {
                localStorage.setItem('signedIn', 'true');

                dispatch({
                    type: types.SIGN_IN,
                    email: resp.data.email
                });
            }else{
                dispatch({
                    type: types.SIGN_IN_ERROR
                })
            }
        })
    }
}

export function signOut(){
    return function(dispatch){
        axios.get('/api/sign-out.php').then(resp=>{
           localStorage.removeItem('signedIn');
           dispatch({
               type: types.SIGN_OUT
           })
        });
    }
}

export function getAllProducts(){
    return function(dispatch){
        axios.get('/api/getproducts.php').then(resp=>{

            dispatch({
                type: types.GET_ALL_PRODUCTS,
                products: resp.data.products
            })
        });
    }
}