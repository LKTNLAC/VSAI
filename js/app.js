/* ====================================================
   VSA INDIA – APP.JS
   Phase 1-6: Full version with Map + Gallery FIXED
   ==================================================== */

// =====================================================
// 1. CONFIGURATION
// =====================================================

const CONFIG = {
    defaultLang: 'vi',
    storageKey: 'vsa-lang'
};

// =====================================================
// 2. STATE
// =====================================================

let state = {
    currentLang: localStorage.getItem(CONFIG.storageKey) || CONFIG.defaultLang,
    currentRoute: 'home',
    currentDetailId: null,
    data: {
        members: [],
        activities: [],
        news: [],
        blog: [],
        guide: [],
        cities: [],
        gallery: [],
        about: {}
    }
};

window.currentLang = state.currentLang;

// =====================================================
// 3. EMBEDDED DATA (fallback)
// =====================================================

const EMBEDDED_DATA = {
    members: [
        { id: 1, name: "Nguyễn Văn A (Mẫu)", position: "president", image: "assets/images/members/member-01.webp", city: "Delhi", bio: { vi: "[MẪU] Chủ tịch VSA India", en: "[SAMPLE] President" } },
        { id: 2, name: "Trần Thị B (Mẫu)", position: "vice_president", image: "assets/images/members/member-02.webp", city: "Pune", bio: { vi: "[MẪU] Phó Chủ tịch", en: "[SAMPLE] Vice President" } },
        { id: 3, name: "Lê Văn C (Mẫu)", position: "secretary", image: "assets/images/members/member-03.webp", city: "Delhi", bio: { vi: "[MẪU] Thư ký", en: "[SAMPLE] Secretary" } }
    ],
    activities: [
        { id: 1, title: { vi: "[MẪU] Giao lưu văn hóa Việt - Ấn", en: "[SAMPLE] Cultural Exchange" }, date: "2026-10-15", location: "Delhi", category: "culture", image: "assets/images/activities/activity-01.webp", description: { vi: ["[MẪU] Hoạt động giao lưu"], en: ["[SAMPLE] Cultural exchange"] }, organizerId: 1 },
        { id: 2, title: { vi: "[MẪU] Hội thảo học bổng", en: "[SAMPLE] Scholarship Seminar" }, date: "2026-11-05", location: "Online", category: "academic", image: "assets/images/activities/activity-02.webp", description: { vi: ["[MẪU] Hội thảo học bổng"], en: ["[SAMPLE] Scholarship seminar"] }, organizerId: 2 },
        { id: 3, title: { vi: "[MẪU] Giải bóng đá", en: "[SAMPLE] Football" }, date: "2026-12-01", location: "Delhi", category: "sports", image: "assets/images/activities/activity-03.webp", description: { vi: ["[MẪU] Giải bóng đá"], en: ["[SAMPLE] Football"] }, organizerId: 3 }
    ],
    news: [
        { id: 1, title: { vi: "[MẪU] VSA India ra mắt Mentorship", en: "[SAMPLE] Mentorship Launch" }, date: "2026-09-01", category: "announcement", thumbnail: "assets/images/news/news-01.webp", summary: { vi: "[MẪU] Chương trình Mentorship", en: "[SAMPLE] Mentorship program" }, content: { vi: ["[MẪU] Nội dung"], en: ["[SAMPLE] Content"] }, featured: true },
        { id: 2, title: { vi: "[MẪU] Hội thảo nghiên cứu", en: "[SAMPLE] Research Seminar" }, date: "2026-08-25", category: "event", thumbnail: "assets/images/news/news-02.webp", summary: { vi: "[MẪU] Hội thảo", en: "[SAMPLE] Seminar" }, content: { vi: ["[MẪU] Nội dung"], en: ["[SAMPLE] Content"] }, featured: false },
        { id: 3, title: { vi: "[MẪU] Tuyển thành viên BCH", en: "[SAMPLE] Recruitment" }, date: "2026-08-10", category: "announcement", thumbnail: "assets/images/news/news-03.webp", summary: { vi: "[MẪU] Tuyển thành viên", en: "[SAMPLE] Recruitment" }, content: { vi: ["[MẪU] Nội dung"], en: ["[SAMPLE] Content"] }, featured: false }
    ],
    blog: [
        { id: 1, title: { vi: "[MẪU] Kinh nghiệm sống tại Delhi", en: "[SAMPLE] Living in Delhi" }, date: "2026-09-03", authorId: 1, category: "life", image: "assets/images/blog/blog-01.webp", excerpt: { vi: "[MẪU] Chia sẻ về Delhi", en: "[SAMPLE] Living in Delhi" }, content: { vi: ["[MẪU] Nội dung"], en: ["[SAMPLE] Content"] }, featured: true },
        { id: 2, title: { vi: "[MẪU] Ẩm thực Ấn Độ", en: "[SAMPLE] Indian Cuisine" }, date: "2026-08-28", authorId: 2, category: "food", image: "assets/images/blog/blog-02.webp", excerpt: { vi: "[MẪU] Khám phá ẩm thực", en: "[SAMPLE] Food" }, content: { vi: ["[MẪU] Nội dung"], en: ["[SAMPLE] Content"] }, featured: false },
        { id: 3, title: { vi: "[MẪU] Hướng dẫn Delhi Metro", en: "[SAMPLE] Delhi Metro" }, date: "2026-08-20", authorId: 3, category: "travel", image: "assets/images/blog/blog-03.webp", excerpt: { vi: "[MẪU] Kinh nghiệm Metro", en: "[SAMPLE] Metro" }, content: { vi: ["[MẪU] Nội dung"], en: ["[SAMPLE] Content"] }, featured: false }
    ],
    guide: [
        { id: 1, title: { vi: "[MẪU] Hướng dẫn Visa", en: "[SAMPLE] Visa Guide" }, category: "visa", summary: { vi: "[MẪU] Hướng dẫn xin visa", en: "[SAMPLE] Visa guide" }, content: { vi: ["[MẪU] Nội dung"], en: ["[SAMPLE] Content"] }, updatedAt: "2026-09-01", order: 1 },
        { id: 2, title: { vi: "[MẪU] Mở tài khoản ngân hàng", en: "[SAMPLE] Bank Account" }, category: "banking", summary: { vi: "[MẪU] Mở tài khoản", en: "[SAMPLE] Open account" }, content: { vi: ["[MẪU] Nội dung"], en: ["[SAMPLE] Content"] }, updatedAt: "2026-08-20", order: 2 },
        { id: 3, title: { vi: "[MẪU] SIM & Internet", en: "[SAMPLE] SIM & Internet" }, category: "sim", summary: { vi: "[MẪU] Hướng dẫn SIM", en: "[SAMPLE] SIM guide" }, content: { vi: ["[MẪU] Nội dung"], en: ["[SAMPLE] Content"] }, updatedAt: "2026-08-15", order: 3 }
    ],
    cities: [
        { city: "Delhi", students: 35, universities: ["Delhi University", "JNU", "IIIT Delhi"], representativeId: 1, lat: 28.6139, lng: 77.2090 },
        { city: "Pune", students: 18, universities: ["Pune University", "Symbiosis"], representativeId: 2, lat: 18.5204, lng: 73.8567 },
        { city: "Mumbai", students: 12, universities: ["Mumbai University", "IIT Bombay"], representativeId: 3, lat: 19.0760, lng: 72.8777 },
        { city: "Bangalore", students: 10, universities: ["Bangalore University", "Christ University"], representativeId: null, lat: 12.9716, lng: 77.5946 },
        { city: "Hyderabad", students: 8, universities: ["Hyderabad University", "IIIT Hyderabad"], representativeId: null, lat: 17.3850, lng: 78.4867 }
    ],
    gallery: [
        { id: 1, activityId: 1, title: { vi: "[MẪU] Giao lưu văn hóa", en: "[SAMPLE] Cultural Exchange" }, date: "2026-10-15", location: "Delhi", category: "culture", cover: "assets/images/gallery/cover-01.webp", photos: [{ src: "assets/images/gallery/photo-01.webp", caption: { vi: "[MẪU] Ảnh 1", en: "[SAMPLE] Photo 1" }, alt: "Photo 1" }] },
        { id: 2, activityId: 3, title: { vi: "[MẪU] Giải bóng đá", en: "[SAMPLE] Football" }, date: "2026-12-01", location: "Delhi", category: "sports", cover: "assets/images/gallery/cover-02.webp", photos: [{ src: "assets/images/gallery/photo-02.webp", caption: { vi: "[MẪU] Ảnh 2", en: "[SAMPLE] Photo 2" }, alt: "Photo 2" }] }
    ],
    about: {
        page: {
            subtitle: "Kết nối – Hỗ trợ – Phát triển cộng đồng sinh viên Việt Nam tại Ấn Độ"
        },
        mission: {
            title: "Sứ mệnh",
            text: "Kết nối và hỗ trợ sinh viên Việt Nam tại Ấn Độ trong học tập, nghiên cứu, văn hóa và đời sống, góp phần xây dựng một cộng đồng sinh viên Việt Nam vững mạnh, đoàn kết và hội nhập quốc tế."
        },
        vision: {
            title: "Tầm nhìn",
            text: "Trở thành cầu nối vững chắc giữa sinh viên Việt Nam và Ấn Độ, là tổ chức đại diện uy tín cho sinh viên Việt Nam tại Ấn Độ, góp phần thúc đẩy hợp tác giáo dục và văn hóa giữa hai quốc gia."
        },
        values: {
            title: "Giá trị cốt lõi",
            "1": "🤝 Đoàn kết – Gắn kết cộng đồng sinh viên Việt Nam trên khắp Ấn Độ",
            "2": "📚 Học hỏi – Không ngừng trau dồi kiến thức và kỹ năng",
            "3": "🌏 Hội nhập – Tôn trọng và thích nghi với văn hóa Ấn Độ",
            "4": "💡 Sáng tạo – Đổi mới và phát triển các hoạt động cộng đồng"
        },
        page_title: "Giới thiệu về Hội Sinh viên Việt Nam tại Ấn Độ",
        timeline_title: "Lịch sử hình thành và phát triển",
        description: {
            vi: "Hội Sinh viên Việt Nam tại Ấn Độ (VSA India) được thành lập vào năm 2020, là tổ chức đại diện cho cộng đồng sinh viên Việt Nam đang học tập và sinh sống tại Ấn Độ. VSA India hoạt động với mục đích kết nối, hỗ trợ và tạo cơ hội cho sinh viên Việt Nam phát triển trong học tập, văn hóa và cộng đồng. Chúng tôi hoạt động trên tinh thần tự nguyện, phi lợi nhuận và vì lợi ích chung của cộng đồng. Với sự phát triển không ngừng, VSA India hiện có mặt tại nhiều thành phố lớn trên khắp Ấn Độ như Delhi, Mumbai, Pune, Bangalore, Hyderabad, Chennai, Kolkata và nhiều địa phương khác.",
            en: "The Vietnamese Students' Association in India (VSA India) was established in 2020 as the representative organization for the Vietnamese student community studying and living in India. VSA India operates with the purpose of connecting, supporting and creating opportunities for Vietnamese students to develop in academics, culture and community. We operate on a voluntary, non-profit basis for the common benefit of the community. With continuous development, VSA India is currently present in many major cities across India such as Delhi, Mumbai, Pune, Bangalore, Hyderabad, Chennai, Kolkata and many other localities."
        },
        history: {
            vi: "VSA India bắt đầu từ một nhóm nhỏ sinh viên Việt Nam tại Delhi vào năm 2020. Sau 5 năm phát triển, chúng tôi đã trở thành một tổ chức có mặt tại nhiều thành phố trên khắp Ấn Độ, với hàng trăm thành viên tham gia.",
            en: "VSA India started from a small group of Vietnamese students in Delhi in 2020. After 5 years of development, we have become an organization present in many cities across India with hundreds of participating members."
        },
        timeline: [
            { year: "2020", vi: "Thành lập VSA India tại Delhi", en: "VSA India founded in Delhi" },
            { year: "2021", vi: "Tổ chức Tết Nguyên Đán đầu tiên tại Ấn Độ", en: "First Lunar New Year celebration in India" },
            { year: "2022", vi: "Mở rộng mạng lưới đến 5 thành phố", en: "Expanded network to 5 cities" },
            { year: "2023", vi: "Ra mắt chương trình Mentorship dành cho tân sinh viên", en: "Launched Mentorship program for new students" },
            { year: "2024", vi: "Kỷ niệm 5 năm thành lập và ra mắt website chính thức", en: "5th Anniversary and official website launch" },
            { year: "2025", vi: "Mở rộng hợp tác với các tổ chức sinh viên quốc tế", en: "Expanded cooperation with international student organizations" }
        ]
    }
};

