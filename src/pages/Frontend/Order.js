import React, { useContext, useEffect } from 'react';
import { OrderContext } from '../../contexts/OrderContext';
import { Image, Spin } from 'antd';

const Order = () => {
    const { order, loading, getOrderData } = useContext(OrderContext);

    useEffect(() => {
        getOrderData(); // Call the function to fetch order data on component mount
    }, [getOrderData]);

    return (
        <div className="container my-5">
            <h1 className='text-center fw-bold my-2' style={{ color: '#E63946', fontFamily: 'Garamond' }}>
                Your Order Products
            </h1>
            {loading ? (
                <div className="text-center">
                    <Spin size="large" /> {/* Loading spinner */}
                </div>
            ) : order.length > 0 ? ( // Check if there are orders
                <div className="row">
                    {order.map(orderItem => (
                        orderItem.cartItems.map(item => ( // Iterate over cartItems
                            <div className="col-12 col-md-6 col-lg-4 mt-4" key={item.id}>
                                <div className="card p-3" style={{ borderRadius: '12px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' }}>
                                    <Image 
                                        src={item.url} 
                                        alt={item.title} 
                                        className='img-fluid' 
                                        preview={false} 
                                        style={{ borderRadius: '12px', height: 200 }} 
                                    />
                                    <p className="mt-2 text-grey" style={{ fontSize: '0.9rem', color: '#6b5baf' }}>Restaurant Name</p>
                                    <h4 className="mt-1" style={{ fontWeight: 'bold' }}>{item.title || "No title available"}</h4>
                                    <h5 className="mt-1" style={{ color: '#4CAF50' }}>{item.category || "No category available"}</h5>
                                    <p className='text-success fs-4' style={{ fontWeight: 'bold' }}>${item.price.toFixed(2)}</p>
                                </div>
                            </div>
                        ))
                    ))}
                </div>
            ) : (
                <div className="text-center my-4">
                    <h4>No orders available right now.</h4>
                </div>
            )}
        </div>
    );
};

export default Order;
