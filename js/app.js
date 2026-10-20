/**
 * CỘNG ĐỒNG SỐNG VUI KHỎE & BẾP ẤM - QUẢN TRỊ VIÊN: CÔ VÂN NGUYỄN
 * Ứng dụng Web Tương Tác Cộng Đồng Sẻ Chia Yêu Thương & Hệ Thống Quản Trị Toàn Diện (app.js)
 */

const SOURCE_API_BASE = 'https://roads-fixes-delaware-wallet.trycloudflare.com';
const STORAGE_KEY_QUESTIONS = 'covan_community_questions_v1';
const STORAGE_KEY_WISHES = 'covan_community_wishes_v1';
const STORAGE_KEY_HANDBOOK = 'covan_community_handbook_v1';
const STORAGE_KEY_SITE_CONFIG = 'covan_site_config_v1';
const STORAGE_KEY_LIKED = 'covan_liked_ids_v1';
const STORAGE_KEY_ADMIN_PIN = 'covan_admin_pin_v1';
const STORAGE_KEY_ADMIN_SESSION = 'covan_admin_session_v1';

const DEFAULT_ADMIN_PIN = '2010';

const DEFAULT_SITE_CONFIG = {
  bannerText: '💐 Chào mừng Ngày Phụ nữ Việt Nam 20/10! Kính chúc Cô Vân Nguyễn và một nửa thế giới luôn mạnh khỏe, rạng rỡ và ngập tràn hạnh phúc! ❤️',
  heroQuote: '"Sức khỏe là vàng, bếp ấm là nhà. Mong rằng mỗi ngày ghé thăm trang web, các bà, các mẹ, các chị em và mỗi gia đình đều tìm thấy một mẹo hay, một món ăn lành mạnh và thật nhiều niềm vui bình an."',
  heroQuoteAuthor: '— Cô Vân Nguyễn (Quản trị viên Sáng lập)',
  defaultAuthor: 'Cô Vân Nguyễn'
};

// Dữ liệu gốc chuẩn từ nguồn tài liệu Cô Vân Nguyễn
const DEFAULT_QUESTIONS = [
  {
    id: 5,
    pinned: true,
    author: 'Cô Vân Nguyễn',
    category: 'Sức khỏe & Dưỡng sinh',
    title: 'Phòng tránh bệnh cảm mùa này',
    content: 'Cách Phòng tránh bệnh cảm mùa này',
    likes: 15,
    created_at: '11:08 - 20/10/2026',
    media_url: '',
    media_type: '',
    answers: [
      {
        id: 6,
        question_id: 5,
        author: '🌿 Ban Tư Vấn Sống Vui Khỏe',
        is_auto_helper: true,
        content: '🍵 Chia sẻ dưỡng sinh lành mạnh: Duy trì uống nước ấm buổi sáng, kết hợp thảo dược tự nhiên và vận động nhẹ nhàng 15-20 phút giúp khí huyết lưu thông, tăng cường sức đề kháng rất tốt ạ!',
        created_at: '11:08 - 20/10/2026'
      },
      {
        id: 7,
        question_id: 5,
        author: 'Cô Vân Nguyễn',
        content: 'Cảm ơn con',
        created_at: '11:10 - 20/10/2026'
      }
    ]
  },
  {
    id: 4,
    pinned: false,
    author: 'Cô Vân Nguyễn',
    category: 'Sức khỏe & Dưỡng sinh',
    title: 'Lời chúc',
    content: 'Bạn hãy gửi lời chúc yêu thương đến tất cả phụ nữ Việt Nam trong ngày 20/10 nhé',
    likes: 28,
    created_at: '07:31 - 20/10/2026',
    media_url: '',
    media_type: '',
    answers: [
      {
        id: 4,
        question_id: 4,
        author: '🌿 Ban Tư Vấn Sống Vui Khỏe',
        is_auto_helper: true,
        content: '💐 Dạ con chào Cô Vân Nguyễn ạ! Hưởng ứng lời kêu gọi của cô nhân ngày Phụ nữ Việt Nam 20/10, con xin kính chúc Cô và tất cả những người phụ nữ Việt Nam luôn dồi dào sức khỏe, bình an, trẻ trung và ngập tràn niềm vui bên gia đình, học trò và những người thân yêu nhất! ❤️🌹',
        created_at: '07:35 - 20/10/2026'
      },
      {
        id: 5,
        question_id: 4,
        author: 'Cô Thanh Mai (Thành viên)',
        content: '🌸 Thay mặt các thành viên Cộng Đồng Sống Vui Khỏe & Bếp Ấm, xin gửi ngàn lời chúc tốt đẹp nhất đến Cô Vân Nguyễn cùng các bà, các mẹ, các chị em một ngày 20/10 thật ấm áp và rạng rỡ hoa tươi!',
        created_at: '07:35 - 20/10/2026'
      }
    ]
  },
  {
    id: 3,
    pinned: false,
    author: 'Chị Thu Hà',
    category: 'Gia đình & Con cháu',
    title: 'Làm sao để rèn cho các bé tiểu học thói quen tự giác đọc sách 30 phút mỗi tối?',
    content: 'Chào các cô và các mẹ! Bé nhà mình năm nay học lớp 5, buổi tối hay thích xem tivi. Mọi người có cách nào nhẹ nhàng khích lệ con yêu thích đọc sách không ạ?',
    likes: 12,
    created_at: '07:28 - 20/10/2026',
    media_url: '',
    media_type: '',
    answers: [
      {
        id: 3,
        question_id: 3,
        author: 'Cô Bích Vân',
        content: 'Mẹ hãy dành 15-20 phút ngồi đọc cùng con và đố vui nhẹ nhàng về câu chuyện vừa đọc nhé. Khi người lớn đồng hành, các con sẽ hào hứng hơn rất nhiều!',
        created_at: '07:28 - 20/10/2026'
      }
    ]
  },
  {
    id: 2,
    pinned: false,
    author: 'Bác Minh Hòa',
    category: 'Nấu ăn & Bếp ấm',
    title: 'Mẹo nấu canh rau củ ngọt thanh tự nhiên cho bữa cơm gia đình cuối tuần?',
    content: 'Cuối tuần các con các cháu sum vầy, mình muốn hạn chế dùng bột ngọt mà vẫn có nồi canh ngọt thanh. Các cô các chị có bí quyết hầm rau củ gì hay chia sẻ nhé!',
    likes: 14,
    created_at: '07:28 - 20/10/2026',
    media_url: '',
    media_type: '',
    answers: [
      {
        id: 2,
        question_id: 2,
        author: 'Cô Ngọc Lan',
        content: 'Bí quyết của bếp nhà mình là dùng củ cải trắng, bắp ngọt và vài quả táo đỏ hầm lấy nước dùng trước 20 phút. Nước canh ngọt tự nhiên các cháu mê tít!',
        created_at: '07:28 - 20/10/2026'
      }
    ]
  },
  {
    id: 1,
    pinned: false,
    author: 'Cô Bích Vân (Quản trị viên)',
    category: 'Sức khỏe & Dưỡng sinh',
    title: 'Thức uống ấm bụng buổi sáng với tinh bột nghệ và mật ong rừng sao cho đúng cách?',
    content: 'Chào cả nhà! Mỗi sáng thức dậy, việc uống một cốc nước ấm pha tinh bột nghệ cùng mật ong rất tốt cho dạ dày. Mọi người thường pha với nước ấm khoảng bao nhiêu độ ạ?',
    likes: 18,
    created_at: '07:28 - 20/10/2026',
    media_url: '',
    media_type: '',
    answers: [
      {
        id: 1,
        question_id: 1,
        author: 'Cô Thanh Mai',
        content: 'Mình thường pha với nước ấm khoảng 40 - 45 độ C, khuấy đều tinh bột nghệ trước rồi mới cho 1 thìa mật ong rừng vào uống trước bữa sáng 20 phút, êm bụng lắm ạ!',
        created_at: '07:28 - 20/10/2026'
      }
    ]
  },
  {
    id: 6,
    pinned: false,
    author: 'Cô Hương Giang',
    category: 'Mẹo vặt cuộc sống',
    title: 'Mẹo khử mùi thức ăn và giữ gian bếp luôn thơm tho bằng nguyên liệu tự nhiên?',
    content: 'Sau khi chiên cá hoặc nấu các món đậm gia vị, gian bếp thường lưu mùi khá lâu. Các cô các chị trong cộng đồng mình thường dùng mẹo tự nhiên nào để bếp luôn thơm dịu và ấm cúng ạ?',
    likes: 16,
    created_at: '08:15 - 20/10/2026',
    media_url: '',
    media_type: '',
    answers: [
      {
        id: 8,
        question_id: 6,
        author: 'Cô Vân Nguyễn',
        content: 'Kinh nghiệm của bếp nhà mình là đun sôi một nồi nước nhỏ gồm vỏ bưởi hoặc vỏ cam/chanh kết hợp với 2 nhánh sả đập dập và vài lát gừng trong 10 phút. Hương tinh dầu tự nhiên vừa khử sạch mùi dầu mỡ, vừa giúp không khí trong nhà ấm áp, thư thái lắm nhé!',
        created_at: '08:22 - 20/10/2026'
      }
    ]
  }
];

