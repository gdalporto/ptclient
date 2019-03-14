import React from 'react';
import {connect} from 'react-redux';
import RegistrationForm from './registration-form';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import TreatmentPage from './treatment-page';
import Instructions from './instructions';

export class Main extends React.Component  {
    render () {
        let numRecords = this.props.users.length;
        
        return (
            <Router>

                <div className='mainWrapper'> 
                    <Route exact path="/" component={RegistrationForm} />
                    <Route exact path="/loggedIn" component={TreatmentPage} />
                    <Route exact path="/instructions/:treatment" component={Instructions} />

                    <p>----This is from Main ----</p>

                    <p>trouble shooting text</p>
                    <p>User: {this.props.users[this.props.activeUser].userName} </p>
                    <p>Treatment:  {this.props.treatments.Crunches.description}</p>
                    <p>Number of users: {numRecords}</p>
                    <p>AuthStatus: {this.props.authStatus}.</p>
                    
                     
                    
                </div>
            </Router>
        );
    };
}

const mapStateToProps = state => {   
    console.log(state);
    return ({
    users: state.reducer.users,
    treatments: state.reducer.treatments,
    activeUser: state.reducer.activeUser,
    authStatus: state.reducer.authStatus
})}

export default  connect(mapStateToProps)(Main);
