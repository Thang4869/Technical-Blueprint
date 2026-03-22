# Bizarre Brigade — Technical Blueprint

Phiên bản demo: một trang tài liệu kỹ thuật tương tác dành cho đội phát triển muốn tái tạo "Bizarre Brigade" — một mini-game dạng roguelite / auto-shooter tập trung vào hiệu năng và kiến trúc ECS.

## Tổng Quan

- **Mục đích**: Cung cấp bản thuyết minh kỹ thuật, biểu đồ tương tác và checklist MVP để hướng dẫn việc triển khai (ECS, Spatial Hashing, Object Pooling, Rendering Batching).
- **Tập tin chính**: [a.html](a.html), [b.html](b.html), [styles.css](styles.css), [src/css/base.css](src/css/base.css), [src/css/components.css](src/css/components.css), [src/css/helpers.css](src/css/helpers.css)

## Điểm nổi bật của trang

- **Giao diện**: Thiết kế infographic/SPA, responsive, dùng Tailwind + Chart.js để trực quan hóa phân tích.
- **Nội dung kỹ thuật**: Phân tích ECS, luồng game chính, pipeline render, chiến lược tối ưu (grid hashing, pooling, batching).
- **MVP hướng tới**: Core ECS, grid spatial, object pool, player movement, 1 loại enemy, auto-attack.

## Chạy nhanh (local)

- **Xem bằng Python 3 (từ thư mục dự án)**:

```powershell
python -m http.server 8000
# rồi mở http://localhost:8000/b.html hoặc /a.html
```

- **Hoặc (Node.js)**:

```bash
npx serve . -l 8000
# rồi mở http://localhost:8000/b.html
```

## Mục tiêu của README này

- **Truyền cảm hứng**: Giúp reviewer/lead nhanh chóng nắm được tầm nhìn kỹ thuật và các trade-off đã chọn.
- **Hướng hành động**: Là nguồn tham chiếu để tạo các module code tiếp theo (ObjectPool, SpatialGrid, Systems...).

## Gợi ý review

- **Kiểm tra kỹ thuật**: Xác thực các đề xuất tối ưu (spatial hashing, batching) với benchmark nhỏ.
- **Accessibility & responsiveness**: Duyệt trên mobile và desktop, đảm bảo charts/interactive elements hoạt động tốt.

## Muốn tôi giúp gì tiếp theo?

- Tạo PR (tiêu đề + body), hoặc tự động commit & push các thay đổi, hoặc sinh danh sách issue/ticket từ từng mục kỹ thuật.

---
_Bản README này được tối ưu để giới thiệu nhanh và tạo động lực cho việc triển khai — sẵn sàng mở rộng thành tài liệu developer chi tiết khi cần!_
