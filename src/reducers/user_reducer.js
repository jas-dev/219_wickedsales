
const DEFAULT_STATE = {
    auth: false,
    username: ''
};

/*const exampleAction = {
    type: 'Log_USER_IN',
    username: 'JimBob'
};*/

function userReducer(state= DEFAULT_STATE, action){ /*will be called by redux when we try to update state*/
    switch(action.type){
        case 'SIGN_IN':
            return {...state, auth: true};
        default:
            return state;
    }
}

export default userReducer;