// =====================================================
// 4. DATA LOADING
// =====================================================

async function loadData() {
    const files = ['members', 'activities', 'news', 'blog', 'guide', 'cities', 'gallery','about'];
    const basePath = 'data/';
    
    for (const name of files) {
        try {
            const response = await fetch(`${basePath}${name}.json`);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            const data = await response.json();
            state.data[name] = data;
            console.log(`[VSA] ✅ Loaded ${name}.json: ${data.length} items`);
        } catch (err) {
            console.warn(`[VSA] ⚠️ Failed to load ${name}.json, using fallback:`, err);
            state.data[name] = EMBEDDED_DATA[name] || [];
        }
    }
}

// =====================================================
// 5. TRANSLATION
// =====================================================

const TRANSLATIONS = {
    vi: {
        nav: { home: 'Trang chủ', about: 'Về Hội', members: 'Ban Chấp hành', activities: 'Hoạt động', news: 'Tin tức', blog: 'Blog', guide: 'Cẩm nang', map: 'Bản đồ', gallery: 'Thư viện', forum: 'Forum', contact: 'Liên hệ' },
        headings: { home: 'VSA India', about: 'Về Hội Sinh viên Việt Nam tại Ấn Độ', members: 'Ban Chấp hành', activities: 'Hoạt động', news: 'Tin tức', blog: 'Blog', guide: 'Cẩm nang', map: 'Bản đồ cộng đồng', gallery: 'Thư viện ảnh', forum: 'Diễn đàn', contact: 'Liên hệ' },
        footer: { brand: 'VSA India', description: 'Hội Sinh viên Việt Nam tại Ấn Độ', rights: '2026 VSA India. All rights reserved.' },
        ui: { placeholder: 'Nội dung đang được cập nhật...', forumNote: 'Diễn đàn đang trong giai đoạn phát triển.', mapNote: 'Bản đồ sẽ hiển thị tại đây.', loading: 'Đang tải...', notFound: 'Không tìm thấy nội dung.', noResults: 'Không tìm thấy kết quả phù hợp.' },
        category: { all: 'Tất cả', event: 'Sự kiện', academic: 'Học thuật', culture: 'Văn hóa', sports: 'Thể thao', community: 'Cộng đồng', external: 'Đối ngoại', announcement: 'Thông báo', general: 'Chung', study: 'Học tập', life: 'Cuộc sống', travel: 'Du lịch', food: 'Ẩm thực', experience: 'Trải nghiệm', visa: 'Visa', residence: 'Chỗ ở', university: 'Trường học', banking: 'Ngân hàng', sim: 'SIM & Internet', transport: 'Di chuyển', healthcare: 'Y tế', shopping: 'Mua sắm', safety: 'An toàn', emergency: 'Khẩn cấp' },
        newsCategory: { announcement: 'Thông báo', event: 'Sự kiện', general: 'Chung' },
        blogCategory: { study: 'Học tập', life: 'Cuộc sống', culture: 'Văn hóa', travel: 'Du lịch', food: 'Ẩm thực', experience: 'Trải nghiệm' },
        guideCategory: { visa: 'Visa', residence: 'Chỗ ở', university: 'Trường học', banking: 'Ngân hàng', sim: 'SIM & Internet', transport: 'Di chuyển', healthcare: 'Y tế', food: 'Ẩm thực', shopping: 'Mua sắm', safety: 'An toàn', emergency: 'Khẩn cấp', culture: 'Văn hóa' },
        position: { president: 'Chủ tịch', vice_president: 'Phó Chủ tịch', secretary: 'Thư ký', treasurer: 'Thủ quỹ', member: 'Ủy viên', advisor: 'Cố vấn' },
        hero: { title: 'Kết nối sinh viên Việt Nam tại Ấn Độ', subtitle: 'Hội Sinh viên Việt Nam tại Ấn Độ – VSA India', cta: { activities: 'Xem hoạt động', about: 'Tìm hiểu thêm' } },
        about: 
        { 
            title: 'VSA India là gì?', 
            text1: 'Hội Sinh viên Việt Nam tại Ấn Độ (VSA India) là tổ chức đại diện cho cộng đồng sinh viên Việt Nam đang học tập và sinh sống tại Ấn Độ.', 
            text2: 'Chúng tôi kết nối, hỗ trợ và tạo cơ hội cho sinh viên Việt Nam tại Ấn Độ phát triển trong học tập, văn hóa và cộng đồng.', 
            cta: 'Tìm hiểu thêm về VSA India', 
            image: 'Ảnh hoạt động VSA India' },
        activities: { title: 'Hoạt động nổi bật', viewAll: 'Xem tất cả →', page: { subtitle: 'Các hoạt động và sự kiện của VSA India' } },
        news: { title: 'Tin tức mới nhất', viewAll: 'Xem tất cả →', page: { subtitle: 'Cập nhật mới nhất từ VSA India' }, featured: 'Tin nổi bật' },
        blog: { title: 'Bài viết nổi bật', viewAll: 'Xem tất cả →', page: { subtitle: 'Chia sẻ từ sinh viên Việt Nam tại Ấn Độ' }, author: 'Tác giả' },
        guide: { page: { subtitle: 'Hướng dẫn hữu ích cho sinh viên Việt Nam tại Ấn Độ' }, updated: 'Cập nhật lần cuối', noCategory: 'Không có danh mục' },
        map: { title: 'Bản đồ cộng đồng', subtitle: 'Sinh viên Việt Nam tại các thành phố Ấn Độ', viewAll: 'Xem chi tiết →' },
        gallery: { title: 'Thư viện ảnh', viewAll: 'Xem tất cả →', page: { subtitle: 'Những khoảnh khắc đáng nhớ của VSA India' } },
        cta: { title: 'Bạn đang học tập tại Ấn Độ?', text: 'Kết nối cùng cộng đồng sinh viên Việt Nam tại Ấn Độ.', cta: 'Tham gia ngay' },
        members: { subtitle: 'Những người đại diện cho cộng đồng sinh viên Việt Nam tại Ấn Độ', bioLabel: 'Giới thiệu' }
    },
    en: {
        nav: { home: 'Home', about: 'About', members: 'Executive Committee', activities: 'Activities', news: 'News', blog: 'Blog', guide: 'Guide', map: 'Map', gallery: 'Gallery', forum: 'Forum', contact: 'Contact' },
        headings: { home: 'VSA India', about: 'About VSA India', members: 'Executive Committee', activities: 'Activities', news: 'News', blog: 'Blog', guide: 'Guide', map: 'Community Map', gallery: 'Gallery', forum: 'Forum', contact: 'Contact' },
        footer: { brand: 'VSA India', description: 'Vietnamese Students\' Association in India', rights: '2026 VSA India. All rights reserved.' },
        ui: { placeholder: 'Content is being updated...', forumNote: 'Forum is under development.', mapNote: 'Map will be displayed here.', loading: 'Loading...', notFound: 'Content not found.', noResults: 'No matching results found.' },
        category: { all: 'All', event: 'Event', academic: 'Academic', culture: 'Culture', sports: 'Sports', community: 'Community', external: 'External', announcement: 'Announcement', general: 'General', study: 'Study', life: 'Life', travel: 'Travel', food: 'Food', experience: 'Experience', visa: 'Visa', residence: 'Residence', university: 'University', banking: 'Banking', sim: 'SIM & Internet', transport: 'Transport', healthcare: 'Healthcare', shopping: 'Shopping', safety: 'Safety', emergency: 'Emergency', culture: 'Culture' },
        newsCategory: { announcement: 'Announcement', event: 'Event', general: 'General' },
        blogCategory: { study: 'Study', life: 'Life', culture: 'Culture', travel: 'Travel', food: 'Food', experience: 'Experience' },
        guideCategory: { visa: 'Visa', residence: 'Residence', university: 'University', banking: 'Banking', sim: 'SIM & Internet', transport: 'Transport', healthcare: 'Healthcare', food: 'Food', shopping: 'Shopping', safety: 'Safety', emergency: 'Emergency', culture: 'Culture' },
        position: { president: 'President', vice_president: 'Vice President', secretary: 'Secretary', treasurer: 'Treasurer', member: 'Member', advisor: 'Advisor' },
        hero: { title: 'Connecting Vietnamese Students in India', subtitle: 'Vietnamese Students\' Association in India – VSA India', cta: { activities: 'View Activities', about: 'Learn More' } },
        about: { title: 'What is VSA India?', text1: 'The Vietnamese Students\' Association in India (VSA India) is the representative organization for Vietnamese students studying and living in India.', text2: 'We connect, support, and create opportunities for Vietnamese students in India to develop in academics, culture, and community.', cta: 'Learn More About VSA India', image: 'VSA India Activity' },
        activities: { title: 'Featured Activities', viewAll: 'View All →', page: { subtitle: 'VSA India activities and events' } },
        news: { title: 'Latest News', viewAll: 'View All →', page: { subtitle: 'Latest updates from VSA India' }, featured: 'Featured News' },
        blog: { title: 'Featured Blog Posts', viewAll: 'View All →', page: { subtitle: 'Sharing from Vietnamese students in India' }, author: 'Author' },
        guide: { page: { subtitle: 'Useful guide for Vietnamese students in India' }, updated: 'Last updated', noCategory: 'No category' },
        map: { title: 'Community Map', subtitle: 'Vietnamese Students in Indian Cities', viewAll: 'View Details →' },
        gallery: { title: 'Gallery', viewAll: 'View All →', page: { subtitle: 'Memorable moments of VSA India' } },
        cta: { title: 'Are you studying in India?', text: 'Connect with the Vietnamese student community in India.', cta: 'Join Now' },
        members: { subtitle: 'Representatives of the Vietnamese student community in India', bioLabel: 'About' }
    }
};

