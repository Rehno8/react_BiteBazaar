import React, { useEffect, useState } from 'react';
import { Flex, Rate, Image } from 'antd';
import { FaFacebookF, FaHeart, FaRegHeart, FaWhatsappSquare } from 'react-icons/fa';
import { BsTwitterX } from 'react-icons/bs';
import { Button } from 'react-bootstrap';
import { doc, setDoc } from 'firebase/firestore';
import { firestore } from '../../config/Firebase';
import { toast } from 'react-toastify';
import { useCart } from '../../contexts/CartContext';

export default function ProductInfo() {
    const [isWishlisted, setIsWishlisted] = useState(false);
    const { dispatch, currentUser } = useCart();
    const productReview = JSON.parse(localStorage.getItem("review"));
    const [value, setValue] = useState(4);

    const handleAddToCart = async () => {
        dispatch({ type: "ADD_TO_CART", payload: productReview });
        toast.success("Product has been successfully added to cart");

        try {
            await setDoc(doc(firestore, "carts", productReview.id), {
                id: productReview.id,
                title: productReview.title,
                price: productReview.price,
                url: productReview.url,
                quantity: 1,
                uid: currentUser.uid
            });
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    };

    const handleAddToWishlist = async () => {
        try {
            await setDoc(doc(firestore, "wishlists", productReview.id), {
                id: productReview.id,
                title: productReview.title,
                price: productReview.price,
                url: productReview.url,
                uid: currentUser.uid
            });
            toast.success("Product has been successfully added to wishlist");
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        setValue(4);
    }, []);

    const toggleWishlist = () => {
        setIsWishlisted(prev => !prev);
    };

    return (
        <div className="container py-4">
            <div className="row info-card">
                <div className="col-12 col-md-6 col-lg-5 mx-1 mx-md-3">
                    <div className="card bg-white shadow" style={{ border: "none" }}>
                        <Image src={productReview.url} alt='Product Image' style={{ height: 400, borderRadius: '12px', objectFit: 'cover' }} />
                    </div>
                </div>
                <div className="col-12 col-md-6 mt-4 mt-lg-1 col-lg-7 mx-5">
                    <div className="card bg-white shadow" style={{ border: "none", padding: '20px', borderRadius: '12px' }}>
                        <h6 style={{ color: "grey" }}>BiteBazaar
                        </h6>
                        <h1 style={{ fontWeight: 'bold', color: '#E63946' }}>{productReview.title}</h1>
                        <div className="d-flex align-items-center">
                            <Flex gap="middle" vertical>
                                <Rate value={value} />
                            </Flex>
                            <p className='mx-3 fw-bold' style={{ color: "grey" }}>{value} Reviews</p>
                            <div className="social-icons">
                                <FaWhatsappSquare className='mx-1' size={24} />
                                <FaFacebookF className='mx-1' size={24} />
                                <BsTwitterX className='mx-1' size={24} />
                            </div>
                        </div>
                        <p>{productReview.description}</p>
                        <hr />
                        <div className='d-flex justify-content-between align-items-center'>
                            <h3 style={{ color: '#4CAF50' }}>${productReview.price.toFixed(2)}</h3>
                            <div>
                                <button onClick={toggleWishlist} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                                    {isWishlisted ? (
                                        <FaHeart style={{ color: 'red', fontSize: '30px', marginRight: "20px" }} onClick={handleAddToWishlist} />
                                    ) : (
                                        <FaRegHeart style={{ fontSize: '30px', marginRight: "20px" }} />
                                    )}
                                </button>
                                <Button className='btn btn-danger' onClick={handleAddToCart}>Add To Cart</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
