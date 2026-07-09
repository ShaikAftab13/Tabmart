import { Toaster } from 'react-hot-toast'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login';
import AppLayout from './pages/AppLayout'
import Home from './pages/Home';
import Products from './pages/Products';
import ProductPage from './pages/ProductPage';
import SearchResult from './pages/SearchResult';
import FlashDeals from './pages/FlashDeals';
import CheckOut from './pages/CheckOut';
import MyOrders from './pages/MyOrders';
import OrderTracking from './pages/OrderTracking';
import Addresses from './pages/Addresses';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminProductForm from './pages/admin/AdminProductForm';
import AdminOrders from './pages/admin/AdminOrders';
import AdminDeliveryPartners from './pages/admin/AdminDeliveryPartners';
import DeliveryLogin from './pages/delivery/DeliveryLogin';
import DeliveryDashboard from './pages/delivery/DeliveryDashboard';
import DeliveryLayout from './pages/delivery/DeliveryLayout';

function App() {
  return (
    <div>
      <Toaster position="top-right" toastOptions={{
        duration: 3000, style: {
          background: "#1f2937", color: "#fff", borderRadius: "10px",
        },
      }}
      />
      <Routes>
        {/* Login Route */}
        <Route path='/login' element={<Login />} />
        {/* Main pages */}
        <Route path='/' element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path='products' element={<Products />} />
          <Route path='products/:id' element={<ProductPage />} />
          <Route path='search' element={<SearchResult />} />
          <Route path='deals' element={<FlashDeals />} />
          {/* Only loggedIn users can visit this routes */}
          <Route element={<ProtectedRoute />}>
            <Route path='checkout' element={<CheckOut />} />
            <Route path='orders' element={<MyOrders />} />
            <Route path='orders/:id' element={<OrderTracking />} />
            <Route path='addresses' element={<Addresses />} />
          </Route>
        </Route>
        {/* Admin Pages */}
        <Route path='/admin' element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path='products' element={<AdminProducts />} />
          <Route path='products/new' element={<AdminProductForm />} />
          <Route path='products/:id/edit' element={<AdminProductForm />} />
          <Route path='orders' element={<AdminOrders />} />
          <Route path='delivery-partners' element={<AdminDeliveryPartners />} />
        </Route>

        {/* Delivery Partner Pages */}
        <Route path='/delivery/login' element={<DeliveryLogin />} />
        <Route path='/delivery' element={<DeliveryLayout />}>
          <Route index element={<DeliveryDashboard /> } />
      </Route>

    </Routes>
    </div >
  )
}

export default App