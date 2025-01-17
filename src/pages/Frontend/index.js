import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import About from './About';
import Contact from './Contact';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ProductInfo from './ProductInfo';
import CartItems from './CartItems';
import Dashboard from './Dashboard';
import AddProducts from './Dashboard/AddProducts';
import UpdateProducts from './Dashboard/UpdateProducts';
import PrivateRoute from '../../private/PrivateRoute';
import AdminRoute from '../../private/AdminRoute';
import Order from './Order';
import AllProducts from './AllProducts';
import WishlistItems from './WishlistItems';

export default function Frontend() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/allProducts' element={<AllProducts />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/productInfo/:id' element={<PrivateRoute Component={ProductInfo} />} />
        <Route path='/cart' element={<PrivateRoute Component={CartItems} />} />
        <Route path='/wishlist' element={<PrivateRoute Component={WishlistItems} />} />
        <Route path='/order' element={<PrivateRoute Component={Order} />} />
        <Route path='/admin' element={<AdminRoute Component={Dashboard} />} />
        <Route path='/addProducts' element={<AdminRoute Component={AddProducts} />} />
        <Route path='/updateProducts' element={<AdminRoute Component={UpdateProducts} />} />
        <Route path='*' element={<h1>404 - Page Not Found</h1>} />
      </Routes>
      <Footer />
    </>
  );
}
