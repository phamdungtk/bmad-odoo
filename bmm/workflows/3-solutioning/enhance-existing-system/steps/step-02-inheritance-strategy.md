# Bước 2: Chọn Chiến Lược Kế Thừa

## 1. Mục Tiêu

Chọn mẫu kế thừa phù hợp cho việc nâng cấp.

## 2. Các Mẫu Kế Thừa Odoo

### 2.1 Class Inheritance (`_inherit`)

**Khi nào dùng:** Mở rộng model hiện có, thêm fields/methods.

```python
class SaleOrderExtension(models.Model):
    _inherit = 'sale.order'
    
    custom_field = fields.Char('Custom Field')
    
    def custom_method(self):
        pass
```

**Ưu điểm:** Đơn giản, phổ biến nhất
**Nhược điểm:** Thay đổi trực tiếp model gốc

### 2.2 Delegation Inheritance (`_inherits`)

**Khi nào dùng:** Tạo model mới kế thừa data từ model khác.

```python
class CustomPartner(models.Model):
    _name = 'custom.partner'
    _inherits = {'res.partner': 'partner_id'}
    
    partner_id = fields.Many2one('res.partner', required=True, ondelete='cascade')
    extra_field = fields.Char()
```

**Ưu điểm:** Có bảng riêng, không ảnh hưởng model gốc
**Nhược điểm:** Phức tạp hơn

### 2.3 Prototype Inheritance (`_inherit + _name`)

**Khi nào dùng:** Copy toàn bộ cấu trúc model sang model mới.

```python
class NewModel(models.Model):
    _name = 'new.model'
    _inherit = 'base.model'  # Copy tất cả
```

**Ưu điểm:** Model độc lập hoàn toàn
**Nhược điểm:** Không liên kết với model gốc

## 3. Đề Xuất

Dựa trên yêu cầu của bạn, tôi đề xuất sử dụng: **{pattern}**

Lý do: {explanation}

---

## 4. Menu

```
[C] Tiếp tục với đề xuất
[1] Class Inheritance
[2] Delegation Inheritance
[3] Prototype Inheritance
[B] Quay lại
```

## 5. Hành Động Tiếp Theo

Khi chọn pattern: Tải `steps/step-03-implementation.md`
