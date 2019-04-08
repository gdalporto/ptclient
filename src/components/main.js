import React from 'react';
import {connect} from 'react-redux';
import {Route, withRouter} from 'react-router-dom';
import {loadAuthToken} from '../local-storage';
import {getUserData, saveLoadingUser ,getCoreData} from '../actions/core-actions.js';
import { Switch } from 'react-router';
import NavBar from './navbar.js';
import RegistrationPage from './registration-page';
import Dashboard from './dashboard';
import Instructions from './instructions';
import LandingPage from './landing-page';
import History from './history.js';
import Logout from './logout';
import {refreshAuthToken} from '../actions/auth';
import LogIn from './login';
import './main.css';


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
        if(!this.props.loadingData && !this.props.loadingUser){
            console.log("LOADING COMPLETE");
            return (             
                <div className='mainWrapper'> 
                        <NavBar className = 'navBarWrapper' />
                        <div className='bodyWrapper'>
                            <Switch>
                                <Route exact path="/" component={LandingPage} />
                                <Route exact path="/login" component={LogIn} />                        
                                <Route exact path="/register" component={RegistrationPage} />
                                <Route exact path="/dashboard" component={Dashboard} />
                                <Route exact path="/history" component={History} />
                                <Route exact path="/instructions/:treatment" component={Instructions} /> 
                                <Route exact path="/logout" component={Logout} /> 
                                
                            </Switch>
                        </div>
                </div>                
            )
        }
        else {
            return null;

        }
    };
}



const mapStateToProps = state => {  
    console.log("STATE IS", state); 
    return ({
    hasAuthToken: state.auth.authToken !== null,
    loggedIn: state.auth.currentUser !== null,
    users: state.reducer.users,
    treatments: state.reducer.treatments,
    activeUser: state.reducer.activeUser,
    authStatus: state.reducer.authStatus,
    loadingData: state.reducer.loadingData,
    // condition: state.auth.currentUser.condition,
    // user: state.auth.currentUser,
    loadingUser: state.reducer.loadingUser
})}

export default  withRouter(connect(mapStateToProps)(Main));
