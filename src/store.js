import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import {reducer as formReducer} from 'redux-form';
import {reducer} from './reducers/core-reducers';
import {loadAuthToken} from './local-storage';
import authReducer from './reducers/auth';
// import protectedDataReducer from './reducers/protected-data';
import {setAuthToken, refreshAuthToken} from './actions/auth';
import { composeWithDevTools } from 'redux-devtools-extension';

const store=createStore(
    combineReducers({
        form: formReducer,
        auth: authReducer,
        // protectedData: protectedDataReducer,
        reducer: reducer
    }),
    composeWithDevTools(applyMiddleware(thunk))
);

const authToken = loadAuthToken();
if (authToken) {
    const token = authToken;
    store.dispatch(setAuthToken(token));
    store.dispatch(refreshAuthToken());
}

export default store;