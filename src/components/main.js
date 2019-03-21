import React from 'react';
import {connect} from 'react-redux';
import {Route, withRouter} from 'react-router-dom';

import RegistrationPage from '/registration-page';
import RegistrationForm from './registration-form';
// import {BrowserRouter as Router, Route} from 'react-router-dom';
import TreatmentPage from './treatment-page';
import Instructions from './instructions';

export class Main extends React.Component  {
    componentDidUpdate(prevProps) {
        if (!prevProps.loggedIn && this.props.loggedIn) {
            // When we are logged in, refresh the auth token periodically
            this.startPeriodicRefresh();
        } else if (prevProps.loggedIn && !this.props.loggedIn) {
            // Stop refreshing when we log out
            this.stopPeriodicRefresh();
        }
    }

    componentWillUnmount() {
        this.stopPeriodicRefresh();
    }

    startPeriodicRefresh() {
        this.refreshInterval = setInterval(
            () => this.props.dispatch(refreshAuthToken()),
            60 * 60 * 1000 // One hour
        );
    }

    stopPeriodicRefresh() {
        if (!this.refreshInterval) {
            return;
        }

        clearInterval(this.refreshInterval);
    }

    render () {
        let numRecords = this.props.users.length;
        
        return (
            // <Router>

                <div className='mainWrapper'> 
                    <Route exact path="/" component={LandingPage} />
                    <Route exact path="/register" component={RegistrationPage} />
                    <Route exact path="/dashboard" component={TreatmentPage} />
                    <Route exact path="/instructions/:treatment" component={Instructions} />

                    <p>----This is from Main ----</p>

                    <p>trouble shooting text</p>
                    <p>User: {this.props.users[this.props.activeUser].username} </p>
                    <p>Treatment:  {this.props.treatments.Crunches.description}</p>
                    <p>Number of users: {numRecords}</p>
                    <p>AuthStatus: {this.props.authStatus}.</p>
                    
                     
                    
                </div>
            // </Router>
        );
    };
}

const mapStateToProps = state => {   
    console.log(state);
    return ({
    hasAuthToken: state.auth.authToken !== null,
    loggedIn: state.auth.currentUser !== null,
    users: state.reducer.users,
    treatments: state.reducer.treatments,
    activeUser: state.reducer.activeUser,
    authStatus: state.reducer.authStatus
})}

export default  withRouter(connect(mapStateToProps)(Main));
