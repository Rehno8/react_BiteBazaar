import React, { useState } from 'react';
import { Image } from 'antd';
import { useCart } from '../../contexts/CartContext';
import { AiFillDelete } from 'react-icons/ai';
import { deleteDoc, doc, setDoc } from 'firebase/firestore';
import { firestore } from '../../config/Firebase';
import { toast } from 'react-toastify';

export default function CartItems() {
    const { state: cartItems, dispatch } = useCart();
    const [fullName, setFullName] = useState("");
    const [address, setAddress] = useState("");
    const [pinCode, setPinCode] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [loading, setLoading] = useState(false);

    const handleDelete = async (item) => {
        try {
            const itemDocRef = doc(firestore, "carts", item.id);
            await deleteDoc(itemDocRef);
            dispatch({ type: 'DELETE_TO_CART', payload: item });
            toast.success("Item deleted from cart successfully");
        } catch (error) {
            console.error("Error removing document: ", error);
            toast.error("Failed to remove item from cart");
        }
    };

    const handleIncrease = (item) => {
        dispatch({ type: 'INCREASE_QUANTITY', payload: item });
    };

    const handleDecrease = (item) => {
        if (item.quantity > 1) {
            dispatch({ type: 'DECREASE_QUANTITY', payload: item });
        } else {
            handleDelete(item);
        }
    };

    const subtotal = cartItems.reduce((total, item) => {
        return total + (item.price * (item.quantity || 1));
    }, 0);
    const shipping = 20;
    const total = subtotal + shipping;

    const buyNow = async () => {
        if (!fullName || !address || !pinCode || !mobileNumber) {
            return toast.error("All fields are required", { position: "top-center", autoClose: 1000, theme: "colored" });
        }

        const user = JSON.parse(localStorage.getItem("user"));
        if (!user || !user.uid) {
            return toast.error("User not logged in.");
        }

        const addressInfo = {
            fullName,
            address,
            pinCode,
            mobileNumber,
            id: Math.random().toString(36).slice(2),
            date: new Date().toLocaleString("en-US"),
        };

        const orderInfo = {
            cartItems,
            addressInfo,
            date: addressInfo.date,
            userid: user.uid,
            userEmail: user.email,
        };

        setLoading(true);

        try {
            await setDoc(doc(firestore, "orders", addressInfo.id), orderInfo);
            toast.success("Congratulations! Your order has been placed successfully");
        } catch (error) {
            console.error("Error saving order:", error);
            toast.error("Failed to place order");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container my-4">
            <h1 className='text-center mb-5' style={{ color: '#B22222', fontFamily: 'Garamond', fontWeight: 'bold' }}>Your Cart</h1>

            <div className="card p-3 mb-4" style={{ boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)", borderRadius: '8px' }}>
                <div className="row">
                    <div className="col-6">
                        <p><strong>Subtotal</strong></p>
                        <p><strong>Shipping</strong></p>
                    </div>
                    <div className="col-6 text-end">
                        <p>${subtotal.toFixed(2)}</p>
                        <p>$20.00</p>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col-6">
                        <h5><strong>Total</strong></h5>
                    </div>
                    <div className="col-6 text-end">
                        <h5>${total.toFixed(2)}</h5>
                    </div>
                </div>
                <div className="row text-center mt-3">
                    <div className="col-12">
                        <button type="button" className="btn btn-danger" style={{ width: '200px' }} data-bs-toggle="modal" data-bs-target="#orderModal">
                            Order Now
                        </button>
                    </div>
                </div>
            </div>

            {loading && (
                <div className="text-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p>Processing your order...</p>
                </div>
            )}

            {cartItems.length === 0 ? (
                <h5 className='text-center'>Your cart is empty.</h5>
            ) : (
                cartItems.map((item) => (
                    <div className="card py-3 px-3 mb-3" key={item.id} style={{ position: 'relative', boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)", borderRadius: '8px' }}>
                        <div className='d-flex'>
                            <div>
                                <Image src={item.url} alt={item.title} style={{ height: 120, width: 120, borderRadius: '8px' }} />
                            </div>
                            <div className='mx-3'>
                                <h5 style={{ color: '#B22222', fontFamily: 'Garamond' }}>{item.title}</h5>
                                <p className='mb-0'>{item.category}</p>
                                <p className='mb-0'>{item.description}</p>
                                <p className='mb-0'>${item.price.toFixed(2)} * {item.quantity || 1}</p>
                            </div>
                        </div>
                        <div className="d-flex justify-content-between mt-2">
                            <div>
                                <button className="btn btn-secondary btn-sm" onClick={() => handleDecrease(item)}>-</button>
                                <span className="mx-2">{item.quantity || 1}</span>
                                <button className="btn btn-secondary btn-sm" onClick={() => handleIncrease(item)}>+</button>
                            </div>
                            <AiFillDelete
                                onClick={() => handleDelete(item)}
                                style={{
                                    position: "absolute",
                                    top: 10,
                                    right: 10,
                                    cursor: 'pointer',
                                    color: '#FF4500'
                                }}
                                size={24}
                            />
                        </div>
                    </div>
                ))
            )}

            {/* Modal for Order */}
            <div className="modal fade" id="orderModal" tabIndex="-1" aria-labelledby="orderModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="orderModalLabel">Complete Your Order</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <label htmlFor="fullName">Full Name*</label>
                            <input type="text" id='fullName' className='form-control mb-3 mt-1' value={fullName} onChange={(e) => setFullName(e.target.value)} />
                            <label htmlFor="address">Address*</label>
                            <input type="text" id='address' className='form-control mb-3 mt-1' value={address} onChange={(e) => setAddress(e.target.value)} />
                            <label htmlFor="pinCode">Pin Code*</label>
                            <input type="number" id='pinCode' className='form-control mb-3 mt-1' value={pinCode} onChange={(e) => setPinCode(e.target.value)} />
                            <label htmlFor="mobileNumber">Mobile Number*</label>
                            <input type="number" id='mobileNumber' className='form-control mb-3 mt-1' value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={buyNow}>Order Now</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
