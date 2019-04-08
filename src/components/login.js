import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import './login.css';
import LoginForm from './login-form';

export function LogIn(props) {
    // If we are logged in redirect straight to the user's dashboard
    if (props.loggedIn) {
        return <Redirect to="/dashboard" />;
    }

    return (
        <div className="loginHome">
            <h2>Welcome to Foo App</h2>
            <LoginForm />
            <div className="loginHomeRegLink">
                <Link  to="/register">Don't have an account? Register</Link>
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser.username !== null
});

export default connect(mapStateToProps)(LogIn);
