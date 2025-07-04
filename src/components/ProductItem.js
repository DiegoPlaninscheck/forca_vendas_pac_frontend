import React from 'react';

export default function ProductItem({ product, onEdit, onDelete }) {
    return (
        <div className="flex justify-between items-center border p-2 rounded mb-2">
            <span>{product.name} - {product.color} - {product.size}</span>
            <div className="flex gap-2">
                <button onClick={onEdit} className="bg-yellow-400 text-white px-3 py-1 rounded">Editar</button>
                <button onClick={onDelete} className="bg-red-500 text-white px-3 py-1 rounded">Excluir</button>
            </div>
        </div>
    );
}