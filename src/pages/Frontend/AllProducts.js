import React, { useEffect, useState } from 'react';
import { Image, Spin } from 'antd'; // Import Spin for loading indicator
import { useCart } from '../../contexts/CartContext';
import { collection, getDocs, setDoc, doc } from 'firebase/firestore';
import { firestore } from '../../config/Firebase';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function AllProducts() {
    const navigate = useNavigate();
    const { dispatch, currentUser } = useCart();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true); // Loading state

    const fetchData = async () => {
        setLoading(true); // Start loading
        try {
            const querySnapshot = await getDocs(collection(firestore, "products"));
            const products = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setData(products);
        } catch (error) {
            console.error("Error fetching products: ", error);
            toast.error("Failed to load products.");
        } finally {
            setLoading(false); // End loading
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleAddToCart = async (product) => {
        if (!currentUser) {
            toast.error("You must be logged in to add items to the cart.");
            return;
        }

        dispatch({ type: "ADD_TO_CART", payload: product });
        toast.success("Product has been successfully added to the cart");

        try {
            await setDoc(doc(firestore, "carts", product.id), {
                id: product.id,
                title: product.title,
                price: product.price,
                url: product.url,
                quantity: 1,
                uid: currentUser.uid
            });
            console.log("Product added to Firestore");
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    };

    const handleReview = (product) => {
        console.log("products", product);
        localStorage.setItem("review", JSON.stringify(product));
        navigate("/productInfo/1");
    };

    return (
        <div className="container my-5">
            <div className="row">
                <h1 className='text-center fw-bold my-2'>All Products</h1>
                {loading ? ( // Show loading indicator
                    <div className="text-center">
                        <Spin size="large" /> {/* Loading spinner */}
                    </div>
                ) : (
                    data.map((product) => (
                        <div className="col-12 col-md-6 col-lg-3 mt-4" key={product.id}>
                            <div className="card p-2" onClick={() => handleReview(product)}>
                                <Image src={product.url} alt={product.title} className='img-fluid custom-image' preview={false} style={{ height: 200 }} />
                                <p className="mt-2 text-grey">BiteBazaar</p>
                                <h4 className="mt-1">{product.title}</h4>
                                <h5 className="mt-1">{product.category}</h5>
                                <p className='text-success fs-2'>${product.price}</p>
                                <button 
                                    className="btn btn-primary btn-lg rounded-4 my-2" 
                                    onClick={(e) => { e.stopPropagation(); handleAddToCart(product); }} // Prevent navigation when clicking Add To Cart
                                >
                                    Add To Cart
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
