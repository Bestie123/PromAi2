# Диаграмма 10: Специфика проекта PromAi PKM

## Вариант A: Архитектура модулей PromAi

```mermaid
graph TB
    subgraph "Уровень 0: Фундамент (Критерии 1-5)"
        L0_1[Core Block System<br/>UUID, Иерархия, Drag&Drop]
        L0_2[CRDT Engine<br/>Yjs, Conflict-free]
    end
    
    subgraph "Уровень 1: Данные (Критерии 6-10)"
        L1_1[Rich Text<br/>Markdown + Entities]
        L1_2[References<br/>Refs + Backlinks]
        L1_3[Local Storage<br/>JSON/SQLite]
        L1_4[Offline First<br/>Full offline work]
    end
    
    subgraph "Уровень 2: UI (Критерии 11-12, 19-23)"
        L2_1[Declarative UI<br/>100% declarative]
        L2_2[Zero Runtime Logic<br/>Pure functions]
        L2_3[Virtual Scrolling<br/>100k+ blocks]
        L2_4[Web Workers<br/>Off-thread processing]
    end
    
    subgraph "Уровень 3: Синхронизация (Критерии 13-18, 24-25)"
        L3_1[Event Sourcing<br/>Immutable ops log]
        L3_2[Schema Validation<br/>Runtime validation]
        L3_3[CRDT Operations<br/>All changes via CRDT]
        L3_4[Atomic Transactions<br/>Atomic ops]
        L3_5[E2EE Ready<br/>Encryption ready]
        L3_6[Conflict Management<br/>CRDT merge]
    end
    
    subgraph "Уровень 4: Расширения (Критерии 26-28)"
        L4_1[Plugin System<br/>All custom blocks]
        L4_2[Composite Blocks<br/>Blocks in blocks]
        L4_3[Block State<br/>JSON state per block]
    end
    
    subgraph "Уровень 5: Качество (Критерий 29)"
        L5_1[File Size ≤500 lines]
        L5_2[Function Size ≤50 lines]
        L5_3[Parameters ≤3]
        L5_4[No Circular Deps]
    end
    
    L0_1 --> L1_1
    L0_1 --> L1_2
    L0_2 --> L1_3
    L0_2 --> L1_4
    
    L1_1 --> L2_1
    L1_2 --> L2_2
    L1_3 --> L2_3
    L1_4 --> L2_4
    
    L2_1 --> L3_1
    L2_2 --> L3_2
    L2_3 --> L3_3
    L2_4 --> L3_4
    L0_2 --> L3_5
    L0_2 --> L3_6
    
    L0_1 --> L4_1
    L2_1 --> L4_1
    L4_1 --> L4_2
    L4_1 --> L4_3
    
    L0_1 --> L5_1
    L0_1 --> L5_2
    L0_1 --> L5_3
    L0_1 --> L5_4
    
    style L0_1 fill:#ff6b6b
    style L0_2 fill:#ff6b6b
    style L5_1 fill:#ffd700
    style L5_2 fill:#ffd700
    style L5_3 fill:#ffd700
    style L5_4 fill:#ffd700
```

## Вариант B: Валидация 29 критериев

