import React from 'react';
import {connect} from 'react-redux';

export class DisplayInstructions extends React.Component {

    handleClick(event){
        event.preventDefault();
        console.log("Clicked");
        
    };
    render() {
        return (
            <div className='markCompleteWrapper'>
                <button onClick={click=>this.handleClick(click)} variant="primary">Mark Complete</button>
            </div>
        );
    }
};

const mapStateToProps = (state) => {

}

export default connect(mapStateToProps)(DisplayInstructions);