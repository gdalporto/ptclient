import React from 'react';
import {connect} from 'react-redux';
import {Route, withRouter} from 'react-router-dom';
import {loadAuthToken} from '../local-storage'
import jwtDecode from 'jwt-decode';
import {getUserData, saveLoadingUser ,getCoreData} from '../actions/core-actions.js'


import RegistrationPage from './registration-page';
// import {BrowserRouter as Router, Route} from 'react-router-dom';
import TreatmentPage from './treatment-page';
import Instructions from './instructions';
import LandingPage from './landing-page';
import {refreshAuthToken} from '../actions/auth';


export class Main extends React.Component  {
    componentDidMount(prevProps){
        let authToken = loadAuthToken();
        console.log("AUTHTOKEN IS", authToken);

        this.props.dispatch(getCoreData());
        if (authToken) {
            console.log("LOADING USER DATA");
            this.props.dispatch(getUserData())
        }
        else {       
            console.log("FINISHED LOADING");
            this.props.dispatch(saveLoadingUser({"loadingUser":false}));
        }
    }

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
                {(this.props.loadingData || this.props.loadingUser) && <div>Loading.. please wait!</div> }
                {!this.props.loadingData && !this.props.loadingUser && 
                    <Route exact path="/" component={LandingPage} />}
                    <Route exact path="/register" component={RegistrationPage} />
                    <Route exact path="/dashboard" component={TreatmentPage} />
                    <Route exact path="/instructions/:treatment" component={Instructions} /> 
                 

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
    authStatus: state.reducer.authStatus,
    loadingData: state.reducer.loadingData,
    loadingUser: state.reducer.loadingUser
})}

export default  withRouter(connect(mapStateToProps)(Main));
