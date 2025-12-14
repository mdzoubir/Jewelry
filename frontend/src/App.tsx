import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import ScrollToTop from './components/layout/ScrollToTop';
import LoadingSpinner from './components/ui/LoadingSpinner';
import { ShopProvider } from './context/ShopContext';

// Lazy load pages
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const MyaPersonal = lazy(() => import('./pages/MyaPersonal'));
const ProductsPage = lazy(() => import('./pages/ProductsPage'));
const ProductDetailsPage = lazy(() => import('./pages/ProductDetailsPage'));
const Cart = lazy(() => import('./pages/Cart'));
const CheckoutAddressPage = lazy(() => import('./pages/CheckoutAddressPage'));
const CheckoutPaymentPage = lazy(() => import('./pages/CheckoutPaymentPage'));
const CheckoutSuccessPage = lazy(() => import('./pages/CheckoutSuccessPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const NotFound = lazy(() => import('./pages/NotFound'));

const ProfileSecurity = lazy(() => import('./components/profile/ProfileSecurity'));
const ProfileInfo = lazy(() => import('./components/profile/ProfileInfo')); // Import here as it's now a route
const ProfileOrders = lazy(() => import('./components/profile/ProfileOrders'));
const ProfileAddresses = lazy(() => import('./components/profile/ProfileAddresses'));
const ProfilePayments = lazy(() => import('./components/profile/ProfilePayments'));
const ProfileDiscounts = lazy(() => import('./components/profile/ProfileDiscounts'));
const ProfileContact = lazy(() => import('./components/profile/ProfileContact'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const WishlistPage = lazy(() => import('./pages/WishlistPage'));

function App() {
    return (
        <ShopProvider>
            <Router>
                <ScrollToTop />
                <MainLayout>
                    <Suspense fallback={<LoadingSpinner />}>
                        <Routes>
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

                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </Suspense>
                </MainLayout>
            </Router>
        </ShopProvider>
    );
}

export default App;
