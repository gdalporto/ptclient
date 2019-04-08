import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import RegistrationForm from './registration-form';
import './registration-page.css';

export function RegistrationPage(props) {
    // If we are logged in (which happens automatically when registration
    // is successful) redirect to the user's dashboard
    if (props.loggedIn) {
        return <Redirect to="/dashboard" />;
    }
    return (
        <div className="registrationHome">
            <h2>Register for Foo App</h2>
            <RegistrationForm />
            <div className='registrationHomeLoginLink'>
                <Link to="/login">Already have an account? Login</Link>
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser.username !== null
});

export default connect(mapStateToProps)(RegistrationPage);