// =====================================================
// 6. HELPERS
// =====================================================

function t(key, lang = state.currentLang) {
    const keys = key.split('.');
    let value = TRANSLATIONS[lang];
    for (const k of keys) {
        if (value && value[k] !== undefined) value = value[k];
        else return key;
    }
    return typeof value === 'string' ? value : key;
}

function translateEnum(categoryType, key, lang = state.currentLang) {
    const map = TRANSLATIONS[lang]?.[categoryType];
    return map && map[key] ? map[key] : key;
}

function createElement(tag, attrs = {}, children = []) {
    const el = document.createElement(tag);
    Object.entries(attrs).forEach(([key, value]) => {
        if (key === 'className') el.className = value;
        else if (key === 'text') el.textContent = value;
        else el.setAttribute(key, value);
    });
    children.forEach(child => {
        if (typeof child === 'string') el.appendChild(document.createTextNode(child));
        else if (child instanceof Node) el.appendChild(child);
    });
    return el;
}

function renderParagraphs(contentArray, container) {
    if (!container) return;
    const fragment = document.createDocumentFragment();
    if (!contentArray || !Array.isArray(contentArray) || contentArray.length === 0) {
        const p = document.createElement('p');
        p.className = 'placeholder-text';
        p.textContent = t('ui.placeholder');
        fragment.appendChild(p);
    } else {
        contentArray.forEach(text => {
            const p = document.createElement('p');
            p.textContent = text;
            fragment.appendChild(p);
        });
    }
    container.replaceChildren(fragment);
}

function renderPlaceholder(container, messageKey = 'ui.placeholder') {
    if (!container) return;
    const p = document.createElement('p');
    p.className = 'placeholder-text';
    p.textContent = t(messageKey);
    container.replaceChildren(p);
}

function getContainer(section) {
    const map = {
        home: 'home-container',
        about: 'about-container',
        members: 'members-container',
        activities: 'activities-container',
        news: 'news-container',
        blog: 'blog-container',
        guide: 'guide-container',
        map: 'map-container',
        gallery: 'gallery-container',
        forum: 'forum-container',
        contact: 'contact-container'
    };
    return document.getElementById(map[section]);
}

// =====================================================
// 7. ROUTER
// =====================================================

function getRouteFromHash() {
    const hash = window.location.hash.slice(1) || 'home';
    const parts = hash.split('/');
    if (parts.length === 2 && !isNaN(parts[1])) {
        return { type: 'detail', section: parts[0], id: parseInt(parts[1], 10) };
    }
    return { type: 'section', section: hash };
}

function navigateTo(hash) {
    window.location.hash = hash;
}

function renderRoute() {
    const route = getRouteFromHash();
    const section = route.section;
    const validSections = ['home', 'about', 'members', 'activities', 'news', 'blog', 'guide', 'map', 'gallery', 'forum', 'contact'];

    if (!validSections.includes(section)) {
        window.location.hash = 'home';
        return;
    }

    document.querySelectorAll('.page-section').forEach(el => el.classList.remove('active'));

    const target = document.getElementById(section);
    if (target) {
        target.classList.add('active');
        state.currentRoute = section;

        if (route.type === 'detail' && route.id) {
            state.currentDetailId = route.id;
            renderSectionDetail(section, route.id);
        } else {
            state.currentDetailId = null;
            renderSection(section);
        }

        document.querySelectorAll('.nav-list a').forEach(el => {
            el.classList.toggle('active', el.getAttribute('data-nav') === section);
        });

        updateUILanguage();
    }
}

// =====================================================
// 8. NAVIGATION
// =====================================================

function renderNavigation() {
    const navList = document.getElementById('nav-list');
    if (!navList) return;

    const items = [
        { id: 'home', label: t('nav.home') },
        { id: 'about', label: t('nav.about') },
        { id: 'members', label: t('nav.members') },
        { id: 'activities', label: t('nav.activities') },
        { id: 'news', label: t('nav.news') },
        { id: 'blog', label: t('nav.blog') },
        { id: 'guide', label: t('nav.guide') },
        { id: 'map', label: t('nav.map') },
        { id: 'gallery', label: t('nav.gallery') },
        { id: 'forum', label: t('nav.forum') },
        { id: 'contact', label: t('nav.contact') }
    ];

    navList.replaceChildren();
    items.forEach(item => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = `#${item.id}`;
        a.setAttribute('data-nav', item.id);
        a.textContent = item.label;
        if (state.currentRoute === item.id) a.classList.add('active');
        a.addEventListener('click', (e) => {
            e.preventDefault();
            navigateTo(`#${item.id}`);
            closeMobileMenu();
        });
        li.appendChild(a);
        navList.appendChild(li);
    });
}

function renderFooterLinks() {
    const container = document.getElementById('footer-links');
    if (!container) return;
    const links = ['home', 'about', 'contact'];
    const labels = { home: t('nav.home'), about: t('nav.about'), contact: t('nav.contact') };
    container.replaceChildren();
    links.forEach(id => {
        const a = document.createElement('a');
        a.href = `#${id}`;
        a.textContent = labels[id];
        a.addEventListener('click', (e) => {
            e.preventDefault();
            navigateTo(`#${id}`);
        });
        container.appendChild(a);
    });
}

function updateUILanguage() {
    renderNavigation();
    renderFooterLinks();

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        el.textContent = t(key);
    });

    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === state.currentLang);
    });

    document.querySelectorAll('.filter-btn').forEach(btn => {
        const key = btn.getAttribute('data-i18n');
        if (key) btn.textContent = t(key);
    });

    switch (state.currentRoute) {
        case 'home':
            renderHomeActivities(document.getElementById('home-activities-container'));
            renderHomeNews(document.getElementById('home-news-container'));
            renderHomeBlog(document.getElementById('home-blog-container'));
            renderHomeGallery(document.getElementById('home-gallery-container'));
            setTimeout(() => {
                renderHomeMap();
                const homeInfo = document.getElementById('home-map-info');
                if (homeInfo) renderHomeMapInfo(homeInfo);
            }, 500);
            break;
        case 'about':
            // GỌI renderAbout() THAY VÌ renderAbout(container)
            renderAbout();
            break;
        case 'members':
            renderMembers(document.getElementById('members-container'));
            break;
        case 'activities':
            renderActivities(document.getElementById('activities-container'));
            break;
        case 'news':
            renderNews(document.getElementById('news-container'));
            renderFeaturedNews(document.getElementById('news-featured-container'));
            break;
        case 'blog':
            renderBlog(document.getElementById('blog-container'));
            break;
        case 'guide':
            renderGuide(document.getElementById('guide-container'));
            break;
        case 'map':
            renderMap(document.getElementById('map-container'));
            break;
        case 'gallery':
            renderGallery(document.getElementById('gallery-container'));
            break;
        case 'forum':
            renderForum(document.getElementById('forum-container'));
            break;
        case 'contact':
            renderContact(document.getElementById('contact-container'));
            break;
        default:
            break;
    }

    if (state.currentDetailId) {
        renderSectionDetail(state.currentRoute, state.currentDetailId);
    }
}

