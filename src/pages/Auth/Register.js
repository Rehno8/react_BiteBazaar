import React, { useState } from 'react';
import { Link} from 'react-router-dom';
import { Input } from 'antd';
import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, firestore } from '../../config/Firebase';
import { doc, setDoc, Timestamp } from 'firebase/firestore';
import { useAuthContext } from '../../contexts/AuthContext';

const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Register() {
    // const navigate = useNavigate();
    const { setUser } = useAuthContext();
    const [loading, setLoading] = useState(false);
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();

        if (fullName.length < 3) {
            toast.error("Enter your full name properly");
            return;
        }
        if (!emailFormat.test(email)) {
            toast.error("Enter your email properly");
            return;
        }
        if (password.length < 6) {
            toast.error("Password must be at least six characters");
            return;
        }

        setLoading(true);

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            toast.success("Sign-up successful");
            await saveUserData(user);
            setLoading(false);
        } catch (error) {
            console.error("Registration error:", error);
            toast.error("Something went wrong while creating the account");
            setLoading(false);
        }
    };

    const saveUserData = async (user) => {
        const userData = {
            email: user.email,
            uid: user.uid,
            role: "customer",
            date: Timestamp.now()
        };
        await setDoc(doc(firestore, "users", user.uid), userData);
        setUser([userData]); // Update context with new user data
    };

    return (
        <main className='d-flex justify-content-center align-items-center bg-light'>
            <div className="container">
                <div className="row">
                    <div className="col-12 register-card">
                        <div className="card register p-4 border-1 border-primary text-dark rounded-3 w-100">
                            <form onSubmit={handleRegister}>
                                <h3 className='text-center mt-2 mb-4'>Register</h3>
                                <div className="mb-3">
                                    <Input
                                        type='text'
                                        size='large'
                                        className="form-control"
                                        placeholder='Full Name'
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                   
                                    <Input
                                        size='large'
                                        type="email"
                                        className="form-control"
                                       placeholder='Email Address'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <Input.Password
                                        size='large'
                                        className="form-control"
                                        placeholder='Password'
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        style={{ display: 'flex', alignItems: 'center' }} // Align the icon
                                    />
                                </div>
                                <div className="text-center mb-3">
                                    <button type="submit" className="btn btn-primary w-100 mt-3" disabled={loading}>
                                        {loading && <i className='fa fa-spinner fa-spin mx-1' style={{ fontSize: 24 }}></i>}
                                        Register
                                    </button>
                                </div>
                                <div className=" text-center">
                                    Already have an account? <Link to="/auth/login" className='text-primary '>Login Here</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
