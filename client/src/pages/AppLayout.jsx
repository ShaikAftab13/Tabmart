import { Outlet } from 'react-router-dom'
import Banner from '../components/Banner'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CartSideBar from '../components/CartSideBar'

function AppLayout() {
    return (
        <div>
            <Banner />
            <Navbar />
            <div className='min-h-screen'><Outlet /></div>
            <Footer />
            <CartSideBar />
        </div>
    )
}

export default AppLayout