import { TruckIcon, LeafIcon, ClockIcon, ShieldCheckIcon, MapPinIcon, PhoneIcon, MailIcon } from "lucide-react";
import { SiFacebook, SiX, SiInstagram } from "@icons-pack/react-simple-icons";
import hero_bg from "./hero_bg.jpeg";
import delivery_truck from "./delivery_truck.svg";
import fruits_vegetables from "./fruits_vegetables.png";
import dairy_eggs from "./dairy_eggs.png";
import bakery from "./bakery.png";
import drinks from "./drinks.png";
import pantry_staples from "./pantry_staples.png";
import snacks from "./snacks.png";
import frozen_foods from "./frozen_foods.png";
import personal_care from "./personal_care.png";
import baby_care from "./baby_care.png";
import meat_seafood from "./meat_seafood.png";

export const assets = {
    delivery_truck,
    hero_bg,
};

export const categoriesData = [
    { slug: "fruits-vegetables", name: "Fruits & Vegetables", image: fruits_vegetables },
    { slug: "personal-care", name: "Personal Care", image: personal_care },
    { slug: "pantry-staples", name: "Pantry Staples", image: pantry_staples },
    { slug: "bakery", name: "Bakery", image: bakery },
    { slug: "beverages", name: "Beverages", image: drinks },
    { slug: "meat-seafood", name: "Meat & Seafood", image: meat_seafood },
    { slug: "snacks", name: "Snacks", image: snacks },
    { slug: "frozen-foods", name: "Frozen Foods", image: frozen_foods },
    { slug: "baby-care", name: "Baby Care", image: baby_care },
    { slug: "dairy-eggs", name: "Dairy & Eggs", image: dairy_eggs },
];

export const heroSectionData = {
    description: "Fresh, organic groceries delivered from local farms to your doorstep. Quality you can taste, convenience you deserve.",
    hero_image: hero_bg,
    hero_features: [
        {
            icon: TruckIcon,
            title: "Free Home Delivery",
            desc: "On orders above ₹99",
        },
        {
            icon: LeafIcon,
            title: "Farm Fresh Produce",
            desc: "Daily harvest",
        },
        {
            icon: ClockIcon,
            title: "Fast Delivery",
            desc: "Delivered within minutes",
        },
        {
            icon: ShieldCheckIcon,
            title: "Secure Payments",
            desc: "100% protected",
        },
    ],
};

export const deliveryPartnerLoginImage = "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=200";

export const appPromoBannerData = {
    title: "Fresh groceries delivered in minutes",
    description: "Download Tabmart App to get the freshest fruits, vegetables, and daily essentials delivered straight to your doorstep with real-time tracking and exclusive app-only deals.",
};
export const footerData = {
    brand: {
        name: "TabMart",
        description:
            "Fresh groceries, daily essentials, and organic picks delivered fast from trusted local sources straight to your doorstep.",
        socials: [
            { icon: SiFacebook, link: "#" },
            { icon: SiX, link: "#" },
            { icon: SiInstagram, link: "#" },
        ],
    },

    sections: [
        {
            title: "Quick Links",
            links: [
                { label: "All Products", to: "/products" },
                { label: "Best Deals", to: "/deals" },
                { label: "Track Order", to: "/orders" },
                { label: "Delivery Info", to: "/delivery" },
            ],
        },
        {
            title: "Customer Support",
            links: [
                { label: "My Account", to: "#" },
                { label: "Order History", to: "$" },
                { label: "Saved Addresses", to: "#" },
                { label: "Help Center", href: "#" },
            ],
        },
    ],

    contact: [
        { icon: MapPinIcon, text: "Fresh Market Hub, Andhra Pradesh | Telengana" },
        { icon: PhoneIcon, text: "+91 95501 XXXXX" },
        { icon: MailIcon, text: "support@tabmart.com" },
    ],

    bottom: {
        copyright: `© ${new Date().getFullYear()} TabMart. All rights reserved.`,
        links: [
            { label: "Privacy Policy", href: "/privacy" },
            { label: "Terms of Service", href: "/terms" },
        ],
    },
};

export const statusColors = {
    Placed: "bg-blue-100 text-blue-700",
    Confirmed: "bg-indigo-100 text-indigo-700",
    Packed: "bg-purple-100 text-purple-700",
    "Out for Delivery": "bg-app-orange/10 text-app-orange",
    Delivered: "bg-green-100 text-green-700",
    Cancelled: "bg-red-100 text-red-700",
};

