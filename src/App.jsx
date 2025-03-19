import { RouterProvider } from 'react-router-dom';
import './App.css'
import appRouter from './routes/Router';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { authApi } from './api/authApi';

function App() {

    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user); // Get user from Redux

    useEffect(() => {
        dispatch(authApi.endpoints.loadUser.initiate({}, { forceRefetch: false }));
    }, [dispatch, user]);
    return(
        <main>
            <RouterProvider router={appRouter} />
        </main>
    );
}

export default App
