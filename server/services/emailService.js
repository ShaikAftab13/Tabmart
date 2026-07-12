import transporter from "../config/nodemailer.js";

export const registerEmail = async (email, name) => {
    try {
        await transporter.sendMail({
            from: `"TabMart" <${process.env.SENDER_EMAIL}>`,
            to: email,
            subject: "🌿 Welcome to TabMart!",
            html: `
                <div style="margin:0;padding:0;background:#f5f8f4;font-family:Arial,Helvetica,sans-serif;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                            <td align="center" style="padding:40px 20px;">

                                <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 8px 25px rgba(0,0,0,.08);">

                                    <!-- Header -->
                                    <tr>
                                        <td align="center" style="background:#2E7D32;padding:35px 20px;">
                                            <h1 style="margin:0;color:#ffffff;font-size:34px;">
                                                🌿 TabMart
                                            </h1>
                                            <p style="margin:10px 0 0;color:#E8F5E9;font-size:16px;">
                                                Fresh • Fast • Delivered
                                            </p>
                                        </td>
                                    </tr>

                                    <!-- Body -->
                                    <tr>
                                        <td style="padding:40px 35px;color:#333333;">

                                            <h2 style="margin-top:0;color:#2E7D32;">
                                                Welcome, ${name}! 👋
                                            </h2>

                                            <p style="font-size:16px;line-height:28px;">
                                                Thank you for joining <strong>TabMart</strong>.
                                                We're excited to have you as part of our growing family.
                                            </p>

                                            <p style="font-size:16px;line-height:28px;">
                                                From fresh vegetables 🥦 and juicy fruits 🍎
                                                to everyday groceries 🛒, we're here to make
                                                shopping simple, fast and reliable.
                                            </p>

                                            <table width="100%" cellpadding="0" cellspacing="0" style="margin:35px 0;">
                                                <tr>
                                                    <td align="center">
                                                        <a href="https://tabmart.vercel.app/"
                                                            style="
                                                                background:#2E7D32;
                                                                color:#ffffff;
                                                                text-decoration:none;
                                                                padding:14px 34px;
                                                                border-radius:8px;
                                                                display:inline-block;
                                                                font-size:16px;
                                                                font-weight:bold;
                                                            ">
                                                            Start Shopping
                                                        </a>
                                                    </td>
                                                </tr>
                                            </table>

                                            <div style="
                                                background:#F1F8E9;
                                                border-left:5px solid #43A047;
                                                padding:18px;
                                                border-radius:8px;
                                            ">
                                                <strong style="color:#2E7D32;">
                                                    🌱 Why Shop with TabMart?
                                                </strong>

                                                <ul style="padding-left:20px;line-height:28px;color:#555;margin-bottom:0;">
                                                    <li>Fresh & quality products</li>
                                                    <li>Fast doorstep delivery</li>
                                                    <li>Secure online payments</li>
                                                    <li>Live order tracking</li>
                                                    <li>Friendly customer support</li>
                                                </ul>
                                            </div>

                                            <p style="margin-top:35px;font-size:16px;line-height:28px;">
                                                We can't wait to serve you.
                                                Happy shopping!
                                            </p>

                                            <p style="margin-top:30px;">
                                                <strong>Team TabMart 🌿</strong>
                                            </p>

                                        </td>
                                    </tr>

                                    <!-- Footer -->
                                    <tr>
                                        <td align="center" style="background:#F5F5F5;padding:25px;color:#777;font-size:13px;">
                                            © ${new Date().getFullYear()} TabMart. All rights reserved.
                                            <br><br>
                                            You're receiving this email because you created a TabMart account.
                                        </td>
                                    </tr>

                                </table>

                            </td>
                        </tr>
                    </table>
                </div>
            `,
        });
    } catch (error) {
        console.log("Email Error:", error.message);
    }
};


export const sendInngestEmail = async ({ to, subject, body }) => {
    const response = await transporter.sendMail({
        from: process.env.SENDER_EMAIL,
        to,
        subject,
        html: body
    });
    return response;
}