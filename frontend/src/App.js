import React from 'react';
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';

const App = () => {
    return (
        <div>
            <h1 className='heading'>Restful API Development</h1>
            <ProductForm />
            <ProductList />
        </div>
    );
};

export default App;
