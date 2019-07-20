import types from '../actions/types'

const DEFAULT_STATE = {
    auth: false,
    email: ''
};

/*const exampleAction = {
    type: 'Log_USER_IN',
    username: 'JimBob'
};*/

function userReducer(state= DEFAULT_STATE, action){ /*will be called by redux when we try to update state*/
    switch(action.type){
        case types.SIGN_IN:
            return {...state, auth: true, email: action.email};
        case types.SIGN_OUT:
            return {...DEFAULT_STATE};
        default:
            return state;
    }
}

export default userReducer;