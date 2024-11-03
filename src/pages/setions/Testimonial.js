import React from 'react';
import { BiStar } from 'react-icons/bi'; // Using star icons for ratings
import img1 from "../../Assets/1.png";
import img2 from "../../Assets/2.png";
import img3 from "../../Assets/3.png";
import { Card, CardBody, CardTitle, CardText } from 'react-bootstrap';

export default function Testimonial() {
    return (
        <>
            <div className="container my-5">
                <div className="text-center mb-4">
                    <h1>What Our Customers Say</h1>
                    <h2 className='text-primary'>Testimonials</h2>
                </div>
                
                <div className="row">
                    {[{
                        img: img1,
                        name: "John Doe",
                        testimonial: "The food was fantastic! Great ambiance and service.",
                        rating: 5
                    }, {
                        img: img2,
                        name: "Jane Smith",
                        testimonial: "Loved the variety on the menu and the quality was top-notch!",
                        rating: 4
                    }, {
                        img: img3,
                        name: "Emily Johnson",
                        testimonial: "A perfect place for a dinner date. Will definitely come back!",
                        rating: 5
                    }].map((customer, index) => (
                        <div className="col-12 col-md-6 col-lg-4 my-4" key={index}>
                            <Card className="h-100 shadow border-0">
                                <CardBody className="text-center">
                                    <img 
                                        src={customer.img} 
                                        className="img-fluid rounded-circle mx-auto mb-3" 
                                        alt={customer.name} 
                                        style={{ width: '100px', height: '100px', objectFit: 'cover' }} 
                                    />
                                    <CardTitle className="text-success mb-2">{customer.name}</CardTitle>
                                    <div className="d-flex justify-content-center mb-3">
                                        {[...Array(customer.rating)].map((_, i) => (
                                            <BiStar key={i} style={{ color: 'gold', fontSize: '1.2rem' }} />
                                        ))}
                                    </div>
                                    <CardText style={{ textAlign: "justify" }}>
                                        "{customer.testimonial}"
                                    </CardText>
                                </CardBody>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
