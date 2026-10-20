/**
 * TRỢ LÝ TƯƠNG TÁC THƯƠNG HIỆU - CỘNG ĐỒNG SỐNG VUI KHỎE & BẾP ẤM (CÔ VÂN NGUYỄN)
 * Tích hợp song song DeepSeek & Google Gemini với cơ chế dự phòng 3 lớp
 * Đại diện thuần khiết thương hiệu Cộng đồng Sẻ Chia Yêu Thương
 */
(function () {
  'use strict';

  // API Keys (Mã hóa Base64 theo chuẩn kỹ năng brand-assistant-integrator)
  const DEFAULT_DEEPSEEK_KEY = atob('c2stNmJjZDIxMDJhZTQ1NDIxYWE5NjlkNjE3MmM2MzA2NGY=');
  const DEFAULT_GEMINI_KEY = atob('QVEuQWI4Uk42SkRIa1E3WTJjcEhIUGt0Y3pEdHdpY2RJaHFLZjBDUEZCMFRCMnZtNEtzNnc=');

  const CONFIG = {
    brandName: 'Bếp Ấm Cô Vân Nguyễn',
    fullCommunityName: 'Cộng Đồng Sống Vui Khỏe & Bếp Ấm',
    fabTitle: 'Hỏi Bếp Ấm Cô Vân',
    fabSub: 'Dưỡng sinh, nấu ăn & mẹo vặt 24/7',
    fabBadge: 'Trực Tuyến',
    avatarImg: 'assets/img/co-van-nguyen.webp',
    avatarFallback: 'assets/img/co-van-nguyen.jpg',
    subHeader: 'Quản trị viên: Cô Vân Nguyễn • songvuikhoe.life',
    footerNote: 'Cộng Đồng Sống Vui Khỏe & Bếp Ấm • songvuikhoe.life',
    sourceUrl: 'https://songvuikhoe.life',
    deepseekModel: 'deepseek-chat',
    geminiModel: 'gemini-2.5-flash'
  };

  // KHO TRI THỨC ĐẠI DIỆN CỘNG ĐỒNG SỐNG VUI KHỎE & BẾP ẤM - CÔ VÂN NGUYỄN
  const SYSTEM_KNOWLEDGE = `
Bạn là đại diện tư vấn chính thức, lễ phép, ấm áp và giàu kinh nghiệm của "${CONFIG.fullCommunityName}" - Trang Web Cộng Đồng Sẻ Chia Yêu Thương do Quản trị viên Cô Vân Nguyễn sáng lập và điều hành.

THÔNG TIN CỐT LÕI CỦA CỘNG ĐỒNG:
- Tên trang web: Cộng Đồng Sống Vui Khỏe & Bếp Ấm
- Quản trị viên sáng lập: Cô Vân Nguyễn (người phụ nữ Việt Nam nhân hậu, luôn rạng rỡ, yêu thương gia đình, đam mê dưỡng sinh, nấu ăn lành mạnh và kết nối cộng đồng).
- Slogan: Nơi giao lưu, hỏi đáp & sẻ chia kinh nghiệm Sức khỏe - Nấu ăn - Mẹo vặt gia đình.
- 4 Chuyên mục chính của cộng đồng:
  1. Sức khỏe & Dưỡng sinh (🍵):
     - Phòng tránh bệnh cảm giao mùa: Duy trì uống nước ấm buổi sáng ngay khi thức dậy, kết hợp thảo dược tự nhiên (trà gừng tươi, sả, táo đỏ, mật ong ấm), súc miệng nước muối ấm, giữ ấm cổ và bàn chân, vận động nhẹ nhàng 15-20 phút mỗi ngày giúp khí huyết lưu thông, tăng sức đề kháng.
     - Thức uống tinh bột nghệ và mật ong rừng buổi sáng: Pha với nước ấm khoảng 40 - 45 độ C (tuyệt đối không dùng nước sôi già vì làm vón cục nghệ và mất dưỡng chất mật ong), khuấy đều 2 thìa nhỏ tinh bột nghệ trước rồi mới cho 1 thìa mật ong rừng vào, uống trước bữa sáng 20 phút giúp êm dịu và bảo vệ dạ dày.
  2. Nấu ăn & Bếp ấm (🍲):
     - Bí quyết nấu canh rau củ ngọt thanh tự nhiên không cần bột ngọt/mì chính: Dùng củ cải trắng, bắp ngọt (ngô Mỹ) và vài quả táo đỏ hầm lấy nước dùng trước 20 phút. Nước canh ngọt thanh tự nhiên, bổ dưỡng, cả người lớn và các cháu nhỏ đều mê tít.
     - Mẹo luộc rau xanh giòn: Đun nước thật sôi, thêm chút muối hạt và vài giọt dầu ăn, luộc lửa lớn mở vung, vớt ra đĩa thoáng khí.
  3. Mẹo vặt cuộc sống (🌱):
     - Khử mùi nhà bếp tự nhiên: Đun sôi nồi nước nhỏ với vỏ bưởi/vỏ cam, 2 nhánh sả đập dập và vài lát gừng tươi trong 10 phút giúp khử sạch mùi tanh dầu mỡ và thanh lọc không khí.
  4. Gia đình & Con cháu (👨‍👩‍👧‍👦):
     - Rèn cho các bé tiểu học thói quen tự giác đọc sách 30 phút mỗi tối: Người lớn (ông bà, cha mẹ) hãy dành 15-20 phút ngồi đọc cùng con cháu và đố vui nhẹ nhàng về câu chuyện vừa đọc. Khi người lớn đồng hành ấm áp, các bé sẽ hào hứng rời tivi và yêu đọc sách hơn rất nhiều.
- Tinh thần Ngày Phụ nữ Việt Nam 20/10: Luôn gửi lời chúc sức khỏe, bình an, trẻ trung, rạng rỡ và ngập tràn hạnh phúc đến Cô Vân Nguyễn cùng tất cả các bà, các mẹ, các chị em phụ nữ Việt Nam.
- Lưu ý sức khỏe: Các chia sẻ về sức khỏe và dinh dưỡng trên trang mang tính chất tham khảo kinh nghiệm sống lành mạnh trong cộng đồng, không thay thế cho chẩn đoán của bác sĩ.

QUY TẮC GIAO TIẾP BẮT BUỘC:
1. Xưng hô lễ phép, ân cần, gần gũi như người thân trong gia đình ("Dạ con/em xin kính chào Cô/Bác/Anh/Chị ạ", khi nói với Cô Vân Nguyễn thì xưng "con" và gọi "Cô Vân Nguyễn" thật kính trọng, ấm áp).
2. TUYỆT ĐỐI KHÔNG BAO GIỜ tự nhận mình là AI, trí tuệ nhân tạo, mô hình ngôn ngữ, DeepSeek hay Gemini. Luôn khẳng định mình là Ban Tư Vấn trực tuyến của Cộng Đồng Sống Vui Khỏe & Bếp Ấm - Cô Vân Nguyễn.
3. Trả lời rõ ràng, có gạch đầu dòng dễ đọc, văn phong ấm áp, truyền cảm hứng sống vui khỏe.
`;

  let chatHistory = [
    {
      role: 'assistant',
      content: `Dạ xin kính chào Cô Vân Nguyễn cùng các Cô, Bác, Anh, Chị thành viên! 🌿<br><br>Chào mừng mọi người đến với **Cộng Đồng Sống Vui Khỏe & Bếp Ấm**. Hôm nay Cô, Bác, Anh, Chị muốn cùng trò chuyện về **bí quyết dưỡng sinh**, **món ngon bếp ấm**, **mẹo vặt gia đình** hay gửi lời chúc yêu thương ạ?`
    }
  ];

  function formatMarkdown(text) {
    if (!text) return '';
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/(?:^|\n)[*-]\s+(.+)/g, '\n<li>$1</li>')
      .replace(/(<li>.*?<\/li>)/gs, '<ul>$1</ul>')
      .replace(/\n\n+/g, '<br><br>')
      .replace(/\n/g, '<br>');
  }

  // Lớp 3: Smart Fallback Engine cục bộ trả lời tức thì mọi chủ đề cộng đồng
  function getSmartFallbackReply(userText, categoryHint) {
    const q = (userText || '').toLowerCase();
    const cat = (categoryHint || '').toLowerCase();

    if (q.includes('cảm') || q.includes('ho') || q.includes('thời tiết') || q.includes('giao mùa') || q.includes('đề kháng')) {
      return `🍵 **Chia sẻ dưỡng sinh phòng cảm giao mùa từ Cộng đồng Cô Vân Nguyễn:**<br>
• **Buổi sáng:** Duy trì uống 1 cốc nước ấm ngay khi thức dậy để kích hoạt khí huyết lưu thông.<br>
• **Thảo dược tự nhiên:** Uống trà gừng tươi pha mật ong ấm, hoặc nước sả - táo đỏ - kỷ tử giúp làm ấm phế quản và tăng sức đề kháng.<br>
• **Giữ ấm:** Lưu ý giữ ấm vùng cổ, ngực và lòng bàn chân khi sáng sớm hoặc tối muộn; súc miệng nước muối ấm 2 lần/ngày.<br>
• **Vận động:** Tập thể dục dưỡng sinh, đi bộ nhẹ nhàng 15 - 20 phút mỗi ngày giúp cơ thể dẻo dai, khỏe mạnh ạ!`;
    }

    if (q.includes('nghệ') || q.includes('mật ong') || q.includes('dạ dày') || q.includes('buổi sáng')) {
      return `🍯 **Bí quyết pha Tinh bột nghệ & Mật ong rừng ấm bụng buổi sáng:**<br>
• **Nhiệt độ nước chuẩn:** Dùng khoảng 150ml - 200ml nước ấm từ **40°C - 45°C** (không dùng nước sôi già trên 60°C vì sẽ làm tinh bột nghệ bị vón cục và làm giảm dưỡng chất quý của mật ong).<br>
• **Cách pha:** Cho 2 thìa nhỏ tinh bột nghệ vào khuấy tan đều trước, sau đó mới thêm 1 thìa mật ong rừng nguyên chất.<br>
• **Thời điểm vàng:** Uống trước bữa ăn sáng khoảng **20 phút** giúp bảo vệ niêm mạc dạ dày, hỗ trợ tiêu hóa và giúp làn da tươi sáng hồng hào ạ!`;
    }

    if (q.includes('canh') || q.includes('nấu ăn') || q.includes('ngọt thanh') || q.includes('bột ngọt') || q.includes('mì chính') || q.includes('rau củ') || cat.includes('nấu ăn')) {
      return `🍲 **Bí quyết nấu canh rau củ ngọt thanh tự nhiên tại Bếp Ấm Cô Vân:**<br>
• **Nguyên liệu tạo ngọt tự nhiên:** Dùng **củ cải trắng**, **bắp ngọt (ngô Mỹ)**, vài quả **táo đỏ** (có thể thêm nấm hương hoặc hành tây) hầm lấy nước dùng trước khoảng **20 phút**.<br>
• **Ưu điểm:** Nước canh có vị ngọt thanh dịu tự nhiên, thơm mát mà hoàn toàn không cần dùng nhiều bột ngọt hay hạt nêm công nghiệp.<br>
• **Mẹo thêm:** Khi luộc hoặc nấu rau xanh, hãy đợi nước thật sôi và thêm một chút muối hạt cùng vài giọt dầu thực vật để rau giữ màu xanh ngọc đẹp mắt, các con các cháu đều mê tít ạ!`;
    }

    if (q.includes('đọc sách') || q.includes('con') || q.includes('cháu') || q.includes('tiểu học') || q.includes('tivi') || q.includes('gia đình') || cat.includes('gia đình')) {
      return `👨‍👩‍👧‍👦 **Kinh nghiệm gắn kết gia đình & rèn thói quen tốt cho con cháu:**<br>
• **Đồng hành cùng trẻ:** Thay vì chỉ nhắc con cháu tắt tivi, ông bà và bố mẹ hãy dành **15 - 20 phút mỗi tối** ngồi đọc sách cùng bé.<br>
• **Đố vui nhẹ nhàng:** Sau khi đọc xong 1 câu chuyện ngắn, hãy trò chuyện hoặc đố vui nhẹ nhàng về nhân vật trong truyện và khen ngợi khi bé trả lời đúng.<br>
• Khi có người lớn đồng hành ấm áp, các bé sẽ cảm nhận được tình yêu thương và tự giác yêu thích đọc sách hơn rất nhiều ạ!`;
    }

    if (q.includes('20/10') || q.includes('lời chúc') || q.includes('phụ nữ') || q.includes('chúc mừng')) {
      return `💐 **Lời chúc yêu thương từ Cộng Đồng Sống Vui Khỏe & Bếp Ấm:**<br>
Nhân dịp tôn vinh Phụ nữ Việt Nam, xin kính chúc **Cô Vân Nguyễn** cùng tất cả các Bà, các Mẹ, các Chị Em luôn dồi dào sức khỏe, tâm an vạn sự lành, mãi trẻ trung rạng rỡ như hoa mùa xuân và ngập tràn tiếng cười hạnh phúc bên gia đình, học trò cùng những người thân yêu nhất! ❤️🌹`;
    }

    if (q.includes('mẹo') || q.includes('khử mùi') || q.includes('nhà bếp') || cat.includes('mẹo vặt')) {
      return `🌱 **Mẹo vặt giữ gian bếp luôn thơm tho, ấm cúng:**<br>
• **Khử mùi tự nhiên:** Đun sôi một nồi nước nhỏ gồm **vỏ bưởi (hoặc vỏ cam, chanh)** cùng **2 nhánh sả đập dập** và vài lát **gừng tươi** trong 10 phút.<br>
• **Công dụng:** Tinh dầu thảo mộc tự nhiên lan tỏa sẽ khử sạch mùi dầu mỡ, mùi cá chiên, đồng thời giúp không khí gia đình thư thái, ấm áp và xua đuổi côn trùng rất an toàn ạ!`;
    }

    if (q.includes('vân nguyễn') || q.includes('quản trị') || q.includes('cô vân') || q.includes('giới thiệu')) {
      return `🌸 **Giới thiệu Quản trị viên Sáng lập - Cô Vân Nguyễn:**<br>
• **Cô Vân Nguyễn** là người sáng lập và quản trị viên tâm huyết của **Cộng Đồng Sống Vui Khỏe & Bếp Ấm**.<br>
• Với tâm niệm *"Sức khỏe là vàng, bếp ấm là nhà"*, Cô Vân Nguyễn đã xây dựng không gian này để các bà, các mẹ, các chị em và mọi gia đình cùng nhau giao lưu, hỏi đáp và lan tỏa những kinh nghiệm quý báu về dưỡng sinh, ẩm thực lành mạnh và vun đắp tổ ấm yêu thương mỗi ngày ạ!`;
    }

    if (q.includes('zalo') || q.includes('qr') || q.includes('chia sẻ') || q.includes('link')) {
      return `📱 **Hướng dẫn chia sẻ Trang Web Cộng Đồng qua Zalo:**<br>
• Cô và các thành viên có thể bấm nút **"📋 Sao Chép Link"** hoặc **"📱 Mở Mã QR Quét Nhanh"** ngay trên thanh công cụ đầu trang.<br>
• Chỉ cần gửi tấm ảnh Mã QR hoặc đường link qua nhóm Zalo, bạn bè và người thân mở camera Zalo quét nhẹ là vào thẳng trang web cộng đồng của Cô Vân Nguyễn ngay lập tức ạ!`;
    }

    return `🌿 Dạ cảm ơn chia sẻ rất tuyệt vời của Cô/Bác/Anh/Chị tại **Cộng Đồng Sống Vui Khỏe & Bếp Ấm - Cô Vân Nguyễn**!<br><br>Theo kinh nghiệm dưỡng sinh và chăm sóc gia đình của cộng đồng mình, việc duy trì chế độ ăn uống thanh đạm tự nhiên, uống đủ nước ấm mỗi sáng và giữ tinh thần vui vẻ, lạc quan chính là chìa khóa vàng cho sức khỏe. Mời các cô, các chị trong cộng đồng cùng vào chia sẻ thêm kinh nghiệm thực tế nhé ạ! ❤️`;
  }

  // Lớp 1: DeepSeek API
  async function callDeepSeekAPI(messages) {
    const formatted = [
      { role: 'system', content: SYSTEM_KNOWLEDGE },
      ...messages.slice(-8)
    ];
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 9000);

    const res = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DEFAULT_DEEPSEEK_KEY}`
      },
      body: JSON.stringify({
        model: CONFIG.deepseekModel,
        messages: formatted,
        temperature: 0.65,
        max_tokens: 700
      }),
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (!res.ok) throw new Error('DeepSeek unavailable');
    const data = await res.json();
    return data.choices[0].message.content;
  }

  // Lớp 2: Google Gemini API
  async function callGeminiAPI(messages) {
    const contents = messages.slice(-8).map(m => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }]
    }));
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${CONFIG.geminiModel}:generateContent?key=${DEFAULT_GEMINI_KEY}`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 9000);

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: SYSTEM_KNOWLEDGE }] },
        contents: contents,
        generationConfig: { temperature: 0.65, maxOutputTokens: 700 }
      }),
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (!res.ok) throw new Error('Gemini unavailable');
    const data = await res.json();
    return data.candidates[0].content.parts[0].text;
  }

  // Hàm lấy phản hồi 3 lớp cho khung Chat
  async function fetchConsultation(userText) {
    chatHistory.push({ role: 'user', content: userText });
    try {
      const reply = await callDeepSeekAPI(chatHistory);
      chatHistory.push({ role: 'assistant', content: reply });
      return reply;
    } catch (_err1) {
      try {
        const reply = await callGeminiAPI(chatHistory);
        chatHistory.push({ role: 'assistant', content: reply });
        return reply;
      } catch (_err2) {
        const fallback = getSmartFallbackReply(userText);
        chatHistory.push({ role: 'assistant', content: fallback });
        return fallback;
      }
    }
  }

  // Hàm tự động trả lời bài đăng trên Diễn đàn Cộng đồng (Forum Auto-Reply)
  async function generateForumReply(questionObj) {
    const promptText = `Thành viên "${questionObj.author}" vừa đăng bài trong chuyên mục "${questionObj.category}" với tiêu đề: "${questionObj.title}" và nội dung: "${questionObj.content}". Hãy viết một câu trả lời ngắn gọn (khoảng 3-5 câu), thật ấm áp, lễ phép, giàu kinh nghiệm thực tế để phản hồi ngay dưới bài viết này với tư cách Ban Tư Vấn Cộng Đồng Sống Vui Khỏe & Bếp Ấm của Cô Vân Nguyễn.`;
    const tempMessages = [{ role: 'user', content: promptText }];
    try {
      return await callDeepSeekAPI(tempMessages);
    } catch (_e1) {
      try {
        return await callGeminiAPI(tempMessages);
      } catch (_e2) {
        return getSmartFallbackReply(`${questionObj.title} ${questionObj.content}`, questionObj.category);
      }
    }
  }

  function renderWidget() {
    const fab = document.createElement('div');
    fab.className = 'brand-fab-launcher';
    fab.id = 'brandFabLauncher';
    fab.setAttribute('role', 'button');
    fab.setAttribute('aria-label', CONFIG.fabTitle);
    fab.innerHTML = `
      <div class="brand-fab-icon-box">
        <span class="brand-fab-pulse"></span>
        <img src="${CONFIG.avatarImg}" onerror="this.src='${CONFIG.avatarFallback}'" alt="Cô Vân Nguyễn">
      </div>
      <div class="brand-fab-text">
        <span class="brand-fab-title">${CONFIG.fabTitle}</span>
        <span class="brand-fab-sub">${CONFIG.fabSub}</span>
      </div>
      <span class="brand-fab-badge">${CONFIG.fabBadge}</span>
    `;

    const chatWin = document.createElement('div');
    chatWin.className = 'brand-chat-window';
    chatWin.id = 'brandChatWindow';
    chatWin.innerHTML = `
      <div class="brand-chat-header">
        <div class="brand-chat-profile">
          <div class="brand-avatar">
            <img src="${CONFIG.avatarImg}" onerror="this.src='${CONFIG.avatarFallback}'" alt="Cô Vân Nguyễn">
            <span class="brand-online-dot"></span>
          </div>
          <div class="brand-profile-meta">
            <div class="brand-title">${CONFIG.brandName}</div>
            <span class="brand-status-text">${CONFIG.subHeader}</span>
          </div>
        </div>
        <div class="brand-header-actions">
          <button class="brand-icon-btn" id="btnBrandClear" title="Làm mới cuộc trò chuyện">↺</button>
          <button class="brand-icon-btn" id="btnBrandClose" title="Thu nhỏ">&times;</button>
        </div>
      </div>

      <div class="brand-chat-chips" id="brandChatChips">
        <button class="brand-chip-btn" data-query="Cách phòng tránh bệnh cảm giao mùa hiệu quả?">🍵 Phòng cảm giao mùa</button>
        <button class="brand-chip-btn" data-query="Cách pha tinh bột nghệ mật ong buổi sáng đúng chuẩn?">🍯 Nghệ mật ong ấm bụng</button>
        <button class="brand-chip-btn" data-query="Mẹo hầm canh rau củ ngọt thanh tự nhiên không cần mì chính?">🍲 Canh ngọt tự nhiên</button>
        <button class="brand-chip-btn" data-query="Làm sao khích lệ con cháu tự giác đọc sách mỗi tối?">📚 Rèn bé đọc sách</button>
        <button class="brand-chip-btn" data-query="Gửi lời chúc yêu thương ngày Phụ nữ Việt Nam 20/10 đến Cô Vân Nguyễn!">💐 Lời chúc 20/10</button>
      </div>

      <div class="brand-chat-body" id="brandChatBody">
        <div class="brand-msg bot">
          <div class="brand-msg-avatar">
            <img src="${CONFIG.avatarImg}" onerror="this.src='${CONFIG.avatarFallback}'" alt="Cô Vân">
          </div>
          <div class="brand-msg-bubble">${formatMarkdown(chatHistory[0].content)}</div>
        </div>
      </div>

      <div class="brand-chat-footer">
        <form class="brand-input-form" id="brandChatForm">
          <textarea class="brand-input-field" id="brandInputField" rows="1" placeholder="Nhập câu hỏi về sức khỏe, nấu ăn, mẹo vặt..."></textarea>
          <button type="submit" class="brand-send-btn" id="brandSendBtn" aria-label="Gửi">➤</button>
        </form>
        <div class="brand-footer-note">${CONFIG.footerNote}</div>
      </div>
    `;

    document.body.appendChild(fab);
    document.body.appendChild(chatWin);

    const chatBody = document.getElementById('brandChatBody');
    const inputField = document.getElementById('brandInputField');
    const form = document.getElementById('brandChatForm');
    const btnClose = document.getElementById('btnBrandClose');
    const btnClear = document.getElementById('btnBrandClear');
    const chipsContainer = document.getElementById('brandChatChips');

    function toggleChat(forceOpen) {
      const show = forceOpen !== undefined ? forceOpen : !chatWin.classList.contains('open');
      chatWin.classList.toggle('open', show);
      if (show) {
        setTimeout(() => inputField.focus(), 120);
      }
    }

    async function sendUserQuestion(text) {
      const txt = (text || '').trim();
      if (!txt) return;

      const userDiv = document.createElement('div');
      userDiv.className = 'brand-msg user';
      userDiv.innerHTML = `<div class="brand-msg-bubble">${formatMarkdown(txt)}</div>`;
      chatBody.appendChild(userDiv);
      chatBody.scrollTop = chatBody.scrollHeight;

      const loading = document.createElement('div');
      loading.className = 'brand-msg bot';
      loading.innerHTML = `
        <div class="brand-msg-avatar">
          <img src="${CONFIG.avatarImg}" onerror="this.src='${CONFIG.avatarFallback}'" alt="Cô Vân">
        </div>
        <div class="brand-msg-bubble"><em>🌿 Đang soạn câu trả lời tâm huyết...</em></div>
      `;
      chatBody.appendChild(loading);
      chatBody.scrollTop = chatBody.scrollHeight;

      const reply = await fetchConsultation(txt);
      loading.remove();

      const botDiv = document.createElement('div');
      botDiv.className = 'brand-msg bot';
      botDiv.innerHTML = `
        <div class="brand-msg-avatar">
          <img src="${CONFIG.avatarImg}" onerror="this.src='${CONFIG.avatarFallback}'" alt="Cô Vân">
        </div>
        <div class="brand-msg-bubble">${formatMarkdown(reply)}</div>
      `;
      chatBody.appendChild(botDiv);
      chatBody.scrollTop = chatBody.scrollHeight;
    }

    fab.addEventListener('click', () => toggleChat());
    btnClose.addEventListener('click', () => toggleChat(false));

    btnClear.addEventListener('click', () => {
      chatHistory = [chatHistory[0]];
      chatBody.innerHTML = `
        <div class="brand-msg bot">
          <div class="brand-msg-avatar">
            <img src="${CONFIG.avatarImg}" onerror="this.src='${CONFIG.avatarFallback}'" alt="Cô Vân">
          </div>
          <div class="brand-msg-bubble">${formatMarkdown(chatHistory[0].content)}</div>
        </div>
      `;
    });

    inputField.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        form.dispatchEvent(new Event('submit'));
      }
    });

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const txt = inputField.value.trim();
      if (!txt) return;
      inputField.value = '';
      await sendUserQuestion(txt);
    });

    chipsContainer.addEventListener('click', async (e) => {
      const chip = e.target.closest('.brand-chip-btn');
      if (!chip) return;
      const q = chip.getAttribute('data-query');
      if (q) {
        await sendUserQuestion(q);
      }
    });

    // Public API cho phép các nút trên trang gọi mở hộp thoại tư vấn hoặc trả lời tự động trên diễn đàn
    window.CoVanAssistant = {
      openWithPrompt: function (promptText) {
        toggleChat(true);
        if (promptText) {
          sendUserQuestion(promptText);
        }
      },
      generateForumReply: generateForumReply,
      formatMarkdown: formatMarkdown
    };
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderWidget);
  } else {
    renderWidget();
  }
})();

