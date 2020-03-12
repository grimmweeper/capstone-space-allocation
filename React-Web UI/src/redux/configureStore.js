import {createStore, combineReducers, applyMiddleware } from 'redux';
import { UploadCSV } from './uploadcsv';
import thunk from 'redux-thunk';
import logger from 'redux-logger';


export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            uploadcsv: UploadCSV,
            ...createForms({
                feedback: InitialFeedback
            })
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}