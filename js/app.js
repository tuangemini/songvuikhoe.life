/**
 * CỘNG ĐỒNG SỐNG VUI KHỎE & BẾP ẤM - QUẢN TRỊ VIÊN: CÔ VÂN NGUYỄN
 * Ứng dụng Web Tương Tác Cộng Đồng Sẻ Chia Yêu Thương (app.js)
 */

const SOURCE_API_BASE = 'https://roads-fixes-delaware-wallet.trycloudflare.com';
const STORAGE_KEY_QUESTIONS = 'covan_community_questions_v1';
const STORAGE_KEY_WISHES = 'covan_community_wishes_v1';
const STORAGE_KEY_LIKED = 'covan_liked_ids_v1';

// Dữ liệu gốc chuẩn từ nguồn tài liệu Cô Vân Nguyễn
const DEFAULT_QUESTIONS = [
  {
    id: 5,
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

let allQuestions = [];
let currentCategory = 'ALL';
let currentSort = 'newest';
let pendingMediaDataUrl = '';
let pendingMediaType = '';

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

function saveQuestionsToStorage() {
  try {
    localStorage.setItem(STORAGE_KEY_QUESTIONS, JSON.stringify(allQuestions));
  } catch (_) {}
}

async function initQuestionsData() {
  // 1. Load from localStorage or DEFAULT_QUESTIONS
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

  // 2. Try syncing live questions from source Cloudflare Tunnel API if online
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
    // Hoạt động độc lập mượt mà bằng bộ nhớ cục bộ khi tunnel ngoại tuyến
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

  // Update Hero counter
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

  if (currentSort === 'likes') {
    filtered.sort((a, b) => (b.likes || 0) - (a.likes || 0));
  } else if (currentSort === 'answers') {
    filtered.sort((a, b) => ((b.answers || []).length) - ((a.answers || []).length));
  } else {
    filtered.sort((a, b) => (b.id || 0) - (a.id || 0));
  }

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

      return `
        <div class="answer-item ${isAuto ? 'auto-helper-reply' : ''}">
          <div class="answer-header">
            <span class="answer-author">${isAuto ? '🌿 ' : '💬 '}${escapeHtml(authorLabel)}</span>
            <span class="answer-time">${escapeHtml(a.created_at || '')}</span>
          </div>
          <div class="answer-body">${formattedBody}</div>
        </div>
      `;
    }).join('');

    const likedClass = isLiked(q.id) ? 'liked' : '';
    const card = document.createElement('article');
    card.className = `q-card ${isCoVan ? 'admin-post' : ''}`;
    card.id = `question-card-${q.id}`;
    card.innerHTML = `
      <div class="q-meta">
        <span class="badge-cat">${escapeHtml(q.category)}</span>
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
      <div class="answers-box">
        <div id="answers-list-${q.id}">
          ${answersHtml || '<i>Hãy là người đầu tiên chia sẻ kinh nghiệm dưới bài viết này nhé!</i>'}
        </div>
        <form class="reply-form" onsubmit="submitAnswer(event, ${q.id})">
          <input type="text" name="author" placeholder="Nhập tên của bạn..." value="Cô Vân Nguyễn" required>
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

    // Reset form fields
    document.getElementById('q_title').value = '';
    document.getElementById('q_content').value = '';
    clearPendingMedia();

    // Send to remote server in background if available
    try {
      const formData = new FormData();
      formData.append('author', author);
      formData.append('category', category);
      formData.append('title', title);
      formData.append('content', content);
      fetch(`${SOURCE_API_BASE}/api/questions`, { method: 'POST', body: formData }).catch(() => {});
    } catch (_) {}

    // Trigger automatic helpful reply if enabled
    if (wantAutoReply) {
      await triggerAutoConsultForPost(newId);
    }
  });
}

// ==========================================================================
// BỨC TƯỜNG LỜI CHÚC YÊU THƯƠNG (WISH WALL)
// ==========================================================================

let allWishes = [];

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
  grid.innerHTML = allWishes.slice(0, 6).map(w => `
    <div class="wish-card-item">
      <span class="wish-flower-icon">${escapeHtml(w.flower)}</span>
      <p class="wish-text">"${escapeHtml(w.text)}"</p>
      <div class="wish-sender">— ${escapeHtml(w.sender)}</div>
    </div>
  `).join('');
}

function fillSuggestedWish() {
  const input = document.getElementById('wishText');
  if (!input) return;
  const randomWish = SAMPLE_WISH_SUGGESTIONS[Math.floor(Math.random() * SAMPLE_WISH_SUGGESTIONS.length)];
  input.value = randomWish;
  input.focus();
}

// ==========================================================================
// SHARE LINK, QR MODAL, LIGHTBOX, FONT SIZE & THEME
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

  // Scroll to top visibility
  const scrollBtn = document.getElementById('scrollTopBtn');
  window.addEventListener('scroll', () => {
    if (scrollBtn) {
      scrollBtn.classList.toggle('visible', window.scrollY > 380);
    }
  });

  // Escape key closes lightbox & modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeLightbox();
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initPreferencesAndListeners();
  setupQuestionForm();
  initQuestionsData();
  initWishesWall();
});

