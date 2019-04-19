import React from 'react';
import {reduxForm, Field} from 'redux-form';

const SignInForm = props =>{

    console.log('sign in form props:', props)
    return(
        <form>
            <div className='input-field'>
                <Field id='email' name='email' component='input' type='text'/>
                <label htmlFor='email'>Email</label>
            </div>
            <div className='input-field'>
                <Field id='password' name='password' component='input' type='text'/>
                <label htmlFor='password'>Password</label>
            </div>
            <button>Sign In</button>
        </form>
    );
};

export default reduxForm({
    form: 'sign-in-form'
})(SignInForm);