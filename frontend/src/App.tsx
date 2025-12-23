import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import ScrollToTop from './components/layout/ScrollToTop';
import LoadingSpinner from './components/ui/LoadingSpinner';
import { ShopProvider } from './context/ShopContext';
import AdminLayout from './components/layout/AdminLayout';
import { AuthProvider } from './context/AuthContext';
import ProtectedAdminRoute from './components/layout/ProtectedAdminRoute';
import AdminSettings from './pages/admin/AdminSettings';
import AdminPromotions from './pages/admin/AdminPromotions';
import AdminPayments from './pages/admin/AdminPayments';
import AdminCategories from './pages/admin/AdminCategories';
import AdminAdministration from './pages/admin/AdminAdministration';
import AdminClients from './pages/admin/AdminClients';
import AdminProducts from './pages/admin/AdminProducts';
import AdminOrders from './pages/admin/AdminOrders';

const Home = lazy(() => import('./pages/client/Home'));
const About = lazy(() => import('./pages/client/About'));
const MyaPersonal = lazy(() => import('./pages/client/MyaPersonal'));
const ProductsPage = lazy(() => import('./pages/client/ProductsPage'));
const ProductDetailsPage = lazy(() => import('./pages/client/ProductDetailsPage'));
const Cart = lazy(() => import('./pages/client/Cart'));
const CheckoutAddressPage = lazy(() => import('./pages/client/CheckoutAddressPage'));
const CheckoutPaymentPage = lazy(() => import('./pages/client/CheckoutPaymentPage'));
const CheckoutSuccessPage = lazy(() => import('./pages/client/CheckoutSuccessPage'));
const ProfilePage = lazy(() => import('./pages/client/ProfilePage'));
const NotFound = lazy(() => import('./pages/client/NotFound'));

const ProfileSecurity = lazy(() => import('./components/profile/ProfileSecurity'));
const ProfileInfo = lazy(() => import('./components/profile/ProfileInfo'));
const ProfileOrders = lazy(() => import('./components/profile/ProfileOrders'));
const ProfileAddresses = lazy(() => import('./components/profile/ProfileAddresses'));
const ProfilePayments = lazy(() => import('./components/profile/ProfilePayments'));
const ProfileDiscounts = lazy(() => import('./components/profile/ProfileDiscounts'));
const ProfileContact = lazy(() => import('./components/profile/ProfileContact'));
const LoginPage = lazy(() => import('./pages/client/LoginPage'));
const RegisterPage = lazy(() => import('./pages/client/RegisterPage'));
const WishlistPage = lazy(() => import('./pages/client/WishlistPage'));

const AdminDashboard = lazy(() => import('./pages/admin/Dashboard'));

function App() {
    return (
        <AuthProvider>
            <ShopProvider>
                <Router>
                    <ScrollToTop />
                    <Suspense fallback={<LoadingSpinner />}>
                        <Routes>
                            {/* Client layout and routes */}
                            <Route element={<MainLayout><Outlet /></MainLayout>}>
                                <Route path="/" element={<Home />} />
                                <Route path="/about" element={<About />} />
                                <Route path="/mya-personal" element={<MyaPersonal />} />
                                <Route path="/products" element={<ProductsPage />} />
                                <Route path="/product/:id" element={<ProductDetailsPage />} />
                                <Route path="/cart" element={<Cart />} />
                                <Route path="/checkout/shipping" element={<CheckoutAddressPage />} />
                                <Route path="/checkout/payment" element={<CheckoutPaymentPage />} />
                                <Route path="/checkout/success" element={<CheckoutSuccessPage />} />

                                <Route path="/profile" element={<ProfilePage />}>
                                    <Route index element={<ProfileInfo />} />
                                    <Route path="security" element={<ProfileSecurity />} />
                                    <Route path="orders" element={<ProfileOrders />} />
                                    <Route path="addresses" element={<ProfileAddresses />} />
                                    <Route path="payments" element={<ProfilePayments />} />
                                    <Route path="discounts" element={<ProfileDiscounts />} />
                                    <Route path="contact" element={<ProfileContact />} />
                                </Route>

                                <Route path="/login" element={<LoginPage />} />
                                <Route path="/register" element={<RegisterPage />} />
                                <Route path="/wishlist" element={<WishlistPage />} />
                            </Route>

                            {/* Admin layout and routes */}
                            <Route element={<ProtectedAdminRoute />}>
                                <Route path="/admin" element={<AdminLayout><Outlet /></AdminLayout>}>
                                    <Route index element={<AdminDashboard />} />
                                    <Route path="settings" element={<AdminSettings />} />
                                    <Route path="promotions" element={<AdminPromotions />} />
                                    <Route path="payments" element={<AdminPayments />} />
                                    <Route path="categories" element={<AdminCategories />} />
                                    <Route path="administration" element={<AdminAdministration />} />
                                    <Route path="clients" element={<AdminClients />} />
                                    <Route path="products" element={<AdminProducts />} />
                                    <Route path="orders" element={<AdminOrders />} />
                                </Route>
                            </Route>

                            {/* Not found route */}
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </Suspense>
                </Router>
            </ShopProvider>
        </AuthProvider>
    );
}

export default App;