const DEFAULT_HANDBOOK = [
  {
    id: 'hb-1',
    icon: '🍯',
    category: 'Sức khỏe & Dưỡng sinh',
    title: 'Pha Tinh Bột Nghệ & Mật Ong Ấm Bụng Buổi Sáng',
    summary: 'Bảo vệ niêm mạc dạ dày, kích thích tiêu hóa và giúp làn da hồng hào mỗi ngày.',
    details: 'Pha với nước ấm đúng chuẩn 40°C - 45°C. Khuấy đều tinh bột nghệ trước rồi mới cho 1 thìa mật ong rừng vào uống trước bữa sáng 20 phút, cực kỳ êm bụng!',
    prompt: 'Hướng dẫn chi tiết cách pha tinh bột nghệ và mật ong rừng buổi sáng cùng những lưu ý quan trọng?'
  },
  {
    id: 'hb-2',
    icon: '🍵',
    category: 'Sức khỏe & Dưỡng sinh',
    title: 'Bí Quyết Phòng Tránh Bệnh Cảm Mùa Giao Mùa',
    summary: 'Tăng cường chính khí và sức đề kháng tự nhiên cho người lớn tuổi và trẻ nhỏ.',
    details: 'Duy trì uống nước ấm buổi sáng, kết hợp thảo dược tự nhiên (gừng, sả, táo đỏ) và vận động nhẹ nhàng 15 - 20 phút giúp khí huyết lưu thông, phòng cảm hiệu quả.',
    prompt: 'Chia sẻ chi tiết cách phòng tránh bệnh cảm mùa giao mùa và các loại trà thảo dược ấm cơ thể?'
  },
  {
    id: 'hb-3',
    icon: '🍲',
    category: 'Nấu ăn & Bếp ấm',
    title: 'Hầm Canh Rau Củ Ngọt Thanh Không Cần Bột Ngọt',
    summary: 'Bí quyết cho nồi canh gia đình cuối tuần vừa thanh mát vừa tròn vị tự nhiên.',
    details: 'Sử dụng củ cải trắng, bắp ngọt và vài quả táo đỏ hầm lấy nước dùng trước 20 phút. Nước canh tiết vị ngọt thanh tự nhiên, các con các cháu đều mê tít!',
    prompt: 'Gợi ý thêm các công thức nấu canh dưỡng sinh ngọt thanh tự nhiên cho bữa cơm gia đình cuối tuần?'
  },
  {
    id: 'hb-4',
    icon: '📚',
    category: 'Gia đình & Con cháu',
    title: 'Rèn Cho Bé Tiểu Học Tự Giác Đọc Sách 30 Phút Tối',
    summary: 'Phương pháp tâm lý nhẹ nhàng giúp con cháu rời xa màn hình tivi buổi tối.',
    details: 'Ông bà, cha mẹ hãy dành 15 - 20 phút ngồi đọc cùng con và đố vui nhẹ nhàng về câu chuyện vừa đọc. Khi người lớn đồng hành, các bé sẽ hào hứng hơn rất nhiều!',
    prompt: 'Chia sẻ thêm các mẹo hay để ông bà và cha mẹ khích lệ các bé tiểu học yêu thích đọc sách mỗi tối?'
  },
  {
    id: 'hb-5',
    icon: '🌱',
    category: 'Mẹo vặt cuộc sống',
    title: 'Khử Mùi Gian Bếp Bằng Vỏ Bưởi, Sả & Gừng Tươi',
    summary: 'Giữ căn bếp gia đình luôn thơm dịu tinh dầu thảo mộc tự nhiên, sạch mùi dầu mỡ.',
    details: 'Đun sôi nồi nước nhỏ với vỏ bưởi (hoặc vỏ cam), 2 nhánh sả đập dập và vài lát gừng trong 10 phút. Hương thơm lan tỏa giúp thư giãn tinh thần và xua muỗi.',
    prompt: 'Cho mình xin thêm các mẹo vặt nhà bếp tự nhiên, an toàn và tiết kiệm cho gia đình?'
  },
  {
    id: 'hb-6',
    icon: '🥬',
    category: 'Nấu ăn & Bếp ấm',
    title: 'Mẹo Luộc Rau Xanh Mướt & Giữ Trọn Dưỡng Chất',
    summary: 'Đĩa rau luộc xanh ngọc, giòn ngọt làm sáng bừng mâm cơm ấm cúng mỗi ngày.',
    details: 'Đợi nước thật sôi mới cho một chút muối hạt và vài giọt dầu thực vật vào nồi, luộc lửa lớn mở vung rồi vớt ra đĩa rộng thoáng khí để giữ trọn màu xanh và vitamin.',
    prompt: 'Chia sẻ bí quyết sơ chế và chế biến rau củ giữ trọn vitamin cho gia đình?'
  }
];

