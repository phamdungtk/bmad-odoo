# Quick Story - Brownfield Change

## 1. Mô Tả Thay Đổi (3 Câu Hỏi)

### Gì? (What)
Thay đổi cần làm là gì?
> {mô tả ngắn gọn}

### Ở đâu? (Where)
File/Module nào cần sửa đổi?
> Module: {module_name}
> Files: {file_paths}

### Tại sao? (Why)
Lý do thay đổi?
> {lý do}

---

## 2. Mini-Story Tự Động Tạo

```markdown
# {Title}

**Type:** 🔧 Brownfield Enhancement
**Estimated:** {X} giờ
**Module:** {module_name}

## Thay đổi
{mô tả thay đổi}

## Tasks
- [ ] {Task 1}
- [ ] {Task 2}
- [ ] Viết/cập nhật test
- [ ] Verify changes

## Files
- `{file_1}`
- `{file_2}`
```

---

## 3. Menu

```
[E] Execute - Thực thi ngay
[S] Save - Chỉ lưu story
[D] Detail - Thêm chi tiết
[X] Cancel
```

---

## 4. Thực Thi (Nếu Chọn [E])

### 4.1 Quy Trình TDD
1. Viết test fail trước
2. Implement changes
3. Chạy test → pass
4. Refactor nếu cần

### 4.2 Checklist Hoàn Thành
- [ ] Changes implemented
- [ ] Tests pass
- [ ] Module upgraded successfully
- [ ] Smoke test UI

### 4.3 Verify
```bash
odoo-bin -c odoo.conf -u {module_name} --test-enable --stop-after-init
```

---

## 5. Đầu Ra

Mini-story: `{implementation_artifacts}/brownfield-{date}-{name}.md`
