import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import './product.css'; // Import the CSS file

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [sort, setSort] = useState('');
    const [totalPages, setTotalPages] = useState(1);

    const fetchProducts = useCallback(async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:5000/api/product/getData`, {
                params: { page, limit, sort }
            });
            setProducts(response.data.myProduct);
            setTotalPages(Math.ceil(response.data.nbHits / limit));
        } catch (error) {
            setError('Error fetching products');
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    }, [page, limit, sort]);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const handleSortChange = (event) => {
        setSort(event.target.value);
        setPage(1); // Reset to the first page when sorting changes
    };

    const handlePageChange = (newPage) => {
        if (newPage < 1 || newPage > totalPages) return; // Prevent invalid page changes
        setPage(newPage);
    };

    return (
        <div className="container">
            <h2>Product List</h2>

            <label>
                Sort by:
                <select value={sort} onChange={handleSortChange}>
                    <option value="">Default</option>
                    <option value="price">Price</option>
                    <option value="rating">Rating</option>
                </select>
            </label>

            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <ul>
                    {products.map(product => (
                        <li key={product._id}>
                            <h3>{product.name}</h3>
                            <p>{product.description}</p>
                            <p className="price">Price: ${product.price}</p>
                            <p>Company: {product.company}</p>
                            <p>Rating: {product.rating}</p>
                            <p className="featured">Featured: {product.feature ? 'Yes' : 'No'}</p>
                        </li>
                    ))}
                </ul>
            )}

            <div className="page-info">
                <button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
                    Previous
                </button>
                <span> Page {page} of {totalPages} </span>
                <button onClick={() => handlePageChange(page + 1)} disabled={page === totalPages}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default ProductList;