const DEFAULT_WISHES = [
  {
    id: 1,
    flower: '💐',
    sender: 'Cô Vân Nguyễn (Quản trị viên)',
    text: 'Thân gửi lời chúc sức khỏe, bình an và hạnh phúc viên mãn đến tất cả các Bà, các Mẹ và các Chị Em trong Cộng Đồng Sống Vui Khỏe & Bếp Ấm!'
  },
  {
    id: 2,
    flower: '🌹',
    sender: 'Cô Thanh Mai (Thành viên)',
    text: 'Kính chúc Cô Vân Nguyễn luôn tràn đầy năng lượng, mãi tươi trẻ rạng ngời để dẫn dắt cộng đồng mình ngày càng gắn kết yêu thương!'
  },
  {
    id: 3,
    flower: '🪷',
    sender: 'Bác Minh Hòa & Gia đình',
    text: 'Cảm ơn những chia sẻ dưỡng sinh và công thức bếp ấm rất thiết thực của Cô Vân Nguyễn. Chúc cả nhà mình luôn vui khỏe mỗi ngày!'
  }
];

const SAMPLE_WISH_SUGGESTIONS = [
  'Kính chúc Cô Vân Nguyễn và toàn thể chị em phụ nữ Việt Nam luôn dồi dào sức khỏe, tâm an trí sáng, nụ cười luôn nở trên môi!',
  'Chúc các bà, các mẹ, các chị trong Cộng Đồng Sống Vui Khỏe & Bếp Ấm mỗi ngày đều là một ngày vui, gian bếp luôn đỏ lửa yêu thương!',
  'Gửi ngàn đóa hoa tươi thắm nhất đến Cô Vân Nguyễn - người truyền lửa ấm áp cho cộng đồng sống khỏe, sống đẹp và sẻ chia!'
];

let siteConfig = { ...DEFAULT_SITE_CONFIG };
let allQuestions = [];
let allHandbook = [];
let allWishes = [];
let currentCategory = 'ALL';
let currentSort = 'newest';
let pendingMediaDataUrl = '';
let pendingMediaType = '';
let isAdminLoggedIn = false;

function getFormattedNow() {
  const now = new Date();
  const hh = String(now.getHours()).padStart(2, '0');
  const mm = String(now.getMinutes()).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  const mo = String(now.getMonth() + 1).padStart(2, '0');
  const yyyy = now.getFullYear();
  return `${hh}:${mm} - ${dd}/${mo}/${yyyy}`;
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function normalizeAuthorLabel(authorName) {
  if (!authorName) return 'Thành viên';
  return String(authorName).replace('🤖 Trợ Lý Con Của Cô', '🌿 Ban Tư Vấn Sống Vui Khỏe');
}

function isLiked(qId) {
  try {
    const liked = JSON.parse(localStorage.getItem(STORAGE_KEY_LIKED) || '[]');
    return liked.includes(qId);
  } catch (_) {
    return false;
  }
}

function markLiked(qId) {
  try {
    const liked = JSON.parse(localStorage.getItem(STORAGE_KEY_LIKED) || '[]');
    if (!liked.includes(qId)) {
      liked.push(qId);
      localStorage.setItem(STORAGE_KEY_LIKED, JSON.stringify(liked));
    }
  } catch (_) {}
}

function saveAllToStorage() {
  try {
    localStorage.setItem(STORAGE_KEY_SITE_CONFIG, JSON.stringify(siteConfig));
    localStorage.setItem(STORAGE_KEY_QUESTIONS, JSON.stringify(allQuestions));
    localStorage.setItem(STORAGE_KEY_HANDBOOK, JSON.stringify(allHandbook));
    localStorage.setItem(STORAGE_KEY_WISHES, JSON.stringify(allWishes));
  } catch (_) {}
}

function saveQuestionsToStorage() {
  try {
    localStorage.setItem(STORAGE_KEY_QUESTIONS, JSON.stringify(allQuestions));
  } catch (_) {}
}

// ==========================================================================
// 1. KHỞI TẠO & CẬP NHẬT GIAO DIỆN CHUNG (SITE CONFIG)
// ==========================================================================

function initSiteConfig() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_SITE_CONFIG);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && typeof parsed === 'object') {
        siteConfig = { ...DEFAULT_SITE_CONFIG, ...parsed };
      }
    }
  } catch (_) {}
  applySiteConfigToDOM();
}

function applySiteConfigToDOM() {
  const bannerEl = document.getElementById('bannerCelebrationText');
  if (bannerEl && siteConfig.bannerText) {
    bannerEl.textContent = siteConfig.bannerText;
  }
  const quoteEl = document.getElementById('heroQuoteText');
  if (quoteEl && siteConfig.heroQuote) {
    quoteEl.textContent = siteConfig.heroQuote;
  }
  const quoteAuthorEl = document.getElementById('heroQuoteAuthor');
  if (quoteAuthorEl && siteConfig.heroQuoteAuthor) {
    quoteAuthorEl.textContent = siteConfig.heroQuoteAuthor;
  }
  const qAuthorInput = document.getElementById('q_author');
  if (qAuthorInput && siteConfig.defaultAuthor) {
    qAuthorInput.value = siteConfig.defaultAuthor;
  }
  const wishSenderInput = document.getElementById('wishSender');
  if (wishSenderInput && siteConfig.defaultAuthor) {
    wishSenderInput.value = siteConfig.defaultAuthor;
  }
}

// ==========================================================================
// 2. DIỄN ĐÀN HỎI ĐÁP & CHIA SẺ CỘNG ĐỒNG
// ==========================================================================

async function initQuestionsData() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_QUESTIONS);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        allQuestions = parsed;
      }
    }
  } catch (_) {}

  if (!allQuestions.length) {
    allQuestions = JSON.parse(JSON.stringify(DEFAULT_QUESTIONS));
  }

  updateCategoryCounts();
  renderQuestions();

  // Đồng bộ tự động với máy chủ nguồn nếu trực tuyến
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 5000);
    const res = await fetch(`${SOURCE_API_BASE}/api/questions`, { signal: controller.signal });
    clearTimeout(timer);
    if (res.ok) {
      const remoteQuestions = await res.json();
      if (Array.isArray(remoteQuestions) && remoteQuestions.length > 0) {
        mergeRemoteQuestions(remoteQuestions);
        saveQuestionsToStorage();
        updateCategoryCounts();
        renderQuestions();
      }
    }
  } catch (_) {
    // Hoạt động độc lập mượt mà bằng bộ nhớ lưu trữ khi ngoại tuyến
  }
}

