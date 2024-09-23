const { default: mongoose } = require("mongoose")

url = "mongodb+srv://cse21052:YdZ73Ci4fNF29uFM@sagar.nnedcbx.mongodb.net/MERN?retryWrites=true&w=majority&appName=Sagar"


const Connect = async () => {
    try {
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        process.exit(1);
    }
};

module.exports = Connect;