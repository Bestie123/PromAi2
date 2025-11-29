# Architecture Validation Prompt

## Task
Проверь архитектуру PromAi PKM без загрузки HTML файлов. Используй только контекстные файлы.

## Required Files to Load
1. `architecture/nodes.json` - Полные данные нодов
2. `architecture/NODE_REGISTRY.md` - Индекс нодов по типам  
3. `architecture/CONTEXT_TRACKER.md` - Статус и зависимости
4. `architecture/ARCHITECTURE_MEMORY.md` - Критические решения

## Validation Checklist

### ✅ Data Integrity
- [ ] Все 29 критериев покрыты
- [ ] 89 нодов: 29 вопросов + 60 вариантов
- [ ] Все children ссылки валидны
- [ ] Типы нодов: critical, important, flexible, rejected, question

### ✅ Critical Path
- [ ] modular-arch (критерий 1)
- [ ] all-blocks (критерий 2) 
- [ ] uuid-v4 (критерий 3)
- [ ] yjs-crdt (критерий 13)
- [ ] declarative-ui (критерий 11)
- [ ] zero-runtime (критерий 12)
- [ ] virtual-scrolling (критерий 21)
- [ ] plugin-unified (критерий 26)

### ✅ Dependencies
- [ ] 1→11,12,26,29 (модульность enables UI/плагины)
- [ ] 2→4,7,8,16,18,19 (блоки enable структуру)
- [ ] 13→14,16,18,25 (CRDT enables операции)
- [ ] 11→12,20,21 (UI enables рендер)

### ✅ Compatibility Rules
- [ ] Невозможные: modular↔monolith, declarative↔imperative
- [ ] Переключаемые: uuid-v4↔uuid-v7, yjs↔automerge
- [ ] Объединяемые: drag-native+lib, markdown+wysiwyg

### ✅ File Structure
- [ ] nodes.json содержит nodes + compatibility
- [ ] NODE_REGISTRY.md актуален
- [ ] CONTEXT_TRACKER.md обновлен
- [ ] Все критерии 1-29 присутствуют

## Expected Output Format
```
✅ АРХИТЕКТУРА ВАЛИДНА
- Нодов: 89/89
- Критериев: 29/29  
- Критический путь: ✅
- Зависимости: ✅
- Совместимость: ✅

❌ ПРОБЛЕМЫ: [список если есть]
```

## Context Loading Strategy
Загружай файлы в порядке: ARCHITECTURE_MEMORY.md → NODE_REGISTRY.md → nodes.json → CONTEXT_TRACKER.md

## Validation Commands
После проверки предложи команды:
- `node architecture/validate_context.js`
- `node architecture/generate_registry.js`