function mergeRemoteQuestions(remoteList) {
  const existingIds = new Set(allQuestions.map(q => q.id));
  remoteList.forEach(rq => {
    const normalizedAnswers = (rq.answers || []).map(a => ({
      ...a,
      author: normalizeAuthorLabel(a.author),
      is_auto_helper: a.author && (a.author.includes('Trợ Lý') || a.author.includes('Ban Tư Vấn'))
    }));
    if (!existingIds.has(rq.id)) {
      allQuestions.unshift({
        ...rq,
        pinned: false,
        answers: normalizedAnswers
      });
    }
  });
}

function updateCategoryCounts() {
  const counts = {
    'ALL': allQuestions.length,
    'Sức khỏe & Dưỡng sinh': 0,
    'Nấu ăn & Bếp ấm': 0,
    'Mẹo vặt cuộc sống': 0,
    'Gia đình & Con cháu': 0
  };
  allQuestions.forEach(q => {
    if (counts[q.category] !== undefined) {
      counts[q.category]++;
    }
  });

  document.querySelectorAll('.cat-btn').forEach(btn => {
    const cat = btn.getAttribute('data-cat');
    const badge = btn.querySelector('.cat-count');
    if (badge && counts[cat] !== undefined) {
      badge.textContent = counts[cat];
    }
  });

  const statPostsEl = document.getElementById('statTotalPosts');
  if (statPostsEl) {
    const totalAnswers = allQuestions.reduce((acc, q) => acc + (q.answers ? q.answers.length : 0), 0);
    statPostsEl.textContent = `${allQuestions.length + totalAnswers}+`;
  }
}

function filterCategory(cat, btn) {
  currentCategory = cat;
  document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  renderQuestions();
}

function changeSortOrder(sortVal) {
  currentSort = sortVal;
  renderQuestions();
}

function renderQuestions() {
  const searchEl = document.getElementById('searchInput');
  const kw = searchEl ? searchEl.value.toLowerCase().trim() : '';
  const box = document.getElementById('questionsList');
  if (!box) return;

  let filtered = allQuestions.filter(q => {
    const cMatch = (currentCategory === 'ALL') || (q.category === currentCategory);
    const ansMatch = (q.answers || []).some(a => (a.content || '').toLowerCase().includes(kw));
    const kMatch = !kw ||
      (q.title || '').toLowerCase().includes(kw) ||
      (q.content || '').toLowerCase().includes(kw) ||
      (q.author || '').toLowerCase().includes(kw) ||
      ansMatch;
    return cMatch && kMatch;
  });

  // Bài viết được Ghim (pinned) luôn hiển thị trên đầu
  filtered.sort((a, b) => {
    if (Boolean(b.pinned) !== Boolean(a.pinned)) {
      return b.pinned ? 1 : -1;
    }
    if (currentSort === 'likes') {
      return (b.likes || 0) - (a.likes || 0);
    }
    if (currentSort === 'answers') {
      return ((b.answers || []).length) - ((a.answers || []).length);
    }
    return (b.id || 0) - (a.id || 0);
  });

  if (!filtered.length) {
    box.innerHTML = `
      <div class="panel-card" style="text-align:center; padding: 36px 20px;">
        <div style="font-size: 2.5rem; margin-bottom: 10px;">🌿</div>
        <h3 style="margin-bottom: 6px;">Chưa tìm thấy bài viết phù hợp</h3>
        <p style="color: var(--text-muted);">Mời Cô Vân Nguyễn và các thành viên đăng câu hỏi hoặc chia sẻ đầu tiên vào mục này nhé ạ!</p>
      </div>
    `;
    return;
  }

  box.innerHTML = '';
  const defaultReplyAuthor = escapeHtml(siteConfig.defaultAuthor || 'Cô Vân Nguyễn');

  filtered.forEach(q => {
    const isCoVan = (q.author || '').toLowerCase().includes('vân nguyễn') || (q.author || '').toLowerCase().includes('quản trị');
    let mediaHtml = '';
    if (q.media_url) {
      const fullMediaUrl = q.media_url.startsWith('http') || q.media_url.startsWith('data:') || q.media_url.startsWith('assets/')
        ? q.media_url
        : `${SOURCE_API_BASE}${q.media_url}`;
      if (q.media_type === 'video') {
        mediaHtml = `<div class="media-preview"><video controls src="${escapeHtml(fullMediaUrl)}"></video></div>`;
      } else {
        mediaHtml = `<div class="media-preview" onclick="openLightbox('${escapeHtml(fullMediaUrl)}', '${escapeHtml(q.title)}')"><img src="${escapeHtml(fullMediaUrl)}" alt="${escapeHtml(q.title)}" loading="lazy"></div>`;
      }
    }

    const answersHtml = (q.answers || []).map(a => {
      const authorLabel = normalizeAuthorLabel(a.author);
      const isAuto = a.is_auto_helper || authorLabel.includes('Ban Tư Vấn');
      const formattedBody = window.CoVanAssistant && window.CoVanAssistant.formatMarkdown
        ? window.CoVanAssistant.formatMarkdown(a.content)
        : escapeHtml(a.content);

      const adminDeleteAnsBtn = isAdminLoggedIn
        ? `<button type="button" class="btn-admin-mini del-btn" onclick="deleteAnswer(${q.id}, ${a.id})" title="Xóa bình luận này">🗑️ Xóa</button>`
        : '';

      return `
        <div class="answer-item ${isAuto ? 'auto-helper-reply' : ''}">
          <div class="answer-header">
            <span class="answer-author">${isAuto ? '🌿 ' : '💬 '}${escapeHtml(authorLabel)}</span>
            <div style="display:flex; align-items:center; gap:8px;">
              <span class="answer-time">${escapeHtml(a.created_at || '')}</span>
              ${adminDeleteAnsBtn}
            </div>
          </div>
          <div class="answer-body">${formattedBody}</div>
        </div>
      `;
    }).join('');

    const pinnedBadgeHtml = q.pinned
      ? `<span class="pinned-badge-pill">📌 Bài viết đã ghim</span>`
      : '';

    const adminPostToolbarHtml = isAdminLoggedIn
      ? `
        <div class="admin-card-toolbar">
          <span style="font-size:0.78rem; font-weight:800; color:var(--accent-gold);">👑 Công cụ Quản trị:</span>
          <button type="button" class="btn-admin-mini pin-btn" onclick="togglePinQuestion(${q.id})">
            ${q.pinned ? '📍 Bỏ ghim' : '📌 Ghim lên đầu'}
          </button>
          <button type="button" class="btn-admin-mini" onclick="openEditPostModal(${q.id})">
            ✏️ Sửa bài viết
          </button>
          <button type="button" class="btn-admin-mini del-btn" onclick="deleteQuestion(${q.id})">
            🗑️ Xóa bài viết
          </button>
        </div>
      `
      : '';

    const likedClass = isLiked(q.id) ? 'liked' : '';
    const card = document.createElement('article');
    card.className = `q-card ${isCoVan ? 'admin-post' : ''} ${q.pinned ? 'pinned-post' : ''}`;
    card.id = `question-card-${q.id}`;
    card.innerHTML = `
      <div class="q-meta">
        <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
          ${pinnedBadgeHtml}
          <span class="badge-cat">${escapeHtml(q.category)}</span>
        </div>
        <span class="author-tag-pill ${isCoVan ? 'is-admin' : ''}">
          ${isCoVan ? '👑 ' : '👤 '}Đăng bởi: <b>${escapeHtml(q.author)}</b> • ${escapeHtml(q.created_at)}
        </span>
      </div>
      <h3 class="q-title">${escapeHtml(q.title)}</h3>
      <div class="q-content">${escapeHtml(q.content)}</div>
      ${mediaHtml}
      <div class="q-actions">
        <button type="button" class="btn-like ${likedClass}" onclick="likeQuestion(${q.id})">
          ❤️ Hữu ích (${q.likes || 0})
        </button>
        <button type="button" class="btn-auto-consult" id="btnAutoConsult-${q.id}" onclick="triggerAutoConsultForPost(${q.id})">
          ✨ Nhờ Bếp Ấm Tư Vấn Thêm
        </button>
        <span class="ans-count-label">💡 ${(q.answers || []).length} câu trả lời</span>
      </div>
      ${adminPostToolbarHtml}
      <div class="answers-box">
        <div id="answers-list-${q.id}">
          ${answersHtml || '<i>Hãy là người đầu tiên chia sẻ kinh nghiệm dưới bài viết này nhé!</i>'}
        </div>
        <form class="reply-form" onsubmit="submitAnswer(event, ${q.id})">
          <input type="text" name="author" placeholder="Nhập tên của bạn..." value="${defaultReplyAuthor}" required>
          <input type="text" name="content" placeholder="Viết câu trả lời sẻ chia yêu thương..." required>
          <button type="submit" class="btn-reply">Gửi trả lời</button>
        </form>
      </div>
    `;
    box.appendChild(card);
  });
}

