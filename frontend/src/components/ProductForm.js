import React, { useState } from 'react';
import axios from 'axios';
import './pform.css'; // Import the CSS file

const ProductForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        description: '',
        company: '',
        rating: '',
        feature: false
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:5000/api/product/addProduct', formData);
            console.log(response);

            alert('Product added successfully');
            setFormData({
                name: '',
                price: '',
                description: '',
                company: '',
                rating: '',
                feature: false
            });

        } catch (error) {
            console.error('Error adding product:', error);
            alert('Failed to add product');
        }
    };

    return (
        <div className="form-container">
            <h2>Add New Product</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Price:</label>
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Company:</label>
                    <select
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Company</option>
                        <option value="apple">Apple</option>
                        <option value="samsung">Samsung</option>
                        <option value="dell">Dell</option>
                        <option value="mi">Mi</option>
                    </select>
                </div>
                <div>
                    <label>Rating:</label>
                    <input
                        type="number"
                        name="rating"
                        value={formData.rating}
                        onChange={handleChange}
                        min="0"
                        max="5"
                        step="0.1"
                    />
                </div>
                <div>
                    <label>Featured:</label>
                    <input
                        type="checkbox"
                        name="feature"
                        checked={formData.feature}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Add Product</button>
            </form>
        </div>
    );
};

export default ProductForm;
