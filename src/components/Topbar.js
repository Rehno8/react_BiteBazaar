import React, { useState, useEffect } from 'react';

export default function Topbar() {
  const texts = [
    "Welcome to BiteBazaar!",
    "Order Your Favorite Meals",
    "Deliciousness Delivered Daily"
  ];

  const [currentText, setCurrentText] = useState(texts[0]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % texts.length);
      setCurrentText(texts[(index + 1) % texts.length]);
    }, 3000);

    return () => clearInterval(interval);
  }, [index, texts]);

  return (
    <div className='topbar bg-primary'>
      <div className="container py-2">
        <div className="row">
          <div className="col">
            <p className="mb-0 text-center text-light">
              {currentText}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