function initNavigation() {
    renderNavigation();
    renderFooterLinks();

    const toggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.main-nav');
    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            const isOpen = toggle.classList.toggle('open');
            nav.classList.toggle('open');
            toggle.setAttribute('aria-expanded', isOpen);
        });
    }

    document.addEventListener('click', (e) => {
        const nav = document.querySelector('.main-nav');
        const toggle = document.querySelector('.menu-toggle');
        if (!nav || !toggle) return;
        if (nav.classList.contains('open')) {
            const isClickInside = nav.contains(e.target) || toggle.contains(e.target);
            if (!isClickInside) closeMobileMenu();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeMobileMenu();
    });
}

function closeMobileMenu() {
    const toggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.main-nav');
    if (toggle) {
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
    }
    if (nav) nav.classList.remove('open');
}

// =====================================================
// 9. HOME SECTIONS
// =====================================================

function renderHomeActivities(container) {
    if (!container) return;
    const data = state.data.activities;
    if (!data || data.length === 0) { renderPlaceholder(container, 'ui.placeholder'); return; }
    const items = data.slice(0, 3);
    const fragment = document.createDocumentFragment();
    items.forEach(activity => {
        const card = document.createElement('div');
        card.className = 'activity-card';
        const title = document.createElement('h3');
        title.textContent = activity.title[state.currentLang] || activity.title.vi;
        card.appendChild(title);
        const date = document.createElement('p');
        date.className = 'text-sm text-muted';
        date.textContent = activity.date;
        card.appendChild(date);
        const category = document.createElement('p');
        category.className = 'text-xs';
        category.textContent = translateEnum('category', activity.category);
        card.appendChild(category);
        card.style.cursor = 'pointer';
        card.addEventListener('click', () => navigateTo(`#activities/${activity.id}`));
        fragment.appendChild(card);
    });
    container.replaceChildren(fragment);
}

function renderHomeNews(container) {
    if (!container) return;
    const data = state.data.news;
    if (!data || data.length === 0) { renderPlaceholder(container, 'ui.placeholder'); return; }
    const items = data.slice(0, 3);
    const fragment = document.createDocumentFragment();
    items.forEach(item => {
        const card = document.createElement('div');
        card.className = 'news-card';
        const title = document.createElement('h3');
        title.textContent = item.title[state.currentLang] || item.title.vi;
        card.appendChild(title);
        if (item.summary) {
            const summary = document.createElement('p');
            summary.className = 'text-muted text-sm';
            summary.textContent = (item.summary[state.currentLang] || item.summary.vi).substring(0, 120) + '...';
            card.appendChild(summary);
        }
        const date = document.createElement('p');
        date.className = 'text-xs';
        date.textContent = item.date;
        card.appendChild(date);
        card.style.cursor = 'pointer';
        card.addEventListener('click', () => navigateTo(`#news/${item.id}`));
        fragment.appendChild(card);
    });
    container.replaceChildren(fragment);
}

function renderHomeBlog(container) {
    if (!container) return;
    const data = state.data.blog;
    if (!data || data.length === 0) { renderPlaceholder(container, 'ui.placeholder'); return; }
    const items = data.slice(0, 3);
    const fragment = document.createDocumentFragment();
    items.forEach(item => {
        const card = document.createElement('div');
        card.className = 'blog-card';
        const title = document.createElement('h3');
        title.textContent = item.title[state.currentLang] || item.title.vi;
        card.appendChild(title);
        if (item.excerpt) {
            const excerpt = document.createElement('p');
            excerpt.className = 'text-muted text-sm';
            excerpt.textContent = (item.excerpt[state.currentLang] || item.excerpt.vi).substring(0, 120) + '...';
            card.appendChild(excerpt);
        }
        const date = document.createElement('p');
        date.className = 'text-xs';
        date.textContent = item.date;
        card.appendChild(date);
        card.style.cursor = 'pointer';
        card.addEventListener('click', () => navigateTo(`#blog/${item.id}`));
        fragment.appendChild(card);
    });
    container.replaceChildren(fragment);
}

function renderHomeGallery(container) {
    if (!container) return;
    const data = state.data.gallery;
    if (!data || data.length === 0 || !data[0]?.photos) {
        const fragment = document.createDocumentFragment();
        for (let i = 0; i < 4; i++) {
            const item = document.createElement('div');
            item.className = 'gallery-item';
            if (i === 0) { item.style.gridColumn = 'span 2'; item.style.gridRow = 'span 2'; }
            const placeholder = document.createElement('span');
            placeholder.textContent = '📷';
            item.appendChild(placeholder);
            fragment.appendChild(item);
        }
        container.replaceChildren(fragment);
        return;
    }
    const album = data[0];
    const photos = album.photos.slice(0, 4);
    const fragment = document.createDocumentFragment();
    photos.forEach((photo, index) => {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        if (index === 0 && photos.length > 1) { item.style.gridColumn = 'span 2'; item.style.gridRow = 'span 2'; }
        const placeholder = document.createElement('span');
        placeholder.textContent = '📷';
        item.appendChild(placeholder);
        item.style.cursor = 'pointer';
        item.addEventListener('click', () => navigateTo('#gallery'));
        fragment.appendChild(item);
    });
    container.replaceChildren(fragment);
}

// =====================================================
// 9e. HOME MAP PREVIEW (FIXED)
// =====================================================

let homeMapInstance = null;
let homeMapRetryCount = 0;
const HOME_MAP_MAX_RETRY = 5;

function renderHomeMap() {
    const mapContainer = document.getElementById('home-vsa-map');
    if (!mapContainer) {
        console.warn('[VSA] ⚠️ home-vsa-map not found');
        return;
    }

    const rect = mapContainer.getBoundingClientRect();
    console.log('[VSA] Home map container size:', rect.width, 'x', rect.height);

    if (rect.width === 0 || rect.height === 0) {
        console.warn('[VSA] ⚠️ Home map container hidden, retrying...');
        if (homeMapRetryCount < HOME_MAP_MAX_RETRY) {
            homeMapRetryCount++;
            setTimeout(renderHomeMap, 500);
        }
        return;
    }

    // Nếu Leaflet chưa tải, tải nó lên
    if (typeof L === 'undefined') {
        console.log('[VSA] ⏳ Leaflet not loaded, loading for home map...');
        loadLeafletWithRetry().then(() => {
            console.log('[VSA] ✅ Leaflet loaded, rendering home map...');
            setTimeout(() => {
                homeMapRetryCount = 0;
                renderHomeMap();
            }, 200);
        }).catch(err => {
            console.error('[VSA] ❌ Failed to load Leaflet for home map:', err);
        });
        return;
    }

    // Xóa map cũ nếu có
    if (homeMapInstance) {
        homeMapInstance.remove();
        homeMapInstance = null;
    }

    try {
        // Fix marker icon
        if (L.Icon && L.Icon.Default) {
            delete L.Icon.Default.prototype._getIconUrl;
            L.Icon.Default.mergeOptions({
                iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
                iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
                shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
            });
        }

        homeMapInstance = L.map('home-vsa-map', {
            center: [20.5937, 78.9629],
            zoom: 5,
            zoomControl: false,
            attributionControl: false,
            dragging: false,
            scrollWheelZoom: false,
            touchZoom: false,
            doubleClickZoom: false
        });
        console.log('[VSA] ✅ Home map instance created');

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap',
            maxZoom: 18
        }).addTo(homeMapInstance);
        console.log('[VSA] ✅ Home tile layer added');

        const cities = state.data.cities || [];
        const markerData = [];
        cities.forEach(city => {
            if (city.lat && city.lng && city.lat !== 0 && city.lng !== 0) {
                L.marker([city.lat, city.lng])
                    .addTo(homeMapInstance)
                    .bindPopup(city.city);
                markerData.push([city.lat, city.lng]);
            }
        });

        if (markerData.length > 0) {
            homeMapInstance.fitBounds(markerData, { padding: [30, 30] });
        }
        console.log(`[VSA] ✅ Added ${markerData.length} home markers`);

        setTimeout(() => {
            if (homeMapInstance) {
                homeMapInstance.invalidateSize();
                console.log('[VSA] ✅ Home map resized');
            }
        }, 300);

    } catch (err) {
        console.error('[VSA] ❌ Home map error:', err);
        mapContainer.innerHTML = `<p style="padding:2rem;text-align:center;color:#999;">⚠️ ${err.message}</p>`;
    }
}

// =====================================================
// 9f. HOME MAP INFO
// =====================================================

function renderHomeMapInfo(container) {
    console.log('[VSA] 📍 renderHomeMapInfo() called');
    
    if (!container) {
        container = document.getElementById('home-map-info');
    }
    
    if (!container) {
        console.warn('[VSA] ⚠️ Home map info container not found');
        return;
    }
    
    const cities = state.data.cities;
    if (!cities || cities.length === 0) {
        renderPlaceholder(container, 'ui.placeholder');
        return;
    }
    
    const fragment = document.createDocumentFragment();
    
    const title = document.createElement('p');
    title.className = 'text-sm text-muted';
    title.textContent = '📍 Các thành phố có sinh viên Việt Nam';
    fragment.appendChild(title);
    
    const grid = document.createElement('div');
    grid.className = 'map-info-grid';
    
    const displayCities = cities.slice(0, 4);
    displayCities.forEach(city => {
        const item = document.createElement('div');
        item.className = 'map-info-item';
        
        const name = document.createElement('div');
        name.className = 'city-name';
        name.textContent = city.city;
        item.appendChild(name);
        
        const detail = document.createElement('div');
        detail.className = 'city-detail';
        detail.textContent = `👨‍🎓 ${city.students || 0} sinh viên`;
        item.appendChild(detail);
        
        grid.appendChild(item);
    });
    
    fragment.appendChild(grid);
    container.replaceChildren(fragment);
    console.log('[VSA] ✅ Home map info rendered');
}

