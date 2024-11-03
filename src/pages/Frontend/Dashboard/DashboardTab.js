import React, { useContext, useEffect, useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { MdOutlineProductionQuantityLimits } from 'react-icons/md';
import { FaUser, FaCartPlus } from 'react-icons/fa';
import { AiFillDelete, AiFillShopping } from 'react-icons/ai';
import { BiEdit } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { collection, deleteDoc, doc, getDocs, setDoc } from 'firebase/firestore';
import { firestore } from '../../../config/Firebase';
import { Image } from 'antd';
import { useAuthContext } from '../../../contexts/AuthContext';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';
import { OrderContext } from '../../../contexts/OrderContext';

const DashboardTab = () => {
    const { allorder, userDocuments } = useContext(OrderContext);
    const [documents, setDocuments] = useState([]);
    const { setData } = useAuthContext();
    const [isProcessing, setIsProcessing] = useState(false);
    const [item, setItem] = useState({});
    
    useEffect(() => {
        const fetchData = async () => {
            const querySnapshot = await getDocs(collection(firestore, "products"));
            const array = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setDocuments(array);
            setData(array);
        };
        fetchData();
    }, [setData]);

    const handleDelete = async (product) => {
        setIsProcessing(true);
        try {
            await deleteDoc(doc(firestore, "products", product.id));
            setDocuments(prevDocs => prevDocs.filter(doc => doc.id !== product.id));
            toast.success("Product deleted successfully");
        } catch (error) {
            console.error(error);
            toast.error("Error deleting product");
        } finally {
            setIsProcessing(false);
        }
    };

    const handleSave = async () => {
        const newItem = { ...item, dateModified: dayjs().format('YYYY-MM-DD HH:mm:ss') };
        try {
            await setDoc(doc(firestore, "products", newItem.id), newItem, { merge: true });
            setDocuments(prevDocs => prevDocs.map(doc => (doc.id === item.id ? newItem : doc)));
            toast.success("Product updated successfully");
        } catch (error) {
            console.error(error);
            toast.error("Error updating product");
        }
    };

    const formatTimestamp = (timestamp) => {
        return timestamp && timestamp.seconds ? new Date(timestamp.seconds * 1000).toLocaleString() : null;
    };

    return (
        <div className="container mx-auto my-5">
            <h1 className="text-center mb-4 text-3xl font-bold">Dashboard</h1>
            <Tabs defaultIndex={0}>
                <TabList className="d-flex justify-content-center mb-4" style={{ listStyle: 'none' }}>
                    <Tab>
                        <button className="btn btn-outline-primary mx-2">
                            <MdOutlineProductionQuantityLimits /> Products
                        </button>
                    </Tab>
                    <Tab>
                        <button className="btn btn-outline-secondary mx-2">
                            <AiFillShopping /> Orders
                        </button>
                    </Tab>
                    <Tab>
                        <button className="btn btn-outline-success mx-2">
                            <FaUser /> Users
                        </button>
                    </Tab>
                </TabList>

                <TabPanel>
                    <h2 className="text-center mb-4">Product Details</h2>
                    <div className="d-flex justify-content-end mb-3">
                        <Link to="/addproducts" className="btn btn-danger">
                            <FaCartPlus /> Add Product
                        </Link>
                    </div>
                    <table className="table table-hover">
                        <thead className="thead-light">
                            <tr>
                                <th>#</th>
                                <th>Image</th>
                                <th>Title</th>
                                <th>Price</th>
                                <th>Category</th>
                                <th>Date Created</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {documents.map((product, i) => (
                                <tr key={product.id}>
                                    <td>{i + 1}</td>
                                    <td><Image className='rounded' src={product.url} alt="img" style={{ width: 40, height: 40 }} /></td>
                                    <td>{product.title}</td>
                                    <td>${product.price}</td>
                                    <td>{product.category}</td>
                                    <td>{formatTimestamp(product.dateCreated)}</td>
                                    <td>
                                        <button onClick={() => handleDelete(product)} disabled={isProcessing} className="btn btn-link text-danger">
                                            <AiFillDelete />
                                        </button>
                                        <button onClick={() => setItem(product)} disabled={isProcessing} className="btn btn-link text-primary" data-bs-toggle='modal' data-bs-target='#editProductModal'>
                                            <BiEdit />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </TabPanel>

                <TabPanel>
                    <h2 className="text-center mb-4">Order Details</h2>
                    <table className="table table-hover">
                        <thead className="thead-light">
                            <tr>
                                <th>Image</th>
                                <th>Title</th>
                                <th>Price</th>
                                <th>Category</th>
                                <th>Name</th>
                                <th>Address</th>
                                <th>Phone Number</th>
                                <th>Email</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allorder.flatMap((item) =>
                                item.cartItems.map((cartItem, j) => (
                                    <tr key={j}>
                                        <td><Image className='rounded' src={cartItem.url} alt="img" style={{ width: 40, height: 40 }} /></td>
                                        <td>{cartItem.title}</td>
                                        <td>${cartItem.price}</td>
                                        <td>{cartItem.category}</td>
                                        <td>{item.addressInfo.fullName}</td>
                                        <td>{item.addressInfo.address}</td>
                                        <td>{item.addressInfo.mobileNumber}</td>
                                        <td>{item.userEmail}</td>
                                        <td>{item.date}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </TabPanel>

                <TabPanel>
                    <h2 className="text-center mb-4">User Details</h2>
                    <table className="table table-hover">
                        <thead className="thead-light">
                            <tr>
                                <th>S.No</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>User-Id</th>
                                <th>Date Created</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userDocuments.map((user, i) => (
                                <tr key={user.uid}>
                                    <td>{i + 1}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                    <td>{user.uid}</td>
                                    <td>{formatTimestamp(user.date)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </TabPanel>
            </Tabs>

            {/* Edit Modal */}
            <div className="modal fade" id="editProductModal" tabIndex="-1" aria-labelledby="editProductModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="editProductModalLabel">Edit Product</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <input type="text" placeholder='Product Title' className='form-control my-2' value={item.title || ''} onChange={(e) => setItem({ ...item, title: e.target.value })} />
                            <input type="text" placeholder='Price' className='form-control my-2' value={item.price || ''} onChange={(e) => setItem({ ...item, price: e.target.value })} />
                            <input type="text" placeholder='Image URL' className='form-control my-2' value={item.url || ''} onChange={(e) => setItem({ ...item, url: e.target.value })} />
                            <input type="text" placeholder='Category' className='form-control my-2' value={item.category || ''} onChange={(e) => setItem({ ...item, category: e.target.value })} />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-primary" onClick={handleSave} data-bs-dismiss="modal">Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardTab;
