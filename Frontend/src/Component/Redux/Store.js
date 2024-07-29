import { configureStore } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import {persistReducer,persistStore} from 'redux-persist';
import registerReducers from './Slices/RegisterSlice';

const persistConfig = {
    key : 'root',
    storage,
};

const rootReducer = {
  register : registerReducers,
};

const persistedReducer = persistReducer(persistConfig,rootReducer)

export const  store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware)=>
    getDefaultMiddleware({
        serializableCheck:false,
    })
});

export const persistor =  persistStore(store);