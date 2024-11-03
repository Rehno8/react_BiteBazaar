
// import React, { useEffect, useState, useContext } from 'react';
// import { Image, Spin } from 'antd';
// import { useCart } from '../../contexts/CartContext';
// import { collection, getDocs, setDoc, doc } from 'firebase/firestore';
// import { firestore } from '../../config/Firebase';
// import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';
// import { ModeContext } from '../../contexts/ModeContext';

// export default function CartSection({ selectedCategory }) {
//     const navigate = useNavigate();
//     const { dispatch, currentUser } = useCart();
//     const { searchKey, filterPrice } = useContext(ModeContext);
//     const [data, setData] = useState([]);
//     const [loading, setLoading] = useState(true);

//     const fetchData = async () => {
//         setLoading(true);
//         try {
//             const querySnapshot = await getDocs(collection(firestore, "products"));
//             const products = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//             setData(products);
//         } catch (error) {
//             console.error("Error fetching products: ", error);
//             toast.error("Failed to load products.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchData();
//     }, []);

//     const handleAddToCart = async (product) => {
//         if (!currentUser) {
//             toast.error("You must be logged in to add items to the cart.");
//             return;
//         }

//         dispatch({ type: "ADD_TO_CART", payload: product });
//         toast.success("Product has been successfully added to the cart");

//         try {
//             await setDoc(doc(firestore, "carts", product.id), {
//                 id: product.id,
//                 title: product.title,
//                 price: product.price,
//                 url: product.url,
//                 quantity: 1,
//                 uid: currentUser.uid
//             });
//             console.log("Product added to Firestore");
//         } catch (error) {
//             console.error("Error adding document: ", error);
//         }
//     };

//     const handleReview = (product) => {
//         localStorage.setItem("review", JSON.stringify(product));
//         navigate("/productInfo/1");
//     };

//     const filteredData = data.filter(product => {
//         const matchesCategory = selectedCategory ? product.category.toLowerCase() === selectedCategory.toLowerCase() : true;
//         const matchesSearchKey = searchKey ? product.title.toLowerCase().includes(searchKey.toLowerCase()) : true;

//         // Price filtering
//         const priceRange = filterPrice ? filterPrice.split('-') : [];
//         const priceCondition = priceRange.length === 2
//             ? product.price >= Number(priceRange[0]) && product.price <= Number(priceRange[1])
//             : filterPrice === '10000+' ? product.price > 10000 : true;

//         return matchesCategory && matchesSearchKey && priceCondition;
//     });

//     return (
//         <div className="container my-3">
//             <div className="row">
//                 <h1 className='text-center fw-bold my-2'>Our Latest Collection</h1>
                
//                 {loading ? (
//                     <div className="text-center">
//                         <Spin size="large" />
//                     </div>
//                 ) : (
//                     filteredData.map((product) => (
//                         <div className="col-12 col-md-6 col-lg-3 mt-4" key={product.id}>
//                             <div className="card p-2" onClick={() => handleReview(product)}>
//                                 <Image src={product.url} alt={product.title} className='img-fluid custom-image' preview={false} style={{ height: 200 }} />
//                                 <p className="mt-2 text-grey">BiteBazaar
//                                 </p>
//                                 <h4 className="mt-1">{product.title}</h4>
//                                 <h5 className="mt-1">{product.category}</h5>
//                                 <p className='text-success fs-2'>${product.price}</p>
//                                 <button 
//                                     className="btn btn-primary btn-lg rounded-4 my-2" 
//                                     onClick={(e) => { e.stopPropagation(); handleAddToCart(product); }} 
//                                 >
//                                     Add To Cart
//                                 </button>
//                             </div>
//                         </div>
//                     ))
//                 )}
//             </div>
//         </div>
//     );
// }



import React, { useEffect, useState, useContext } from 'react';
import { Image, Spin } from 'antd';
import { useCart } from '../../contexts/CartContext';
import { collection, getDocs, setDoc, doc } from 'firebase/firestore';
import { firestore } from '../../config/Firebase';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { ModeContext } from '../../contexts/ModeContext';

export default function CartSection({ selectedCategory }) {
    const navigate = useNavigate();
    const { dispatch, currentUser } = useCart();
    const { searchKey, filterPrice } = useContext(ModeContext);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        setLoading(true);
        try {
            const querySnapshot = await getDocs(collection(firestore, "products"));
            const dishes = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setData(dishes);
        } catch (error) {
            console.error("Error fetching dishes: ", error);
            toast.error("Failed to load dishes.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleAddToCart = async (dish) => {
        if (!currentUser) {
            toast.error("You must be logged in to add dishes to your cart.");
            return;
        }

        dispatch({ type: "ADD_TO_CART", payload: dish });
        toast.success("Dish has been successfully added to your cart");

        try {
            await setDoc(doc(firestore, "carts", dish.id), {
                id: dish.id,
                title: dish.title,
                price: dish.price,
                url: dish.url,
                quantity: 1,
                uid: currentUser.uid
            });
            console.log("Dish added to Firestore");
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    };

    const handleReview = (dish) => {
        localStorage.setItem("review", JSON.stringify(dish));
        navigate("/productInfo/1");
    };

    const filteredData = data.filter(dish => {
        const matchesCategory = selectedCategory ? dish.category.toLowerCase() === selectedCategory.toLowerCase() : true;
        const matchesSearchKey = searchKey ? dish.title.toLowerCase().includes(searchKey.toLowerCase()) : true;

        // Price filtering
        const priceRange = filterPrice ? filterPrice.split('-') : [];
        const priceCondition = priceRange.length === 2
            ? dish.price >= Number(priceRange[0]) && dish.price <= Number(priceRange[1])
            : filterPrice === '10000+' ? dish.price > 10000 : true;

        return matchesCategory && matchesSearchKey && priceCondition;
    });

    return (
        <div className="container my-3">
            <div className="row">
                <h1 className='text-center fw-bold my-2'>Our Special Dishes</h1>
                
                {loading ? (
                    <div className="text-center">
                        <Spin size="large" />
                    </div>
                ) : (
                    filteredData.map((dish) => (
                        <div className="col-12 col-md-6 col-lg-3 mt-4" key={dish.id}>
                            <div className="card p-2" onClick={() => handleReview(dish)}>
                                <Image src={dish.url} alt={dish.title} className='img-fluid custom-image' preview={false} style={{ height: 200 }} />
                                <p className="mt-2 text-grey">BiteBazaar</p>
                                <h4 className="mt-1">{dish.title}</h4>
                                <h5 className="mt-1">{dish.category}</h5>
                                <p className='text-success fs-2'>${dish.price.toFixed(2)}</p>
                                <button 
                                    className="btn btn-danger btn-lg rounded-4 my-2" 
                                    onClick={(e) => { e.stopPropagation(); handleAddToCart(dish); }} 
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
