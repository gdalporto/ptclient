import React from 'react';
import {connect} from 'react-redux';
import DisplayInstructions from './display-instructions';



export class Instructions extends React.Component {
    constructor(props) {
        super(props);
    }
    getTreatment(){
        let treatment;
        if(!this.props.treatment){
            treatment = Object.values(this.props.match.params)[0].substring(1);
        }
        else {
            treatment = this.props.treatment;
        }
        return treatment;
    }
    
    render() {
        let thisTreatment = this.getTreatment();
    
        const treatmentObject=this.props.treatments.find(treatment=>{
            return Object.keys(treatment)[1].toString()===thisTreatment;
        });
        const treatmentInstruction = treatmentObject[thisTreatment];
    
        return (
            <div className="instructionsPageWrapper">
                <h2>Instructions for: {thisTreatment.toString()}</h2>
                <DisplayInstructions treatment={thisTreatment} treatmentInstruction={treatmentInstruction}/>

                <p>---------------------</p>                
            </div>
        )
    }
}


const mapStateToProps = state => {   
    return ({
    user: state.auth.currentUser,
    treatments: state.reducer.treatments,
    activeUser: state.reducer.activeUser,
    authStatus: state.reducer.authStatus,
    condition: state.auth.currentUser.condition
})}

export default  connect(mapStateToProps)(Instructions);



