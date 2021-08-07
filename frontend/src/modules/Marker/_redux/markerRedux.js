import { call, put, takeLatest } from "@redux-saga/core/effects"
import { toast } from "react-toastify"
import {fetch, post,remove,patch} from "./markerCrud"
import {PLACES} from "./markerCrud"

export const actionTypes = {
    CreateMarkerRequest:"[Marker] Create",
    CreateMarkerSuccess:"[Marker] Create|Success",
    CreateMarkerFail:"[Marker] Create|Fail",

    DeleteMarkerRequest:"[Marker] Delete",
    DeleteMarkerSuccess:"[Marker] Delete|Success",
    DeleteeMarkerFail:"[Marker] Delete|Fail",
    
    EditMarkerRequest:"[Marker] Edit",
    EditMarkerSuccess:"[Marker] Edit|Success",
    EditMarkerFail:"[Marker] Edit|Fail",

    GetMarkerRequest:"[Marker] Get",
    GetMarkerSuccess:"[Marker] Get|Success",
    GetMarkerFail:"[Marker] Get|Fail"
}


const initialState = {
    places:[]
}

export const markerReducer = (state = initialState,action)=>{
        
        switch(action.type){
            case actionTypes.CreateMarkerRequest:
                return state
            case actionTypes.CreateMarkerSuccess:
                return state
            case actionTypes.CreateMarkerFail:
                return {...state}

            case actionTypes.GetMarkerRequest:
                return {...state}
            case actionTypes.GetMarkerSuccess:
                return {...state,places:action.payload}
            case actionTypes.GetMarkerFail:
                return {...state}
            case actionTypes.DeleteMarkerRequest:
                return state
            case actionTypes.DeleteMarkerSuccess:
                return state
            case actionTypes.editMarkerRequest:
                return state
            case actionTypes.editMarkerSuccess:
                return state
            
            default:
                return state
        }
}

export const actions = {
    getMarkersRequest:() => ({type:actionTypes.GetMarkerRequest}),
    getMarkersSuccess:(markers) => ({type:actionTypes.GetMarkerSuccess,payload:markers}),
    createMarkerRequest:(payload) => ({type:actionTypes.CreateMarkerRequest,data:payload}),
    createMarkerSuccess:() => ({type:actionTypes.CreateMarkerSuccess}),
    deleteMarkerRequest:(uuid) => ({type:actionTypes.DeleteMarkerRequest,uuid}),
    deleteMarkerSuccess:() => ({type:actionTypes.DeleteMarkerSuccess}),
    editMarkerRequest:(payload) => ({type:actionTypes.EditMarkerRequest,data:payload}),
    editMarkerSuccess:() => ({type:actionTypes.EditMarkerSuccess})
}



/* saga functions */


  

function *postResource(resource,body){
   const res =  yield call(post,resource,body)
}

export function *saga(){
    yield takeLatest(actionTypes.GetMarkerRequest,function *markers(action){

        try{
        const {data} = yield call(fetch,PLACES)
        yield put(actions.getMarkersSuccess(data))
        }
        catch(e){
        console.log(e)
        }
        
    })

    yield takeLatest(actionTypes.CreateMarkerRequest,function *markers(action){

        try{
            
        const data = yield call(postResource,PLACES,action.data)
        yield put(actions.createMarkerSuccess())
        console.log(data)
        
        }
        catch(e){
        console.log(e)
        }
        
    })

    yield takeLatest(actionTypes.CreateMarkerSuccess,function *createMarker(action){
        try{
            yield put(actions.getMarkersRequest())
            toast.success("Marker created successfully")
        }

        catch(e){
            console.log(e)
        }
    })
    
    yield takeLatest(actionTypes.DeleteMarkerRequest,function *deleteMarker(action){
        try{
            console.log(action)
            yield call(remove,PLACES,{uuid:action.uuid})

            yield put(actions.deleteMarkerSuccess())
        }
        catch(e){
            console.log(e)
        }
    })

    yield takeLatest(actionTypes.DeleteMarkerSuccess,function *deleteMarkerSuccess(){
        try{
            console.log("deleted")
            toast.warn("Marker deleted successfully")

            yield put(actions.getMarkersRequest())
            
        }
        catch(e){
            console.log(e)
        }
    })

    yield takeLatest(actionTypes.EditMarkerRequest,function *editMarkerRequest(action){
        try{
            yield call(patch,PLACES,action.data)
            yield put(actions.editMarkerSuccess())
        }
        catch(e){
            console.log(e)
        }
    })

    yield takeLatest(actionTypes.EditMarkerSuccess,function *editMarkerSuccess(action){
        try{
            toast.success("Marker edited")
            yield put(actions.getMarkersRequest())

            
        }
        catch(e){
            console.log(e)
        }
    })
}
