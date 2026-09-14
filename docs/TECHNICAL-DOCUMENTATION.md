# VSA INDIA WEBSITE – TECHNICAL DOCUMENTATION

**Ngày:** 14/09/2026
**Phiên bản:** 1.0
**Người thực hiện:** Ban Công nghệ VSA India

---
┌────────────────┬──────────────────────────────────┐
|                |                                  |
├────────────────┼──────────────────────────────────┤
└────────────────┴──────────────────────────────────┘

## 1. TỔNG QUAN KỸ THUẬT

### 1.1 Mục đích
Tài liệu này hướng dẫn cách:
- Cài đặt, triển khai website
- Cập nhật nội dung
- Bảo trì, xử lý lỗi
- Mở rộng tính năng

### 1.2 Đối tượng
- Developer / Maintainer website
- Ban Công nghệ VSA India

### 1.3 Công nghệ
┌────────────┬─────────────────────────┐
|   Layer    |      Công nghệ          |
├────────────┼─────────────────────────┤
| Frontend   | HTML5, CSS3, Vanilla JS |
| Backend    | Node.js, Express        |
| Data       | JSON                    |
| Map        | Leaflet.js              |
| Web Server | Nginx                   |
| CDN        | Cloudflare              |
| VPS        | Google Cloud            |
└────────────┴─────────────────────────┘
---

## 2. KIẾN TRÚC HỆ THỐNG

### 2.1 Sơ đồ tổng quan
NGƯỜI DÙNG
↓ HTTPS
CLOUDFLARE (CDN + SSL + WAF)
↓ HTTP
NGINX (Port 443 → 80)
├── / → /var/www/vsaindia/frontend/
└── /api/ → localhost:5000 (Node.js)


### 2.2 Luồng dữ liệu
1. User truy cập svvntaiando.io.vn

2. Cloudflare xử lý SSL, cache, bảo mật

3. Nginx nhận request

4. Nếu là static file → serve từ /frontend/

5. Nếu là /api/ → proxy đến Node.js backend

6. Backend xử lý (gửi email, v.v.) → trả về JSON

7. Nginx trả response về Cloudflare → User


### 2.3 Cấu trúc thư mục trên VPS
/var/www/vsaindia/
├── frontend/ # Website (HTML, CSS, JS)
│ ├── index.html
│ ├── css/style.css
│ ├── js/app.js
│ ├── data/ # 10 file JSON
│ │ ├── members.json
│ │ ├── alumni.json
│ │ ├── activities.json
│ │ ├── news.json
│ │ ├── blog.json
│ │ ├── guide.json
│ │ ├── cities.json
│ │ ├── gallery.json
│ │ ├── about.json
│ │ └── contact.json
│ └── assets/
│ ├── images/
│ └── icons/
│
└── backend/ # Node.js API
├── server.js
├── package.json
├── .env # (KHÔNG commit)
└── node_modules/


---

## 3. CÀI ĐẶT & TRIỂN KHAI

### 3.1 Yêu cầu hệ thống
- Ubuntu 22.04 / Debian 12
- Node.js 20+
- Nginx 1.18+
- Git

### 3.2 Cài đặt từ đầu

