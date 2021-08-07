import axios from "axios"

import {getAbsoluteApiUrl} from "modules/Helper"

const PLACE_ROOT_URL= getAbsoluteApiUrl(`/api/places/`)

const PLACE_DETAIL_URL = (uuid) => getAbsoluteApiUrl(`/api/places/${uuid}/`)




// api constants

export const PLACES= "places"

export function fetch(resource,params){
    
    switch(resource){
        case PLACES:
            return axios.get(PLACE_ROOT_URL)
        default:
            throw 'Resource not registered'
    }
}



export function post(resource,body){
    switch(resource){
        case PLACES:
            var formData = new FormData();
            const config = {
                headers:{
                    'Content-Type':'multipart/form-data'
                }
            }
            formData.append('photo',body.image)
            formData.append('name',body.name)
            formData.append('latitude',body.latitude)
            formData.append('longitude',body.longitude)

            for(var key of formData.keys()){
                console.log(key,formData.get(key))
            }

           

            return axios.post(PLACE_ROOT_URL,formData,config)
        default:
            throw 'Resource not registered'
    }
}

export function remove(resource,param){
    switch(resource){
        case PLACES:
            console.log(param)
            const uuid = param.uuid

            return axios.delete(PLACE_DETAIL_URL(uuid))
    }
}

export function patch(resource,body){
    switch(resource){
        case PLACES:
            var formData = new FormData();
            const config = {
                headers:{
                    'Content-Type':'multipart/form-data'
                }
            }
            for(var key of Object.keys(body)){
                formData.append(key,body[key])
                
            }
            const uuid = body.uuid
            return axios.patch(PLACE_DETAIL_URL(uuid),formData,config)
    }
}