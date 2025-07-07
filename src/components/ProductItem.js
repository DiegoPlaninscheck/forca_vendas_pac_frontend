import React from 'react';
import './ProductItem.css';

export default function ProductItem({ product, onEdit, onDelete }) {
  return (
    <div className="product-item">
      <span className="product-info">
        {product.id} - {product.name} - {product.color} - {product.size}
      </span>
      <div className="product-actions">
        <button onClick={onEdit} className="btn edit-btn">Update</button>
        <button onClick={onDelete} className="btn delete-btn">Delete</button>
      </div>
    </div>
  );
}
