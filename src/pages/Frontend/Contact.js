import React from 'react';
import { BiPhone, BiMailSend } from 'react-icons/bi';


export default function Contact() {
  return (
    <>
      <main>
        <div className="contact-header text-dark text-center py-3">
          
          <h1 className='fw-bold'>Contact Us</h1>
        </div>
        <div style={{ width: '100%', overflow: 'hidden' }}>
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d217898.05622262493!2d73.08930095!3d31.423571499999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x392242a895a55ca9%3A0xdec58f88932671c6!2sFaisalabad%2C%20Punjab!5e0!3m2!1sen!2s!4v1730639344336!5m2!1sen!2s"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Map"
            ></iframe>
        </div>
        <div className="container my-5">
          <div className="location-section text-center">
            <h1>Where You Can Find Us</h1>
            <p>47 Baker Street, London LD1 OND</p>
            <h4>Opening Hours</h4>
            <p>Mon-Fri: 09:00 AM - 05:00 PM</p>
            <p>Sat-Sun: 10:00 AM - 03:00 PM</p>
            <p>
              We invite you to visit BiteBazaar to explore our full range of dishes. Our friendly staff is here to help you find the perfect meal.
            </p>
          </div>

          <div className="contact-info text-center my-5">
            <h2>Get in Touch</h2>
            <p>Your feedback is important to us! Please reach out via email or phone, or fill out the contact form below.</p>
            <div>
              <BiMailSend style={{ fontSize: '30px' }} /> <strong>Email:</strong> info@bitebazaar.com
            </div>
            <div>
              <BiPhone style={{ fontSize: '30px' }} /> <strong>Call Us:</strong> (+44) 123-456-7890
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
