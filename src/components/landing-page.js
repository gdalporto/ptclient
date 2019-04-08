import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import './landing-page.css';
import LoginForm from './login-form';
import hero from './physical-therapy-hero-image.jpeg'

function handleClick(event) {
    event.preventDefault();
    console.log("HELLO CLICK");
    // <Route exact path="/" component={Home} />
}

export function LandingPage(props) {
    // If we are logged in redirect straight to the user's dashboard
    if (props.loggedIn) {
        return <Redirect to="/dashboard" />;
    }
    return (
        <div className="home">
            <div className="heroBox">
                <div className="shadingContainer">
                    <h1 className="pageTitle">Free Physical Therapy Online</h1>
                </div>
                {/* <img className="heroImage" src={hero}  /> */}
            </div>
            <div className="mainContentWrapper">
                <h3>STOP! Before you undergo surgery consider physical therapy.</h3>
                {/* <div className='effectiveneessWrapper'>
                    <p className = 'benefitsTitle'>Res  earch shows that PT:</p> 
                    <ul className='homepageList'>
                        <li className='lpList'><span className='strong'>The only cure</span> for back pain</li>
                        <li className='lpList'><span className='strong'>Effective</span> 92% of the time</li>
                        <li className='lpList'><span className='strong'>Costs 68% less</span> than surgery</li>
                    </ul>
                </div> */}
                <div className="boxesWrapper">
                    <div className='treatmentsWrapper'>
                        <p className='treatments title'><span className='strong'>92% cure rate for:</span></p>
                        <ul className='homepageList'>
                            <li className='lpList'>Upper Back Pain</li>
                            <li className='lpList'>Lower Back Pain</li>
                            <li className='lpList'>Shoulder Pain</li>
                            {/* <li className='lpList'>etc</li> */}
                        </ul>
                    </div>
                    <div className='featuresWrapper'>
                        <p className='features title'><span className='strong'>Sign up to get free:</span></p>
                        <ul className='homepageList'>
                            <li className='lpList'>Treatment plans</li>
                            <li className='lpList'>Progress tracker</li>
                            <li className='lpList'>How-to videos</li>
                            <li className='lpList'>Step by step instructions</li>
                        </ul>
                        <div className='buttonContainer'>
                            <div className='leftButton'>
                                <button className='standardButton' ><Link className='buttonText' to="/login">Log In</Link></button>
                            </div>
                            <div className='rightButton'>
                                <button className='standardButton'><Link className='buttonText' to="/register">Register</Link></button>
                            </div>
                        </div>
                    </div>
                    <div className="clearMe"></div>

                </div>
                <div className='footer'>
                    <p><span className='strong'>Test Account</span></p>
                    <p> - username: N@n</p>
                    <p> - password: Hello12345</p>
                    <p><span className='strong'>NOTE:</span>All content is  placeholder and taken from third party sources. 
                        The production version of this site will have custom content</p>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser.username !== null
});

export default connect(mapStateToProps)(LandingPage);
