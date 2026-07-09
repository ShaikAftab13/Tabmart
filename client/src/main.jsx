import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import CartContextProvider from './context/CartContext.jsx';
import AuthContextProvider from './context/AuthContext.jsx';


createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <AuthContextProvider>
            <CartContextProvider>
                <App />
            </CartContextProvider>
        </AuthContextProvider>
    </BrowserRouter>
)