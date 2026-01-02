# Bước 2: Tiêu Chí Chấp Nhận

## 1. Mục Tiêu

Định nghĩa tiêu chí chấp nhận rõ ràng theo format GIVEN-WHEN-THEN.

## 2. Acceptance Criteria

### AC-01: {Tên tiêu chí}
```gherkin
GIVEN (Cho trước): {điều kiện ban đầu}
WHEN (Khi): {hành động thực hiện}
THEN (Thì): {kết quả mong đợi}
```

### AC-02: {Tên tiêu chí}
```gherkin
GIVEN: 
WHEN: 
THEN: 
```

### AC-03: {Tên tiêu chí}
```gherkin
GIVEN: 
WHEN: 
THEN: 
```

## 3. Ví Dụ

```gherkin
# AC-01: Tạo đơn hàng từ báo giá
GIVEN: Người dùng đang xem báo giá đã xác nhận
WHEN: Người dùng nhấn nút "Chuyển thành Đơn hàng"
THEN: 
  - Hệ thống tạo đơn hàng mới từ báo giá
  - Trạng thái báo giá chuyển thành "Đã chuyển"
  - Hiển thị thông báo thành công
```

## 4. Checklist Validation

Mỗi AC phải:
- [ ] Có thể kiểm thử được
- [ ] Có kết quả rõ ràng (pass/fail)
- [ ] Độc lập với AC khác
- [ ] Liên quan đến business value

---

## 5. Menu

```
[C] Tiếp tục - Đã định nghĩa AC
[A] Add - Thêm AC
[E] Edit - Sửa AC
[B] Quay lại
```

## 6. Hành Động Tiếp Theo

Khi chọn **[C]**: Tải `steps/step-03-tasks.md`
