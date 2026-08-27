# Learning Portal

Ứng dụng luyện thi trắc nghiệm với tính năng: đăng ký/đăng nhập, kho đề, luyện tập, solo realtime, bảng xếp hạng, phân tích điểm mạnh/yếu.

Lưu ý quan trọng về bảo mật
- KHÔNG commit thông tin nhạy cảm (MONGODB_URI, mật khẩu, API keys) vào repository. Repo này công khai — nếu bạn đã lỡ commit credentials, hãy đổi ngay mật khẩu/khóa và xoá commit lịch sử.
- Thay vì commit, lưu các giá trị nhạy cảm vào biến môi trường trên máy chủ hoặc dịch vụ deploy (ví dụ: Render, Vercel) — tôi sẽ hướng dẫn cấu hình.

Cài đặt nhanh (local):

1. Tạo file `.env` (không commit) và thêm biến:

MONGODB_URI=your_mongodb_uri
JWT_SECRET=replace_this_with_long_secret
ADMIN_PASSWORD=admin123  # optional - seed script sẽ dùng giá trị này để tạo admin nếu chưa có
ADMIN_EMAIL=admin@lp.test

2. Cài deps & chạy seed:

npm install
npm run seed
npm run dev

3. Mở http://localhost:3000

API routes chính:
- POST /api/auth/register
- POST /api/auth/login
- GET /api/auth/me (header Authorization: token)
- GET /api/questions
- POST /api/questions (admin)
- POST /api/exams/answer
- GET /api/leaderboard
- GET /api/socket (initializes socket server)

Deploy: push repo → tạo services trên Render (Web Service: `npm start` for production or `npm run dev` for staging). Thiết lập biến môi trường trên Render: MONGODB_URI, JWT_SECRET, ADMIN_PASSWORD, ADMIN_EMAIL.

Tôi đã scaffold cơ bản: models, API, pages, socket.io. Tôi sẽ tiếp tục hoàn thiện giao diện Tiếng Việt, solo realtime, phân tích điểm mạnh/yếu, và deploy lên Render theo yêu cầu của bạn.
