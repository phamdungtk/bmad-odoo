# Kho Kiến Thức Odoo cho BMAD-ODOO

## Mẫu cốt lõi & tham chiếu nhanh

### Các mẫu kế thừa cốt lõi

**Kế thừa lớp** (mở rộng model hiện hữu):
```python
class ResPartnerExtension(models.Model):
    _inherit = 'res.partner'
    custom_field = fields.Char('Custom Field')
```

**Kế thừa ủy quyền** (delegation):
```python
class CustomPartner(models.Model):
    _name = 'custom.partner'
    _inherits = {'res.partner': 'partner_id'}
    partner_id = fields.Many2one('res.partner', required=True, ondelete='cascade')
```

### Các kiểu trường thiết yếu

| Type | Sử dụng | Ví dụ |
|------|---------|-------|
| `Char` | Chuỗi ngắn | `name = fields.Char('Name', required=True)` |
| `Text` | Chuỗi dài | `description = fields.Text('Description')` |
| `Integer` | Số nguyên | `quantity = fields.Integer('Quantity', default=1)` |
| `Float` | Số thập phân | `price = fields.Float('Price', digits=(16,2))` |
| `Boolean` | Đúng/Sai | `active = fields.Boolean('Active', default=True)` |
| `Date` | Ngày | `date_start = fields.Date('Start Date')` |
| `Datetime` | Ngày + Giờ | `create_date = fields.Datetime('Created')` |
| `Selection` | Dropdown | `state = fields.Selection([('draft','Draft')], 'State')` |
| `Many2one` | Khóa ngoại | `partner_id = fields.Many2one('res.partner')` |
| `One2many` | Khóa ngoại ngược | `line_ids = fields.One2many('sale.line', 'order_id')` |
| `Many2many` | Bảng liên kết | `tag_ids = fields.Many2many('product.tag')` |

### Các thao tác ORM phổ biến

**Tạo bản ghi**:
```python
record = self.env['model.name'].create({'field1': 'value1'})
```

**Đọc / Tìm kiếm**:
```python
records = self.env['model.name'].search([('field', '=', 'value')])
```

**Cập nhật bản ghi**:
```python
records.write({'field1': 'new_value'})
```

## Odoo 17 Strict Rules 

### Backend/Python & ORM
- Dùng `@api.model_create_multi` khi override `create`, luôn gọi `super()`.
- Quan hệ O2m/M2m: ưu tiên `odoo.fields.Command` (`Command.create/link/clear/set`).
- Compute: bắt buộc `@api.depends`; dùng `read_group`, `mapped`, `filtered` để tránh N+1.
- Dịch chuỗi hiển thị bằng `_()`.

### UI/View Odoo 17
- Cấm `attrs`/`states`; dùng biểu thức Python trực tiếp: `invisible="state != 'draft'"`.
- Tree/List: không ẩn cột bằng `invisible`; dùng `column_invisible="True"`.

### Cấu trúc module OCA
```
module_name/
├── __init__.py
├── __manifest__.py
├── models/
├── views/
├── security/
├── data/
├── static/description/
├── tests/
└── README.rst
```

## Checklist tuân thủ OCA
- [ ] Tuân theo tiêu chuẩn và quy ước mã hóa OCA
- [ ] Dùng cấu trúc & đặt tên module chuẩn
- [ ] Bao gồm kiểm thử và tài liệu đầy đủ
- [ ] Triển khai bảo mật & kiểm soát truy cập đúng
- [ ] Ưu tiên kế thừa, tránh sửa trực tiếp code gốc

## Nguồn tham khảo hữu ích
- Odoo Developer Docs: https://www.odoo.com/documentation/
- OCA Guidelines: https://github.com/OCA/odoo-community.org
