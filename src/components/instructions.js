import React from 'react';
import {connect} from 'react-redux';
// import {Link} from 'react-router-dom';
import DisplayInstructions from './display-instructions';


export class Instructions extends React.Component {

    render() {
        const activeUser = this.props.activeUser;
        const thisTreatment = Object.values(this.props.match.params)[0].substring(1);
        const treatmentInstruction=this.props.treatments[thisTreatment];

        return (
            <div className="instructionsPageWrapper">
                <h2>Instructions for: {thisTreatment.toString()}</h2>
                <p>Your condition is {this.props.users[activeUser].condition} pain</p>
                <p>{thisTreatment} is one of your treatments </p>
                <DisplayInstructions treatment={thisTreatment} treatmentInstruction={treatmentInstruction}/>

                <p>---------------------</p>                
            </div>
        )
    }
}


const mapStateToProps = state => {   
    console.log({state});
    return ({
    users: state.reducer.users,
    treatments: state.reducer.treatments,
    activeUser: state.reducer.activeUser,
    authStatus: state.reducer.authStatus
})}

export default  connect(mapStateToProps)(Instructions);



