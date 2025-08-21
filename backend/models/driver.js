import mongoose from 'mongoose';


const partnerSchema = new mongoose.Schema({
name: String,
phone: String,
active: { type: Boolean, default: true },
busy: { type: Boolean, default: false }
}, { timestamps: true });


export default mongoose.model('DeliveryPartner', partnerSchema);