import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Filter from '../setions/Filter';
import CartSection from '../setions/CartSection';
import Testimonial from '../setions/Testimonial';

export default function Home() {
    const [selectedCategory, setSelectedCategory] = useState('');

    return (
        <main>
           {/* Hero Section */}
<div className="hero-section">
    <div className="container">
        <div className="row justify-content-center text-center">
            <div className="col-md-8">
                <h1 className="title-1 text-white">Savor Our Unique Flavors & Experience the <span className="text-primary">Art of Dining</span></h1>
                <p className="title-2 text-white">Join us for an unforgettable meal, where each dish is crafted with care and the freshest ingredients. Indulge in a culinary adventure!</p>
                <Link to="/menu" className='btn btn-lg btn-primary mt-3'>Discover Our Menu</Link>
            </div>
        </div>
    </div>
</div>


            {/* second section */}
          <div className="second-section">
    <div className="container my-5">
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card shadow border-0 p-4">
                    <h3 className="text-center my-3">Search Your Category</h3>
                    <div className="d-flex justify-content-center">
                        <Filter selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

            {/* third section  */}
            <CartSection selectedCategory={selectedCategory} />
            {/* forth section  */}
            <div className="my-5">
                <Testimonial />
            </div>
        </main>
    );
}
