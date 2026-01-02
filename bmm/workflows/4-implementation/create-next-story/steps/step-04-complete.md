# Bước 4: Hoàn Thành Story

## 1. Tóm Tắt Story

```
📋 STORY ĐÃ TẠO

Story ID: {story_id}
Tiêu đề: {title}
Ưu tiên: {priority}
Story Points: {points}

ACCEPTANCE CRITERIA: {count} ACs
TASKS: {task_count} tasks, {subtask_count} subtasks
```

## 2. Story File Output

Tạo file story với format:

```markdown
---
id: {story_id}
status: draft
priority: {priority}
points: {points}
epic: {epic_id}
stepsCompleted: []
---

# {Story Title}

## User Story
Với vai trò {role}, tôi muốn {action} để {benefit}.

## Acceptance Criteria

### AC-01: {name}
- GIVEN: 
- WHEN: 
- THEN: 

## Tasks

### Task 1: {name}
- [ ] Subtask 1.1
- [ ] Subtask 1.2

## Technical Notes
{any technical notes}

## Definition of Done
- [ ] Tất cả tasks hoàn thành
- [ ] Tất cả tests pass
- [ ] Code review hoàn thành
- [ ] Tài liệu cập nhật
```

## 3. Đầu Ra

File story: `{implementation_artifacts}/story-{id}-{name}.md`

## 4. Bước Tiếp Theo

```
[1] Bắt đầu phát triển story này (workflow dev-story)
[2] Tạo story tiếp theo
[3] Xem backlog
[X] Quay về menu chính
```
