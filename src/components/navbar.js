import React from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';
import './navbar.css'

export class NavBar extends React.Component {
    logOutUser(event){
        console.log("LOG OUT USER");
    }

    pickNav(){
        let button1;
        let button1URL;
        let button2;
        let button2URL;
        
        if(this.props.username){
            //authenticated
            button1 = "Log Out";
            button1URL = "/logout";

            return (
                <nav className="topnav" role = "navigation">
                    <NavLink className='inactive' activeClassName='activeLink' to="/dashboard" >Dashboard</NavLink>
                    <NavLink className='inactive' activeClassName='activeLink' to="/history" >History</NavLink>

                    <div className="topnav-right">
                        <NavLink className='inactive' activeClassName='activeLink' to={button1URL} >{button1}</NavLink>
                    </div>
                </nav>       
            )   
        }

        else {
            // not authenticated 
            button1 = "Log in";
            button1URL = "/login";
            button2 = "Sign up";
            button2URL = "/register";
            return (
                <nav className="topnav" role = "navigation">
                    <NavLink className='inactive' activeClassName='activeLink' to="/">PT</NavLink>
                    <div className="topnav-right">
                        <NavLink className='inactive' activeClassName='activeLink' to={button1URL}>{button1}</NavLink>
                        <NavLink className='inactive' activeClassName='activeLink' to={button2URL}>{button2}</NavLink>
                    </div>
                </nav>                
            )
        };
    }

    render() {
        console.log("UPDATING NAVBAR");
        return (
            <div className='headerContainer'>
                {this.pickNav()}
            </div>


        )
    }

}
const mapStateToProps = state => {   
    return ({
    username: state.auth.currentUser.username,
    condition: state.auth.currentUser.condition

})}

export default connect(mapStateToProps,
    null,
    null,
    {
      pure: false
    })(NavBar)
