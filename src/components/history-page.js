import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import MarkComplete from './mark-complete';

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
}

export class HistoryPage extends React.Component {
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
    parseLogEntry(logEntry, date){
        let treatmentArray=Object.keys(logEntry[date]);
        let statusArray = treatmentArray.map(treatment => {
            let thisEntry=logEntry[date]
            return thisEntry[treatment]
        })
        return [treatmentArray, statusArray];
    }
    priorList() {
        let userlog=this.props.user.log;
        let daysBack = 30;
        let treatments = this.props.user.treatments;
        let treatmentDates= userlog.map(logEntry=>{
            let stringDate= Object.keys(logEntry).toString();
            return stringDate;
        });
        let fragment=[]
        for (let i=1; i<=daysBack; i++){
            let thisDate=formatDate(new Date()-i*86400000);
            if(treatmentDates.includes(thisDate)){
                let logEntryArray = userlog.filter(log=>{
                    return log[thisDate];
                })
                let logEntry=logEntryArray[0]
                let parsedLogEntry=this.parseLogEntry(logEntry, thisDate);
                let treatmentArray= parsedLogEntry[0];
                let statusArray=parsedLogEntry[1];
                let treatmentDate = <div className='daysBackDate'>${thisDate}</div>
                let treatmentBox = treatmentArray.map((treatment, index)=>{
                    return <div key={treatment} className='daysBackTreatment'>{treatment}:{statusArray[index]}</div>
                })
                fragment.push(<React.Fragment key={i}>
                    <div>
                        {treatmentDate}
                    </div>
                    <div>
                        {treatmentBox}
                    </div>
                </React.Fragment>);
            }
            else {
                fragment.push(<React.Fragment key={i}>
                <div>
                    <div className='daysBackDate'>{thisDate}</div>
                </div>
                <div>
                    <div className='daysBackTreatment'>{treatments}</div>
                </div>
            </React.Fragment>)
                
            }
        }
        return (fragment);
    }


    render() {
        
        const myCondition = this.props.condition;
        const yourTreatment = this.findTreatment(myCondition);
        const today= formatDate(new Date());
       
        return (
            <div className="historyPageWrapper">
                <p>Over the past month, you've completed the following treatments: </p>
                <ul>{this.priorList()}</ul>
                <p>---------------------</p>                
            </div>
        )
    }
}


const mapStateToProps = state => {   
    console.log({state});
    console.log("state auth currentuser", state.auth.currentUser)
    return ({
    user: state.auth.currentUser,
    username: state.auth.currentUser.username,
    treatments: state.reducer.treatments,
    conditions: state.reducer.conditions,
    condition: state.auth.currentUser.condition
})}

export default  connect(mapStateToProps)(HistoryPage);



