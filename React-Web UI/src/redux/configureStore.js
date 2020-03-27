import {createStore, combineReducers, applyMiddleware } from 'redux';
import { UploadCSV } from './uploadcsv';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { createForms } from 'react-redux-form';
import { InitialSignup } from './forms';



export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            uploadcsv: UploadCSV,
             ...createForms({
                 signup: InitialSignup
             })
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}