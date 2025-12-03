# Диаграмма 15: Контекст и память проекта

## Вариант A: Управление контекстом проекта

```mermaid
graph TB
    subgraph "Источники контекста"
        S1[@file - Конкретный файл]
        S2[@folder - Папка с файлами]
        S3[@workspace - Весь проект]
        S4[@prompt - Сохраненный промпт]
        S5[Rules - Правила проекта]
        S6[State Files - Состояние]
    end
    
    subgraph "Загрузка контекста"
        S1 --> L1[Чтение файла]
        S2 --> L2[Чтение всех файлов в папке]
        S3 --> L3[Анализ структуры проекта]
        S4 --> L4[Загрузка промпта]
        S5 --> L5[Загрузка правил]
        S6 --> L6[Загрузка state]
    end
    
    subgraph "Обработка контекста"
        L1 --> P1[Парсинг кода]
        L2 --> P2[Индексация файлов]
        L3 --> P3[Граф зависимостей]
        L4 --> P4[Шаблон промпта]
        L5 --> P5[Валидация правил]
        L6 --> P6[Текущее состояние]
    end
    
    P1 --> AI[Amazon Q Context]
    P2 --> AI
    P3 --> AI
    P4 --> AI
    P5 --> AI
    P6 --> AI
    
    AI --> Memory[Память проекта]
    
    subgraph "Память проекта"
        Memory --> M1[Архитектура]
        Memory --> M2[Стандарты]
        Memory --> M3[Паттерны кода]
        Memory --> M4[История изменений]
        Memory --> M5[Частые проблемы]
        Memory --> M6[Решения]
    end
    
    M1 --> Use[Использование]
    M2 --> Use
    M3 --> Use
    M4 --> Use
    M5 --> Use
    M6 --> Use
    
    Use --> U1[Генерация кода]
    Use --> U2[Code review]
    Use --> U3[Рефакторинг]
    Use --> U4[Troubleshooting]
    Use --> U5[Документация]
    
    style AI fill:#ffd700
    style Memory fill:#e1f5ff
```

## Вариант B: Оптимизация контекста для ИИ

```mermaid
flowchart TD
    Request[Запрос к ИИ] --> Analyze[Анализ запроса]
    
    Analyze --> Type{Тип запроса}
    
    Type -->|Создание| Create[Контекст для создания]
    Type -->|Исправление| Fix[Контекст для исправления]
    Type -->|Ревью| Review[Контекст для ревью]
    Type -->|Рефакторинг| Refactor[Контекст для рефакторинга]
    
    subgraph "Контекст для создания"
        Create --> C1[Архитектурные правила]
        Create --> C2[Похожие модули]
        Create --> C3[Стандарты кода]
        Create --> C4[Шаблоны]
    end
    
    subgraph "Контекст для исправления"
        Fix --> F1[Проблемный файл]
        Fix --> F2[Связанные файлы]
        Fix --> F3[Тесты]
        Fix --> F4[История изменений]
    end
    
    subgraph "Контекст для ревью"
        Review --> R1[Измененные файлы]
        Review --> R2[Стандарты проекта]
        Review --> R3[Best practices]
        Review --> R4[Критерии качества]
    end
    
    subgraph "Контекст для рефакторинга"
        Refactor --> RF1[Целевой код]
        Refactor --> RF2[Зависимости]
        Refactor --> RF3[Тесты]
        Refactor --> RF4[Паттерны]
    end
    
    C1 --> Optimize[Оптимизация контекста]
    C2 --> Optimize
    C3 --> Optimize
    C4 --> Optimize
    F1 --> Optimize
    F2 --> Optimize
    F3 --> Optimize
    F4 --> Optimize
    R1 --> Optimize
    R2 --> Optimize
    R3 --> Optimize
    R4 --> Optimize
    RF1 --> Optimize
    RF2 --> Optimize
    RF3 --> Optimize
    RF4 --> Optimize
    
    Optimize --> Check{Размер<br/>контекста}
    
    Check -->|>200K chars| Reduce[Уменьшение контекста]
    Check -->|≤200K chars| OK[✓ OK]
    
    Reduce --> R_1[Приоритизация файлов]
    R_1 --> R_2[Удаление дубликатов]
    R_2 --> R_3[Сжатие комментариев]
    R_3 --> R_4[Частичное чтение]
    
    R_4 --> Final[Финальный контекст]
    OK --> Final
    
    Final --> Metrics[Метрики]
    Metrics --> Met1[Размер: 145K chars]
    Metrics --> Met2[Файлов: 12]
    Metrics --> Met3[Релевантность: 95%]
    Metrics --> Met4[Время загрузки: 1.2s]
    
    style Final fill:#90ee90
```

