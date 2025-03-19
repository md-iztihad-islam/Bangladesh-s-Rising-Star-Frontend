import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import { authApi } from "../api/authApi";
import { aboutApi } from "../api/aboutApi";
import { liveApi } from "../api/liveApi";
import newsApi from "../api/newsApi";
import { tournamentApi } from "../api/tournamentApi";
import { productApi } from "../api/productApi";

export const appStore = configureStore({
    reducer: rootReducer,
    middleware: (defaultMiddleware) => defaultMiddleware().concat(authApi.middleware, aboutApi.middleware, liveApi.middleware, newsApi.middleware, tournamentApi.middleware, productApi.middleware),      
});

const initializeApp = async () => {
    await appStore.dispatch(authApi.endpoints.loadUser.initiate({}, {forceRefetch: true}));
};

initializeApp();