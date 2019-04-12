import React from 'react';
import {reduxForm} from 'redux-form';

const SignInForm = props =>{
    return(
        <form>
            <h1> Form up in here</h1>
        </form>
    );
};

export default reduxForm({
    form: 'sign-in-form'
})(SignInForm);