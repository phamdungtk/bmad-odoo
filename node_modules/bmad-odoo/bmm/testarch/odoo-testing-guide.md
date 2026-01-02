# Kiến Trúc Kiểm Thử BMAD-Odoo

## Framework Kiểm Thử Odoo

### Kiểm Thử Đơn Vị (Unit Tests)
- Sử dụng `odoo.tests.common.TransactionCase` cho kiểm thử đơn vị
- Sử dụng `odoo.tests.common.SavepointCase` cho các tests cần hoàn tác (rollback)

### Kiểm Thử Tích Hợp (Integration Tests)
- Sử dụng `odoo.tests.common.HttpCase` cho kiểm thử giao diện
- Sử dụng decorator `tagged()` để phân loại test

### Các Mẫu Phổ Biến
```python
from odoo.tests.common import TransactionCase

class TestMyModule(TransactionCase):
    def setUp(self):
        super().setUp()
        self.MyModel = self.env['my.model']
    
    def test_create(self):
        record = self.MyModel.create({'name': 'Test'})
        self.assertEqual(record.name, 'Test')
```

### Chạy Tests
```bash
odoo-bin -c odoo.conf -u my_module --test-enable --stop-after-init
```
