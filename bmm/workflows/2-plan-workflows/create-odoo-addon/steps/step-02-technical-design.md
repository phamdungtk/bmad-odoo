# Bước 2: Thiết Kế Kỹ Thuật

## 1. Mục Tiêu

Xác định chi tiết kỹ thuật của addon: models, views, security.

## 2. Thiết Kế Models

### 2.1 Models Mới

Liệt kê các model mới cần tạo:

| Model Name | Mô tả | Kế thừa từ |
|------------|-------|------------|
| `{addon_name}.{model}` | | (nếu có) |

### 2.2 Mở Rộng Models Có Sẵn

Models Odoo cần mở rộng:

| Model | Fields Thêm | Methods Thêm |
|-------|-------------|--------------|
| `res.partner` | | |
| `sale.order` | | |

### 2.3 Fields

Các fields cần thêm:

```python
# Ví dụ:
custom_field = fields.Char('Tên Field', required=True)
partner_id = fields.Many2one('res.partner', 'Khách hàng')
line_ids = fields.One2many('model.line', 'parent_id', 'Chi tiết')
```

## 3. Thiết Kế Views

### 3.1 Views Cần Tạo

- [ ] Form view
- [ ] Tree/List view
- [ ] Search view
- [ ] Kanban view
- [ ] Calendar view
- [ ] Pivot view
- [ ] Graph view

### 3.2 Menu & Actions

Vị trí menu:
- Menu cha: 
- Menu con:
- Action:

## 4. Security

### 4.1 Groups

- [ ] Cần tạo security group mới
- [ ] Sử dụng groups có sẵn

### 4.2 Access Rights

| Model | Group | Read | Write | Create | Unlink |
|-------|-------|------|-------|--------|--------|
| | | ✓ | | | |

---

## 5. Menu

```
[C] Tiếp tục - Thiết kế hoàn tất
[M] Models - Thêm chi tiết models
[V] Views - Thêm chi tiết views
[B] Quay lại
```

## 6. Hành Động Tiếp Theo

Khi chọn **[C]**: Tải `steps/step-03-generate.md`
