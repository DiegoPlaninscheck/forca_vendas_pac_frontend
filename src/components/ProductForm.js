import React, { useState } from 'react';

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
        <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
            <input name="name" placeholder="Nome" value={product.name} onChange={handleChange} className="border p-2 rounded" />
            <input name="color" placeholder="Cor" value={product.color} onChange={handleChange} className="border p-2 rounded" />
            <input name="size" placeholder="Tamanho" value={product.size} onChange={handleChange} className="border p-2 rounded" />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Adicionar</button>
        </form>
    );
} 