## Вариант C: Иерархия памяти проекта

```mermaid
graph TB
    subgraph "Уровень 1: Сессия (Кратковременная)"
        L1_1[Текущий диалог]
        L1_2[Открытые файлы]
        L1_3[Последние команды]
        L1_4[Временные переменные]
    end
    
    subgraph "Уровень 2: Рабочая сессия (Часы)"
        L2_1[История команд]
        L2_2[Измененные файлы]
        L2_3[Решенные проблемы]
        L2_4[Паттерны использования]
    end
    
    subgraph "Уровень 3: Проект (Дни/Недели)"
        L3_1[Архитектура проекта]
        L3_2[Стандарты кода]
        L3_3[Частые проблемы]
        L3_4[Успешные решения]
        L3_5[Командные соглашения]
    end
    
    subgraph "Уровень 4: Долгосрочная (Месяцы)"
        L4_1[История проекта]
        L4_2[Эволюция архитектуры]
        L4_3[Технический долг]
        L4_4[Метрики качества]
        L4_5[Lessons learned]
    end
    
    subgraph "Уровень 5: База знаний (Постоянная)"
        L5_1[Best practices]
        L5_2[Паттерны проектирования]
        L5_3[Типичные ошибки]
        L5_4[Решения проблем]
        L5_5[Оптимизации]
    end
    
    L1_1 --> L2_1
    L1_2 --> L2_2
    L1_3 --> L2_3
    L1_4 --> L2_4
    
    L2_1 --> L3_1
    L2_2 --> L3_2
    L2_3 --> L3_3
    L2_4 --> L3_4
    
    L3_1 --> L4_1
    L3_2 --> L4_2
    L3_3 --> L4_3
    L3_4 --> L4_4
    L3_5 --> L4_5
    
    L4_1 --> L5_1
    L4_2 --> L5_2
    L4_3 --> L5_3
    L4_4 --> L5_4
    L4_5 --> L5_5
    
    L5_1 --> AI[ИИ использует<br/>все уровни]
    L5_2 --> AI
    L5_3 --> AI
    L5_4 --> AI
    L5_5 --> AI
    
    AI --> Smart[Умные предложения]
    Smart --> S1[Контекстно-зависимые]
    Smart --> S2[Учитывают историю]
    Smart --> S3[Предсказывают проблемы]
    Smart --> S4[Оптимизированы под проект]
    
    style AI fill:#ffd700
    style Smart fill:#90ee90
```

## Вариант D: Context window management

