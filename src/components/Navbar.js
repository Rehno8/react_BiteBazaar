import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { toast } from 'react-toastify';
import { signOut } from 'firebase/auth';
import { auth } from '../config/Firebase';
import { ModeContext } from '../contexts/ModeContext';

export default function Navbar() {
    const { isAuthenticated, dispatch } = useAuthContext();
    const { state: cartItems } = useCart();
    const { wishlistProducts } = useContext(ModeContext);
    const admin = JSON.parse(localStorage.getItem("user"));

    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                dispatch({ type: "SET_LOGGED_OUT" });
                toast.error("Logout successfully");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <nav className="navbar navbar-expand-lg bg-light navbar-primary " >
            <div className="container">
                <Link to="/" className="navbar-brand fw-bold text-primary">BiteBazaar</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav m-auto mb-2 mb-lg-0">
                        <li className="nav-item"><Link to="/" className="nav-link text-primary active mx-2">Home</Link></li>
                        <li className="nav-item"><Link to="/about" className="nav-link text-primary active mx-2">About</Link></li>
                        <li className="nav-item"><Link to="/contact" className="nav-link text-primary active mx-2">Contact</Link></li>
                        <li className="nav-item">{isAuthenticated ? <Link to="/allProducts"  className="nav-link text-primary active mx-2">All Products</Link> : null}</li>
                        <li className="nav-item">{isAuthenticated ? <Link to="/order" className="nav-link text-primary active mx-2">Order</Link> : null}</li>
                    </ul>
                    <sup style={{ fontSize: 20, color: " #0d6efd", fontWeight: "bold" }}>{wishlistProducts.length}</sup>
                    <Link to="/wishlist"><i className='fa fa-heart text-danger' style={{ fontSize: 25, marginRight: "30px" }}></i></Link>
                    <sup style={{ fontSize: 20, color: " #0d6efd", fontWeight: "bold" }}>{cartItems.length}</sup>
                    <Link to="/cart"><i className='fa fa-shopping-bag text-primary' style={{ fontSize: 25,  marginRight: "30px" }}></i></Link>
                    {!isAuthenticated ? <Link to="/auth/login" className="btn btn-primary">Login</Link> : <button className="btn btn-danger" onClick={handleLogout}>Logout</button>}
                    {admin && admin.email === "admin@gmail.com" ? <Link to="/admin" className="btn btn-primary mx-2">Admin</Link> : null}
                </div>
            </div>
        </nav>
    );
}

