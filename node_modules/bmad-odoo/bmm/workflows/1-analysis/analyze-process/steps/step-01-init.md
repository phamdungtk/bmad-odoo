# Bước 1: Khởi Tạo Phân Tích Quy Trình

## 1. Chào Người Dùng

Chào {user_name}! Tôi là Sofia, Chuyên viên Phân tích Nghiệp vụ Odoo của bạn. 

Hôm nay chúng ta sẽ cùng nhau phân tích một quy trình nghiệp vụ và xác định cách ánh xạ nó với các chức năng Odoo.

## 2. Thu Thập Thông Tin Ban Đầu

Để bắt đầu, tôi cần biết một số thông tin cơ bản về quy trình bạn muốn phân tích:

### Câu hỏi:

1. **Tên quy trình nghiệp vụ** bạn muốn phân tích là gì?
   - Ví dụ: "Quy trình bán hàng", "Quy trình mua hàng", "Quy trình sản xuất"...

2. **Mục đích** của việc phân tích này là gì?
   - [ ] Triển khai Odoo mới
   - [ ] Nâng cấp/cải thiện hệ thống hiện có
   - [ ] Xác định tính khả thi

3. **Phạm vi** của quy trình này thuộc phòng ban/bộ phận nào?

---

## 3. Menu

Sau khi người dùng cung cấp thông tin, hiển thị menu:

```
[C] Tiếp tục - Chuyển sang bước tiếp theo
[R] Xem lại - Xem lại thông tin đã thu thập
[H] Trợ giúp - Cần giải thích thêm
[X] Thoát - Kết thúc phân tích
```

---

## 4. Hành Động Tiếp Theo

Khi người dùng chọn **[C] Tiếp tục**:
1. Lưu thông tin vào file đầu ra với `stepsCompleted: ["step-01-init"]`
2. Tải và thực thi: `{project-root}/_bmad-odoo/bmm/workflows/1-analysis/analyze-process/steps/step-02-current-state.md`
