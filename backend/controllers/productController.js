exports.getProducts = (req, res) => {
    const products = [
        { id: 1, name: 'Product ', price: 100 },
        { id: 2, name: 'Product 2', price: 200 },
        // Add more products as needed
    ];
    res.json(products);
};
