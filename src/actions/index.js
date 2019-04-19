import types from './types';

export function signIn(user){
    console.log('Sign In Action Create, user data:', user); /*an action is an object, every action must have at least one property. action gets dispateched to reducer. must return action*/

    return {
        type: types.SIGN_IN,
        email: user.email
    }
}

export function signOut(user){
    return {
        type: types.SIGN_OUT
    }
}