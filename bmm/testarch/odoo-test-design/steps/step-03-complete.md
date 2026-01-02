# Bước 3: Hoàn Thành Test Design

## 1. Tóm Tắt

```
🧪 ODOO TEST DESIGN

Module: {module_name}
Models: {count}

TEST COVERAGE:
├── Unit Tests: {count} test cases
├── Integration Tests: {count} test cases
├── UI Tests: {count} test cases
└── Security Tests: {count} test cases

TOTAL: {total} test cases
```

## 2. Đầu Ra

### 2.1 Test File Structure

```
{module}/
└── tests/
    ├── __init__.py
    ├── test_{model1}.py
    ├── test_{model2}.py
    └── test_common.py (shared fixtures)
```

### 2.2 Test File Template

```python
# tests/__init__.py
from . import test_{model1}
from . import test_{model2}

# tests/test_{model1}.py
from odoo.tests.common import TransactionCase, tagged

@tagged('post_install', '-at_install')
class Test{Model}(TransactionCase):
    # Test cases
    pass
```

### 2.3 Test Spec Doc

Lưu vào: `{planning_artifacts}/test-design-{module}.md`

## 3. Chạy Tests

```bash
# Chạy tất cả tests của module
odoo-bin -c odoo.conf -u {module} --test-enable --stop-after-init

# Chạy test cụ thể
odoo-bin -c odoo.conf -u {module} --test-tags={tag}
```

## 4. Bước Tiếp Theo

```
[1] Viết test code thực tế
[2] Thiết kế test cho module khác
[X] Quay về menu chính
```
