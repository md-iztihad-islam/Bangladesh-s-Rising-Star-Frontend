import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../api/authSlice";
import { authApi } from "../api/authApi";
import { aboutApi } from "../api/aboutApi";
import { liveApi } from "../api/liveApi";
import newsApi from "../api/newsApi";
import { tournamentApi } from "../api/tournamentApi";
import { productApi } from "../api/productApi";

const rootReducer = combineReducers({
    [authApi.reducerPath]: authApi.reducer,
    [aboutApi.reducerPath]: aboutApi.reducer,
    [liveApi.reducerPath]: liveApi.reducer,
    [newsApi.reducerPath]: newsApi.reducer,
    [tournamentApi.reducerPath]: tournamentApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    auth: authReducer,
});

export default rootReducer;