// =====================================================
// 10. ABOUT – RENDER TOÀN BỘ TRANG ABOUT
// =====================================================

function renderAbout() {
    const data = state.data.about;
    const lang = state.currentLang;
    
    // 1. Page title
    const pageTitle = document.getElementById('about-page-title');
    if (pageTitle) {
        if (data && data.page_title) {
            if (typeof data.page_title === 'object' && data.page_title[lang]) {
                pageTitle.textContent = data.page_title[lang];
            } else if (typeof data.page_title === 'string') {
                pageTitle.textContent = data.page_title;
            } else {
                pageTitle.textContent = lang === 'vi' ? 'Giới thiệu về Hội Sinh viên Việt Nam tại Ấn Độ' : 'About Vietnamese Students\' Association in India';
            }
        } else {
            pageTitle.textContent = lang === 'vi' ? 'Giới thiệu về Hội Sinh viên Việt Nam tại Ấn Độ' : 'About Vietnamese Students\' Association in India';
        }
    }
    
    // 2. Page subtitle
    const pageSubtitle = document.getElementById('about-page-subtitle');
    if (pageSubtitle) {
        if (data && data.page && data.page.subtitle) {
            if (typeof data.page.subtitle === 'object' && data.page.subtitle[lang]) {
                pageSubtitle.textContent = data.page.subtitle[lang];
            } else {
                pageSubtitle.textContent = data.page.subtitle;
            }
        } else {
            pageSubtitle.textContent = lang === 'vi' 
                ? 'Kết nối – Hỗ trợ – Phát triển cộng đồng sinh viên Việt Nam tại Ấn Độ'
                : 'Connect – Support – Develop the Vietnamese student community in India';
        }
    }
    
    // 3. Mission, Vision, Values container
    const missionContainer = document.getElementById('about-mission-container');
    if (missionContainer) {
        renderMissionVisionValues(missionContainer);
    }
    
    // 4. Description title (Giới thiệu VSA India)
    const descTitle = document.getElementById('about-page-title-2');
    if (descTitle) {
        descTitle.textContent = lang === 'vi' ? 'Giới thiệu VSA India' : 'About VSA India';
    }
    
    // 5. Description container
    const descContainer = document.getElementById('about-container');
    if (descContainer) {
        renderAboutDescription(descContainer);
    }
    
    // 6. Timeline title
    const timelineTitle = document.getElementById('about-timeline-title');
    if (timelineTitle) {
        if (data && data.timeline_title) {
            if (typeof data.timeline_title === 'object' && data.timeline_title[lang]) {
                timelineTitle.textContent = data.timeline_title[lang];
            } else {
                timelineTitle.textContent = data.timeline_title;
            }
        } else {
            timelineTitle.textContent = lang === 'vi' ? 'Lịch sử hình thành và phát triển' : 'History and Development';
        }
    }
    
    // 7. Timeline container
    const timelineContainer = document.getElementById('about-timeline-container');
    if (timelineContainer) {
        renderTimeline(timelineContainer);
    }
}

// =====================================================
// 10a. RENDER MISSION, VISION, VALUES
// =====================================================

function renderMissionVisionValues(container) {
    const data = state.data.about;
    if (!data || !data.mission) {
        renderPlaceholder(container, 'ui.placeholder');
        return;
    }
    
    const fragment = document.createDocumentFragment();
    const lang = state.currentLang;
    
    // === MISSION ===
    const missionCard = document.createElement('div');
    missionCard.className = 'mission-card';
    
    const missionTitle = document.createElement('h3');
    // Lấy title theo ngôn ngữ
    if (data.mission.title && typeof data.mission.title === 'object' && data.mission.title[lang]) {
        missionTitle.textContent = data.mission.title[lang];
    } else if (typeof data.mission.title === 'string') {
        missionTitle.textContent = data.mission.title;
    } else {
        missionTitle.textContent = lang === 'vi' ? 'Sứ mệnh' : 'Mission';
    }
    missionCard.appendChild(missionTitle);
    
    const missionText = document.createElement('p');
    // Lấy text theo ngôn ngữ
    if (data.mission.text && typeof data.mission.text === 'object' && data.mission.text[lang]) {
        missionText.textContent = data.mission.text[lang];
    } else if (typeof data.mission.text === 'string') {
        missionText.textContent = data.mission.text;
    } else {
        missionText.textContent = '';
    }
    missionCard.appendChild(missionText);
    fragment.appendChild(missionCard);
    
    // === VISION ===
    const visionCard = document.createElement('div');
    visionCard.className = 'mission-card';
    
    const visionTitle = document.createElement('h3');
    if (data.vision.title && typeof data.vision.title === 'object' && data.vision.title[lang]) {
        visionTitle.textContent = data.vision.title[lang];
    } else if (typeof data.vision.title === 'string') {
        visionTitle.textContent = data.vision.title;
    } else {
        visionTitle.textContent = lang === 'vi' ? 'Tầm nhìn' : 'Vision';
    }
    visionCard.appendChild(visionTitle);
    
    const visionText = document.createElement('p');
    if (data.vision.text && typeof data.vision.text === 'object' && data.vision.text[lang]) {
        visionText.textContent = data.vision.text[lang];
    } else if (typeof data.vision.text === 'string') {
        visionText.textContent = data.vision.text;
    } else {
        visionText.textContent = '';
    }
    visionCard.appendChild(visionText);
    fragment.appendChild(visionCard);
    
    // === VALUES ===
    const valuesCard = document.createElement('div');
    valuesCard.className = 'mission-card';
    
    const valuesTitle = document.createElement('h3');
    if (data.values.title && typeof data.values.title === 'object' && data.values.title[lang]) {
        valuesTitle.textContent = data.values.title[lang];
    } else if (typeof data.values.title === 'string') {
        valuesTitle.textContent = data.values.title;
    } else {
        valuesTitle.textContent = lang === 'vi' ? 'Giá trị cốt lõi' : 'Core Values';
    }
    valuesCard.appendChild(valuesTitle);
    
    const valuesList = document.createElement('ul');
    valuesList.className = 'value-list';
    
    // Lấy các giá trị (1, 2, 3, 4) - hiện tại đang là string, nhưng có thể là object trong tương lai
    const valueKeys = Object.keys(data.values).filter(k => k !== 'title');
    valueKeys.forEach(key => {
        const li = document.createElement('li');
        const val = data.values[key];
        if (typeof val === 'object' && val[lang]) {
            li.textContent = val[lang];
        } else {
            li.textContent = val || '';
        }
        valuesList.appendChild(li);
    });
    valuesCard.appendChild(valuesList);
    fragment.appendChild(valuesCard);
    
    container.replaceChildren(fragment);
}

// =====================================================
// 10b. RENDER ABOUT DESCRIPTION
// =====================================================

function renderAboutDescription(container) {
    const data = state.data.about;
    if (!data || !data.description) {
        renderPlaceholder(container, 'ui.placeholder');
        return;
    }
    
    const fragment = document.createDocumentFragment();
    const lang = state.currentLang;
    
    // Description
    const desc = document.createElement('p');
    if (typeof data.description === 'object' && data.description[lang]) {
        desc.textContent = data.description[lang];
    } else if (typeof data.description === 'string') {
        desc.textContent = data.description;
    } else {
        desc.textContent = '';
    }
    fragment.appendChild(desc);
    
    // History
    if (data.history) {
        const historyTitle = document.createElement('h3');
        historyTitle.textContent = lang === 'vi' ? '📜 Lịch sử phát triển' : '📜 History';
        historyTitle.style.marginTop = 'var(--space-lg)';
        fragment.appendChild(historyTitle);
        
        const historyText = document.createElement('p');
        if (typeof data.history === 'object' && data.history[lang]) {
            historyText.textContent = data.history[lang];
        } else if (typeof data.history === 'string') {
            historyText.textContent = data.history;
        } else {
            historyText.textContent = '';
        }
        fragment.appendChild(historyText);
    }
    
    container.replaceChildren(fragment);
}

// =====================================================
// 10c. RENDER TIMELINE
// =====================================================

function renderTimeline(container) {
    const data = state.data.about;
    if (!data || !data.timeline || data.timeline.length === 0) {
        renderPlaceholder(container, 'ui.placeholder');
        return;
    }
    
    const fragment = document.createDocumentFragment();
    const lang = state.currentLang;
    
    data.timeline.forEach(event => {
        const item = document.createElement('div');
        item.className = 'timeline-item';
        
        const year = document.createElement('span');
        year.className = 'timeline-year';
        year.textContent = event.year;
        item.appendChild(year);
        
        const desc = document.createElement('span');
        desc.className = 'timeline-desc';
        // Lấy theo ngôn ngữ hiện tại
        if (event[lang]) {
            desc.textContent = event[lang];
        } else if (event.vi) {
            desc.textContent = event.vi;
        } else {
            desc.textContent = '';
        }
        item.appendChild(desc);
        
        fragment.appendChild(item);
    });
    
    container.replaceChildren(fragment);
}

// =====================================================
// 11. MEMBERS
// =====================================================

