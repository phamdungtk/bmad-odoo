# Bước 3: Tạo Cấu Trúc Addon

## 1. Mục Tiêu

Tạo cấu trúc thư mục và các file cơ bản cho addon.

## 2. Cấu Trúc Thư Mục OCA

```
{addon_name}/
├── __init__.py
├── __manifest__.py
├── models/
│   ├── __init__.py
│   └── {model_name}.py
├── views/
│   └── {model_name}_views.xml
├── security/
│   ├── ir.model.access.csv
│   └── {addon_name}_security.xml (nếu cần groups)
├── data/
│   └── (dữ liệu mẫu nếu cần)
├── static/
│   └── description/
│       └── icon.png
├── tests/
│   ├── __init__.py
│   └── test_{model_name}.py
└── README.rst
```

## 3. Tạo Các File

### 3.1 __manifest__.py

```python
{
    'name': '{Tên hiển thị}',
    'version': '{odoo_version}.1.0.0',
    'category': '{Category}',
    'summary': '{Mô tả ngắn}',
    'description': """
{Mô tả chi tiết}
    """,
    'author': '{author}',
    'website': '{website}',
    'license': 'LGPL-3',
    'depends': ['{base_module}'],
    'data': [
        'security/ir.model.access.csv',
        'views/{model_name}_views.xml',
    ],
    'installable': True,
    'application': False,
    'auto_install': False,
}
```

### 3.2 Models

(Tạo dựa trên thiết kế bước 2)

### 3.3 Views

(Tạo dựa trên thiết kế bước 2)

### 3.4 Security

(Tạo dựa trên thiết kế bước 2)

---

## 4. Menu

```
[G] Generate - Tạo các file
[P] Preview - Xem trước mã nguồn
[E] Edit - Chỉnh sửa thiết kế
[B] Quay lại
```

## 5. Đầu Ra

Addon được tạo tại: `{odoo.customModulesPath}/{addon_name}/`

Tài liệu thiết kế: `{planning_artifacts}/addon-design-{addon_name}.md`
