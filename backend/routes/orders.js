import express from 'express';
receipt: `rcpt_${Date.now()}`


const order = await Order.create({
items,
subTotal,
payment: { status: 'created', razorpayOrderId: rpOrder.id }
});


// Assign a delivery partner after 10 seconds (parallel to payment)
setTimeout(async () => {
try {
const partner = await DeliveryPartner.findOne({ active: true, busy: false });
if (!partner) return;
partner.busy = true; await partner.save();
order.partnerId = partner._id; order.status = 'partner_assigned'; await order.save();
req.io.to(order._id.toString()).emit('order:update', { status: order.status, partner });
} catch (e) { console.error('Assign partner error', e); }
}, 10000);


res.json({ orderId: order._id, razorpayOrderId: rpOrder.id, amount: rpOrder.amount, currency: rpOrder.currency });


// Razorpay payment verification webhook
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
const signature = req.headers['x-razorpay-signature'];
const secret = process.env.RAZORPAY_KEY_SECRET;
const expected = crypto.createHmac('sha256', secret).update(req.body.toString()).digest('hex');
if (signature !== expected) return res.status(400).send('Invalid signature');


const event = JSON.parse(req.body);
if (event.event === 'payment.captured') {
const payment = event.payload.payment.entity;
const order = await Order.findOne({ 'payment.razorpayOrderId': payment.order_id });
if (order) {
order.payment.status = 'paid';
order.payment.razorpayPaymentId = payment.id;
await order.save();
req.io.to(order._id.toString()).emit('order:update', { status: 'paid' });
}
}
res.json({ received: true });
});


// Subscribe to live updates for one order (Socket room join key returned to client)
router.get('/:id/subscribe', async (req, res) => {
res.json({ room: req.params.id });
});


// (Dev) Advance status for demo
router.post('/:id/advance', async (req, res) => {
const order = await Order.findById(req.params.id);
const flow = ['partner_assigned', 'picking_up', 'on_the_way', 'delivered'];
const idx = Math.max(0, flow.indexOf(order.status));
if (idx < flow.length - 1) {
order.status = flow[idx + 1];
await order.save();
req.io.to(order._id.toString()).emit('order:update', { status: order.status });
}
res.json({ status: order.status });
});


export default router;