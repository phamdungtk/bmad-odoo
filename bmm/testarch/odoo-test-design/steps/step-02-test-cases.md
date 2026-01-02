# Bước 2: Thiết Kế Test Cases

## 1. Unit Tests (TransactionCase)

### 1.1 Test Template

```python
from odoo.tests.common import TransactionCase
from odoo.exceptions import ValidationError

class Test{ModelName}(TransactionCase):
    
    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        # Setup test data
        cls.Model = cls.env['{model.name}']
        cls.test_record = cls.Model.create({
            'name': 'Test Record',
        })
    
    def test_create_record(self):
        """Test tạo bản ghi mới"""
        record = self.Model.create({'name': 'New'})
        self.assertTrue(record.id)
        self.assertEqual(record.name, 'New')
    
    def test_validation_error(self):
        """Test constraint validation"""
        with self.assertRaises(ValidationError):
            self.Model.create({'name': False})
```

### 1.2 Test Cases Cho Module: {module}

| Test ID | Method | Mô tả | Expected |
|---------|--------|-------|----------|
| TC-001 | test_create | Tạo bản ghi | Success |
| TC-002 | test_write | Cập nhật bản ghi | Success |
| TC-003 | test_unlink | Xóa bản ghi | Success |
| TC-004 | test_compute_field | Computed field | Correct value |
| TC-005 | test_constraint | Constraint validation | ValidationError |

## 2. Integration Tests (SavepointCase)

### 2.1 Test Workflow

```python
from odoo.tests.common import SavepointCase

class Test{Workflow}(SavepointCase):
    
    def test_workflow_draft_to_confirm(self):
        """Test workflow từ draft sang confirmed"""
        record = self.env['{model}'].create({...})
        self.assertEqual(record.state, 'draft')
        
        record.action_confirm()
        self.assertEqual(record.state, 'confirmed')
```

### 2.2 Workflow Test Cases

| Test ID | Workflow | Steps | Expected State |
|---------|----------|-------|----------------|
| TC-WF-001 | Draft → Confirm | action_confirm() | confirmed |
| TC-WF-002 | Confirm → Done | action_done() | done |
| TC-WF-003 | Any → Cancel | action_cancel() | cancel |

---

## 3. Menu

```
[C] Tiếp tục - Hoàn thành
[A] Thêm test case
[B] Quay lại
```

## 4. Hành Động Tiếp Theo

Khi chọn **[C]**: Tải `steps/step-03-complete.md`
