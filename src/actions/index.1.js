

export const CHANGE_AUTH_STATUS = 'CHANGE_AUTH_STATUS';
export const changeAuthStatus = (user) => ({
    type: CHANGE_AUTH_STATUS,
    authStatus: user.authStatus,
    activeUser: user.id
});


// this is where we use Thunk and create user in database (asynchronously) and then dispatch an action, like login.
export const ADD_USER = 'ADD_USER';
export const addUser = (user) => ({
    type: ADD_USER,
    id: user.id,
    username: user.username,
    password: user.password,
    condition: user.condition
});

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






