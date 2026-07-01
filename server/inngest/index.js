import { Inngest, cron } from "inngest";
import Product from '../models/productModel.js';
import { registerEmail, sendInngestEmail } from "../services/emailService.js";
import User from "../models/userModel.js";
import Order from "../models/orderModel.js";
import DeliveryPartner from "../models/deliveryPartnerModel.js"

const LOW_STOCK_THRESHOLD = 10;
// Create a client to send and receive events
export const inngest = new Inngest({ id: "tab-mart" });


// register email
const sendWelcomeEmail = inngest.createFunction(
    {
        id: "send-register-email",
        triggers: [{ event: "user/registered" }],
    },
    async ({ event, step }) => {
        console.log("🔥 Workflow started");
        console.log("Event:", event.data);

        const user = await step.run("fetch-user", async () => {
            console.log("Fetching user...");
            return User.findById(event.data.userId);
        });

        console.log("User:", user);

        await step.run("send-email", async () => {
            console.log("Sending email...");
            await registerEmail(user.email, user.name);
            console.log("Email sent!");
        });
    }
);

// low stock
const checkLowStock = inngest.createFunction(
    { id: "check-low-stock", name: "Low Stock Alert", triggers: [{ event: "inventory/stock.updated" }] },
    async ({ event, step }) => {
        const { productId } = event.data;
        const product = await step.run('fetch-product', async () => {
            return Product.findById(productId);
        });

        if (!product || product.stock === null || product.stock >= LOW_STOCK_THRESHOLD) {
            return { skipped: true, stock: product.stock }
        }

        await step.run("send-low-stock-email", async () => {
            const adminEmails = process.env.ADMIN_EMAILS ? process.env.ADMIN_EMAILS.split(',').map(e => e.trim().toLowerCase()) : [];
            if (adminEmails.length === 0) return {
                skipped: true,
                reason: "No admin emails"
            }

            await sendInngestEmail({
                to: adminEmails.join(','),
                subject: 'Low Stock Alert',
                body: `<div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 520px; margin: auto; border: 1px solid #e5e7eb; border-radius: 16px; overflow: hidden;">
                        <div style="background: linear-gradient(135deg, #dc2626, #ef4444); padding: 24px 28px;">
                            <h2 style="color: #fff; margin: 0; font-size: 20px;">Low Stock Alert</h2>
                        </div>
                        <div style="padding: 28px;">
                            <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 20px;">
                                ${product.image ? `<img src="${product.image}" alt="${product.name}" style="width: 64px; height: 64px; border-radius: 12px; object-fit: cover;" />` : ""}
                                <div>
                                    <h3 style="margin: 0 0 4px; font-size: 18px; color: #111827;">${product.name}</h3>
                                    <p style="margin: 0; font-size: 14px; color: #6b7280;">${product.category} • ${product.unit}</p>
                                </div>
                            </div>
                            <div style="background: #fef2f2; border: 1px solid #fecaca; border-radius: 12px; padding: 16px; text-align: center;">
                                <p style="margin: 0 0 4px; font-size: 13px; color: #991b1b; font-weight: 600;">CURRENT STOCK</p>
                                <p style="margin: 0; font-size: 32px; font-weight: 700; color: #dc2626;">${product.stock}</p>
                                <p style="margin: 4px 0 0; font-size: 12px; color: #6b7280;">units remaining</p>
                            </div>
                            <p style="margin: 20px 0 0; font-size: 13px; color: #9ca3af; text-align: center;">Please restock this item as soon as possible.</p>
                        </div>
                    </div>`
            });

        })
        return { alerted: true, product: product.name, stock: product.stock };
    },
);

