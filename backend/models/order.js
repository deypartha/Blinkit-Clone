import mongoose from 'mongoose';
import Product from './product';
const orderItemSchema = new mongoose.Schema({
    productID: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    name: String,
    price: Number, 
    quantity: Number
}, { _id: false });
const orderSchema = new mongoose.Schema({
items: [orderItemSchema],
subTotal: Number,
payment: {
status: { type: String, enum: ['created', 'paid', 'failed'], default: 'created' },
razorpayOrderId: String,
razorpayPaymentId: String,
razorpaySignature: String
},
status: { type: String, enum: ['created', 'partner_assigned', 'picking_up', 'on_the_way', 'delivered'], default: 'created' },
partnerId: { type: mongoose.Schema.Types.ObjectId, ref: 'DeliveryPartner' }
}, { timestamps: true });


export default mongoose.model('Order', orderSchema);