function renderMembers(container) {
    if (!container) return;
    const data = state.data.members;
    if (!data || data.length === 0) { renderPlaceholder(container, 'ui.placeholder'); return; }
    const positionOrder = { president: 0, vice_president: 1, secretary: 2, treasurer: 3, member: 4, advisor: 5 };
    const sorted = [...data].sort((a, b) => (positionOrder[a.position] ?? 99) - (positionOrder[b.position] ?? 99));
    const fragment = document.createDocumentFragment();
    sorted.forEach(member => {
        const card = document.createElement('div');
        card.className = 'member-card';
        const imgContainer = document.createElement('div');
        imgContainer.className = 'member-image';
        const img = document.createElement('img');
        img.src = member.image || 'assets/images/members/placeholder.webp';
        img.alt = member.name;
        img.loading = 'lazy';
        img.onerror = function() {
            this.style.display = 'none';
            this.parentElement.textContent = '👤';
            this.parentElement.style.cssText = 'display:flex;align-items:center;justify-content:center;font-size:3rem;background:var(--color-surface-alt);border-radius:var(--radius-md);aspect-ratio:1/1;';
        };
        imgContainer.appendChild(img);
        card.appendChild(imgContainer);
        const name = document.createElement('h3');
        name.textContent = member.name;
        card.appendChild(name);
        const pos = document.createElement('p');
        pos.className = 'member-position';
        pos.textContent = translateEnum('position', member.position);
        card.appendChild(pos);
        if (member.city) {
            const city = document.createElement('p');
            city.className = 'member-city text-sm';
            city.textContent = member.city;
            card.appendChild(city);
        }
        if (member.bio && (member.bio.vi || member.bio.en)) {
            const bio = document.createElement('p');
            bio.className = 'member-bio text-sm text-muted';
            bio.textContent = (member.bio[state.currentLang] || member.bio.vi || '').substring(0, 120) + '...';
            card.appendChild(bio);
        }
        fragment.appendChild(card);
    });
    container.replaceChildren(fragment);
}

// =====================================================
// 12. ACTIVITIES
// =====================================================

let activitiesFilter = 'all';

function renderActivities(container) {
    if (!container) return;
    const data = state.data.activities;
    if (!data || data.length === 0) { renderPlaceholder(container, 'ui.placeholder'); return; }
    let filtered = data;
    if (activitiesFilter !== 'all') filtered = data.filter(item => item.category === activitiesFilter);
    if (filtered.length === 0) {
        const p = document.createElement('p');
        p.className = 'placeholder-text';
        p.textContent = t('ui.noResults');
        container.replaceChildren(p);
        return;
    }
    const fragment = document.createDocumentFragment();
    filtered.forEach(activity => {
        const card = document.createElement('div');
        card.className = 'activity-item';
        const content = document.createElement('div');
        content.className = 'activity-item-content';
        const title = document.createElement('h3');
        title.textContent = activity.title[state.currentLang] || activity.title.vi;
        content.appendChild(title);
        const meta = document.createElement('div');
        meta.className = 'activity-meta';
        const date = document.createElement('span');
        date.className = 'text-sm';
        date.textContent = activity.date;
        meta.appendChild(date);
        const location = document.createElement('span');
        location.className = 'text-sm text-muted';
        location.textContent = `📍 ${activity.location}`;
        meta.appendChild(location);
        const category = document.createElement('span');
        category.className = 'badge';
        category.textContent = translateEnum('category', activity.category);
        meta.appendChild(category);
        content.appendChild(meta);
        if (activity.description) {
            const desc = document.createElement('p');
            desc.className = 'text-sm text-muted';
            const descText = activity.description[state.currentLang] || activity.description.vi;
            desc.textContent = Array.isArray(descText) ? descText[0] : descText;
            if (desc.textContent && desc.textContent.length > 120) desc.textContent = desc.textContent.substring(0, 120) + '...';
            content.appendChild(desc);
        }
        card.appendChild(content);
        card.style.cursor = 'pointer';
        card.addEventListener('click', () => navigateTo(`#activities/${activity.id}`));
        fragment.appendChild(card);
    });
    container.replaceChildren(fragment);
}

function initActivitiesFilter() {
    const filterBar = document.getElementById('activities-filter');
    if (!filterBar) return;
    filterBar.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            filterBar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activitiesFilter = btn.dataset.filter;
            const container = document.getElementById('activities-container');
            if (container) renderActivities(container);
        });
    });
}

// =====================================================
// 13. NEWS
// =====================================================

let newsFilter = 'all';

function renderNews(container) {
    if (!container) return;
    const data = state.data.news;
    if (!data || data.length === 0) { renderPlaceholder(container, 'ui.placeholder'); return; }
    let filtered = data;
    if (newsFilter !== 'all') filtered = data.filter(item => item.category === newsFilter);
    if (filtered.length === 0) {
        const p = document.createElement('p');
        p.className = 'placeholder-text';
        p.textContent = t('ui.noResults');
        container.replaceChildren(p);
        return;
    }
    const fragment = document.createDocumentFragment();
    filtered.forEach(item => {
        const card = document.createElement('div');
        card.className = 'news-item';
        const title = document.createElement('h3');
        title.textContent = item.title[state.currentLang] || item.title.vi;
        card.appendChild(title);
        const meta = document.createElement('div');
        meta.className = 'news-meta';
        const date = document.createElement('span');
        date.className = 'text-sm';
        date.textContent = item.date;
        meta.appendChild(date);
        const category = document.createElement('span');
        category.className = 'badge';
        category.textContent = translateEnum('newsCategory', item.category);
        meta.appendChild(category);
        card.appendChild(meta);
        if (item.summary) {
            const summary = document.createElement('p');
            summary.className = 'text-sm text-muted';
            summary.textContent = (item.summary[state.currentLang] || item.summary.vi);
            if (summary.textContent && summary.textContent.length > 140) summary.textContent = summary.textContent.substring(0, 140) + '...';
            card.appendChild(summary);
        }
        card.style.cursor = 'pointer';
        card.addEventListener('click', () => navigateTo(`#news/${item.id}`));
        fragment.appendChild(card);
    });
    container.replaceChildren(fragment);
}

function renderFeaturedNews(container) {
    if (!container) return;
    const data = state.data.news;
    if (!data || data.length === 0) { renderPlaceholder(container, 'ui.placeholder'); return; }
    const featured = data.filter(item => item.featured === true);
    if (featured.length === 0) { container.style.display = 'none'; return; }
    const item = featured[0];
    const card = document.createElement('div');
    card.className = 'news-featured-item';
    const title = document.createElement('h2');
    title.textContent = item.title[state.currentLang] || item.title.vi;
    card.appendChild(title);
    const meta = document.createElement('div');
    meta.className = 'news-meta';
    const date = document.createElement('span');
    date.className = 'text-sm';
    date.textContent = item.date;
    meta.appendChild(date);
    const category = document.createElement('span');
    category.className = 'badge';
    category.textContent = translateEnum('newsCategory', item.category);
    meta.appendChild(category);
    card.appendChild(meta);
    if (item.summary) {
        const summary = document.createElement('p');
        summary.className = 'text-muted';
        summary.textContent = item.summary[state.currentLang] || item.summary.vi;
        card.appendChild(summary);
    }
    card.style.cursor = 'pointer';
    card.addEventListener('click', () => navigateTo(`#news/${item.id}`));
    container.replaceChildren(card);
    container.style.display = 'block';
}

function initNewsFilter() {
    const filterBar = document.getElementById('news-filter');
    if (!filterBar) return;
    filterBar.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            filterBar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            newsFilter = btn.dataset.filter;
            const container = document.getElementById('news-container');
            if (container) renderNews(container);
        });
    });
}

// =====================================================
// 14. BLOG
// =====================================================

let blogFilter = 'all';

function renderBlog(container) {
    if (!container) return;
    const data = state.data.blog;
    if (!data || data.length === 0) { renderPlaceholder(container, 'ui.placeholder'); return; }
    let filtered = data;
    if (blogFilter !== 'all') filtered = data.filter(item => item.category === blogFilter);
    if (filtered.length === 0) {
        const p = document.createElement('p');
        p.className = 'placeholder-text';
        p.textContent = t('ui.noResults');
        container.replaceChildren(p);
        return;
    }
    const fragment = document.createDocumentFragment();
    filtered.forEach(item => {
        const card = document.createElement('div');
        card.className = 'blog-item';
        const content = document.createElement('div');
        content.className = 'blog-item-content';
        const title = document.createElement('h3');
        title.textContent = item.title[state.currentLang] || item.title.vi;
        content.appendChild(title);
        const meta = document.createElement('div');
        meta.className = 'blog-meta';
        const date = document.createElement('span');
        date.className = 'text-sm';
        date.textContent = item.date;
        meta.appendChild(date);
        const category = document.createElement('span');
        category.className = 'badge';
        category.textContent = translateEnum('blogCategory', item.category);
        meta.appendChild(category);
        if (item.authorId) {
            const authorData = state.data.members.find(m => m.id === item.authorId);
            if (authorData) {
                const author = document.createElement('span');
                author.className = 'text-sm text-muted';
                author.textContent = `✍️ ${authorData.name}`;
                meta.appendChild(author);
            }
        }
        content.appendChild(meta);
        if (item.excerpt) {
            const excerpt = document.createElement('p');
            excerpt.className = 'text-sm text-muted';
            excerpt.textContent = (item.excerpt[state.currentLang] || item.excerpt.vi);
            if (excerpt.textContent && excerpt.textContent.length > 140) excerpt.textContent = excerpt.textContent.substring(0, 140) + '...';
            content.appendChild(excerpt);
        }
        card.appendChild(content);
        card.style.cursor = 'pointer';
        card.addEventListener('click', () => navigateTo(`#blog/${item.id}`));
        fragment.appendChild(card);
    });
    container.replaceChildren(fragment);
}

function initBlogFilter() {
    const filterBar = document.getElementById('blog-filter');
    if (!filterBar) return;
    filterBar.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            filterBar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            blogFilter = btn.dataset.filter;
            const container = document.getElementById('blog-container');
            if (container) renderBlog(container);
        });
    });
}

// =====================================================
// 15. GUIDE
// =====================================================

let guideFilter = 'all';

