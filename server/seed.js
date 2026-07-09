import Product from "./models/productModel.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGOOSE_URL);
        console.log("Mongoose Connected");

        await Product.deleteMany({});
        console.log("Existing Products deleted");

        const products = [
            // ==========================================
            // FRUITS & VEGETABLES (25 Items)
            // ==========================================
            {
                "name": "Blueberries 125g",
                "description": "Sweet, juicy, and packed with antioxidants.",
                "price": 180,
                "originalPrice": 200,
                "image": "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?w=500&auto=format&fit=crop&q=60",
                "category": "fruits-vegetables",
                "unit": "125g",
                "stock": 100,
                "isOrganic": true,
                "rating": 4.8,
                "reviewCount": 34
            },
            {
                "name": "Strawberries 250g",
                "description": "Vibrant red, sweet berries perfect for desserts.",
                "price": 120,
                "originalPrice": 140,
                "image": "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=500&auto=format&fit=crop&q=60",
                "category": "fruits-vegetables",
                "unit": "250g",
                "stock": 100,
                "isOrganic": false,
                "rating": 4.4,
                "reviewCount": 28
            },
            {
                "name": "Avocado 2 pcs",
                "description": "Creamy texture, rich in healthy monounsaturated fats.",
                "price": 220,
                "originalPrice": 250,
                "image": "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=500&auto=format&fit=crop&q=60",
                "category": "fruits-vegetables",
                "unit": "2pcs",
                "stock": 100,
                "isOrganic": true,
                "rating": 4.6,
                "reviewCount": 19
            },
            {
                "name": "Broccoli 500g",
                "description": "Crisp green florets high in Vitamin C and K.",
                "price": 75,
                "originalPrice": 90,
                "image": "https://images.unsplash.com/photo-1452960962994-acf4fd70b632?w=500&auto=format&fit=crop&q=60",
                "category": "fruits-vegetables",
                "unit": "500g",
                "stock": 100,
                "isOrganic": true,
                "rating": 4.5,
                "reviewCount": 15
            },
            {
                "name": "Red Bell Pepper 500g",
                "description": "Sweet, crunchy peppers ideal for stir-fries and salads.",
                "price": 95,
                "originalPrice": 110,
                "image": "https://images.unsplash.com/photo-1563565312871-f9b699a74421?w=500&auto=format&fit=crop&q=60",
                "category": "fruits-vegetables",
                "unit": "500g",
                "stock": 100,
                "isOrganic": false,
                "rating": 4.3,
                "reviewCount": 22
            },
            {
                "name": "Yellow Bell Pepper 500g",
                "description": "Bright and mild pepper variety packed with nutrition.",
                "price": 95,
                "originalPrice": 110,
                "image": "https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?w=500&auto=format&fit=crop&q=60",
                "category": "fruits-vegetables",
                "unit": "500g",
                "stock": 100,
                "isOrganic": false,
                "rating": 4.2,
                "reviewCount": 14
            },
            {
                "name": "English Cucumber 500g",
                "description": "Seedless, thin-skinned cucumber with a crisp bite.",
                "price": 40,
                "originalPrice": 45,
                "image": "https://images.unsplash.com/photo-1449300079323-02e209d9d028?w=500&auto=format&fit=crop&q=60",
                "category": "fruits-vegetables",
                "unit": "500g",
                "stock": 100,
                "isOrganic": false,
                "rating": 4.4,
                "reviewCount": 31
            },
            {
                "name": "Lemon 250g",
                "description": "Zesty, tart citrus perfect for garnishes and dressings.",
                "price": 30,
                "originalPrice": 35,
                "image": "https://images.unsplash.com/photo-1590502593747-42a996133562?w=500&auto=format&fit=crop&q=60",
                "category": "fruits-vegetables",
                "unit": "250g",
                "stock": 100,
                "isOrganic": false,
                "rating": 4.5,
                "reviewCount": 42
            },
            {
                "name": "Garlic 250g",
                "description": "Pungent and aromatic bulbs essential for savory cooking.",
                "price": 60,
                "originalPrice": 70,
                "image": "https://images.unsplash.com/photo-1540148426945-6cf22a6b2383?w=500&auto=format&fit=crop&q=60",
                "category": "fruits-vegetables",
                "unit": "250g",
                "stock": 100,
                "isOrganic": false,
                "rating": 4.6,
                "reviewCount": 27
            },
            {
                "name": "Ginger 250g",
                "description": "Spicy, earthy root ideal for teas and culinary bases.",
                "price": 45,
                "originalPrice": 50,
                "image": "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=500&auto=format&fit=crop&q=60",
                "category": "fruits-vegetables",
                "unit": "250g",
                "stock": 100,
                "isOrganic": false,
                "rating": 4.5,
                "reviewCount": 18
            },
            {
                "name": "Cauliflower 1 pc",
                "description": "Firm white head, versatile vegetable for roasting or mashing.",
                "price": 40,
                "originalPrice": 50,
                "image": "https://images.unsplash.com/photo-1568584711075-3d021a7c3ec3?w=500&auto=format&fit=crop&q=60",
                "category": "fruits-vegetables",
                "unit": "1pc",
                "stock": 100,
                "isOrganic": false,
                "rating": 4.1,
                "reviewCount": 23
            },
            {
                "name": "Green Chili 100g",
                "description": "Sharp, spicy chilies to add heat to any recipe.",
                "price": 15,
                "originalPrice": 18,
                "image": "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=500&auto=format&fit=crop&q=60",
                "category": "fruits-vegetables",
                "unit": "100g",
                "stock": 100,
                "isOrganic": false,
                "rating": 4.3,
                "reviewCount": 39
            },
            {
                "name": "Coriander Leaves 100g",
                "description": "Fresh aromatic herb ideal for garnishing and chutneys.",
                "price": 12,
                "originalPrice": 15,
                "image": "https://images.unsplash.com/photo-1608797178974-15b35a61d121?w=500&auto=format&fit=crop&q=60",
                "category": "fruits-vegetables",
                "unit": "100g",
                "stock": 100,
                "isOrganic": false,
                "rating": 4.6,
                "reviewCount": 55
            },
            {
                "name": "Mint Leaves 100g",
                "description": "Cool, refreshing herb for beverages and savory dishes.",
                "price": 15,
                "originalPrice": 20,
                "image": "https://images.unsplash.com/photo-1536304997881-a372c179924b?w=500&auto=format&fit=crop&q=60",
                "category": "fruits-vegetables",
                "unit": "100g",
                "stock": 100,
                "isOrganic": false,
                "rating": 4.4,
                "reviewCount": 29
            },
            {
                "name": "Mushroom Button 200g",
                "description": "Plump and earthy white button mushrooms.",
                "price": 60,
                "originalPrice": 70,
                "image": "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=500&auto=format&fit=crop&q=60",
                "category": "fruits-vegetables",
                "unit": "200g",
                "stock": 100,
                "isOrganic": false,
                "rating": 4.5,
                "reviewCount": 33
            },
            {
                "name": "Sweet Potato 1kg",
                "description": "Nutrient-dense root vegetable with a naturally sweet taste.",
                "price": 70,
                "originalPrice": 80,
                "image": "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=500&auto=format&fit=crop&q=60",
                "category": "fruits-vegetables",
                "unit": "1kg",
                "stock": 100,
                "isOrganic": true,
                "rating": 4.3,
                "reviewCount": 12
            },
            {
                "name": "Zucchini Green 500g",
                "description": "Mild tasting squash variety perfect for grilling or zoodles.",
                "price": 55,
                "originalPrice": 65,
                "image": "https://images.unsplash.com/photo-1534149711956-6202161ca1bf?w=500&auto=format&fit=crop&q=60",
                "category": "fruits-vegetables",
                "unit": "500g",
                "stock": 100,
                "isOrganic": true,
                "rating": 4.4,
                "reviewCount": 17
            },
            {
                "name": "Kiwi 3 pcs",
                "description": "Tangy and sweet green kiwi rich in digestive enzymes.",
                "price": 110,
                "originalPrice": 130,
                "image": "https://images.unsplash.com/photo-1585056800731-75583b477a32?w=500&auto=format&fit=crop&q=60",
                "category": "fruits-vegetables",
                "unit": "3pcs",
                "stock": 100,
                "isOrganic": false,
                "rating": 4.5,
                "reviewCount": 21
            },
            {
                "name": "Pomegranate 1kg",
                "description": "Packed with ruby-red, juicy arils bursting with flavor.",
                "price": 190,
                "originalPrice": 220,
                "image": "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=500&auto=format&fit=crop&q=60",
                "category": "fruits-vegetables",
                "unit": "1kg",
                "stock": 100,
                "isOrganic": false,
                "rating": 4.7,
                "reviewCount": 40
            },
            {
                "name": "Green Apple 1kg",
                "description": "Crisp, tart apple variety excellent for baking and salads.",
                "price": 160,
                "originalPrice": 180,
                "image": "https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?w=500&auto=format&fit=crop&q=60",
                "category": "fruits-vegetables",
                "unit": "1kg",
                "stock": 100,
                "isOrganic": false,
                "rating": 4.3,
                "reviewCount": 26
            },
            {
                "name": "Watermelon 1 pc",
                "description": "Hydrating, sweet summer favorite with crisp red flesh.",
                "price": 80,
                "originalPrice": 100,
                "image": "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=500&auto=format&fit=crop&q=60",
                "category": "fruits-vegetables",
                "unit": "1pc",
                "stock": 100,
                "isOrganic": false,
                "rating": 4.2,
                "reviewCount": 48
            },
            {
                "name": "Papaya 1 pc",
                "description": "Butter-soft tropical fruit loaded with vitamin A.",
                "price": 65,
                "originalPrice": 75,
                "image": "https://images.unsplash.com/photo-1526318896980-cf78c088247c?w=500&auto=format&fit=crop&q=60",
                "category": "fruits-vegetables",
                "unit": "1pc",
                "stock": 100,
                "isOrganic": false,
                "rating": 4.1,
                "reviewCount": 19
            },
            {
                "name": "Pear 1kg",
                "description": "Sweet, granular-textured fruit with a mild aroma.",
                "price": 140,
                "originalPrice": 160,
                "image": "https://images.unsplash.com/photo-1615484477778-ca3b77940c25?w=500&auto=format&fit=crop&q=60",
                "category": "fruits-vegetables",
                "unit": "1kg",
                "stock": 100,
                "isOrganic": false,
                "rating": 4.4,
                "reviewCount": 14
            },
            {
                "name": "Cabbage 1 pc",
                "description": "Leafy green head, standard base for coleslaws and stir-fries.",
                "price": 30,
                "originalPrice": 35,
                "image": "https://images.unsplash.com/photo-1611105637889-3cfbf3fc41bc?w=500&auto=format&fit=crop&q=60",
                "category": "fruits-vegetables",
                "unit": "1pc",
                "stock": 100,
                "isOrganic": false,
                "rating": 4.0,
                "reviewCount": 22
            },
            {
                "name": "Lady Finger 500g",
                "description": "Tender okra pods perfect for crisp, dry curries.",
                "price": 35,
                "originalPrice": 42,
                "image": "https://images.unsplash.com/photo-1627918804868-b7ae590a9693?w=500&auto=format&fit=crop&q=60",
                "category": "fruits-vegetables",
                "unit": "500g",
                "stock": 100,
                "isOrganic": false,
                "rating": 4.2,
                "reviewCount": 30
            },
        ];

        await Product.insertMany(products)
        console.log(`Created ${products.length} products`);
        console.log('Seed completed successfully');
        process.exit(0);
    } catch (err) {
        console.log("Seed error:", err.message);
    } finally {
        await mongoose.disconnect();
    }
}

seedDB();