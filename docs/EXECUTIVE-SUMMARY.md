# VSA INDIA WEBSITE – EXECUTIVE SUMMARY

**Ngày:** 14/09/2026
**Phiên bản:** 1.0
**Người thực hiện:** Ban Công nghệ VSA India

---

## 1. TỔNG QUAN DỰ ÁN

Website chính thức của **Hội Sinh viên Việt Nam tại Ấn Độ (VSA India)** được xây dựng nhằm:
- Cung cấp cổng thông tin tập trung cho sinh viên Việt Nam tại Ấn Độ
- Quảng bá hoạt động, sự kiện của Hội
- Kết nối cộng đồng sinh viên trên khắp Ấn Độ
- Lưu trữ và chia sẻ kinh nghiệm, cẩm nang hữu ích

**Website chính thức:** https://svvntaiando.io.vn

---

## 2. MỤC TIÊU & PHẠM VI

### Mục tiêu
┌───┬─────────────────────────────────────────┬────────────────┐
| # |               Mục tiêu                  |   Trạng thái   |
├───┼─────────────────────────────────────────┼────────────────┤
| 1 | Giới thiệu chính thức về VSA India      | ✅ Hoàn thành |
| 2 | Hiển thị Ban Chấp hành & Cựu thành viên | ✅ Hoàn thành |
| 3 | Đăng tải hoạt động, tin tức, blog       | ✅ Hoàn thành |
| 4 | Cẩm nang sinh viên Việt Nam tại Ấn Độ   | ✅ Hoàn thành |
| 5 | Bản đồ phân bố sinh viên theo thành phố | ✅ Hoàn thành |
| 6 | Thư viện ảnh hoạt động                  | ✅ Hoàn thành |
| 7 | Form liên hệ hoạt động thật (gửi email) | ✅ Hoàn thành |
| 8 | Hỗ trợ song ngữ Việt - Anh              | ✅ Hoàn thành |
└───┴─────────────────────────────────────────┴────────────────┘

### Phạm vi
- **Đối tượng:** Sinh viên Việt Nam tại Ấn Độ, phụ huynh, đối tác
- **Ngôn ngữ:** Tiếng Việt + Tiếng Anh
- **Thiết bị:** Desktop, Tablet, Mobile

---

## 3. TÍNH NĂNG CHÍNH

### 3.1 Trang chủ
- **Hero Slider** tự động chạy ảnh hoạt động mới nhất
- Giới thiệu VSA India
- Hoạt động nổi bật (3 mới nhất)
- Tin tức mới nhất (3 mới nhất)
- Blog nổi bật
- Bản đồ preview
- Thư viện ảnh preview
- CTA tham gia