function renderGuide(container) {
    if (!container) return;
    const data = state.data.guide;
    if (!data || data.length === 0) { renderPlaceholder(container, 'ui.placeholder'); return; }
    let filtered = data;
    if (guideFilter !== 'all') filtered = data.filter(item => item.category === guideFilter);
    if (filtered.length === 0) {
        const p = document.createElement('p');
        p.className = 'placeholder-text';
        p.textContent = t('ui.noResults');
        container.replaceChildren(p);
        return;
    }
    const sorted = [...filtered].sort((a, b) => (a.order || 0) - (b.order || 0));
    const fragment = document.createDocumentFragment();
    sorted.forEach(item => {
        const card = document.createElement('div');
        card.className = 'guide-item';
        const header = document.createElement('div');
        header.className = 'guide-item-header';
        const title = document.createElement('h3');
        title.textContent = item.title[state.currentLang] || item.title.vi;
        header.appendChild(title);
        const category = document.createElement('span');
        category.className = 'badge';
        category.textContent = translateEnum('guideCategory', item.category) || t('guide.noCategory');
        header.appendChild(category);
        card.appendChild(header);
        if (item.summary) {
            const summary = document.createElement('p');
            summary.className = 'text-sm text-muted';
            summary.textContent = (item.summary[state.currentLang] || item.summary.vi);
            if (summary.textContent && summary.textContent.length > 160) summary.textContent = summary.textContent.substring(0, 160) + '...';
            card.appendChild(summary);
        }
        if (item.updatedAt) {
            const updated = document.createElement('p');
            updated.className = 'text-xs guide-updated';
            updated.textContent = `${t('guide.updated')}: ${item.updatedAt}`;
            card.appendChild(updated);
        }
        card.style.cursor = 'pointer';
        card.addEventListener('click', () => navigateTo(`#guide/${item.id}`));
        fragment.appendChild(card);
    });
    container.replaceChildren(fragment);
}

function initGuideFilter() {
    const filterBar = document.getElementById('guide-filter');
    if (!filterBar) return;
    filterBar.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            filterBar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            guideFilter = btn.dataset.filter;
            const container = document.getElementById('guide-container');
            if (container) renderGuide(container);
        });
    });
}

// =====================================================
// 16. MAP – FULL MAP
// =====================================================

let mapInstance = null;

function loadLeafletWithRetry() {
    return new Promise((resolve, reject) => {
        // Nếu đã có, resolve ngay
        if (typeof L !== 'undefined' && L.map) {
            console.log('[VSA] Leaflet already loaded');
            resolve();
            return;
        }

        console.log('[VSA] Loading Leaflet from CDN...');

        // CSS
        let cssLink = document.querySelector('link[href*="leaflet"]');
        if (!cssLink) {
            cssLink = document.createElement('link');
            cssLink.rel = 'stylesheet';
            cssLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css';
            document.head.appendChild(cssLink);
        }

        let loaded = false;
        let timeoutId = null;

        // JS - dùng cdnjs
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js';
        script.onload = () => {
            if (loaded) return;
            loaded = true;
            if (timeoutId) clearTimeout(timeoutId);
            console.log('[VSA] ✅ Leaflet loaded from cdnjs');
            resolve();
        };
        script.onerror = () => {
            if (loaded) return;
            console.log('[VSA] ⚠️ cdnjs failed, trying unpkg...');
            // Fallback: dùng unpkg
            const fallbackScript = document.createElement('script');
            fallbackScript.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
            fallbackScript.onload = () => {
                if (loaded) return;
                loaded = true;
                if (timeoutId) clearTimeout(timeoutId);
                console.log('[VSA] ✅ Leaflet loaded from unpkg');
                resolve();
            };
            fallbackScript.onerror = () => {
                if (loaded) return;
                loaded = true;
                if (timeoutId) clearTimeout(timeoutId);
                console.error('[VSA] ❌ Leaflet load failed from both CDNs');
                reject(new Error('Leaflet load failed'));
            };
            document.body.appendChild(fallbackScript);
        };
        document.body.appendChild(script);

        // Timeout sau 10 giây
        timeoutId = setTimeout(() => {
            if (!loaded) {
                loaded = true;
                console.warn('[VSA] ⚠️ Leaflet load timeout, trying fallback...');
                // Thử load lần cuối bằng cách tạo script mới
                const lastScript = document.createElement('script');
                lastScript.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
                lastScript.onload = () => {
                    console.log('[VSA] ✅ Leaflet loaded from timeout fallback');
                    resolve();
                };
                lastScript.onerror = () => {
                    reject(new Error('Leaflet load timeout'));
                };
                document.body.appendChild(lastScript);
            }
        }, 10000);
    });
}

function renderMap(container) {
    console.log('[VSA] 🗺️ renderMap() called');
    
    const mapContainer = document.getElementById('vsa-map');
    if (!mapContainer) {
        console.error('[VSA] ❌ Map container not found!');
        renderPlaceholder(container, 'ui.placeholder');
        return;
    }

    mapContainer.style.display = 'block';
    mapContainer.style.height = '500px';
    mapContainer.style.width = '100%';
    mapContainer.style.minHeight = '400px';
    mapContainer.style.background = '#e8e4de';

    loadLeafletWithRetry().then(() => {
        console.log('[VSA] ✅ Leaflet loaded for full map');
        setTimeout(() => {
            initFullMap();
            const infoContainer = document.getElementById('map-info');
            if (infoContainer) renderMapInfo(infoContainer);
        }, 200);
    }).catch(err => {
        console.error('[VSA] ❌ Failed to load Leaflet:', err);
        mapContainer.innerHTML = `<p style="padding:2rem;text-align:center;color:#999;">❌ Không thể tải bản đồ. Vui lòng kiểm tra kết nối Internet.</p>`;
    });
}

function initFullMap() {
    const mapContainer = document.getElementById('vsa-map');
    if (!mapContainer) return;

    if (mapInstance) {
        mapInstance.remove();
        mapInstance = null;
    }

    try {
        if (L.Icon && L.Icon.Default) {
            delete L.Icon.Default.prototype._getIconUrl;
            L.Icon.Default.mergeOptions({
                iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
                iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
                shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
            });
        }

        mapInstance = L.map('vsa-map', {
            center: [20.5937, 78.9629],
            zoom: 5,
            zoomControl: true
        });
        console.log('[VSA] ✅ Full map instance created');

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap',
            maxZoom: 18
        }).addTo(mapInstance);
        console.log('[VSA] ✅ Tile layer added');

        const cities = state.data.cities || [];
        let markerCount = 0;
        cities.forEach(city => {
            if (city.lat && city.lng && city.lat !== 0 && city.lng !== 0) {
                let repName = 'Chưa có đại diện';
                if (city.representativeId) {
                    const rep = state.data.members.find(m => m.id === city.representativeId);
                    if (rep) repName = rep.name;
                }

                const popupContent = `
                    <strong>${city.city}</strong><br>
                    👨‍🎓 Sinh viên: ${city.students || 0}<br>
                    🏫 ${Array.isArray(city.universities) ? city.universities.join(', ') : 'N/A'}<br>
                    👤 Đại diện: ${repName}
                `;

                L.marker([city.lat, city.lng])
                    .addTo(mapInstance)
                    .bindPopup(popupContent);
                markerCount++;
            }
        });
        console.log(`[VSA] ✅ Added ${markerCount} markers`);

        if (markerCount > 0) {
            const bounds = [];
            cities.forEach(city => {
                if (city.lat && city.lng && city.lat !== 0 && city.lng !== 0) {
                    bounds.push([city.lat, city.lng]);
                }
            });
            if (bounds.length > 0) {
                mapInstance.fitBounds(bounds, { padding: [50, 50] });
            }
        }

        setTimeout(() => {
            if (mapInstance) {
                mapInstance.invalidateSize();
                console.log('[VSA] ✅ Full map resized');
            }
        }, 300);

        const resizeHandler = () => {
            if (mapInstance) mapInstance.invalidateSize();
        };
        window.removeEventListener('resize', resizeHandler);
        window.addEventListener('resize', resizeHandler);

    } catch (err) {
        console.error('[VSA] ❌ Full map init error:', err);
        mapContainer.innerHTML = `<p style="padding:2rem;text-align:center;color:#999;">❌ Lỗi: ${err.message}</p>`;
    }
}

// =====================================================
// 16a. MAP INFO
// =====================================================

function renderMapInfo(container) {
    console.log('[VSA] 📍 renderMapInfo() called');
    
    if (!container) {
        container = document.getElementById('map-info');
    }
    
    if (!container) {
        console.warn('[VSA] ⚠️ Map info container not found');
        return;
    }
    
    const cities = state.data.cities;
    if (!cities || cities.length === 0) {
        renderPlaceholder(container, 'ui.placeholder');
        return;
    }
    
    const fragment = document.createDocumentFragment();
    const title = document.createElement('h3');
    title.textContent = t('map.title');
    fragment.appendChild(title);
    
    const grid = document.createElement('div');
    grid.className = 'map-info-grid';
    
    cities.forEach(city => {
        const item = document.createElement('div');
        item.className = 'map-info-item';
        
        const name = document.createElement('div');
        name.className = 'city-name';
        name.textContent = city.city;
        item.appendChild(name);
        
        const detail = document.createElement('div');
        detail.className = 'city-detail';
        detail.textContent = `👨‍🎓 ${city.students || 0} sinh viên`;
        item.appendChild(detail);
        
        if (city.universities && city.universities.length > 0) {
            const uni = document.createElement('div');
            uni.className = 'city-detail';
            const uniList = city.universities.slice(0, 2).join(', ');
            uni.textContent = `🏫 ${uniList}${city.universities.length > 2 ? '...' : ''}`;
            item.appendChild(uni);
        }
        
        if (city.representativeId) {
            const rep = state.data.members.find(m => m.id === city.representativeId);
            if (rep) {
                const repEl = document.createElement('div');
                repEl.className = 'city-detail';
                repEl.textContent = `👤 ${rep.name}`;
                item.appendChild(repEl);
            }
        }
        
        grid.appendChild(item);
    });
    
    fragment.appendChild(grid);
    container.replaceChildren(fragment);
    console.log('[VSA] ✅ Map info rendered');
}

// =====================================================
// 17. GALLERY
// =====================================================

