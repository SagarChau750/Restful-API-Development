const Product = require("../model/product");


const insertProduct = async(req, res)=>{
    const { name, price, description, company, rating, feature } = req.body;
    try {
        const newProduct = new Product({
            name,
            price,
            description,
            company,
            rating,
            feature
        });

        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getProduct = async(req, res)=>{
    const{company, name, sort, select} = req.query;
    const queryObj = {};
    
    if(company){
        queryObj.company = company;
    }
    if(name){
        queryObj.name = {$regex :name, $options: "i"};
    }

    let apiData = Product.find(queryObj);

   
    if (sort) {
        const sortOptions = sort.split(",").map(item => {
            const direction = item.startsWith('-') ? -1 : 1; // Determine sort direction
            const field = item.replace('-', ''); // Remove '-' for the field name
            return [field, direction]; // Return as array [field, direction]
        });
        apiData = apiData.sort(sortOptions);
    }
    
    if(select){
        let selectFix = select.split(",", " ");
        apiData = apiData.select(selectFix)
    }

    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit)||5;

    let skip = (page - 1) * limit;
    apiData = apiData.skip(skip).limit(limit);

    const myProduct = await apiData;
    const totalProducts = await Product.countDocuments(queryObj); // Ensure this is correct
    res.status(200).json({ myProduct, nbHits: totalProducts }); // Correctly structured response
    
}


module.exports = {insertProduct, getProduct};
