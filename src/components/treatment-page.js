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

export class TreatmentPage extends React.Component {
    findTreatment(myCondition){
        const numberConditions = this.props.conditions.length;
       
        for(let i=0; i<numberConditions; i++){
            console.log(i);
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
        let userlog=this.props.users[this.props.activeUser].log;
        let daysBack = 30;
        let treatments = this.props.users[this.props.activeUser].treatments;
        console.log("treatments", treatments);
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
                fragment.push(<React.Fragment>
                    <div>
                        {treatmentDate}
                    </div>
                    <div>
                        {treatmentBox}
                    </div>
                </React.Fragment>);
            }
            else {
                fragment.push(<React.Fragment>
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
        
        const activeUser = this.props.activeUser;
        const myCondition = this.props.users[activeUser].condition;
        const yourTreatment = this.findTreatment(myCondition);
        const today= formatDate(new Date());

        const list = yourTreatment.map(treatment => {
            let treatmentState = "";
            let dateExists = false;
            treatmentState="incomplete"
            this.props.users[activeUser].log.map(logitem=>{
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
                activeUser:this.props.activeUser,
                treatment:treatment,                            
                date: today,
                status:treatmentState,
                dateExists
            }

            return (
                <li key={treatment}>
                    <div> 
                        <Link to={`/instructions/:${treatment}`}> {treatment}</Link>
                    </div>
                    <div> 
                        <MarkComplete treatmentObject={treatmentObject} />
                    </div>
                </li>
                
            )
        })


        
        return (
            <div className="treatmentPageWrapper">
                <p>Welcome {this.props.users[activeUser].username}</p>
                <p>Your condition is {this.props.users[activeUser].condition} pain</p>
                <p>Today's exercise program: </p>
                <ul>{list}  </ul>
                <p> </p>
                <p>Over the past month, you've completed the following treatments: </p>
                <ul>{this.priorList()}</ul>

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
    authStatus: state.reducer.authStatus, 
    conditions: state.reducer.conditions
})}

export default  connect(mapStateToProps)(TreatmentPage);



