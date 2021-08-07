import {all} from "redux-saga/effects";
import {combineReducers} from "redux";
import * as marker from "modules/Marker/_redux/markerRedux"



export const rootReducer =  combineReducers({
    marker:marker.markerReducer
 
});


export function* rootSaga(){
   yield all([marker.saga()])
}