let lightboxData = [];
let lightboxIndex = 0;

function renderGallery(container) {
    if (!container) return;
    const data = state.data.gallery;
    if (!data || data.length === 0) {
        renderPlaceholder(container, 'ui.placeholder');
        return;
    }
    
    const fragment = document.createDocumentFragment();
    data.forEach((album, index) => {
        const card = document.createElement('div');
        card.className = 'gallery-album';
        
        const coverContainer = document.createElement('div');
        coverContainer.className = 'gallery-album-cover';
        
        const img = document.createElement('img');
        img.src = album.cover || 'assets/images/gallery/placeholder.webp';
        img.alt = album.title[state.currentLang] || album.title.vi;
        img.loading = 'lazy';
        img.onerror = function() {
            this.style.display = 'none';
            const icon = document.createElement('span');
            icon.className = 'placeholder-icon';
            icon.textContent = '🖼️';
            this.parentElement.appendChild(icon);
        };
        coverContainer.appendChild(img);
        card.appendChild(coverContainer);
        
        const info = document.createElement('div');
        info.className = 'gallery-album-info';
        const title = document.createElement('h3');
        title.textContent = album.title[state.currentLang] || album.title.vi;
        info.appendChild(title);
        const meta = document.createElement('div');
        meta.className = 'album-meta';
        if (album.date) meta.textContent = album.date;
        info.appendChild(meta);
        const count = document.createElement('div');
        count.className = 'album-count';
        count.textContent = `📸 ${album.photos ? album.photos.length : 0} ảnh`;
        info.appendChild(count);
        card.appendChild(info);
        
        card.addEventListener('click', () => openLightbox(index));
        fragment.appendChild(card);
    });
    
    container.replaceChildren(fragment);
}

function openLightbox(albumIndex) {
    const album = state.data.gallery[albumIndex];
    if (!album || !album.photos || album.photos.length === 0) return;
    
    lightboxData = album.photos.map(p => ({
        src: p.src,
        caption: p.caption ? (p.caption[state.currentLang] || p.caption.vi || '') : '',
        alt: p.alt || ''
    }));
    
    lightboxIndex = 0;
    showLightbox();
}

function showLightbox() {
    const lb = document.getElementById('lightbox');
    const img = document.getElementById('lightbox-img');
    const caption = document.getElementById('lightbox-caption');
    const counter = document.getElementById('lightbox-counter');
    
    if (!lb || !img) return;
    
    const data = lightboxData[lightboxIndex];
    if (!data) return;
    
    img.src = data.src;
    img.alt = data.alt || '';
    caption.textContent = data.caption || '';
    counter.textContent = `${lightboxIndex + 1} / ${lightboxData.length}`;
    
    lb.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lb = document.getElementById('lightbox');
    if (lb) {
        lb.style.display = 'none';
        document.body.style.overflow = '';
    }
}

function navigateLightbox(direction) {
    if (!lightboxData || lightboxData.length === 0) return;
    lightboxIndex += direction;
    if (lightboxIndex < 0) lightboxIndex = lightboxData.length - 1;
    if (lightboxIndex >= lightboxData.length) lightboxIndex = 0;
    showLightbox();
}

function initLightbox() {
    const closeBtn = document.getElementById('lightbox-close');
    const prevBtn = document.getElementById('lightbox-prev');
    const nextBtn = document.getElementById('lightbox-next');
    const lb = document.getElementById('lightbox');
    
    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    if (prevBtn) prevBtn.addEventListener('click', () => navigateLightbox(-1));
    if (nextBtn) nextBtn.addEventListener('click', () => navigateLightbox(1));
    
    document.addEventListener('keydown', (e) => {
        if (lb && lb.style.display === 'flex') {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') navigateLightbox(-1);
            if (e.key === 'ArrowRight') navigateLightbox(1);
        }
    });
    
    if (lb) {
        lb.addEventListener('click', (e) => {
            if (e.target === lb) closeLightbox();
        });
    }
}

// =====================================================
// 18. FORUM
// =====================================================

function renderForum(container) {
    if (!container) return;
    renderPlaceholder(container, 'ui.forumNote');
}

// =====================================================
// 19. CONTACT
// =====================================================

function renderContact(container) {
    if (!container) return;
    renderPlaceholder(container, 'ui.placeholder');
}

// =====================================================
// 20. DETAIL RENDERERS – HỖ TRỢ BLOCK CONTENT
// =====================================================

function renderSectionDetail(section, id) {
    const container = getContainer(section);
    if (!container) return;
    
    let data = [];
    let item = null;
    
    switch (section) {
        case 'news': 
            data = state.data.news; 
            item = data.find(d => d.id === id); 
            break;
        case 'blog': 
            data = state.data.blog; 
            item = data.find(d => d.id === id); 
            break;
        case 'activities': 
            data = state.data.activities; 
            item = data.find(d => d.id === id); 
            break;
        default: 
            renderPlaceholder(container, 'ui.placeholder'); 
            return;
    }
    
    if (!item) { 
        renderPlaceholder(container, 'ui.notFound'); 
        return; 
    }
    
    const fragment = document.createDocumentFragment();
    const lang = state.currentLang;
    
    // Title
    const title = createElement('h2', { 
        text: item.title[lang] || item.title.vi 
    });
    fragment.appendChild(title);
    
    // Date & metadata
    if (item.date) {
        const date = createElement('p', { 
            className: 'text-muted text-sm', 
            text: item.date 
        });
        fragment.appendChild(date);
    }
    
    // Content – hỗ trợ block type
    if (item.content) {
        const contentData = item.content[lang] || item.content.vi;
        
        if (Array.isArray(contentData)) {
            // Kiểm tra xem có phải block content không
            if (contentData.length > 0 && typeof contentData[0] === 'object' && contentData[0].type) {
                // BLOCK CONTENT
                contentData.forEach(block => {
                    if (block.type === 'text') {
                        const p = document.createElement('p');
                        p.textContent = block.value;
                        fragment.appendChild(p);
                    } else if (block.type === 'image') {
                        const wrapper = document.createElement('div');
                        wrapper.className = 'detail-image-wrapper';
                        
                        const img = document.createElement('img');
                        img.src = block.src;
                        img.alt = block.alt || '';
                        img.loading = 'lazy';
                        img.onerror = function() {
                            this.style.display = 'none';
                            const fallback = document.createElement('span');
                            fallback.className = 'detail-image-fallback';
                            fallback.textContent = '🖼️';
                            this.parentElement.appendChild(fallback);
                        };
                        wrapper.appendChild(img);
                        
                        if (block.caption) {
                            const caption = document.createElement('p');
                            caption.className = 'detail-image-caption text-sm text-muted';
                            caption.textContent = block.caption;
                            wrapper.appendChild(caption);
                        }
                        
                        fragment.appendChild(wrapper);
                    }
                });
            } else {
                // LEGACY: mảng văn bản đơn thuần (để tương thích)
                const contentContainer = document.createElement('div');
                renderParagraphs(contentData, contentContainer);
                fragment.appendChild(contentContainer);
            }
        } else if (typeof contentData === 'string') {
            const p = document.createElement('p');
            p.textContent = contentData;
            fragment.appendChild(p);
        }
    }
    
    container.replaceChildren(fragment);
}

// =====================================================
// 21. LANGUAGE SWITCH
// =====================================================

function initLanguageSwitch() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.dataset.lang;
            if (lang && lang !== state.currentLang) {
                setLanguage(lang);
            }
        });
    });
}

function setLanguage(lang) {
    state.currentLang = lang;
    window.currentLang = lang;
    localStorage.setItem(CONFIG.storageKey, lang);
    updateUILanguage();
}

// =====================================================
// 22. SECTION RENDERER
// =====================================================

function renderSection(section) {
    const container = getContainer(section);
    if (!container) return;
    
    switch (section) {
        case 'home': break;
        case 'about':
            // GỌI renderAbout() THAY VÌ renderAbout(container)
            renderAbout();
            break;
        case 'members': renderMembers(container); break;
        case 'activities': 
            renderActivities(container);
            initActivitiesFilter();
            break;
        case 'news':
            renderNews(container);
            renderFeaturedNews(document.getElementById('news-featured-container'));
            initNewsFilter();
            break;
        case 'blog':
            renderBlog(container);
            initBlogFilter();
            break;
        case 'guide':
            renderGuide(container);
            initGuideFilter();
            break;
        case 'map':
            renderMap(container);
            break;
        case 'gallery':
            renderGallery(container);
            break;
        case 'forum': renderForum(container); break;
        case 'contact': renderContact(container); break;
        default: renderPlaceholder(container, 'ui.placeholder');
    }
}

// =====================================================
// 23. EVENT LISTENERS
// =====================================================

function initEventListeners() {
    window.addEventListener('hashchange', renderRoute);
}

// =====================================================
// 24. INITIALIZATION
// =====================================================

async function init() {
    console.log('[VSA] Initializing VSA India website...');
    
    await loadData();
    
    const initialLang = state.currentLang;
    window.currentLang = initialLang;
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === initialLang);
    });
    
    initNavigation();
    initLanguageSwitch();
    initEventListeners();
    initLightbox();
    
    // PRELOAD LEAFLET – để sẵn cho Home Map
    if (typeof L === 'undefined') {
        console.log('[VSA] ⏳ Preloading Leaflet...');
        loadLeafletWithRetry().then(() => {
            console.log('[VSA] ✅ Leaflet preloaded successfully');
        }).catch(err => {
            console.warn('[VSA] ⚠️ Leaflet preload failed:', err);
        });
    }
    
    updateUILanguage();
    
    if (!window.location.hash) {
        window.location.hash = 'home';
    } else {
        renderRoute();
    }
    
    console.log('[VSA] Ready. Current language:', state.currentLang);
    console.log('[VSA] Phase 6 complete. Waiting for approval.');
}

// Start
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}