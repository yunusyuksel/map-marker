import {all} from "redux-saga/effects";
import {combineReducers} from "redux";
import * as marker from "modules/Marker/_redux/markerRedux"


/* Combine all the individual reducers to create store*/
export const rootReducer =  combineReducers({
    marker:marker.markerReducer
});


/* Run all the saga functions parallel*/
export function* rootSaga(){
   yield all([marker.saga()])
}