### 3.2 Các trang chức năng
┌───────────────┬─────────────────────────────────────────────────┐
| Trang         |                  Tính năng                      |
├───────────────┼─────────────────────────────────────────────────┤
| Về Hội        | Sứ mệnh, Tầm nhìn, Giá trị, Timeline            |
| Ban Chấp hành | Tab hiện tại / Cựu thành viên, modal chi tiết   |
| Hoạt động     | Danh sách, filter, phân trang, chi tiết         |
| Tin tức       | Danh sách, tin nổi bật, filter, phân trang      |
| Blog          | Danh sách, filter, phân trang, tác giả          |
| Cẩm nang      | Danh sách, filter theo danh mục                 |
| Bản đồ        | Leaflet map, marker theo thành phố              |
| Thư viện      | Album ảnh, lightbox                             |
| Liên hệ       | Thông tin, form gửi email thật, hỗ trợ khẩn cấp |
└───────────────┴─────────────────────────────────────────────────┘
### 3.3 Tính năng kỹ thuật
- ✅ Song ngữ Việt - Anh (chuyển đổi không reload)
- ✅ Responsive mọi thiết bị
- ✅ Loading animation (Charkha - bánh xe Ấn Độ)
- ✅ SEO cơ bản (meta tags, Open Graph)
- ✅ HTTPS (SSL Let's Encrypt)
- ✅ Bảo mật CSP, XSS Protection

---

## 4. KIẾN TRÚC HỆ THỐNG (NGẮN GỌN)
NGƯỜI DÙNG
↓ HTTPS
CLOUDFLARE (CDN + SSL + WAF)
↓ HTTP
GOOGLE CLOUD VM (VPS)
└── NGINX (Web Server)
├── / → Frontend (Static)
└── /api/ → Backend (Node.js)


### Công nghệ sử dụng
┌───────────────┬─────────────────────────────────────────────────┐
|   Thành phần  |                  Công nghệ                      |
├───────────────┼─────────────────────────────────────────────────┤
| Frontend      | HTML5, CSS3, Vanilla JavaScript                 |
| Backend       | Node.js + Express                               |
| Dữ liệu       | JSON files                                      |
| Bản đồ        | Leaflet.js + OpenStreetMap                      |
| Icon          | Font Awesome 6                                  |
| Font          | Google Fonts (Inter, Playfair Display)          |
| Web Server    | Nginx                                           |
| CDN           | Cloudflare                                      |
| SSL           | Let's Encrypt                                   |
| VPS           | Google Cloud VM                                 |
└───────────────┴─────────────────────────────────────────────────┘

---

## 5. CHI PHÍ VẬN HÀNH
┌───────────────────┬───────────────────┬───────────────────────────┐
|    Khoản mục      |   Chi phí/tháng   |         Ghi chú           |
├───────────────────┼───────────────────┼───────────────────────────┤
| Google Cloud VM   | ~$10-15           | e2-micro hoặc tương đương |
| Tên miền (.io.vn) | ~$1.7             | ~$20/năm                  |
| Cloudflare        | Miễn phí          | Gói Free                  |
| SSL               | Miễn phí          | Let's Encrypt             |
| **Tổng**          | **~$12-17/tháng** | Khoảng 300-450k VNĐ       |
└───────────────────┴───────────────────┴───────────────────────────┘

**So sánh:** Rẻ hơn nhiều so với thuê dịch vụ hosting + domain + SSL riêng lẻ (thường $20-30/tháng).

---

## 6. LỘ TRÌNH PHÁT TRIỂN

### Đã hoàn thành (Phase 1-6)
- ✅ Nền tảng website
- ✅ Tất cả trang chức năng
- ✅ Bản đồ, thư viện, song ngữ
- ✅ Form liên hệ hoạt động
- ✅ Deploy lên VPS + Cloudflare + SSL

### Kế hoạch tiếp theo (Phase 7+)
┌──────────┬────────────────────────────┬────────────────────────┐
| Phase    |         Nội dung           |  Ưu tiên   | Thời gian |
├──────────┼────────────────────────────┼────────────┼───────────┤
| Phase 7  | Forum frontend (UI)        | Trung bình | 1-2 tuần  |
| Phase 8  | SEO nâng cao + Performance | Cao        | 1 tuần    |
| Phase 9  | Forum backend (database)   | Thấp       | 3-4 tuần  |
| Phase 10 | CMS Admin Panel            | Thấp       | 2-3 tuần  |
| Phase 11 | Chatbot AI hỗ trợ          | Thấp       | 2-4 tuần  |
└──────────┴────────────────────────────┴────────────┴───────────┘
---

## 7. KẾT LUẬN & ĐỀ XUẤT

### Kết luận
Website VSA India đã **hoàn thành giai đoạn 1** với đầy đủ tính năng cần thiết cho một cổng thông tin chính thức. Hệ thống:
- ✅ Hoạt động ổn định, bảo mật tốt
- ✅ Chi phí vận hành thấp
- ✅ Dễ dàng mở rộng trong tương lai
- ✅ Trải nghiệm người dùng tốt

### Đề xuất
1. **Duy trì:** Cập nhật nội dung thường xuyên (hoạt động, tin tức)
2. **Mở rộng:** Xem xét thêm Forum backend khi cộng đồng đủ lớn
3. **Bảo trì:** Backup dữ liệu định kỳ (hàng tháng)
4. **Đào tạo:** Tập huấn cho Ban Truyền thông cách cập nhật nội dung

### Rủi ro cần lưu ý
┌──────────────┬────────────┬────────────────────────────┐
|    Rủi ro    |   Mức độ   |        Giải pháp           |
├──────────────┼────────────┼────────────────────────────┤
| VPS downtime | Thấp       | Cloudflare cache           |
| Mất dữ liệu  | Thấp       | Backup định kỳ             |
| Spam form    | Trung bình | Rate limiting, reCAPTCHA   |
| Bảo mật      | Thấp       | CSP, HTTPS, update định kỳ |
└──────────────┴────────────┴────────────────────────────┘
---

**Người lập:** Ban Công nghệ VSA India
**Ngày:** 14/09/2026