export const iconsForLeafpad = {
    truck: "https://cdn-icons-png.flaticon.com/512/3097/3097180.png",
    destination: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
};

export const dummyProducts = [];

export const dummyAdminDashboardData = {
    totalOrders: 1,
    totalUsers: 3,
    totalProducts: 27,
    outOfStock: 0,
    totalPartners: 2,
    recentOrders: [
        {
            shippingAddress: {
                label: "Home",
                address: "New Market Road ",
                city: "New York ",
                state: "NY",
                zip: "876543",
                lat: 40.7128,
                lng: -74.006,
            },
            liveLocation: {
                lat: 40.7128,
                lng: -74.006,
                updatedAt: "2026-04-06T08:41:27.211Z",
            },
            _id: "69d366617ed7e54198d67dac",
            user: {
                _id: "69bb6caf448f2d818db59122",
                name: "Admin",
                email: "admin@example.com",
            },
            items: [
                {
                    product: "69c22613ae75a98c7cd13b3b",
                    name: "Butter Croissant 100g",
                    image: "https://raw.githubusercontent.com/avinashdm/gs-images/main/greencart/zvoeqbvrbrt7atqj0dbu.png",
                    price: 45,
                    quantity: 2,
                    unit: "100g",
                    _id: "69d366617ed7e54198d67dad",
                },
                {
                    product: "69c22613ae75a98c7cd13b36",
                    name: "Barley 1kg",
                    image: "https://raw.githubusercontent.com/avinashdm/gs-images/main/greencart/spb5sgy8g24rned9nwog.png",
                    price: 140,
                    quantity: 1,
                    unit: "1kg",
                    _id: "69d366617ed7e54198d67dae",
                },
            ],
            paymentMethod: "cash",
            subtotal: 230,
            deliveryFee: 0,
            tax: 18.4,
            total: 248.4,
            status: "Delivered",
            statusHistory: [
                {
                    status: "Placed",
                    note: "Order placed successfully",
                    _id: "69d366617ed7e54198d67daf",
                    timestamp: "2026-04-06T07:53:05.769Z",
                },
                {
                    status: "Assigned",
                    note: "Assigned to Rahul",
                    _id: "69d366ab7ed7e54198d67dbe",
                    timestamp: "2026-04-06T07:54:19.796Z",
                },
                {
                    status: "Packed",
                    note: "Status updated to Packed",
                    _id: "69d366b37ed7e54198d67ddc",
                    timestamp: "2026-04-06T07:54:27.171Z",
                },
                {
                    status: "Out for Delivery",
                    note: "Status updated to Out for Delivery",
                    _id: "69d366b57ed7e54198d67e00",
                    timestamp: "2026-04-06T07:54:29.226Z",
                },
                {
                    status: "Delivered",
                    note: "Delivered by partner",
                    _id: "69d373207ed7e54198d681b1",
                    timestamp: "2026-04-06T08:47:28.983Z",
                },
            ],
            deliveryPartner: {
                _id: "69bbfc3866db7c6cdea47ede",
                name: "Rahul",
                phone: "987654321",
            },
            deliveryOtp: "",
            isPaid: false,
            createdAt: "2026-04-06T07:53:05.774Z",
            updatedAt: "2026-04-06T08:47:28.984Z",
            __v: 4,
        },
    ],
};

export const dummyDeliveryPartnerData = [
    {
        _id: "69bbfc6c66db7c6cdea47ee4",
        name: "John Doe",
        email: "johndoe@example.com",
        phone: "987654321",
        avatar: "",
        vehicleType: "bike",
        isActive: true,
        createdAt: "2026-03-19T13:38:52.827Z",
        updatedAt: "2026-03-19T13:38:52.827Z",
        __v: 0,
    },
    {
        _id: "69bbfc3866db7c6cdea47ede",
        name: "Rahul",
        email: "rahul@example.com",
        phone: "987654321",
        avatar: "",
        vehicleType: "bike",
        isActive: true,
        createdAt: "2026-03-19T13:38:00.872Z",
        updatedAt: "2026-03-19T13:38:00.872Z",
        __v: 0,
    },
];