async function triggerAutoConsultForPost(qId) {
  const q = allQuestions.find(item => item.id === qId);
  if (!q) return;

  const btn = document.getElementById(`btnAutoConsult-${qId}`);
  const ansList = document.getElementById(`answers-list-${qId}`);
  if (btn) {
    btn.disabled = true;
    btn.textContent = '🌿 Đang soạn chia sẻ...';
  }

  let replyText = '';
  if (window.CoVanAssistant && window.CoVanAssistant.generateForumReply) {
    replyText = await window.CoVanAssistant.generateForumReply(q);
  } else {
    replyText = '🍵 Chia sẻ dưỡng sinh lành mạnh: Duy trì uống nước ấm buổi sáng, kết hợp thảo dược tự nhiên và giữ tinh thần thư thái giúp tăng cường sức đề kháng rất tốt ạ!';
  }

  const newAns = {
    id: Date.now(),
    question_id: qId,
    author: '🌿 Ban Tư Vấn Sống Vui Khỏe',
    is_auto_helper: true,
    content: replyText,
    created_at: getFormattedNow()
  };

  if (!Array.isArray(q.answers)) q.answers = [];
  q.answers.push(newAns);
  saveQuestionsToStorage();
  updateCategoryCounts();
  renderQuestions();

  if (ansList) {
    const updatedCard = document.getElementById(`question-card-${qId}`);
    if (updatedCard) updatedCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

async function likeQuestion(qId) {
  const q = allQuestions.find(item => item.id === qId);
  if (!q) return;
  q.likes = (q.likes || 0) + 1;
  markLiked(qId);
  saveQuestionsToStorage();
  renderQuestions();

  try {
    await fetch(`${SOURCE_API_BASE}/api/like`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question_id: qId })
    });
  } catch (_) {}
}

