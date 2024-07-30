import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {persistReducer,persistStore} from 'redux-persist';
import registerReducers from './Slices/RegisterSlice';
import sessionStorage from "redux-persist/es/storage/session";

const persistConfig = {
    key : 'root',
    storage:sessionStorage,
};

const rootReducer = combineReducers( {
  register : registerReducers,
});

const persistedReducer = persistReducer(persistConfig,rootReducer)

export const  store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware)=>
    getDefaultMiddleware({
        serializableCheck:false,
    })
});

export const persistor =  persistStore(store);