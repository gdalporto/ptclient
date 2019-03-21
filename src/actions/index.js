

export const CHANGE_AUTH_STATUS = 'CHANGE_AUTH_STATUS';
export const changeAuthStatus = (user) => ({
    type: CHANGE_AUTH_STATUS,
    authStatus: user.authStatus,
    activeUser: user.id
});


// this is where we use Thunk and create user in database (asynchronously) and then dispatch an action, like login.
export const ADD_USER = 'ADD_USER';
const posturl = "/user/";
export const addUser = (userData) => dispatch => {
    fetch(posturl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userData)
    })
    .then(response => {
        if(!(response.status==201)){
            throw new Error(response);
        }
        return response.json();
    })
    .catch(err => {
        console.log("In Javascript Error Section");
        messageJson = err.json();
        console.log(messageJson);
        $(".subscribeJS").html(`Error in JS Response Error: ${err.message}`);    
    })
}
export const LOG_IN = 'LOG_IN';
export const logIn = (loginData) => ({
    type: LOG_IN,
    username: loginData.username,
    password: loginData.password
})


export const CHANGE_ACTIVE_USER = 'CHANGE_ACTIVE_USER';
export const changeActiveUser = (user) => ({
    type: CHANGE_ACTIVE_USER,
    username: user.username,
});


export const LOG_TREATMENT = 'LOG_TREATMENT';
export const logTreatment = (treatmentObject) => ({
    type: LOG_TREATMENT,
    activeUser: treatmentObject.activeUser,
    date: treatmentObject.date,
    treatment: treatmentObject.treatment,
    status: treatmentObject.status
});






