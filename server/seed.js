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
            // FRUITS & VEGETABLES
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
                "name": "Fresh Broccoli 500g",
                "description": "Crisp green broccoli florets, rich in vitamins.",
                "price": 90,
                "originalPrice": 110,
                "image": "https://i5.walmartimages.com/seo/Fresh-Broccoli-Crowns-Each_c721459d-3826-4461-9e79-c077d5cf191e_3.ca214f10bb3c042f473588af8b240eca.jpeg",
                "category": "fruits-vegetables",
                "unit": "500g",
                "stock": 75,
                "isOrganic": true,
                "rating": 4.6,
                "reviewCount": 42
            },

            // ==========================================
            // PERSONAL CARE
            // ==========================================
            {
                "name": "Organic Coconut Body Wash",
                "description": "Gentle, hydrating cleanser with a tropical scent.",
                "price": 350,
                "originalPrice": 420,
                "image": "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500&auto=format&fit=crop&q=60",
                "category": "personal-care",
                "unit": "250ml",
                "stock": 50,
                "isOrganic": true,
                "rating": 4.5,
                "reviewCount": 19
            },
            {
                "name": "Herbal Moisturizing Shampoo",
                "description": "Enriched with aloe vera and vitamin E for shiny, healthy hair.",
                "price": 290,
                "originalPrice": 350,
                "image": "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=500&auto=format&fit=crop&q=60",
                "category": "personal-care",
                "unit": "300ml",
                "stock": 60,
                "isOrganic": false,
                "rating": 4.3,
                "reviewCount": 27
            },

            // ==========================================
            // PANTRY STAPLES
            // ==========================================
            {
                "name": "Premium Basmati Rice",
                "description": "Long-grain, aromatic rice perfect for biryanis and pilafs.",
                "price": 140,
                "originalPrice": 160,
                "image": "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&auto=format&fit=crop&q=60",
                "category": "pantry-staples",
                "unit": "1kg",
                "stock": 120,
                "isOrganic": false,
                "rating": 4.7,
                "reviewCount": 85
            },
            {
                "name": "Extra Virgin Olive Oil",
                "description": "Cold-pressed olive oil, ideal for dressings and light cooking.",
                "price": 750,
                "originalPrice": 850,
                "image": "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500&auto=format&fit=crop&q=60",
                "category": "pantry-staples",
                "unit": "500ml",
                "stock": 40,
                "isOrganic": true,
                "rating": 4.9,
                "reviewCount": 63
            },

            // ==========================================
            // BAKERY
            // ==========================================
            {
                "name": "Whole Wheat Sourdough Bread",
                "description": "Freshly baked artisan sourdough with a thick crust.",
                "price": 95,
                "originalPrice": 110,
                "image": "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&auto=format&fit=crop&q=60",
                "category": "bakery",
                "unit": "400g",
                "stock": 25,
                "isOrganic": false,
                "rating": 4.8,
                "reviewCount": 51
            },
            {
                "name": "Butter Croissants (Pack of 4)",
                "description": "Flaky, golden-brown croissants baked daily with real butter.",
                "price": 160,
                "originalPrice": 180,
                "image": "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=500&auto=format&fit=crop&q=60",
                "category": "bakery",
                "unit": "4 pcs",
                "stock": 15,
                "isOrganic": false,
                "rating": 4.6,
                "reviewCount": 38
            },

            // ==========================================
            // BEVERAGES
            // ==========================================
            {
                "name": "Cold Brew Coffee Concentrate",
                "description": "Smooth, bold, and less acidic coffee brew.",
                "price": 240,
                "originalPrice": 280,
                "image": "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=500&auto=format&fit=crop&q=60",
                "category": "beverages",
                "unit": "500ml",
                "stock": 45,
                "isOrganic": false,
                "rating": 4.7,
                "reviewCount": 22
            },
            {
                "name": "Organic Green Tea",
                "description": "Pure green tea leaves packed with natural antioxidants.",
                "price": 195,
                "originalPrice": 220,
                "image": "https://image.made-in-china.com/2f0j00VrZkAThlSNbJ/Ceremonial-Grade-Certified-Organic-100-Pure-Matcha-Green-Tea-Powder-Bulk-Green-Tea-Matcha-Powder.jpg",
                "category": "beverages",
                "unit": "25 bags",
                "stock": 90,
                "isOrganic": true,
                "rating": 4.4,
                "reviewCount": 14
            },

            // ==========================================
            // MEAT & SEAFOOD
            // ==========================================
            {
                "name": "Fresh Chicken Breast",
                "description": "Skinless, boneless chicken breast meat, high in protein.",
                "price": 280,
                "originalPrice": 320,
                "image": "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=500&auto=format&fit=crop&q=60",
                "category": "meat-seafood",
                "unit": "500g",
                "stock": 35,
                "isOrganic": false,
                "rating": 4.5,
                "reviewCount": 57
            },
            {
                "name": "Fresh Atlantic Salmon Fillet",
                "description": "Premium quality salmon, rich in Omega-3 fatty acids.",
                "price": 850,
                "originalPrice": 990,
                "image": "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=500&auto=format&fit=crop&q=60",
                "category": "meat-seafood",
                "unit": "250g",
                "stock": 20,
                "isOrganic": false,
                "rating": 4.9,
                "reviewCount": 41
            },

            // ==========================================
            // SNACKS
            // ==========================================
            {
                "name": "Roasted Salted Almonds",
                "description": "Crunchy, dry-roasted almonds lightly tossed in sea salt.",
                "price": 210,
                "originalPrice": 250,
                "image": "https://images.unsplash.com/photo-1508061253366-f7da158b6d46?w=500&auto=format&fit=crop&q=60",
                "category": "snacks",
                "unit": "200g",
                "stock": 110,
                "isOrganic": false,
                "rating": 4.6,
                "reviewCount": 73
            },
            {
                "name": "Sea Salt Potato Chips",
                "description": "Crispy, kettle-cooked potato chips with classic sea salt.",
                "price": 60,
                "originalPrice": 70,
                "image": "https://tse2.mm.bing.net/th/id/OIP.Ln-k5BGnZTG3fpIaCvwTjQHaHa?r=0&pid=Api&h=220&P=0",
                "category": "snacks",
                "unit": "150g",
                "stock": 150,
                "isOrganic": false,
                "rating": 4.2,
                "reviewCount": 92
            },

            // ==========================================
            // FROZEN FOODS
            // ==========================================
            {
                "name": "Frozen Mixed Berries",
                "description": "A mix of frozen strawberries, blueberries, and raspberries.",
                "price": 290,
                "originalPrice": 340,
                "image": "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=500&auto=format&fit=crop&q=60",
                "category": "frozen-foods",
                "unit": "500g",
                "stock": 55,
                "isOrganic": false,
                "rating": 4.5,
                "reviewCount": 29
            },

            // ==========================================
            // BABY CARE
            // ==========================================
            {
                "name": "Pampers Sensitive Baby Wipes",
                "description": "Fragrance-free, ultra-soft wipes for delicate baby skin.",
                "price": 180,
                "originalPrice": 220,
                "image": "https://i5.walmartimages.com/seo/Pampers-Sensitive-Baby-Wipes-1X-Flip-Top-Pack-56-Wipes-Select-for-More-Options_fd22fc2c-2214-4099-819e-aff709af0aac.de51aedaf65246820a122c6f6c1077fa.jpeg",
                "category": "baby-care",
                "unit": "80 pack",
                "stock": 80,
                "isOrganic": false,
                "rating": 4.8,
                "reviewCount": 64
            },

            // ==========================================
            // DAIRY & EGGS
            // ==========================================
            {
                "name": "Greek Yogurt (Plain)",
                "description": "Thick, creamy, and high-protein strained yogurt.",
                "price": 85,
                "originalPrice": 100,
                "image": "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=500&auto=format&fit=crop&q=60",
                "category": "dairy-eggs",
                "unit": "400g",
                "stock": 65,
                "isOrganic": false,
                "rating": 4.7,
                "reviewCount": 48
            },
            {
                "name": "Free-Range Large Eggs",
                "description": "Farm-fresh, free-range brown eggs.",
                "price": 110,
                "originalPrice": 130,
                "image": "https://images.unsplash.com/photo-1516448620398-c5f44bf9f441?w=500&auto=format&fit=crop&q=60",
                "category": "dairy-eggs",
                "unit": "12 pcs",
                "stock": 40,
                "isOrganic": false,
                "rating": 4.6,
                "reviewCount": 112
            }
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