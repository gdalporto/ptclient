import React from 'react';
import {connect} from 'react-redux';
import {logTreatment} from '../actions/auth';

export class DisplayInstructions extends React.Component {

    handleClick(event){
        event.preventDefault();
        console.log("Clicked");
        console.log("props check treatmentObject status", this.props.treatmentObject.status)
        if(this.props.treatmentObject.status==="incomplete"){
            this.props.treatmentObject.status = "complete";
        }
        else {
            this.props.treatmentObject.status = "incomplete";
        }
        this.props.dispatch(logTreatment(this.props.treatmentObject));
        
    };
    render() {
        return (
            <div className='markCompleteWrapper'>
                <button onClick={click=>this.handleClick(click)} variant="primary">{this.props.treatmentObject.status}</button>
            </div>
        );
    }
};


export default connect()(DisplayInstructions);