```mermaid
flowchart TD
    Start[Новый код] --> Cat1[Категория 1:<br/>Архитектура 1-5]
    
    Cat1 --> C1{1. Модульность?}
    C1 -->|Нет| Fix1[Разделить на модули]
    C1 -->|Да| C2{2. Блочность?}
    C2 -->|Нет| Fix2[Использовать блоки]
    C2 -->|Да| C3{3. UUID?}
    C3 -->|Нет| Fix3[Добавить UUID]
    C3 -->|Да| C4{4. Иерархия?}
    C4 -->|Нет| Fix4[Поддержка вложенности]
    C4 -->|Да| C5{5. Drag&Drop?}
    C5 -->|Нет| Fix5[Реализовать D&D]
    C5 -->|Да| Cat2[Категория 2:<br/>Контент 6-10]
    
    Cat2 --> C6{6. Rich Text?}
    C6 -->|Нет| Fix6[Markdown + entities]
    C6 -->|Да| C7{7. Refs?}
    C7 -->|Нет| Fix7[Система ссылок]
    C7 -->|Да| C8{8. Backlinks?}
    C8 -->|Нет| Fix8[Обратные ссылки]
    C8 -->|Да| C9{9. Local Data?}
    C9 -->|Нет| Fix9[JSON/SQLite]
    C9 -->|Да| C10{10. Offline?}
    C10 -->|Нет| Fix10[Offline support]
    C10 -->|Да| Cat3[Категория 3:<br/>UI 11-12]
    
    Cat3 --> C11{11. Declarative?}
    C11 -->|Нет| Fix11[Декларативный UI]
    C11 -->|Да| C12{12. Zero Logic?}
    C12 -->|Нет| Fix12[Чистые функции]
    C12 -->|Да| Cat4[Категория 4:<br/>CRDT 13-18]
    
    Cat4 --> C13{13. CRDT?}
    C13 -->|Нет| Fix13[Интеграция CRDT]
    C13 -->|Да| C14{14. Event Sourcing?}
    C14 -->|Нет| Fix14[Ops log]
    C14 -->|Да| C15{15. Schema?}
    C15 -->|Нет| Fix15[Schema validation]
    C15 -->|Да| C16{16. CRDT Only?}
    C16 -->|Нет| Fix16[Только через CRDT]
    C16 -->|Да| C17{17. Atomic?}
    C17 -->|Нет| Fix17[Атомарность]
    C17 -->|Да| C18{18. Refs in CRDT?}
    C18 -->|Нет| Fix18[Refs first-class]
    C18 -->|Да| Cat5[Категория 5:<br/>Производительность 19-25]
    
    Cat5 --> C19{19. Flat Graph?}
    C19 -->|Нет| Fix19[Плоский граф]
    C19 -->|Да| C20{20. No Global State?}
    C20 -->|Нет| Fix20[Убрать global state]
    C20 -->|Да| C21{21. Virtual Scroll?}
    C21 -->|Нет| Fix21[Virtual scrolling]
    C21 -->|Да| C22{22. Web Workers?}
    C22 -->|Нет| Fix22[Использовать Workers]
    C22 -->|Да| C23{23. Circular Detection?}
    C23 -->|Нет| Fix23[Обнаружение циклов]
    C23 -->|Да| C24{24. E2EE Ready?}
    C24 -->|Нет| Fix24[E2EE формат]
    C24 -->|Да| C25{25. Conflict Mgmt?}
    C25 -->|Нет| Fix25[CRDT merge]
    C25 -->|Да| Cat6[Категория 6:<br/>Плагины 26-28]
    
    Cat6 --> C26{26. Plugin Blocks?}
    C26 -->|Нет| Fix26[Plugin система]
    C26 -->|Да| C27{27. Composite?}
    C27 -->|Нет| Fix27[Вложенные блоки]
    C27 -->|Да| C28{28. Block State?}
    C28 -->|Нет| Fix28[JSON state]
    C28 -->|Да| Cat7[Категория 7:<br/>Модульность 29]
    
    Cat7 --> C29_1{Файлы ≤500?}
    C29_1 -->|Нет| Fix29_1[Разделить файл]
    C29_1 -->|Да| C29_2{Функции ≤50?}
    C29_2 -->|Нет| Fix29_2[Разделить функцию]
    C29_2 -->|Да| C29_3{Параметры ≤3?}
    C29_3 -->|Нет| Fix29_3[Рефакторинг параметров]
    C29_3 -->|Да| Success[✓ Все 29 критериев<br/>соблюдены]
    
    Fix1 --> Start
    Fix2 --> Start
    Fix3 --> Start
    Fix29_3 --> Start
    
    Success --> Approve[Одобрено для PromAi]
    
    style Success fill:#90ee90
    style Approve fill:#90ee90
```

## Вариант C: Блочная система в деталях

