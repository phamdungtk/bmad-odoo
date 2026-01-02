# Bước 2: Đánh Giá Rủi Ro

## 1. Mục Tiêu

Xác định và đánh giá rủi ro của việc migration.

## 2. Breaking Changes

### 2.1 Thay Đổi Quan Trọng Giữa Phiên Bản

Dựa trên Odoo release notes, các thay đổi chính:

| Thay đổi | Tác động | Cần xử lý |
|----------|----------|-----------|
| attrs → invisible expression | Views | Cập nhật tất cả views |
| api.multi removed | Python | Cập nhật code |
| ... | | |

### 2.2 Ma Trận Rủi Ro

| Rủi ro | Xác suất | Tác động | Mức độ | Giảm thiểu |
|--------|----------|----------|--------|------------|
| Custom module không tương thích | Cao | Cao | 🔴 | Test trước |
| Data loss | Thấp | Cao | 🟠 | Backup |
| Downtime kéo dài | TB | Cao | 🟠 | Migration plan |

## 3. Đánh Giá Effort

### 3.1 Ước Tính Thời Gian

| Hạng mục | Effort (ngày) |
|----------|---------------|
| Cập nhật custom modules | |
| Cập nhật OCA modules | |
| Data migration script | |
| Testing | |
| **Tổng** | |

---

## 4. Menu

```
[C] Tiếp tục - Đã đánh giá xong
[D] Chi tiết - Phân tích rủi ro cụ thể
[B] Quay lại
```

## 5. Hành Động Tiếp Theo

Khi chọn **[C]**: Tải `steps/step-03-roadmap.md`
