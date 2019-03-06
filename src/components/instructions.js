import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import DisplayInstructions from './display-instructions';


export class Instructions extends React.Component {
    findTreatment(myCondition, numberConditions){
       
        for(let i=0; i<numberConditions; i++){
            console.log(i);
            let thisCondition = this.props.conditions[i];
            if(thisCondition[myCondition]){
                return thisCondition[myCondition];
            };
        };
    return "NO MATCH";
    };

    // displayInstructions(numerConditions, yourTreatment) {
    //     const instructionsArray=[]
    //     for(let i=0; i<numberConditions; i++){
    //         intructionsArray[i] = ${this.props.treatments[yourTreatment[i]]}
    //     }
        // `
        //         <h3>How to Do ${yourTreatment[i]}</h3>
        //         <p className='treatmentSteps'>Step by step:</p>

        //         <ul>${this.props.treatments[yourTreatment[i]].steps.map(step=>)}
        //         </ul>
            
            
        //     `
        
    // }

    render() {
        const numberConditions = this.props.conditions.length;
        const activeUser = this.props.activeUser;
        const myCondition = this.props.users[activeUser].condition;
        const yourTreatment = this.findTreatment(myCondition, numberConditions);
        const instructions = yourTreatment.map(treatment => {
            const treatmentInstruction=this.props.treatments[treatment];
            console.log("TREATMENT", treatment)
            console.log("SINGLE treatment instruction", treatmentInstruction)
            return <DisplayInstructions treatment={treatment} treatmentInstruction={treatmentInstruction}/>
        })

        return (
            <div className="instructionsPageWrapper">
                <h2>Instructions for: {yourTreatment.toString()}</h2>
                <p>Your condition is {this.props.users[activeUser].condition} pain</p>
                <p>Our recommended therapies are {yourTreatment} </p>
                 {instructions}

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
    conditions: state.reducer.conditions,
    activeUser: state.reducer.activeUser,
    authStatus: state.reducer.authStatus, 
    conditions: state.reducer.conditions
})}

export default  connect(mapStateToProps)(Instructions);



