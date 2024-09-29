
import React, { useState } from 'react';
import { usePost } from '../api/usePost';

const RequestQuotation = () => {
    const [productName, setProductName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [description, setDescription] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { success, error } = await usePost('/user/request-quotation', { productName, quantity, description });
        if (success) {
            setSubmitted(true);
            setProductName('');
            setQuantity('');
            setDescription('');
        } else {
            alert('Failed to submit quotation request. Please try again.');
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Request a Quotation</h1>
            {submitted ? (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                    Your quotation request has been submitted. We'll get back to you soon with a price.
                </div>
            ) : null}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="productName" className="block mb-2">Product Name</label>
                    <input
                        type="text"
                        id="productName"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="quantity" className="block mb-2">Quantity</label>
                    <input
                        type="number"
                        id="quantity"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                        min="1"
                    />
                </div>
                <div>
                    <label htmlFor="description" className="block mb-2">Description</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full p-2 border rounded"
                        rows="5"
                        required
                    ></textarea>
                </div>
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                    Submit Quotation Request
                </button>
            </form>
        </div>
    );
};

export default RequestQuotation;