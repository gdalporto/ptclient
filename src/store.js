import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import {reducer as formReducer} from 'redux-form';
import {reducer} from './reducers';

export default createStore(
    combineReducers({
        form: formReducer,
        reducer: reducer
    }),
    applyMiddleware(thunk)
);
