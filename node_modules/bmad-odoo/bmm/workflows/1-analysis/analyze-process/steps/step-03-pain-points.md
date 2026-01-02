# Bước 3: Xác Định Điểm Đau (Pain Points)

## 1. Mục Tiêu Bước Này

Xác định các vấn đề, khó khăn, và cơ hội cải thiện trong quy trình hiện tại.

## 2. Các Câu Hỏi Thu Thập

### 2.1 Các Điểm Đau Hiện Tại

**Những vấn đề lớn nhất** bạn gặp phải với quy trình hiện tại là gì?

Ví dụ:
- Mất nhiều thời gian nhập liệu
- Dữ liệu không nhất quán
- Khó theo dõi trạng thái
- Thiếu báo cáo
- Giao tiếp giữa các bộ phận kém

### 2.2 Tắc Nghẽn (Bottlenecks)

**Điểm tắc nghẽn** trong quy trình nằm ở đâu?
- Bước nào mất nhiều thời gian nhất?
- Bước nào thường xuyên bị trễ?
- Bước nào phụ thuộc vào một người cụ thể?

### 2.3 Các Bước Thủ Công

Những **bước thủ công** nào bạn muốn tự động hóa?
- Nhập liệu lặp đi lặp lại
- Tạo báo cáo thủ công
- Gửi email/thông báo
- Tính toán

### 2.4 Mong Muốn Cải Thiện

Nếu có thể thay đổi **một điều duy nhất**, bạn sẽ thay đổi gì?

---

## 3. Tóm Tắt Điểm Đau

Dựa trên thông tin thu thập, tạo bảng tóm tắt:

| Điểm Đau | Mức Độ | Tác Động | Có Thể Giải Quyết Bằng Odoo |
|----------|--------|----------|----------------------------|
| | Cao/TB/Thấp | | Có/Không/Một phần |

---

## 4. Menu

```
[C] Tiếp tục - Đã xác định đủ điểm đau
[A] Thêm - Có thêm điểm đau khác
[R] Xem lại - Xem danh sách điểm đau
[B] Quay lại - Quay lại bước trước
```

---

## 5. Hành Động Tiếp Theo

Khi người dùng chọn **[C] Tiếp tục**:
1. Cập nhật file đầu ra với phần "Điểm Đau"
2. Thêm `"step-03-pain-points"` vào `stepsCompleted`
3. Tải và thực thi: `{project-root}/_bmad-odoo/bmm/workflows/1-analysis/analyze-process/steps/step-04-odoo-mapping.md`
