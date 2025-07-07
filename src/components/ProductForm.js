import React, { useState } from 'react';
import './ProductForm.css';

export default function ProductForm({ onAdd }) {
  const [product, setProduct] = useState({ name: '', color: '', size: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(product);
    setProduct({ name: '', color: '', size: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="product-form">
      <input
        name="name"
        placeholder="Name"
        value={product.name}
        onChange={handleChange}
        className="product-input"
      />
      <input
        name="color"
        placeholder="Color"
        value={product.color}
        onChange={handleChange}
        className="product-input"
      />
      <input
        name="size"
        placeholder="Size"
        value={product.size}
        onChange={handleChange}
        className="product-input"
      />
      <button type="submit" className="btn add-btn">Add</button>
    </form>
  );
}
