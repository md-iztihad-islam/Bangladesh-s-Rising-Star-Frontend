import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { appStore } from './store/store.js'
import { useLoadUserQuery } from './api/authApi.js'
import Loader from './components/Extra/Loader.jsx'

const Custom = ({ children }) => {
    const {isLoading} = useLoadUserQuery();

    return(
        <>
            {
                isLoading ? <Loader /> : <>{children}</>
            }
        </>
    );
};



createRoot(document.getElementById('root')).render(
    <Provider store={appStore}>
        <Custom>
            <App />
        </Custom>
    </Provider>
)