# Bước 3: Triển Khai

## 1. Mục Tiêu

Tạo các file implementation dựa trên chiến lược đã chọn.

## 2. Cấu Trúc File

### 2.1 Model File

```python
# models/{model_name}.py

from odoo import models, fields, api

class {ClassName}(models.Model):
    {inheritance_code}
    
    # Fields
    {fields_code}
    
    # Methods
    {methods_code}
```

### 2.2 View File (nếu cần)

```xml
<!-- views/{model_name}_views.xml -->

<odoo>
    <record id="{view_id}" model="ir.ui.view">
        <field name="name">{view_name}</field>
        <field name="model">{model}</field>
        <field name="inherit_id" ref="{parent_view}"/>
        <field name="arch" type="xml">
            {view_changes}
        </field>
    </record>
</odoo>
```

## 3. Checklist Triển Khai

- [ ] Tạo/cập nhật model file
- [ ] Tạo/cập nhật view file
- [ ] Cập nhật `__init__.py`
- [ ] Cập nhật `__manifest__.py`
- [ ] Tạo security rules (nếu cần)
- [ ] Viết tests

---

## 4. Menu

```
[G] Generate - Tạo code
[P] Preview - Xem trước
[B] Quay lại
```

## 5. Đầu Ra

Files được tạo/cập nhật trong: `{odoo.customModulesPath}/`