#### Bước 1: Cài Node.js
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
node --version  # Phải >= 20
```
#### Bước 2: Cài PM2
```bash
sudo npm install -g pm2
```
#### Bước 3: Clone code
```bash
sudo mkdir -p /var/www/vsaindia
sudo chown -R $USER:$USER /var/www/vsaindia
cd /var/www/vsaindia
git clone https://github.com/LKTNLAC/VSAI.git .
```
#### Bước 4: Cài Backend
```bash
cd /var/www/vsaindia/backend
npm install
```
#### Bước 5: Tạo .env
```bash
nano .env
```

Noi dung:
```bash
EMAIL_USER=vsaiishere@gmail.com
EMAIL_PASS=<App Password 16 ký tự>
PORT=5000
```
Quan trọng: EMAIL_PASS phải là App Password của Gmail, không phải mật khẩu thường.

Cách tạo App Password:

Bật 2-Step Verification: https://myaccount.google.com/security

Tạo App Password: https://myaccount.google.com/apppasswords

Chọn Mail + Other → Copy 16 ký tự

#### Bước 6: Chạy Backend
```bash
pm2 start server.js --name vsaindia-backend
pm2 save
pm2 startup  # Copy và chạy dòng lệnh được in ra
```
#### Bước 7: Cấu hình Nginx
```bash
sudo nano /etc/nginx/sites-available/vsaindia
```
Noi dung:
```bash
server {
    listen 80;
    listen [::]:80;
    server_name svvntaiando.io.vn www.svvntaiando.io.vn;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name svvntaiando.io.vn www.svvntaiando.io.vn;
    
    ssl_certificate /etc/letsencrypt/live/svvntaiando.io.vn/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/svvntaiando.io.vn/privkey.pem;
    
    root /var/www/vsaindia/frontend;
    index index.html;
    
    # Security Headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://unpkg.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com; font-src 'self' https://fonts.gstatic.com https://cdnjs.cloudflare.com; img-src 'self' data: blob: https://*.tile.openstreetmap.org https://cdnjs.cloudflare.com https://unpkg.com https://flagcdn.com; connect-src 'self' https://*.tile.openstreetmap.org; frame-ancestors 'none';" always;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    location /api/ {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```
#### Bước 8: SSL với Let's Encrypt
```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d svvntaiando.io.vn -d www.svvntaiando.io.vn
```
#### Bước 9: Khởi động Nginx
```bash
sudo ln -s /etc/nginx/sites-available/vsaindia /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```
#### Bước 10: Mở port trên Google Cloud
Vào VPC network → Firewall

Tạo rules cho tcp:80 và tcp:443

## 4. QUẢN LÝ DỮ LIỆU (JSON)
### 4.1 Cấu trúc chung
Tất cả file JSON đều là mảng các object. Mỗi object có id duy nhất.

### 4.2 Chi tiết từng file
#### members.json – Ban Chấp hành hiện tại
```json
{
  "id": 1,
  "name": "Bùi Hoàng Long",
  "position": "president",
  "image": "assets/images/members/1.jpg",
  "city": "Delhi",
  "birthday": "2000-05-15",
  "major": "Computer Science",
  "university": "Delhi University",
  "hometown": "Hà Nội, Việt Nam",
  "quote": { "vi": "...", "en": "..." },
  "bio": { "vi": "...", "en": "..." },
  "email": "...",
  "facebook": "...",
  "instagram": "...",
  "linkedin": "..."
}
```
Position values: president, vice_president, secretary, treasurer, commissioner, advisor

#### activities.json – Hoạt động
```json
{
  "id": 1,
  "title": { "vi": "...", "en": "..." },
  "date": "2026-01-31",
  "location": "Bihar, India",
  "category": "charity",
  "image": "assets/images/activities/1/1.jpg",
  "description": { "vi": [...], "en": [...] },
  "organizerId": 1
}
```
Category values: event, academic, culture, sports, community, external, charity

#### news.json – Tin tức
```json
{
  "id": 1,
  "title": { "vi": "...", "en": "..." },
  "date": "2026-09-01",
  "category": "announcement",
  "thumbnail": "...",
  "summary": { "vi": "...", "en": "..." },
  "content": { "vi": [...], "en": [...] },
  "featured": true
}
```
#### blog.json – Blog
```json
{
  "id": 1,
  "title": { "vi": "...", "en": "..." },
  "date": "2026-09-03",
  "authorId": 1,
  "category": "life",
  "image": "...",
  "excerpt": { "vi": "...", "en": "..." },
  "content": { "vi": [...], "en": [...] }
}
```
#### cities.json – Thành phố có sinh viên
```json
{
  "city": "Delhi",
  "students": 100,
  "universities": ["Delhi University", "JNU"],
  "representativeId": [1, 2, 6, 7],
  "lat": 28.6139,
  "lng": 77.2090
}
```
Lưu ý: representativeId có thể là số hoặc mảng số.

#### gallery.json – Thư viện ảnh
```json
{
  "id": 1,
  "activityId": 1,
  "title": { "vi": "...", "en": "..." },
  "date": "2026-10-15",
  "location": "Delhi",
  "category": "culture",
  "cover": "...",
  "photos": [
    {
      "src": "...",
      "caption": { "vi": "...", "en": "..." },
      "alt": "..."
    }
  ]
}
```
#### alumni.json – Cựu thành viên
Cấu trúc giống members.json + trường term:
```json
{
  "id": 1,
  "name": "...",
  "position": "...",
  "term": "2023-2024",
  "...": "..."
}
```
### 4.3 Quy tắc viết JSON
1. Bilingual: Mọi text hiển thị phải có {vi, en}

2. ID: Phải là số duy nhất

3. Ngày: Định dạng YYYY-MM-DD

4. Đường dẫn ảnh: Relative (không có http://)

5. Content: Mảng các đoạn văn hoặc block {type, value, src}

## 5. QUY TRÌNH CẬP NHẬT NỘI DUNG
### 5.1 Cập nhật qua Git (Khuyên dùng)
Trên máy local:
```bash
cd /path/to/VSAI
```
#### Sửa file JSON hoặc code
```bash
git add .
git commit -m "Update: thêm hoạt động mới"
git push origin main
```
Trên VPS:
```bash
cd /var/www/vsaindia
sudo git pull origin main
sudo systemctl restart nginx
```

Trên Cloudflare:
Purge Cache Everything

Trên trình duyệt:
Ctrl + Shift + R

### 5.2 Cập nhật trực tiếp trên VPS (Khẩn cấp)
```bash
nano /var/www/vsaindia/frontend/data/activities.json
```
#### Sửa nội dung
#### Ctrl+O → Enter → Ctrl+X

Sau đó cần:

Purge Cloudflare cache

Refresh trình duyệt

### 5.3 Thêm hoạt động mới
1. Tạo folder ảnh: assets/images/activities/<id>/

2. Upload ảnh: 1.jpg, 2.jpg, ...

3. Thêm object vào activities.json:
```json
{
  "id": <id_mới>,
  "title": { "vi": "...", "en": "..." },
  "date": "YYYY-MM-DD",
  "location": "...",
  "category": "...",
  "image": "assets/images/activities/<id>/1.jpg",
  "description": { "vi": [...], "en": [...] },
  "organizerId": <id_thành_viên>
}
```
## 6. BẢO TRÌ & TROUBLESHOOTING
### 6.1 Kiểm tra hệ thống

#### Kiểm tra backend
```bash
pm2 list
curl http://localhost:5000/api/health
```
#### Kiểm tra Nginx
```bash
sudo systemctl status nginx
sudo nginx -t
```
#### Kiểm tra disk
```bash
df -h
```
#### Kiểm tra RAM
```bash
free -h
```
### 6.2 Các lỗi thường gặp
┌─────────────────┬────────────────────────┬──────────────────────────────┐
|      Lỗi        |      Nguyên nhân       |          Cách sửa            |
├─────────────────┼────────────────────────┼──────────────────────────────┤ 
| 502 Bad Gateway | Backend dừng           | pm2 restart vsaindia-backend |
| 404 Not Found   | File không tồn tại     | Kiểm tra path, git pull      |
| EAUTH Gmail     | App Password sai       | Tạo App Password mới         |
| CSP chặn        | Thiếu domain trong CSP | Sửa Nginx CSP                |
| Marker ô vuông  | CSP thiếu cdnjs        | Thêm vào img-src             |
| Slide nhảy cóc  | Nhiều interval         | Check sliderInterval         |
└─────────────────┴────────────────────────┴──────────────────────────────┘
### 6.3 Restart toàn bộ hệ thống
#### Backend
```bash
pm2 restart vsaindia-backend
```
#### Nginx
```bash
sudo systemctl restart nginx
```
#### Kiểm tra
```bash
curl http://localhost:5000/api/health
curl -I https://svvntaiando.io.vn
```
### 6.4 Backup dữ liệu
#### Backup toàn bộ frontend data
```bash
cd /var/www/vsaindia
tar -czf ~/backup-vsaindia-$(date +%Y%m%d).tar.gz frontend/data/ backend/.env
```
#### Backup định kỳ (cron)
```bash
crontab -e
```
#### Thêm dòng:
```bash
0 2 * * 0 tar -czf ~/backup-vsaindia-$(date +\%Y\%m\%d).tar.gz /var/www/vsaindia/frontend/data/ /var/www/vsaindia/backend/.env
```
## 7. BẢO MẬT
### 7.1 Đã triển khai
✅ HTTPS (Let's Encrypt)

✅ Security Headers (CSP, XSS, Clickjacking)

✅ Rate Limiting (5 requests/15 phút/IP)

✅ App Password cho Gmail

✅ CORS giới hạn domain

✅ Cloudflare WAF

### 7.2 Khuyến nghị
□ Backup định kỳ hàng tuần
□ Update Node.js và dependencies định kỳ
□ Monitor log bất thường
□ Xoay App Password mỗi 6 tháng
### 7.3 Files KHÔNG commit lên Git
.env (chứa App Password)

node_modules/

Log files

## 8. PHỤ LỤC
### 8.1 Lệnh hữu ích

#### Xem log backend realtime
```bash
pm2 logs vsaindia-backend
```
#### Xem log Nginx
```bash
sudo tail -f /var/log/nginx/error.log
```
#### Test API
```bash
curl http://localhost:5000/api/health
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"t@t.com","subject":"Test","message":"Test"}'
```
#### Purge Cloudflare cache (dùng API)
```bash
curl -X POST "https://api.cloudflare.com/client/v4/zones/{ZONE_ID}/purge_cache" \
  -H "Authorization: Bearer {API_TOKEN}" \
  -H "Content-Type: application/json" \
  --data '{"purge_everything":true}'
```
### 8.2 Liên hệ hỗ trợ
Ban Công nghệ VSA India: [email]

Repository: https://github.com/LKTNLAC/VSAI

Website: https://svvntaiando.io.vn

### 8.3 Lịch sử phiên bản
┌───────────┬────────────┬──────────────────────────────────────┐
| Phiên bản |    Ngày    |           Thay đổi                   |
├───────────┼────────────┼──────────────────────────────────────┤ 
|  1.0      | 14/09/2026 | Hoàn thành Phase 1-6, deploy lên VPS |
└───────────┴────────────┴──────────────────────────────────────┘
Người lập: Ban Công nghệ VSA India
Ngày cập nhật cuối: 14/09/2026


---

## 📁 TÀI LIỆU README

**Tạo file:** `docs/README.md`

```markdown
# VSA India – Tài liệu dự án

Bộ tài liệu chính thức cho website **Hội Sinh viên Việt Nam tại Ấn Độ**.

## 📚 Danh sách tài liệu
┌────────────────────────────────────────────────────────────┬─────────────────────────┬───────────────────────────────────────────────┐
|                      Tài liệu                              |        Đối tượng        |               Nội dung                        |
├────────────────────────────────────────────────────────────┼─────────────────────────┼───────────────────────────────────────────────┤ 
| [EXECUTIVE-SUMMARY.md](./EXECUTIVE-SUMMARY.md)             | Ban Chấp hành, lãnh đạo | Tổng quan dự án, mục tiêu, chi phí, lộ trình  |
| [TECHNICAL-DOCUMENTATION.md](./TECHNICAL-DOCUMENTATION.md) | Developer, maintainer   | Cài đặt, triển khai, bảo trì, troubleshooting |
└────────────────────────────────────────────────────────────┴─────────────────────────┴───────────────────────────────────────────────┘
## 🚀 Bắt đầu nhanh

### Cho lãnh đạo
Đọc **EXECUTIVE-SUMMARY.md** để nắm tổng quan dự án.

### Cho developer
Đọc **TECHNICAL-DOCUMENTATION.md** để cài đặt và bảo trì.

## 🔗 Liên kết

- **Website:** https://svvntaiando.io.vn
- **Repository:** https://github.com/LKTNLAC/VSAI
- **Cloudflare:** https://dash.cloudflare.com

## 📞 Liên hệ

- **Ban Công nghệ VSA India:** [email]

📂 CẤU TRÚC THƯ MỤC HOÀN CHỈNH

VSAI/
├── frontend/
│   ├── index.html
│   ├── css/style.css
│   ├── js/app.js
│   ├── data/
│   └── assets/
├── backend/
│   ├── server.js
│   ├── package.json
│   └── .env
├── docs/
│   ├── README.md
│   ├── EXECUTIVE-SUMMARY.md
│   └── TECHNICAL-DOCUMENTATION.md
└── README.md

Push lên GitHub:
git add docs/
git commit -m "Add: technical & executive documentation"
git push origin main

Trên VPS:
cd /var/www/vsaindia
sudo git pull origin main