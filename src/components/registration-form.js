import React from 'react';
import {reduxForm, Field, focus} from 'redux-form';
import Input from './input';
//import {changeAuthStatus} from '../actions/core-actions';
import {registerUser} from '../actions/users';
import {login} from '../actions/auth';
import {required, nonEmpty, email, checkLength, matches} from '../validators';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
// const  { DOM: { input, select, textarea } } = React;
// const input = React.DOM.input;
// const select = React.DOM.input;

const passwordLength = checkLength({min: 10, max: 72});
const matchesPassword = matches('password');

export class RegistrationForm extends React.Component {

    onSubmit(values) {
//        const id = this.props.users.length;
        const {username, password, condition} = values;
        const treatment_object = this.props.conditions.find(item=>!!item[condition]);
        console.log("TREATMEWNT OBJECT", treatment_object);
        const treatment_wrapper = treatment_object[condition];
        console.log("TREATMENT WRAPPER", treatment_wrapper);
        const treatments = [...treatment_wrapper];
        console.log("TREATMENTS", treatments);
        const log=[];
        const user = {username, password, condition, treatments, log};
        return this.props
            .dispatch(registerUser(user))
            .then(()=>this.props.dispatch(login(username, password)));
    }
    
    render() {
        console.log("INSIDE RENDER ON REGISTRATION FORM",this.props.users);

        if(this.props.authStatus === "loggedIn") {
            return <Redirect to="/dashboard" />;
        }

        return (
            <form 
                className='registrationForm' 
                onSubmit={this.props.handleSubmit(values =>
                    this.onSubmit(values)
            )}>
                <label htmlFor="username">UserName (you@you.com)</label>
                <Field 
                    name = "username" 
                    type = "email"
                    component={Input}
                    validate={[required, nonEmpty, email]}
                    />

                 <label htmlFor="password">Enter password (10-72 chars)</label>
                <Field 
                    name = "password" 
                    type = "password"
                    component={Input}
                    validate={[required, nonEmpty, passwordLength]}
               />

                <label htmlFor="passwordCheck">Re-enter password</label>
                <Field 
                    name = "passwordCheck" 
                    type = "text"
                    component={Input}
                    validate={[required, matchesPassword]}
               />

                <label>What area is bothering you?</label>
            
                <Field name="condition" component="select">
                    Upper Back
                    <option></option>
                    <option >Upper Back</option>
                    <option >Lower Back</option>
                    <option >Shoulder</option>
                </Field>
                        

               <button 
                type="submit"
                disabled={this.props.pristine || this.props.submitting}>
                   Submit
               </button>

            </form>
        )
    }

}

const mapStateToProps = state => ({
    users: state.reducer.users,
    authStatus: state.reducer.authStatus,
    conditions: state.reducer.conditions
})

export default connect(mapStateToProps)(
    reduxForm({
        form: 'registration',
       onSubmitFail: (errors, dispatch) => {
            console.log({errors});
           dispatch(focus('registration', Object.keys(errors)[0]))
       }
    })(RegistrationForm)
);