```mermaid
sequenceDiagram
    participant Dev as Разработчик
    participant Q as Amazon Q
    participant Context as Context Manager
    participant Files as Файлы
    
    Dev->>Q: "@workspace Создай модуль Block"
    Q->>Context: Запрос контекста workspace
    
    Context->>Files: Сканирование проекта
    Files-->>Context: 87 файлов найдено
    
    Context->>Context: Анализ релевантности
    Note over Context: Приоритизация:<br/>1. project_registry.json<br/>2. block_schema.json<br/>3. Похожие модули<br/>4. Стандарты
    
    Context->>Context: Проверка размера
    Note over Context: Размер: 245K chars<br/>Лимит: 200K chars<br/>Нужно уменьшить
    
    Context->>Context: Оптимизация
    Note over Context: Действия:<br/>- Удалить тесты (не нужны)<br/>- Сжать комментарии<br/>- Частичное чтение больших файлов
    
    Context-->>Q: Контекст готов (178K chars)
    
    Q->>Q: Анализ контекста
    Q->>Q: Генерация кода
    
    Q->>Dev: ✅ Модуль создан<br/>Использовано контекста:<br/>- 12 файлов<br/>- 178K chars<br/>- Релевантность: 94%
    
    Dev->>Q: "@file block.ts Добавь валидацию"
    Q->>Context: Запрос контекста файла
    
    Context->>Files: Чтение block.ts
    Files-->>Context: 245 строк
    
    Context->>Context: Добавление связанных файлов
    Note over Context: Связанные:<br/>- block.test.ts<br/>- types.ts<br/>- validation.ts
    
    Context-->>Q: Контекст готов (45K chars)
    
    Q->>Q: Анализ кода
    Q->>Q: Добавление валидации
    
    Q->>Dev: ✅ Валидация добавлена<br/>Использовано контекста:<br/>- 4 файла<br/>- 45K chars<br/>- Точность: 98%
    
    Note over Dev,Files: Оптимальное использование контекста:<br/>@file - для точечных изменений<br/>@workspace - для архитектурных решений
```

## Вариант E: Сохранение и переиспользование контекста

```mermaid
graph TD
    Work[Работа над проектом] --> Patterns[Выявление паттернов]
    
    subgraph "Паттерны для сохранения"
        Patterns --> P1[Частые запросы]
        Patterns --> P2[Успешные решения]
        Patterns --> P3[Типичные ошибки]
        Patterns --> P4[Стандартные операции]
    end
    
    P1 --> Save[Сохранение]
    P2 --> Save
    P3 --> Save
    P4 --> Save
    
    subgraph "Сохраненные промпты"
        Save --> SP1[create-module.md]
        Save --> SP2[add-tests.md]
        Save --> SP3[fix-bug.md]
        Save --> SP4[optimize-code.md]
        Save --> SP5[review-code.md]
    end
    
    SP1 --> Template1["Шаблон:<br/>'Создай модуль {name}<br/>с {features}<br/>соответствующий критериям {nums}'"]
    
    SP2 --> Template2["Шаблон:<br/>'Добавь тесты для @file {file}<br/>покрытие ≥80%<br/>включая edge cases'"]
    
    SP3 --> Template3["Шаблон:<br/>'Исправь баг в @file {file}:{line}<br/>проблема: {description}<br/>ожидается: {expected}'"]
    
    SP4 --> Template4["Шаблон:<br/>'Оптимизируй {function}<br/>для {condition}<br/>целевая метрика: {target}'"]
    
    SP5 --> Template5["Шаблон:<br/>'Проверь @file {file}<br/>на критерии {nums}<br/>и стандарты проекта'"]
    
    Template1 --> Use[Использование]
    Template2 --> Use
    Template3 --> Use
    Template4 --> Use
    Template5 --> Use
    
    Use --> U1["@prompt create-module<br/>name=Storage<br/>features=CRDT,offline"]
    
    Use --> U2["@prompt add-tests<br/>file=block.ts"]
    
    Use --> U3["@prompt fix-bug<br/>file=block.ts:45<br/>problem=children undefined"]
    
    U1 --> Result[Результат]
    U2 --> Result
    U3 --> Result
    
    Result --> Metrics[Метрики]
    Metrics --> M1[Скорость: +60%]
    Metrics --> M2[Консистентность: +85%]
    Metrics --> M3[Качество: +40%]
    Metrics --> M4[Переиспользование: 70%]
    
    Result --> Update[Обновление промптов]
    Update --> Learn[ИИ обучение]
    Learn --> Improve[Улучшение шаблонов]
    Improve --> Save
    
    style Result fill:#90ee90
    style Metrics fill:#ffd700
```
