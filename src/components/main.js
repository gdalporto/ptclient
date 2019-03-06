import React from 'react';
import {connect} from 'react-redux';
import RegistrationForm from './registration-form';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import TreatmentPage from './treatment-page';
import Instructions from './instructions';

export class Main extends React.Component  {
    render () {
        let numRecords = this.props.users.length;
        
    
        console.log(this.props);
        console.log(this.props.users.length);
        return (
            <Router>

                <div className='mainWrapper'> 
                    <Route exact path="/" component={RegistrationForm} />
                    <Route exact path="/loggedIn" component={TreatmentPage} />
                    <Route exact path="/instructions/:treatment" component={Instructions} />

                    <p>----This is from Main ----</p>

                    <p>trouble shooting text</p>
                    <p>hello world, i am {this.props.users[0].userName} and my treatment is  {this.props.treatments.Crunches.description}</p>
                    <p>the number of users is {numRecords} and the authStatus is {this.props.authStatus}.</p>
                    <p>Console logging a list of users {this.props.users.forEach(user => console.log("usernames", user.userName))}</p>
                    
                     
                    
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
    authStatus: state.reducer.authStatus
})}

export default  connect(mapStateToProps)(Main);
