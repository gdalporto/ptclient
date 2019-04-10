import React from 'react';
import {connect} from 'react-redux';
import {clearAuth} from '../actions/auth';
import {clearUser} from '../actions/core-actions'
import {clearAuthToken} from '../local-storage'

export class Logout extends React.Component {
    componentDidMount(prevProps){
        clearAuthToken();
        this.props.dispatch(clearAuth());
        this.props.dispatch(clearUser());


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
