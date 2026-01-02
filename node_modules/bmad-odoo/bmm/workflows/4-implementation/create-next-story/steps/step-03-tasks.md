# Bước 3: Chia Nhỏ Tasks

## 1. Mục Tiêu

Chia story thành các tasks và subtasks cụ thể, có thể thực hiện được.

## 2. Tasks Breakdown

### Task 1: {Tên task}
**Mô tả:** {mô tả chi tiết}
**Files liên quan:** {đường dẫn file}

- [ ] Subtask 1.1: {mô tả}
- [ ] Subtask 1.2: {mô tả}
- [ ] Subtask 1.3: Viết test cho task 1

### Task 2: {Tên task}
**Mô tả:** 
**Files liên quan:** 

- [ ] Subtask 2.1: 
- [ ] Subtask 2.2: 
- [ ] Subtask 2.3: Viết test cho task 2

### Task 3: Kiểm Thử Tích Hợp
- [ ] Subtask 3.1: Viết integration tests
- [ ] Subtask 3.2: Chạy full test suite
- [ ] Subtask 3.3: Fix any failing tests

## 3. Ví Dụ Task Breakdown

```markdown
### Task 1: Thêm field mới vào Sale Order
**Files:** sale_extension/models/sale_order.py

- [ ] 1.1: Thêm field `custom_reference` (Char)
- [ ] 1.2: Thêm computed field `total_with_tax`
- [ ] 1.3: Cập nhật `__init__.py`
- [ ] 1.4: Viết unit test cho các field mới

### Task 2: Cập nhật View
**Files:** sale_extension/views/sale_order_views.xml

- [ ] 2.1: Thêm field vào form view
- [ ] 2.2: Thêm field vào tree view
- [ ] 2.3: Thêm vào search filter
```

## 4. Quy Tắc

- Mỗi subtask nên hoàn thành trong 1-2 giờ
- Mỗi subtask kết thúc với test (TDD)
- Không subtask nào phụ thuộc vào subtask khác trong cùng task

---

## 5. Menu

```
[C] Tiếp tục - Đã chia task xong
[A] Add - Thêm task
[E] Edit - Sửa task
[B] Quay lại
```

## 6. Hành Động Tiếp Theo

Khi chọn **[C]**: Tải `steps/step-04-complete.md`
