import React from 'react';
import { Image } from 'antd';

const About = () => {
    return (
        <div className="about-section py-5">
            <div className="container">
                <h1 className="text-center fw-bold mb-4">About BiteBazaar</h1>
                <div className="row align-items-center">
                    <div className="col-md-6 mb-4">
                        <Image 
                            src="https://i.pinimg.com/originals/62/3c/41/623c411e8d2d398e84a42aae1b6c560a.jpg" 
                            alt="BiteBazaar Restaurant" 
                            className="img-fluid rounded" 
                        />
                    </div>
                    <div className="col-md-6">
                        <h3 className="fw-bold">Our Story</h3>
                        <p>
                            Welcome to BiteBazaar, where culinary artistry meets the vibrant flavors of our diverse menu. 
                            Established in [Year], our restaurant was born out of a passion for good food and the joy of sharing it with others.
                        </p>
                        <h3 className="fw-bold">Our Mission</h3>
                        <p>
                            At BiteBazaar, our mission is to provide an unforgettable dining experience, bringing people together 
                            through exceptional dishes crafted with the freshest ingredients. We believe in creating a warm, welcoming 
                            atmosphere where every guest feels at home.
                        </p>
                        <h3 className="fw-bold">Join Us!</h3>
                        <p>
                            Whether you’re celebrating a special occasion or enjoying a casual meal with family and friends, we invite you 
                            to explore our menu and experience the magic of BiteBazaar.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
