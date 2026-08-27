# Learning Portal

Ứng dụng luyện thi trắc nghiệm với tính năng: đăng ký/đăng nhập, kho đề, luyện tập, solo realtime, bảng xếp hạng, phân tích điểm mạnh/yếu.

Cài đặt nhanh (local):

1. Tạo MongoDB Atlas và lấy URI, gán vào .env:

MONGODB_URI=your_mongodb_uri
JWT_SECRET=replace_this_with_secure_secret

2. Cài deps & chạy:

npm install
npm run seed
npm run dev

API routes chính:
- POST /api/auth/register
- POST /api/auth/login
- GET /api/auth/me (header Authorization: token)
- GET /api/questions
- POST /api/questions (admin)
- POST /api/exams/answer
- GET /api/leaderboard
- GET /api/socket (initializes socket server)

Deploy: push repo → tạo services trên Render (Web Service: `npm start` for production or `npm run dev` for staging). Thiết lập biến môi trường trên Render: MONGODB_URI, JWT_SECRET.

Tôi đã scaffold cơ bản: models, API, pages, socket.io.

Tiếp theo tôi sẽ:
- Hoàn thiện UI các trang (practice flow, leaderboard, analysis)
- Thêm chức năng real-time chi tiết (match flow, scoring)
- Tối ưu bảo mật và tests

