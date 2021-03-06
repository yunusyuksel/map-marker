/* return base backend api url */
const BASE_URL = process.env.REACT_APP_API_BASE_URL

/* return base api url with url path appended */
export function getAbsoluteApiUrl(path){
    
    return `${BASE_URL}${path}`
}