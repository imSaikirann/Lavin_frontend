import { configureStore } from "@reduxjs/toolkit";
import ProductReducer from '../store/ProductSlice'
export const makeStore = ()=>{
    return configureStore({
        reducer:ProductReducer
    })
}

export type AppStore = ReturnType <typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']