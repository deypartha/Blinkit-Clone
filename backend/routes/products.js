// import express from 'express'
// import Product from '../models/product.js'
// const router = express.Router()

// router.get('/', async (req, res) => {
//     const products = await Product.find({}).sort({ createdAt: -1 });
//     res.json(products);
// })

// router.post('/seed', async(req, res)=>{
//     await Product.deleteMany({});
//     const products = await Product.insertMany([
//         { name: 'Paracetamol', price: 30, img: '/images/card.png' },
//         { name: 'Spray', price: 50, img: '/images/dhoop.png' },
//         { name: 'Paan', price: 20, img: '/images/paan.png' },
//         { name: 'Toothpaste', price: 70, img: '/images/toothpaste.png' },
//         { name: 'Chips', price: 20, img: '/images/chips.png' },
//         { name: 'Cold Drink', price: 40, img: '/images/drink.png' },
//         { name: 'Soap', price: 35, img: '/images/soap.png' },
//         { name: 'Shampoo', price: 99, img: '/images/shampoo.png' },
//         { name: 'Rice 1kg', price: 80, img: '/images/rice.png' },
//         { name: 'Dal 1kg', price: 95, img: '/images/dal.png' },
//         { name: 'Milk 1L', price: 55, img: '/images/milk.png' },
//         { name: 'Curd 500g', price: 40, img: '/images/curd.png' }
//     ])
//     res.json({ok: true, count: products.length});
// })

// // export default router;