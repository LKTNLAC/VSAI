// ====================================================
// VSA INDIA – BACKEND SERVER
// ====================================================

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const rateLimit = require('express-rate-limit');
const nodemailer = require('nodemailer');
const axios = require('axios');
const crypto = require('crypto');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ====================================================
// MIDDLEWARE
// ====================================================

// CORS – cho phép frontend gọi API
app.use(cors({
    origin: [
        'http://localhost:5500',      // Live Server
        'http://localhost:3000',      // Local frontend
        'http://127.0.0.1:5500',
        'https://vsaindia.org',       // Domain thật
        'https://www.vsaindia.org'
    ],
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
}));

// Parse JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate Limiting – Chống spam
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 phút
    max: 5, // Tối đa 5 request từ 1 IP trong 15 phút
    message: {
        success: false,
        message: 'Quá nhiều yêu cầu. Vui lòng thử lại sau 15 phút.'
    }
});
app.use('/api/contact', limiter);

// ====================================================
// EMAIL CONFIG (SMTP)
// ====================================================

// Tạo transporter dùng Gmail (hoặc SMTP khác)
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,  // vsaiishere@gmail.com
        pass: process.env.EMAIL_PASS   // App Password (không dùng mật khẩu thường)
    }
});

// ====================================================
// OAUTH PROXY – Cho Decap CMS đăng nhập GitHub
// ====================================================

// Bước 1: Redirect user sang GitHub
app.get('/oauth', (req, res) => {
    const state = crypto.randomBytes(16).toString('hex');
    
    const params = new URLSearchParams({
        client_id: process.env.OAUTH_GITHUB_CLIENT_ID,
        redirect_uri: 'https://svvntaiando.io.vn/oauth/callback',
        scope: 'repo,user',
        state: state
    });
    
    console.log('[VSA OAuth] Redirecting to GitHub, state:', state);
    res.redirect(`https://github.com/login/oauth/authorize?${params.toString()}`);
});

// Bước 2: Nhận callback từ GitHub
app.get('/oauth/callback', async (req, res) => {
    const { code } = req.query;
    
    if (!code) {
        console.error('[VSA OAuth] No code received from GitHub');
        return res.status(400).send('Missing code from GitHub');
    }
    
    try {
        const tokenResponse = await axios.post(
            'https://github.com/login/oauth/access_token',
            {
                client_id: process.env.OAUTH_GITHUB_CLIENT_ID,
                client_secret: process.env.OAUTH_GITHUB_CLIENT_SECRET,
                code: code
            },
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }
        );
        
        const { access_token, error, error_description } = tokenResponse.data;
        
        if (error || !access_token) {
            console.error('[VSA OAuth] Token exchange failed:', error, error_description);
            return res.status(400).send(`OAuth error: ${error_description || error}`);
        }
        
        console.log('[VSA OAuth] ✅ Token exchange successful');
        
        // ⚠️ QUAN TRỌNG: Decap CMS nhận token qua postMessage
        // Trả về HTML với script postMessage cho opener window
        const tokenPayload = JSON.stringify({
            token: access_token,
            provider: 'github'
        });
        
        res.send(`<!doctype html>
<html>
<head>
    <meta charset="utf-8" />
    <title>Đang đăng nhập...</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            margin: 0;
            background: #f9f6f0;
            color: #2c2c2c;
        }
        .box { text-align: center; }
        .spinner {
            width: 40px; height: 40px;
            border: 3px solid #e5ddd2;
            border-top-color: #8B1A1A;
            border-radius: 50%;
            animation: spin 0.8s linear infinite;
            margin: 0 auto 16px;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        h1 { font-size: 18px; font-weight: 600; margin: 0 0 8px; }
        p { font-size: 14px; color: #6b6b6b; margin: 0; }
    </style>
</head>
<body>
    <div class="box">
        <div class="spinner"></div>
        <h1>Đang hoàn tất đăng nhập...</h1>
        <p>Cửa sổ này sẽ tự đóng sau giây lát.</p>
    </div>
    <script>
        (function() {
            var payload = ${tokenPayload};
            var message = 'authorization:github:success:' + JSON.stringify(payload);
            
            // Gửi token về cửa sổ cha (Decap CMS)
            function sendToken() {
                if (window.opener) {
                    window.opener.postMessage(message, '*');
                    console.log('[OAuth Callback] Token sent to opener');
                    setTimeout(function() { window.close(); }, 500);
                } else {
                    // Fallback: nếu không có opener, chuyển về /admin
                    console.warn('[OAuth Callback] No opener, redirecting...');
                    window.location.href = '/admin/';
                }
            }
            
            // Đợi 1 chút để chắc chắn opener đã ready
            setTimeout(sendToken, 300);
        })();
    </script>
</body>
</html>`);
        
    } catch (err) {
        console.error('[VSA OAuth] ❌ Error:', err.message);
        res.status(500).send(`OAuth server error: ${err.message}`);
    }
});