// monthly offer email
const sendMonthlyOffers = inngest.createFunction(
    { id: "send-monthly-offers", name: "Monthly Offers", triggers: [cron("0 10 1 * *")] },
    async ({ step }) => {
        const { deals, users } = await step.run("fetch-deals-and-users", async () => {
            const products = await Product.find({
                stock: { $gt: 0 }
            }).sort({ originalPrice: -1 }).limit(6);

            const allUsers = await User.find({}, { name: 1, email: 1, _id: 0 });
            return { deals: products, users: allUsers };
        })

        if (users.length === 0 || deals.length === 0) {
            return { skipped: true, reason: "No users or deals" }
        }

        let sentCount = 0;

        const batchSize = 10;
        for (let i = 0; i < users.length; i += batchSize) {
            const batch = users.slice(i, i + batchSize);
            await step.run(`send-offers-batch-${i}`, async () => {
                for (const u of batch) {
                    await sendEmail({
                        to: u.email,
                        subject: 'Fresh picks just for you!',
                        body: `<div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 520px; margin: auto; border: 1px solid #e5e7eb; border-radius: 16px; overflow: hidden;">

                <div style="background: linear-gradient(135deg, #f97316, #fb923c); padding: 24px 28px;">
                    <h2 style="color: #fff; margin: 0; font-size: 20px;">Fresh Picks Just For You!</h2>
                    <p style="color: rgba(255,255,255,0.85); margin: 6px 0 0; font-size: 13px;">
                        Exclusive offers to kick off your month right
                    </p>
                </div>

                <div style="padding: 28px;">
                    <p style="margin: 0 0 20px; font-size: 15px; color: #374151;">
                        Hi <strong>${u.name}</strong>, check out this month's top picks!
                    </p>

                    <table width="100%" cellpadding="0" cellspacing="0">
                        ${deals
                                .reduce((rows, _, i) => {
                                    if (i % 3 === 0) {
                                        rows.push(deals.slice(i, i + 3));
                                    }
                                    return rows;
                                }, [])
                                .map(
                                    (row) => `
                                <tr>
                                    ${row
                                            .map(
                                                (p) => `
                                            <td style="width: 33%; padding: 8px; vertical-align: top;">
                                                <div style="border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden; text-align: center;">
                                                    ${p.image ? `<img src="${p.image}" alt="${p.name}" style="width: 100%; height: 100px; object-fit: cover;" />` : ""}
                                                    <div style="padding: 10px;">
                                                        <p style="margin: 0; font-size: 13px; font-weight: 600; color: #111827;">
                                                            ${p.name}
                                                        </p>
                                                        <p style="margin: 4px 0 0; font-size: 15px; font-weight: 700; color: #16a34a;">
                                                            $${p.price.toFixed(2)}
                                                            ${p.originalPrice > p.price ? `<span style="font-size: 11px; color: #9ca3af; text-decoration: line-through; margin-left: 4px;">$${p.originalPrice.toFixed(2)}</span>` : ""}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>`
                                            )
                                            .join("")}
                                </tr>`
                                )
                                .join("")}
                    </table>

                    <div style="text-align: center; margin-top: 24px;">
                        <a href="${process.env.CLIENT_URL || "http://localhost:5173"}/products"
                            style="display: inline-block; background: #16a34a; color: #fff; padding: 12px 32px; border-radius: 12px; text-decoration: none; font-weight: 600; font-size: 14px;">
                            Shop All Deals →
                        </a>
                    </div>
                </div>
            </div>`
                    })
                }
            })
            sentCount += batch.length;
        }
        return { sent: sentCount };
    }
)

// Auto-assign rider after 5 mins
const autoAssignRider = inngest.createFunction(
    { id: "auto-assign-rider", name: "Auto Assign Delivery Rider", triggers: [{ event: "order/placed" }] },
    async ({ event, step }) => {
        const { orderId } = event.data;

        await step.sleep('wait-5-min', '5m');

        const result = await step.run("assign-rider", async () => {
            const order = await Order.findById(orderId);

            if (!order) {
                return { skipped: true, reason: "Order not found" }
            }
            if (order.deliveryPartnerId) {
                return { skipped: true, reason: "Already assigned" }
            }
            if (["Cancelled", "Delivered"].includes(order.status)) {
                return { skipped: true, reason: `Order is ${order.status}` }
            }

            // find active rider who is available
            const busyOrders = await Order.find(
                {
                    status: { $in: ["Assigned", "Packed", "Out for Delivery"] },
                    deliveryPartnerId: { $ne: null }
                },
                {
                    deliveryPartnerId: 1
                }
            );

            const busyRiderIds = busyOrders.map(o => o.deliveryPartnerId);
            const availableRider = await DeliveryPartner.findOne({
                isActive: true,
                _id: { $nin: busyRiderIds }
            });

            if (!availableRider) return { skipped: true, reason: "No riders available" };

            const otp = Math.floor(100000 + Math.random() * 900000).toString();

            const history = (Array.isArray(order.statusHistory) ? order.statusHistory : []);
            history.push({
                status: "Assigned",
                note: `Auto-assigned to ${availableRider.name}`,
                timeStamp: new Date()
            })

            await Order.findByIdAndUpdate(
                orderId,
                {
                    $set: {
                        deliveryPartnerId: availableRider.id,
                        deliveryOtp: otp,
                        status: "Assigned",
                        statusHistory: history,
                    },
                },
                { new: true }
            );

            return { assigned: true, riderId: availableRider.id, riderName: availableRider.name, orderId: orderId }
        })
        return result
    }
)


// Create an empty array where we'll export future Inngest functions
export const functions = [sendWelcomeEmail, checkLowStock, sendMonthlyOffers, autoAssignRider];