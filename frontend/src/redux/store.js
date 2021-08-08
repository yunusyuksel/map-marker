import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import {reduxBatch} from "@manaflair/redux-batch";

import { rootReducer,rootSaga } from "./rootReducer";


const sagaMiddleware = createSagaMiddleware();

/*  Create middleware for the redux-store*/
const middleware = [
    ...getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
        thunk: true
    }),
    sagaMiddleware

];


/* Create store with middleware,reducers and development tools for watching the state activities */
const store = configureStore({
    reducer:rootReducer,
    middleware,
    devTools: process.env.NODE_ENV !== "production",
    enhancers: [reduxBatch]
})


/* Trigger main saga */
sagaMiddleware.run(rootSaga);


export default store