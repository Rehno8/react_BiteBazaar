import React, { useContext } from 'react';
import { FaUserTie } from 'react-icons/fa';
import { ModeContext } from '../../contexts/ModeContext';
import DashboardTab from "././Dashboard/DashboardTab";
import { useAuthContext } from '../../contexts/AuthContext';
import { OrderContext } from '../../contexts/OrderContext';

function Dashboard() {
    const context = useContext(ModeContext);
    const { data } = useAuthContext();
    const { allorder, userDocuments } = useContext(OrderContext);
    const { mode } = context;

    const cardStyle = {
        backgroundColor: mode === 'dark' ? '#333' : '#fff',
        color: mode === 'dark' ? '#fff' : '#333',
        border: `2px solid ${mode === 'dark' ? '#444' : '#ccc'}`,
        boxShadow: mode === 'dark' ? '0 4px 15px rgba(0, 0, 0, 0.5)' : '0 4px 15px rgba(0, 0, 0, 0.1)',
        borderRadius: '12px',
        padding: '20px',
        textAlign: 'center',
        transition: '0.3s',
        cursor: 'pointer',
    };

    const iconStyle = {
        color: '#E63946',
    };

    const textStyle = {
        color: mode === 'dark' ? '#fff' : '#6b5baf',
    };

    return (
        <section className="text-gray-600 body-font mt-5 mb-10">
            <div className="container px-5 mx-auto">
                <h1 className="text-center mb-5" style={{ color: '#E63946', fontFamily: 'Garamond', fontWeight: 'bold' }}>
                    Dashboard
                </h1>
                <div className="row text-center">
                    <div className="col-md-4 col-sm-6 mb-4">
                        <div style={cardStyle} className="hover:shadow-lg transition-shadow">
                            <div className="mb-3">
                                <FaUserTie size={50} style={iconStyle} />
                            </div>
                            <h2 className="font-weight-bold" style={textStyle}>{data.length}</h2>
                            <p className="font-weight-bold" style={textStyle}>Total Products</p>
                        </div>
                    </div>
                    <div className="col-md-4 col-sm-6 mb-4">
                        <div style={cardStyle} className="hover:shadow-lg transition-shadow">
                            <div className="mb-3">
                                <FaUserTie size={50} style={iconStyle} />
                            </div>
                            <h2 className="font-weight-bold" style={textStyle}>{allorder.length}</h2>
                            <p className="font-weight-bold" style={textStyle}>Total Orders</p>
                        </div>
                    </div>
                    <div className="col-md-4 col-sm-6 mb-4">
                        <div style={cardStyle} className="hover:shadow-lg transition-shadow">
                            <div className="mb-3">
                                <FaUserTie size={50} style={iconStyle} />
                            </div>
                            <h2 className="font-weight-bold" style={textStyle}>{userDocuments.length}</h2>
                            <p className="font-weight-bold" style={textStyle}>Total Users</p>
                        </div>
                    </div>
                </div>
            </div>
            <DashboardTab />
        </section>
    );
}

export default Dashboard;