export const dummyDashboardOrdersData = [
    {
        shippingAddress: {
            label: "Home",
            address: "New Market Road ",
            city: "New York ",
            state: "NY",
            zip: "876543",
            lat: 40.7128,
            lng: -74.006,
        },
        liveLocation: {
            lat: 40.7128,
            lng: -74.006,
            updatedAt: "2026-04-06T08:41:27.211Z",
        },
        _id: "69d366617ed7e54198d67dac",
        user: {
            _id: "69bb6caf448f2d818db59122",
            name: "Admin",
            email: "admin@example.com",
        },
        items: [
            {
                product: "1",
                name: "Butter Croissant 100g",
                image: "https://raw.githubusercontent.com/avinashdm/gs-images/main/greencart/zvoeqbvrbrt7atqj0dbu.png",
                price: 45,
                quantity: 2,
                unit: "100g",
            },
            {
                product: "2",
                name: "Barley 1kg",
                image: "https://raw.githubusercontent.com/avinashdm/gs-images/main/greencart/spb5sgy8g24rned9nwog.png",
                price: 140,
                quantity: 1,
                unit: "1kg",
            },
            {
                product: "3",
                name: "Apple",
                image: "https://raw.githubusercontent.com/avinashdm/gs-images/main/greencart/zvoeqbvrbrt7atqj0dbu.png",
                price: 80,
                quantity: 1,
                unit: "1kg",
            },
            {
                product: "4",
                name: "Banana",
                image: "https://raw.githubusercontent.com/avinashdm/gs-images/main/greencart/spb5sgy8g24rned9nwog.png",
                price: 50,
                quantity: 1,
                unit: "1dozen",
            },
            {
                product: "5",
                name: "Orange",
                image: "https://raw.githubusercontent.com/avinashdm/gs-images/main/greencart/zvoeqbvrbrt7atqj0dbu.png",
                price: 120,
                quantity: 1,
                unit: "1kg",
            },
        ],
        paymentMethod: "cash",
        subtotal: 230,
        deliveryFee: 0,
        tax: 18.4,
        total: 248.4,
        status: "Delivered",
        statusHistory: [
            { status: "Placed", note: "Order placed successfully", _id: "69d366617ed7e54198d67daf", timestamp: "2026-04-06T07:53:05.769Z" },
            { status: "Assigned", note: "Assigned to Rahul", _id: "69d366ab7ed7e54198d67dbe", timestamp: "2026-04-06T07:54:19.796Z" },
            { status: "Packed", note: "Status updated to Packed", _id: "69d366b37ed7e54198d67ddc", timestamp: "2026-04-06T07:54:27.171Z" },
            { status: "Out for Delivery", note: "Status updated to Out for Delivery", _id: "69d366b57ed7e54198d67e00", timestamp: "2026-04-06T07:54:29.226Z" },
            { status: "Delivered", note: "Delivered by partner", _id: "69d373207ed7e54198d681b1", timestamp: "2026-04-06T08:47:28.983Z" },
        ],
        deliveryPartner: { _id: "69bbfc3866db7c6cdea47ede", name: "Rahul", email: "rahul@example.com", phone: "987654321" },
        deliveryOtp: "",
        isPaid: false,
        createdAt: "2026-04-06T07:53:05.774Z",
        updatedAt: "2026-04-06T08:47:28.984Z",
        __v: 4,
    },
    {
        shippingAddress: { label: "Home", address: "New Market Road ", city: "New York ", state: "NY", zip: "876543", lat: 40.7128, lng: -74.006 },
        liveLocation: { lat: 40.7128, lng: -74.006, updatedAt: "2026-04-06T08:41:27.211Z" },
        _id: "69d366617ed7e54198d67dad",
        user: { _id: "69bb6caf448f2d818db59122", name: "Admin", email: "admin@example.com" },
        items: [
            { product: "69c22613ae75a98c7cd13b3b", name: "Butter Croissant 100g", image: "https://raw.githubusercontent.com/avinashdm/gs-images/main/greencart/zvoeqbvrbrt7atqj0dbu.png", price: 45, quantity: 2, unit: "100g", _id: "69d366617ed7e54198d67dad" },
            { product: "69c22613ae75a98c7cd13b36", name: "Barley 1kg", image: "https://raw.githubusercontent.com/avinashdm/gs-images/main/greencart/spb5sgy8g24rned9nwog.png", price: 140, quantity: 1, unit: "1kg", _id: "69d366617ed7e54198d67dae" },
        ],
        paymentMethod: "cash",
        subtotal: 230,
        deliveryFee: 0,
        tax: 18.4,
        total: 248.4,
        status: "Out for Delivery",
        statusHistory: [
            { status: "Placed", note: "Order placed successfully", _id: "69d366617ed7e54198d67daf", timestamp: "2026-04-06T07:53:05.769Z" },
            { status: "Assigned", note: "Assigned to Rahul", _id: "69d366ab7ed7e54198d67dbe", timestamp: "2026-04-06T07:54:19.796Z" },
            { status: "Packed", note: "Status updated to Packed", _id: "69d366b37ed7e54198d67ddc", timestamp: "2026-04-06T07:54:27.171Z" },
            { status: "Out for Delivery", note: "Status updated to Out for Delivery", _id: "69d366b57ed7e54198d67e00", timestamp: "2026-04-06T07:54:29.226Z" },
        ],
        deliveryPartner: { _id: "69bbfc3866db7c6cdea47ede", name: "Rahul", email: "rahul@example.com", phone: "987654321" },
        deliveryOtp: "754730",
        isPaid: false,
        createdAt: "2026-04-06T07:53:05.774Z",
        updatedAt: "2026-04-06T08:47:28.984Z",
        __v: 4,
    },
    {
        shippingAddress: { label: "Home", address: "New Market Road ", city: "New York ", state: "NY", zip: "876543", lat: 40.7128, lng: -74.006 },
        liveLocation: { lat: 40.7128, lng: -74.006, updatedAt: "2026-04-06T08:41:27.211Z" },
        _id: "69d366617ed7e54198d67dad",
        user: { _id: "69bb6caf448f2d818db59122", name: "Admin", email: "admin@example.com" },
        items: [
            { product: "69c22613ae75a98c7cd13b3b", name: "Butter Croissant 100g", image: "https://raw.githubusercontent.com/avinashdm/gs-images/main/greencart/zvoeqbvrbrt7atqj0dbu.png", price: 45, quantity: 2, unit: "100g", _id: "69d366617ed7e54198d67dad" },
            { product: "69c22613ae75a98c7cd13b36", name: "Barley 1kg", image: "https://raw.githubusercontent.com/avinashdm/gs-images/main/greencart/spb5sgy8g24rned9nwog.png", price: 140, quantity: 1, unit: "1kg", _id: "69d366617ed7e54198d67dae" },
        ],
        paymentMethod: "cash",
        subtotal: 230,
        deliveryFee: 0,
        tax: 18.4,
        total: 248.4,
        status: "Out for Delivery",
        statusHistory: [
            { status: "Placed", note: "Order placed successfully", _id: "69d366617ed7e54198d67daf", timestamp: "2026-04-06T07:53:05.769Z" },
            { status: "Assigned", note: "Assigned to Rahul", _id: "69d366ab7ed7e54198d67dbe", timestamp: "2026-04-06T07:54:19.796Z" },
            { status: "Packed", note: "Status updated to Packed", _id: "69d366b37ed7e54198d67ddc", timestamp: "2026-04-06T07:54:27.171Z" },
            { status: "Out for Delivery", note: "Status updated to Out for Delivery", _id: "69d366b57ed7e54198d67e00", timestamp: "2026-04-06T07:54:29.226Z" },
        ],
        deliveryPartner: { _id: "69bbfc3866db7c6cdea47ede", name: "Rahul", email: "rahul@example.com", phone: "987654321" },
        deliveryOtp: "754730",
        isPaid: false,
        createdAt: "2026-04-06T07:53:05.774Z",
        updatedAt: "2026-04-06T08:47:28.984Z",
        __v: 4,
    },
    {
        shippingAddress: { label: "Home", address: "New Market Road ", city: "New York ", state: "NY", zip: "876543", lat: 40.7128, lng: -74.006 },
        liveLocation: { lat: 40.7128, lng: -74.006, updatedAt: "2026-04-06T08:41:27.211Z" },
        _id: "69d366617ed7e54198d67dad",
        user: { _id: "69bb6caf448f2d818db59122", name: "Admin", email: "admin@example.com" },
        items: [
            { product: "69c22613ae75a98c7cd13b3b", name: "Butter Croissant 100g", image: "https://raw.githubusercontent.com/avinashdm/gs-images/main/greencart/zvoeqbvrbrt7atqj0dbu.png", price: 45, quantity: 2, unit: "100g", _id: "69d366617ed7e54198d67dad" },
            { product: "69c22613ae75a98c7cd13b36", name: "Barley 1kg", image: "https://raw.githubusercontent.com/avinashdm/gs-images/main/greencart/spb5sgy8g24rned9nwog.png", price: 140, quantity: 1, unit: "1kg", _id: "69d366617ed7e54198d67dae" },
        ],
        paymentMethod: "cash",
        subtotal: 230,
        deliveryFee: 0,
        tax: 18.4,
        total: 248.4,
        status: "Out for Delivery",
        statusHistory: [
            { status: "Placed", note: "Order placed successfully", _id: "69d366617ed7e54198d67daf", timestamp: "2026-04-06T07:53:05.769Z" },
            { status: "Assigned", note: "Assigned to Rahul", _id: "69d366ab7ed7e54198d67dbe", timestamp: "2026-04-06T07:54:19.796Z" },
            { status: "Packed", note: "Status updated to Packed", _id: "69d366b37ed7e54198d67ddc", timestamp: "2026-04-06T07:54:27.171Z" },
            { status: "Out for Delivery", note: "Status updated to Out for Delivery", _id: "69d366b57ed7e54198d67e00", timestamp: "2026-04-06T07:54:29.226Z" },
        ],
        deliveryPartner: { _id: "69bbfc3866db7c6cdea47ede", name: "Rahul", email: "rahul@example.com", phone: "987654321" },
        deliveryOtp: "754730",
        isPaid: false,
        createdAt: "2026-04-06T07:53:05.774Z",
        updatedAt: "2026-04-06T08:47:28.984Z",
        __v: 4,
    },
    {
        shippingAddress: { label: "Home", address: "New Market Road ", city: "New York ", state: "NY", zip: "876543", lat: 40.7128, lng: -74.006 },
        liveLocation: { lat: 40.7128, lng: -74.006, updatedAt: "2026-04-06T08:41:27.211Z" },
        _id: "69d366617ed7e54198d67dad",
        user: { _id: "69bb6caf448f2d818db59122", name: "Admin", email: "admin@example.com" },
        items: [
            { product: "69c22613ae75a98c7cd13b3b", name: "Butter Croissant 100g", image: "https://raw.githubusercontent.com/avinashdm/gs-images/main/greencart/zvoeqbvrbrt7atqj0dbu.png", price: 45, quantity: 2, unit: "100g", _id: "69d366617ed7e54198d67dad" },
            { product: "69c22613ae75a98c7cd13b36", name: "Barley 1kg", image: "https://raw.githubusercontent.com/avinashdm/gs-images/main/greencart/spb5sgy8g24rned9nwog.png", price: 140, quantity: 1, unit: "1kg", _id: "69d366617ed7e54198d67dae" },
        ],
        paymentMethod: "cash",
        subtotal: 230,
        deliveryFee: 0,
        tax: 18.4,
        total: 248.4,
        status: "Out for Delivery",
        statusHistory: [
            { status: "Placed", note: "Order placed successfully", _id: "69d366617ed7e54198d67daf", timestamp: "2026-04-06T07:53:05.769Z" },
            { status: "Assigned", note: "Assigned to Rahul", _id: "69d366ab7ed7e54198d67dbe", timestamp: "2026-04-06T07:54:19.796Z" },
            { status: "Packed", note: "Status updated to Packed", _id: "69d366b37ed7e54198d67ddc", timestamp: "2026-04-06T07:54:27.171Z" },
            { status: "Out for Delivery", note: "Status updated to Out for Delivery", _id: "69d366b57ed7e54198d67e00", timestamp: "2026-04-06T07:54:29.226Z" },
        ],
        deliveryPartner: { _id: "69bbfc3866db7c6cdea47ede", name: "Rahul", email: "rahul@example.com", phone: "987654321" },
        deliveryOtp: "754730",
        isPaid: false,
        createdAt: "2026-04-06T07:53:05.774Z",
        updatedAt: "2026-04-06T08:47:28.984Z",
        __v: 4,
    },
];

export const dummyCartData = [
    { product: dummyProducts[0], quantity: 1 },
    { product: dummyProducts[1], quantity: 1 },
    { product: dummyProducts[2], quantity: 1 },
];

export const dummyAddressData = [
    { label: "Home", address: "123 Main St ", city: "New York ", state: "NY", zip: "10001", isDefault: true, lat: 40.7128, lng: -74.006, _id: "69d3652df9a340288f1a0f8c" },
    { label: "Work", address: "456 Market St ", city: "New York ", state: "NY", zip: "10002", isDefault: false, lat: 40.7128, lng: -74.006, _id: "69d3652df9a340288f1a0f8d" },
];
