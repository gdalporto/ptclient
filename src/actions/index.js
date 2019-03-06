

export const CHANGE_AUTH_STATUS = 'CHANGE_AUTH_STATUS';
export const changeAuthStatus = (user) => ({
    type: CHANGE_AUTH_STATUS,
    authStatus: user.authStatus,
    activeUser: user.id
});

export const ADD_USER = 'ADD_USER';
export const addUser = (user) => ({
    type: ADD_USER,
    id: user.id,
    userName: user.userName,
    password: user.password,
    condition: user.condition
});

export const LOG_TREATMENT = 'LOG_TREATMENT';
export const logTreatment = (treatment) => ({
    type: LOG_TREATMENT,
    userNum: treatment.userNum,
    date: treatment.date,
    activity: treatment.activity,
    status: treatment.status
});






