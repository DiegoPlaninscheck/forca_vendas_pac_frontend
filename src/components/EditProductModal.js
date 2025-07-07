import { useState, useEffect } from 'react';
import './EditProductModal.css';

function EditProductModal({ product, onClose, onSave }) {
  const [editedProduct, setEditedProduct] = useState(product);

  useEffect(() => {
    setEditedProduct(product);
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(editedProduct);
  };

  if (!product) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Edit Product</h2>
        <form onSubmit={handleSubmit}>
          <input
            name="name"
            value={editedProduct.name}
            onChange={handleChange}
            placeholder="Name"
          />
          <input
            name="color"
            value={editedProduct.color}
            onChange={handleChange}
            placeholder="Color"
          />
          <input
            name="size"
            value={editedProduct.size}
            onChange={handleChange}
            placeholder="Size"
          />
          <div className="modal-buttons">
            <button type="submit">Save</button>
            <button type="button" onClick={onClose} className="cancel-btn">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProductModal;