// Health check cho OAuth (debug)
app.get('/oauth/health', (req, res) => {
    res.json({
        ok: true,
        client_id_configured: !!process.env.OAUTH_GITHUB_CLIENT_ID,
        client_secret_configured: !!process.env.OAUTH_GITHUB_CLIENT_SECRET,
        timestamp: new Date().toISOString()
    });
});

// ====================================================
// API ROUTES
// ====================================================

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Contact form
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, phone, subject, message } = req.body;

        // Validation
        if (!name || !email || !subject || !message) {
            return res.status(400).json({
                success: false,
                message: 'Vui lòng điền đầy đủ thông tin.'
            });
        }

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: 'Email không hợp lệ.'
            });
        }

        // Email content - Gửi đến admin
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,  // Gửi đến chính mình
            subject: `[VSA India] ${subject}`,
            html: `
                <h2>📬 Tin nhắn mới từ VSA India</h2>
                <p><strong>👤 Họ tên:</strong> ${name}</p>
                <p><strong>📧 Email:</strong> ${email}</p>
                <p><strong>📱 SĐT:</strong> ${phone || 'Không cung cấp'}</p>
                <p><strong>📝 Tiêu đề:</strong> ${subject}</p>
                <hr />
                <h3>Nội dung:</h3>
                <p style="white-space: pre-wrap;">${message}</p>
                <hr />
                <p style="color: #888; font-size: 12px;">Gửi từ website VSA India</p>
            `,
            text: `
                📬 Tin nhắn mới từ VSA India

                👤 Họ tên: ${name}
                📧 Email: ${email}
                📱 SĐT: ${phone || 'Không cung cấp'}
                📝 Tiêu đề: ${subject}

                Nội dung:
                ${message}

                ---
                Gửi từ website VSA India
            `
        };

        // Gửi email
        await transporter.sendMail(mailOptions);

        // Auto-reply cho người gửi
        const autoReplyOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: '[VSA India] Cảm ơn bạn đã liên hệ',
            html: `
                <h2>Xin chào ${name}!</h2>
                <p>Cảm ơn bạn đã liên hệ với <strong>VSA India – Hội Sinh viên Việt Nam tại Ấn Độ</strong>.</p>
                <p>Chúng tôi đã nhận được tin nhắn của bạn và sẽ phản hồi trong thời gian sớm nhất (thường trong vòng 24-48 giờ).</p>
                <hr />
                <p style="color: #888; font-size: 12px;">
                    Đây là email tự động. Vui lòng không trả lời email này.<br />
                    Trường hợp khẩn cấp, vui lòng liên hệ trực tiếp với VSA India.
                </p>
            `,
            text: `
                Xin chào ${name}!

                Cảm ơn bạn đã liên hệ với VSA India – Hội Sinh viên Việt Nam tại Ấn Độ.

                Chúng tôi đã nhận được tin nhắn của bạn và sẽ phản hồi trong thời gian sớm nhất.

                ---
                Đây là email tự động. Vui lòng không trả lời email này.
            `
        };

        await transporter.sendMail(autoReplyOptions);

        res.json({
            success: true,
            message: 'Gửi tin nhắn thành công! VSA India sẽ phản hồi trong thời gian sớm nhất.'
        });

    } catch (error) {
        console.error('[VSA] Contact error:', error);
        res.status(500).json({
            success: false,
            message: 'Có lỗi xảy ra. Vui lòng thử lại sau.'
        });
    }
});

// ====================================================
// START SERVER
// ====================================================

app.listen(PORT, () => {
    console.log(`[VSA] 🚀 Backend server running on port ${PORT}`);
    console.log(`[VSA] 📧 Email: ${process.env.EMAIL_USER}`);
    console.log(`[VSA] ✅ Ready to receive contact messages`);
});