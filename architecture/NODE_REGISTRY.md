# Node Registry - Complete Index

## Questions (29) ❓
q1→Модульность | q2→Блочность | q3→UUID | q4→Вложенность | q5→DragDrop | q6→RichText | q7→Refs | q8→Backlinks | q9→Данные | q10→Оффлайн | q11→UI | q12→Runtime | q13→CRDT | q14→EventSourcing | q15→Schema | q16→CRDTОпс | q17→Транзакции | q18→RefsCRDT | q19→Граф | q20→Состояние | q21→Scrolling | q22→Workers | q23→Циклы | q24→E2EE | q25→Конфликты | q26→Плагины | q27→Композиты | q28→БлокСостояние | q29→КодМодульность

## Critical Nodes (29) ✅
modular-arch | all-blocks | uuid-v4 | nested-blocks | drag-drop-native | markdown-rich | refs-uuid | backlinks-auto | json-storage | offline-full | declarative-ui | zero-runtime | yjs-crdt | event-sourcing-separate | json-schema | crdt-only | atomic-transactions | refs-crdt-first | flat-graph | no-global-state | virtual-scrolling | web-workers-all | circular-render | e2ee-ready | crdt-merge | plugin-unified | composite-blocks | block-state-json | modular-code

## Important Nodes (16) ⚠️
uuid-v7 | drag-drop-lib | wysiwyg-rich | refs-alias | sqlite-storage | offline-partial | automerge-crdt | event-sourcing-crdt | typescript-schema | crdt-hybrid | refs-crdt-secondary | lazy-loading | web-workers-search | circular-creation | e2ee-later | simple-blocks | block-state-simple

## Flexible Nodes (3) 🔄
hybrid-storage | zod-schema

## Rejected Nodes (13) ❌
monolith-arch | mixed-model | flat-only | backlinks-manual | imperative-ui | stateful-runtime | simple-ops | page-hierarchy | global-state | manual-merge | plugin-mixed | monolith-code

## Criteria → Selected Nodes
1→modular-arch | 2→all-blocks | 3→uuid-v4 | 4→nested-blocks | 5→drag-drop-native | 6→markdown-rich | 7→refs-uuid | 8→backlinks-auto | 9→json-storage | 10→offline-full | 11→declarative-ui | 12→zero-runtime | 13→yjs-crdt | 14→event-sourcing-separate | 15→json-schema | 16→crdt-only | 17→atomic-transactions | 18→refs-crdt-first | 19→flat-graph | 20→no-global-state | 21→virtual-scrolling | 22→web-workers-all | 23→circular-render | 24→e2ee-ready | 25→crdt-merge | 26→plugin-unified | 27→composite-blocks | 28→block-state-json | 29→modular-code

## Node Count Validation
- Questions: 29 ✅
- Critical: 29 ✅  
- Important: 17 ✅
- Flexible: 2 ✅
- Rejected: 12 ✅
- **Total: 89 nodes** (29Q + 60O)

## Context Loading Shortcuts
**Critical Path:** modular-arch→all-blocks→uuid-v4→yjs-crdt→declarative-ui→zero-runtime→virtual-scrolling→plugin-unified
**Dependencies:** 1→11,12,26,29 | 2→4,7,8,16,18,19 | 13→14,16,18,25
**Incompatible:** modular↔monolith | all-blocks↔mixed | declarative↔imperative