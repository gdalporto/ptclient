import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import MarkComplete from './mark-complete';
import Instructions from './instructions';
import './dashboard.css'

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
}

export class Dashboard extends React.Component {
    findTreatment(myCondition){
        const numberConditions = this.props.conditions.length;
       
        for(let i=0; i<numberConditions; i++){
            let thisCondition = this.props.conditions[i];
            if(thisCondition[myCondition]){
                return thisCondition[myCondition];
            };
        };
    return "NO MATCH";
    };
    instructionList() {
        const yourTreatment = this.findTreatment(this.props.condition);
        const instructions = yourTreatment.map((treatment,index) => {

            return (
                <li key={index} className='instructionBlock'>
                    <Instructions treatment={treatment} />
                </li>
            )
    
        })
        return instructions
            
    }
    list(){
        const myCondition = this.props.condition;
        const yourTreatment = this.findTreatment(myCondition);
        const today= formatDate(new Date());

        const treatmentDisplay = yourTreatment.map(treatment => {
            let treatmentState = "";
            let dateExists = false;
            treatmentState="incomplete"
            this.props.user.log.map(logitem=>{
                const logItemKey= Object.keys(logitem).toString();
                if(today===logItemKey){
                    dateExists = true;
                    const logs = logitem[logItemKey];
                    const thisTreatmentStatus = logs[treatment];
                    if(!(thisTreatmentStatus)){
                        return treatmentState="incomplete"
                    }
                    else {
                        return treatmentState=thisTreatmentStatus;
                    }
                }
                else {
                    return treatmentState="incomplete"
                }
            })

            const treatmentObject = {
                currentUser:this.props.user,
                treatment:treatment,                            
                date: today,
                status:treatmentState,
                dateExists
            }

            return (
                <li key={treatment} className='treatmentBlock'>
                    <div className='treatmentItemContainer'> 
                        <Link to={`/instructions/:${treatment}`}> {treatment}</Link>
                    </div>
                    <div className='treatmentStatusContainer'> 
                        <MarkComplete treatmentObject={treatmentObject} />
                    </div>
                </li>
                
            )
        })
        return treatmentDisplay;
    }

    render() {
        

        
        return (
            <div className="treatmentPageWrapper">
                <p><span className='mainLabel'>Welcome</span> {this.props.username}</p>
                <p><span className='mainLabel'>Your condition is</span> {this.props.condition} pain</p>
                <p><span className='mainLabel'>Today's exercise program:</span> </p>
                <ul className='listContainer'>
                    <li className='treatmentBlock'>
                        <div className='DBcolumn1Header'> 
                            Treatment Name
                        </div>
                        <div className='DBcolumn2Header'> 
                            Treatment Status
                        </div>
                    </li>
                    {this.list()}  
                </ul>
                <div className='treatmentInstruction'>
                    {this.instructionList()}
                
                </div>
            </div>
        )
    }
}


const mapStateToProps = state => {   
    return ({
    user: state.auth.currentUser,
    username: state.auth.currentUser.username,
    treatments: state.reducer.treatments,
    conditions: state.reducer.conditions,
    condition: state.auth.currentUser.condition
})}

export default  connect(mapStateToProps)(Dashboard);