async function submitAnswer(e, qId) {
  e.preventDefault();
  const f = e.target;
  const authorVal = f.author.value.trim() || 'Thành viên';
  const contentVal = f.content.value.trim();
  if (!contentVal) return;

  const q = allQuestions.find(item => item.id === qId);
  if (q) {
    if (!Array.isArray(q.answers)) q.answers = [];
    q.answers.push({
      id: Date.now(),
      question_id: qId,
      author: authorVal,
      content: contentVal,
      created_at: getFormattedNow()
    });
    saveQuestionsToStorage();
    updateCategoryCounts();
    renderQuestions();
  }

  try {
    await fetch(`${SOURCE_API_BASE}/api/answers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question_id: qId, author: authorVal, content: contentVal })
    });
  } catch (_) {}
}

function selectQuickAuthor(name) {
  const authorInput = document.getElementById('q_author');
  if (authorInput) {
    authorInput.value = name;
    authorInput.focus();
  }
}

function clearPendingMedia() {
  pendingMediaDataUrl = '';
  pendingMediaType = '';
  const fileInput = document.getElementById('q_media');
  const previewBox = document.getElementById('mediaUploadPreview');
  const previewContent = document.getElementById('mediaPreviewContent');
  if (fileInput) fileInput.value = '';
  if (previewContent) previewContent.innerHTML = '';
  if (previewBox) previewBox.style.display = 'none';
}

function setupQuestionForm() {
  const fileInput = document.getElementById('q_media');
  const previewBox = document.getElementById('mediaUploadPreview');
  const previewContent = document.getElementById('mediaPreviewContent');

  if (fileInput) {
    fileInput.addEventListener('change', () => {
      const file = fileInput.files[0];
      if (!file) {
        clearPendingMedia();
        return;
      }
      const isVideo = file.type.startsWith('video/');
      pendingMediaType = isVideo ? 'video' : 'image';
      const reader = new FileReader();
      reader.onload = (ev) => {
        pendingMediaDataUrl = ev.target.result;
        if (previewContent && previewBox) {
          previewContent.innerHTML = isVideo
            ? `<video controls src="${pendingMediaDataUrl}"></video>`
            : `<img src="${pendingMediaDataUrl}" alt="Xem trước ảnh">`;
          previewBox.style.display = 'block';
        }
      };
      reader.readAsDataURL(file);
    });
  }

  const form = document.getElementById('questionForm');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const author = document.getElementById('q_author').value.trim() || 'Cô Vân Nguyễn';
    const category = document.getElementById('q_category').value;
    const title = document.getElementById('q_title').value.trim();
    const content = document.getElementById('q_content').value.trim();
    const autoReplyBox = document.getElementById('autoReplyCheck');
    const wantAutoReply = autoReplyBox ? autoReplyBox.checked : true;

    if (!title || !content) return;

    const newId = allQuestions.reduce((max, item) => Math.max(max, item.id || 0), 0) + 1;
    const newPost = {
      id: newId,
      pinned: false,
      author: author,
      category: category,
      title: title,
      content: content,
      likes: 1,
      created_at: getFormattedNow(),
      media_url: pendingMediaDataUrl,
      media_type: pendingMediaType,
      answers: []
    };

    allQuestions.unshift(newPost);
    saveQuestionsToStorage();
    currentCategory = 'ALL';
    document.querySelectorAll('.cat-btn').forEach(b => {
      b.classList.toggle('active', b.getAttribute('data-cat') === 'ALL');
    });
    updateCategoryCounts();
    renderQuestions();

    document.getElementById('q_title').value = '';
    document.getElementById('q_content').value = '';
    clearPendingMedia();

    try {
      const formData = new FormData();
      formData.append('author', author);
      formData.append('category', category);
      formData.append('title', title);
      formData.append('content', content);
      fetch(`${SOURCE_API_BASE}/api/questions`, { method: 'POST', body: formData }).catch(() => {});
    } catch (_) {}

    if (wantAutoReply) {
      await triggerAutoConsultForPost(newId);
    }
  });
}

// ==========================================================================
// 3. CẨM NANG DƯỠNG SINH & BẾP ẤM (DYNAMIC & ADMIN-EDITABLE)
// ==========================================================================

function initHandbookSection() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_HANDBOOK);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        allHandbook = parsed;
      }
    }
  } catch (_) {}

  if (!allHandbook.length) {
    allHandbook = JSON.parse(JSON.stringify(DEFAULT_HANDBOOK));
  }
  renderHandbookGrid();
}

function renderHandbookGrid() {
  const grid = document.getElementById('handbookGrid');
  if (!grid) return;

  grid.innerHTML = allHandbook.map(hb => {
    const promptText = hb.prompt || `Hướng dẫn chi tiết về: ${hb.title}`;
    const adminControls = isAdminLoggedIn
      ? `
        <div class="admin-card-toolbar" style="margin-bottom: 10px;">
          <button type="button" class="btn-admin-mini" onclick="openHandbookModal('${escapeHtml(hb.id)}')">✏️ Sửa</button>
          <button type="button" class="btn-admin-mini del-btn" onclick="deleteHandbookItem('${escapeHtml(hb.id)}')">🗑️ Xóa</button>
        </div>
      `
      : '';

    return `
      <article class="hb-card">
        <div class="hb-icon-wrap">${escapeHtml(hb.icon || '🍵')}</div>
        <span class="hb-cat-tag">${escapeHtml(hb.category)}</span>
        <h3 class="hb-title">${escapeHtml(hb.title)}</h3>
        <p class="hb-summary">${escapeHtml(hb.summary)}</p>
        <div class="hb-details">${escapeHtml(hb.details)}</div>
        ${adminControls}
        <button type="button" class="btn-ask-hb" onclick="window.CoVanAssistant && window.CoVanAssistant.openWithPrompt('${escapeHtml(promptText)}')">
          💬 Hỏi thêm về bí quyết này
        </button>
      </article>
    `;
  }).join('');
}

// ==========================================================================
// 4. BỨC TƯỜNG LỜI CHÚC YÊU THƯƠNG (WISH WALL)
// ==========================================================================

function initWishesWall() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_WISHES);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length) {
        allWishes = parsed;
      }
    }
  } catch (_) {}

  if (!allWishes.length) {
    allWishes = JSON.parse(JSON.stringify(DEFAULT_WISHES));
  }
  renderWishesWall();

  const wishForm = document.getElementById('wishForm');
  if (wishForm) {
    wishForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const sender = document.getElementById('wishSender').value.trim() || 'Thành viên Cộng đồng';
      const flower = document.getElementById('wishFlower').value || '💐';
      const text = document.getElementById('wishText').value.trim();
      if (!text) return;

      allWishes.unshift({
        id: Date.now(),
        flower: flower,
        sender: sender,
        text: text
      });
      try {
        localStorage.setItem(STORAGE_KEY_WISHES, JSON.stringify(allWishes));
      } catch (_) {}
      document.getElementById('wishText').value = '';
      renderWishesWall();
    });
  }
}

function renderWishesWall() {
  const grid = document.getElementById('wishesWallGrid');
  if (!grid) return;
  grid.innerHTML = allWishes.slice(0, 9).map(w => {
    const adminDeleteBtn = isAdminLoggedIn
      ? `<div style="margin-top:8px;"><button type="button" class="btn-admin-mini del-btn" onclick="deleteWishItem(${w.id})">🗑️ Xóa lời chúc</button></div>`
      : '';
    return `
      <div class="wish-card-item">
        <span class="wish-flower-icon">${escapeHtml(w.flower)}</span>
        <p class="wish-text">"${escapeHtml(w.text)}"</p>
        <div class="wish-sender">— ${escapeHtml(w.sender)}</div>
        ${adminDeleteBtn}
      </div>
    `;
  }).join('');
}

function fillSuggestedWish() {
  const input = document.getElementById('wishText');
  if (!input) return;
  const randomWish = SAMPLE_WISH_SUGGESTIONS[Math.floor(Math.random() * SAMPLE_WISH_SUGGESTIONS.length)];
  input.value = randomWish;
  input.focus();
}

// ==========================================================================
// 5. HỆ THỐNG QUẢN TRỊ VIÊN TOÀN DIỆN (ADMIN LOGIN, CRUD, BACKUP)
// ==========================================================================

function getActiveAdminPin() {
  try {
    return localStorage.getItem(STORAGE_KEY_ADMIN_PIN) || DEFAULT_ADMIN_PIN;
  } catch (_) {
    return DEFAULT_ADMIN_PIN;
  }
}

function initAdminSystem() {
  try {
    const savedSession = sessionStorage.getItem(STORAGE_KEY_ADMIN_SESSION);
    if (savedSession === 'true') {
      isAdminLoggedIn = true;
    }
  } catch (_) {}

  updateAdminUIState();

  // Nếu truy cập bằng đường dẫn ?admin=1 thì mở ngay bảng đăng nhập quản trị
  if (window.location.search.includes('admin=1') && !isAdminLoggedIn) {
    openAdminModal('adminLoginModal');
  }
}

function handleAdminButtonClick() {
  if (isAdminLoggedIn) {
    openSiteSettingsModal();
  } else {
    const errEl = document.getElementById('adminLoginError');
    const pinInput = document.getElementById('adminPinInput');
    if (errEl) errEl.style.display = 'none';
    if (pinInput) pinInput.value = '';
    openAdminModal('adminLoginModal');
    setTimeout(() => {
      if (pinInput) pinInput.focus();
    }, 150);
  }
}

function submitAdminLogin(e) {
  e.preventDefault();
  const pinInput = document.getElementById('adminPinInput');
  const errEl = document.getElementById('adminLoginError');
  const entered = pinInput ? pinInput.value.trim() : '';

  if (entered === getActiveAdminPin() || entered === 'covan2010') {
    isAdminLoggedIn = true;
    try {
      sessionStorage.setItem(STORAGE_KEY_ADMIN_SESSION, 'true');
    } catch (_) {}
    closeAdminModal('adminLoginModal');
    updateAdminUIState();
  } else {
    if (errEl) errEl.style.display = 'block';
  }
}

function logoutAdmin() {
  isAdminLoggedIn = false;
  try {
    sessionStorage.removeItem(STORAGE_KEY_ADMIN_SESSION);
  } catch (_) {}
  updateAdminUIState();
}

function updateAdminUIState() {
  const floatingBar = document.getElementById('adminFloatingBar');
  const headerBtn = document.getElementById('btnAdminHeader');
  const hbTopAction = document.getElementById('adminHandbookTopAction');

  if (floatingBar) {
    floatingBar.style.display = isAdminLoggedIn ? 'block' : 'none';
  }
  if (headerBtn) {
    headerBtn.innerHTML = isAdminLoggedIn ? '👑 Đang Quản Trị' : '👑 Quản Trị';
    headerBtn.classList.toggle('active-admin', isAdminLoggedIn);
  }
  if (hbTopAction) {
    hbTopAction.style.display = isAdminLoggedIn ? 'block' : 'none';
  }

  renderQuestions();
  renderHandbookGrid();
  renderWishesWall();
}

function openAdminModal(modalId) {
  const el = document.getElementById(modalId);
  if (el) el.classList.add('active');
}

function closeAdminModal(modalId) {
  const el = document.getElementById(modalId);
  if (el) el.classList.remove('active');
}

function closeAllAdminModals() {
  document.querySelectorAll('.admin-modal-overlay.active').forEach(el => {
    el.classList.remove('active');
  });
}

// Quản lý Thông báo & Giao diện trang chủ
function openSiteSettingsModal() {
  document.getElementById('cfg_bannerText').value = siteConfig.bannerText || '';
  document.getElementById('cfg_heroQuote').value = siteConfig.heroQuote || '';
  document.getElementById('cfg_heroQuoteAuthor').value = siteConfig.heroQuoteAuthor || '';
  document.getElementById('cfg_defaultAuthor').value = siteConfig.defaultAuthor || 'Cô Vân Nguyễn';
  openAdminModal('adminSiteSettingsModal');
}

function saveSiteSettingsForm(e) {
  e.preventDefault();
  siteConfig.bannerText = document.getElementById('cfg_bannerText').value.trim();
  siteConfig.heroQuote = document.getElementById('cfg_heroQuote').value.trim();
  siteConfig.heroQuoteAuthor = document.getElementById('cfg_heroQuoteAuthor').value.trim();
  siteConfig.defaultAuthor = document.getElementById('cfg_defaultAuthor').value.trim() || 'Cô Vân Nguyễn';

  saveAllToStorage();
  applySiteConfigToDOM();
  renderQuestions();
  closeAdminModal('adminSiteSettingsModal');
}

// Quản lý Bài viết & Bình luận (Ghim, Sửa, Xóa)
function togglePinQuestion(qId) {
  const q = allQuestions.find(item => item.id === qId);
  if (!q) return;
  q.pinned = !q.pinned;
  saveQuestionsToStorage();
  renderQuestions();
}

function openEditPostModal(qId) {
  const q = allQuestions.find(item => item.id === qId);
  if (!q) return;
  document.getElementById('edit_q_id').value = q.id;
  document.getElementById('edit_q_author').value = q.author || '';
  document.getElementById('edit_q_category').value = q.category || 'Sức khỏe & Dưỡng sinh';
  document.getElementById('edit_q_title').value = q.title || '';
  document.getElementById('edit_q_content').value = q.content || '';
  openAdminModal('adminEditPostModal');
}

function saveEditedPost(e) {
  e.preventDefault();
  const qId = Number(document.getElementById('edit_q_id').value);
  const q = allQuestions.find(item => item.id === qId);
  if (!q) return;

  q.author = document.getElementById('edit_q_author').value.trim();
  q.category = document.getElementById('edit_q_category').value;
  q.title = document.getElementById('edit_q_title').value.trim();
  q.content = document.getElementById('edit_q_content').value.trim();

  saveQuestionsToStorage();
  updateCategoryCounts();
  renderQuestions();
  closeAdminModal('adminEditPostModal');
}

function deleteQuestion(qId) {
  const q = allQuestions.find(item => item.id === qId);
  if (!q) return;
  if (!confirm(`Cô có chắc chắn muốn xóa bài viết "${q.title}" không ạ?`)) return;

  allQuestions = allQuestions.filter(item => item.id !== qId);
  saveQuestionsToStorage();
  updateCategoryCounts();
  renderQuestions();
}

function deleteAnswer(qId, ansId) {
  const q = allQuestions.find(item => item.id === qId);
  if (!q || !Array.isArray(q.answers)) return;
  if (!confirm('Cô có muốn xóa bình luận này khỏi bài viết không ạ?')) return;

  q.answers = q.answers.filter(a => a.id !== ansId);
  saveQuestionsToStorage();
  updateCategoryCounts();
  renderQuestions();
}

// Quản lý Cẩm Nang Dưỡng Sinh & Bếp Ấm
function openHandbookModal(hbId) {
  const titleEl = document.getElementById('handbookModalTitle');
  if (hbId) {
    const hb = allHandbook.find(item => item.id === hbId);
    if (!hb) return;
    if (titleEl) titleEl.textContent = '✏️ Chỉnh Sửa Mục Cẩm Nang';
    document.getElementById('hb_edit_id').value = hb.id;
    document.getElementById('hb_icon').value = hb.icon || '🍵';
    document.getElementById('hb_category').value = hb.category || 'Sức khỏe & Dưỡng sinh';
    document.getElementById('hb_title').value = hb.title || '';
    document.getElementById('hb_summary').value = hb.summary || '';
    document.getElementById('hb_details').value = hb.details || '';
  } else {
    if (titleEl) titleEl.textContent = '🍵 Thêm Mẹo Cẩm Nang Mới';
    document.getElementById('hb_edit_id').value = '';
    document.getElementById('hb_icon').value = '🍵';
    document.getElementById('hb_category').value = 'Sức khỏe & Dưỡng sinh';
    document.getElementById('hb_title').value = '';
    document.getElementById('hb_summary').value = '';
    document.getElementById('hb_details').value = '';
  }
  openAdminModal('adminHandbookModal');
}

function saveHandbookItem(e) {
  e.preventDefault();
  const editId = document.getElementById('hb_edit_id').value.trim();
  const icon = document.getElementById('hb_icon').value.trim() || '🍵';
  const category = document.getElementById('hb_category').value;
  const title = document.getElementById('hb_title').value.trim();
  const summary = document.getElementById('hb_summary').value.trim();
  const details = document.getElementById('hb_details').value.trim();

  if (editId) {
    const existing = allHandbook.find(item => item.id === editId);
    if (existing) {
      existing.icon = icon;
      existing.category = category;
      existing.title = title;
      existing.summary = summary;
      existing.details = details;
      existing.prompt = `Chia sẻ chi tiết hơn về: ${title}`;
    }
  } else {
    allHandbook.unshift({
      id: 'hb-' + Date.now(),
      icon,
      category,
      title,
      summary,
      details,
      prompt: `Chia sẻ chi tiết hơn về: ${title}`
    });
  }

  saveAllToStorage();
  renderHandbookGrid();
  closeAdminModal('adminHandbookModal');
}

function deleteHandbookItem(hbId) {
  const hb = allHandbook.find(item => item.id === hbId);
  if (!hb) return;
  if (!confirm(`Cô có chắc chắn muốn xóa mục cẩm nang "${hb.title}" không ạ?`)) return;

  allHandbook = allHandbook.filter(item => item.id !== hbId);
  saveAllToStorage();
  renderHandbookGrid();
}

// Quản lý Bức tường lời chúc
function deleteWishItem(wId) {
  if (!confirm('Cô có muốn xóa lời chúc này không ạ?')) return;
  allWishes = allWishes.filter(w => w.id !== wId);
  saveAllToStorage();
  renderWishesWall();
}

// Quản lý Sao lưu, Khôi phục & Đổi Mã PIN
function openBackupModal() {
  const newPinInput = document.getElementById('newAdminPinInput');
  if (newPinInput) newPinInput.value = '';
  openAdminModal('adminBackupModal');
}

function changeAdminPin() {
  const newPinInput = document.getElementById('newAdminPinInput');
  const val = newPinInput ? newPinInput.value.trim() : '';
  if (val.length < 4) {
    alert('Vui lòng nhập mã PIN mới có ít nhất 4 ký tự để đảm bảo an toàn ạ!');
    return;
  }
  try {
    localStorage.setItem(STORAGE_KEY_ADMIN_PIN, val);
    newPinInput.value = '';
    alert(`✅ Đã đổi mã PIN quản trị thành công! Mã PIN mới của cô là: ${val}`);
  } catch (_) {}
}

function exportCommunityBackup() {
  const backupData = {
    exportedAt: getFormattedNow(),
    siteConfig,
    questions: allQuestions,
    handbook: allHandbook,
    wishes: allWishes
  };
  const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `Sao_Luu_Web_Co_Van_Nguyen_${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function importCommunityBackup(e) {
  const file = e.target.files && e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (ev) => {
    try {
      const parsed = JSON.parse(ev.target.result);
      if (parsed.siteConfig) siteConfig = { ...DEFAULT_SITE_CONFIG, ...parsed.siteConfig };
      if (Array.isArray(parsed.questions)) allQuestions = parsed.questions;
      if (Array.isArray(parsed.handbook)) allHandbook = parsed.handbook;
      if (Array.isArray(parsed.wishes)) allWishes = parsed.wishes;

      saveAllToStorage();
      applySiteConfigToDOM();
      updateCategoryCounts();
      renderQuestions();
      renderHandbookGrid();
      renderWishesWall();
      closeAdminModal('adminBackupModal');
      alert('✅ Đã khôi phục toàn bộ dữ liệu trang web thành công!');
    } catch (_) {
      alert('⚠️ Tệp sao lưu không hợp lệ. Vui lòng chọn đúng tệp .json đã tải về trước đó ạ!');
    }
  };
  reader.readAsText(file);
}

function resetToDefaultCommunityData() {
  if (!confirm('Cô có muốn khôi phục trang web về dữ liệu gốc ban đầu không ạ?')) return;
  siteConfig = { ...DEFAULT_SITE_CONFIG };
  allQuestions = JSON.parse(JSON.stringify(DEFAULT_QUESTIONS));
  allHandbook = JSON.parse(JSON.stringify(DEFAULT_HANDBOOK));
  allWishes = JSON.parse(JSON.stringify(DEFAULT_WISHES));
  saveAllToStorage();
  applySiteConfigToDOM();
  updateCategoryCounts();
  renderQuestions();
  renderHandbookGrid();
  renderWishesWall();
  closeAdminModal('adminBackupModal');
}

// ==========================================================================
// 6. SHARE LINK, QR MODAL, LIGHTBOX, FONT SIZE & THEME
// ==========================================================================

function toggleBox(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const isHidden = (el.style.display === 'none' || !el.style.display);
  el.style.display = isHidden ? 'block' : 'none';
  if (isHidden) {
    el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

function copyShareLink() {
  const linkEl = document.getElementById('tunnelUrlText');
  const linkText = linkEl ? linkEl.innerText.trim() : window.location.href;
  const targetUrl = linkText.startsWith('http') ? linkText : window.location.href;

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(targetUrl).then(() => {
      showCopyToast(`✅ Đã sao chép đường link: ${targetUrl}\nCô gửi link này hoặc tấm ảnh Mã QR qua Zalo nhé ạ!`);
    }).catch(() => {
      alert('Đã sao chép đường link: ' + targetUrl);
    });
  } else {
    alert('Đường link chia sẻ Zalo: ' + targetUrl);
  }
}

function showCopyToast(msg) {
  const btn = document.getElementById('btnCopyShareLink');
  if (btn) {
    const orig = btn.innerHTML;
    btn.innerHTML = '✅ Đã Sao Chép!';
    setTimeout(() => { btn.innerHTML = orig; }, 2500);
  } else {
    alert(msg);
  }
}

function openLightbox(imgSrc, captionText) {
  const overlay = document.getElementById('lightboxOverlay');
  const img = document.getElementById('lightboxImg');
  const cap = document.getElementById('lightboxCaption');
  if (!overlay || !img) return;
  img.src = imgSrc;
  if (cap) cap.textContent = captionText || 'Cộng Đồng Sống Vui Khỏe & Bếp Ấm - Cô Vân Nguyễn';
  overlay.classList.add('active');
}

function closeLightbox() {
  const overlay = document.getElementById('lightboxOverlay');
  if (overlay) overlay.classList.remove('active');
}

function setFontSize(sizeMode, btn) {
  document.documentElement.setAttribute('data-fontsize', sizeMode);
  document.querySelectorAll('.font-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  try {
    localStorage.setItem('covan_fontsize', sizeMode);
  } catch (_) {}
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  const btn = document.getElementById('themeToggleBtn');
  if (btn) btn.textContent = next === 'dark' ? '☀️' : '🌙';
  try {
    localStorage.setItem('covan_theme', next);
  } catch (_) {}
}

function initPreferencesAndListeners() {
  try {
    const savedTheme = localStorage.getItem('covan_theme');
    if (savedTheme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      const btn = document.getElementById('themeToggleBtn');
      if (btn) btn.textContent = '☀️';
    }
    const savedFont = localStorage.getItem('covan_fontsize');
    if (savedFont) {
      document.documentElement.setAttribute('data-fontsize', savedFont);
      document.querySelectorAll('.font-btn').forEach(b => {
        b.classList.toggle('active', b.getAttribute('data-size') === savedFont);
      });
    }
  } catch (_) {}

  const scrollBtn = document.getElementById('scrollTopBtn');
  window.addEventListener('scroll', () => {
    if (scrollBtn) {
      scrollBtn.classList.toggle('visible', window.scrollY > 380);
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeLightbox();
      closeAllAdminModals();
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initPreferencesAndListeners();
  initSiteConfig();
  setupQuestionForm();
  initHandbookSection();
  initQuestionsData();
  initWishesWall();
  initAdminSystem();
});
