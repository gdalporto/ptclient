import React from 'react';
import {connect} from 'react-redux';
import {clearAuth} from '../actions/auth';
import {clearUser} from '../actions/core-actions'
import {clearAuthToken} from '../local-storage'
import {Link, Redirect} from 'react-router-dom';

export class Logout extends React.Component {
    componentDidMount(prevProps){
        console.log("COMPONENT MOUNTED");
        clearAuthToken();
        this.props.dispatch(clearAuth());
        this.props.dispatch(clearUser());
        console.log("SHOULD BE LOGGED OUT");
//        return <Redirect to="/" />


    }

    render() {

        return (
            <div>logged out</div>
        )
    }
}


const mapStateToProps = state => {   
    return ({
})}


export default  connect(mapStateToProps)(Logout);