```mermaid
graph TB
    subgraph "Block Structure"
        B[Block]
        B --> B_ID[id: UUID v4/v7]
        B --> B_Type[type: string]
        B --> B_Content[content: any]
        B --> B_Children[children: UUID[]]
        B --> B_Parent[parent?: UUID]
        B --> B_Refs[refs: UUID[]]
        B --> B_Backlinks[backlinks: UUID[]]
        B --> B_Props[properties: Object]
        B --> B_Created[created: timestamp]
        B --> B_Modified[modified: timestamp]
    end
    
    subgraph "CRDT Operations"
        Op[Operation]
        Op --> Op_ID[id: UUID]
        Op --> Op_Type[type: create|update|delete|move]
        Op --> Op_Block[blockId: UUID]
        Op --> Op_Data[data: any]
        Op --> Op_Time[timestamp: number]
        Op --> Op_User[userId: string]
    end
    
    subgraph "Plugin Block"
        PB[Plugin Block]
        PB --> PB_ID[id: UUID]
        PB --> PB_Plugin[pluginId: string]
        PB --> PB_State[state: JSON]
        PB --> PB_Children[children: Block[]]
        PB --> PB_Render[render(): HTMLElement]
    end
    
    subgraph "Storage"
        S[Storage Layer]
        S --> S_JSON[JSON: Human readable]
        S --> S_SQLite[SQLite: Fast queries]
        S --> S_Index[Index: Search]
        S --> S_Log[Ops Log: Event sourcing]
    end
    
    B --> Op
    Op --> S
    PB --> B
    S --> Sync[Cross-device Sync]
    
    style B fill:#e1f5ff
    style Op fill:#fff4e1
    style PB fill:#e1ffe1
    style S fill:#ffe1e1
```

## Вариант D: Performance targets для 100k+ блоков

```mermaid
graph TB
    subgraph "Startup Performance"
        SP1[Load 10k blocks: <2 sec]
        SP2[Load 50k blocks: <5 sec]
        SP3[Load 100k blocks: <10 sec]
        SP4[Initial render: <1 sec]
    end
    
    subgraph "Runtime Performance"
        RP1[Search 100k blocks: <100ms]
        RP2[Scroll 60 FPS: Always]
        RP3[CRDT operation: <10ms]
        RP4[Block create: <5ms]
        RP5[Block update: <5ms]
    end
    
    subgraph "Memory Performance"
        MP1[10k blocks: <100MB]
        MP2[50k blocks: <500MB]
        MP3[100k blocks: <1GB]
        MP4[Virtual scroll: Constant]
    end
    
    subgraph "Storage Performance"
        STP1[Save block: <50ms]
        STP2[Load block: <10ms]
        STP3[Create snapshot: <500ms]
        STP4[Load database: <1s]
    end
    
    subgraph "Optimization Techniques"
        OT1[Virtual Scrolling]
        OT2[Lazy Loading]
        OT3[Web Workers]
        OT4[IndexedDB Cache]
        OT5[Debounced Save]
        OT6[Memoization]
    end
    
    SP1 --> OT1
    SP2 --> OT2
    RP1 --> OT3
    RP2 --> OT1
    MP1 --> OT1
    MP2 --> OT2
    STP1 --> OT5
    STP2 --> OT4
    
    OT1 --> Target[Target: 100k+ blocks<br/>smooth performance]
    OT2 --> Target
    OT3 --> Target
    OT4 --> Target
    OT5 --> Target
    OT6 --> Target
    
    style Target fill:#90ee90
```

## Вариант E: State файлы и их взаимосвязи

```mermaid
graph TB
    subgraph "Core State Files"
        PR[project_registry.json<br/>Модули, пути, зависимости]
        DM[dependencies_map.json<br/>Граф зависимостей]
        BS[block_schema.json<br/>Схема блоков]
        CO[crdt_operations.json<br/>Лог CRDT операций]
        PLR[plugin_registry.json<br/>Реестр плагинов]
        TODO[todo.json<br/>Задачи]
        CL[changelog.md<br/>История изменений]
    end
    
    subgraph "Генерируемые файлы"
        Diagrams[Диаграммы архитектуры]
        Docs[Документация API]
        Tests[Автогенерированные тесты]
    end
    
    subgraph "Валидация"
        V1[validate_dependencies.js]
        V2[validate_context.js]
        V3[generate_registry.js]
    end
    
    Code[Изменение кода] --> AI[Amazon Q]
    
    AI --> PR
    AI --> DM
    AI --> BS
    AI --> CO
    AI --> PLR
    AI --> TODO
    AI --> CL
    
    PR --> V1
    DM --> V1
    PR --> V2
    
    V1 --> Check{Валидация OK?}
    V2 --> Check
    
    Check -->|Нет| Error[❌ Ошибка]
    Check -->|Да| Success[✓ Обновлено]
    
    Error --> AI
    Success --> Diagrams
    Success --> Docs
    Success --> Tests
    
    AI --> AutoUpdate[Автообновление<br/>при каждом изменении]
    
    style PR fill:#e1f5ff
    style DM fill:#fff4e1
    style BS fill:#e1ffe1
    style CO fill:#ffe1e1
    style AutoUpdate fill:#ffd700
```
