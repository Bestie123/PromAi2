# Диаграмма 3: Циклы обратной связи с ИИ

## Вариант A: Детальная sequence диаграмма

```mermaid
sequenceDiagram
    actor Dev as Разработчик
    participant IDE as VS Code
    participant Q as Amazon Q
    participant Tools as Инструменты<br/>(lint, test, etc)
    participant Code as Кодовая база
    participant State as State файлы
    
    Dev->>IDE: Открывает задачу
    IDE->>Q: Запрос контекста проекта
    Q->>State: Читает project_registry.json
    Q->>State: Читает dependencies_map.json
    Q->>State: Читает block_schema.json
    State-->>Q: Контекст загружен
    Q-->>Dev: Готов к работе
    
    Dev->>Q: "Создай модуль Core"
    Q->>Q: Анализ требований
    Q->>Q: Проверка стандартов
    Q->>Q: Генерация архитектуры
    Q-->>Dev: Предлагает 3 варианта архитектуры
    
    Dev->>Q: Выбирает вариант 2
    Q->>Code: Генерирует код модуля
    Q->>Code: Генерирует unit тесты
    Q->>State: Обновляет project_registry.json
    Q-->>Dev: Код готов к ревью
    
    Dev->>IDE: Открывает сгенерированный код
    Dev->>Q: "Проверь код"
    Q->>Tools: Запускает линтеры
    Tools-->>Q: Найдены проблемы форматирования
    Q->>Tools: Запускает валидацию стандартов
    Tools-->>Q: Файл 520 строк (лимит 500)
    Q-->>Dev: Отчет: 2 проблемы найдены
    
    Dev->>Q: "Исправь проблемы"
    Q->>Code: Рефакторинг (разделение на 2 файла)
    Q->>Code: Применяет форматирование
    Q->>State: Обновляет registry
    Q-->>Dev: Проблемы исправлены
    
    Dev->>Q: "Запусти тесты"
    Q->>Tools: npm test
    Tools-->>Q: 15/20 тестов пройдено
    Q->>Q: Анализ упавших тестов
    Q-->>Dev: Найдены проблемы в edge cases
    
    Dev->>Q: "Исправь тесты"
    Q->>Code: Добавляет обработку edge cases
    Q->>Code: Обновляет тесты
    Q->>Tools: npm test
    Tools-->>Q: 20/20 тестов пройдено
    Q-->>Dev: Все тесты пройдены ✓
    
    Dev->>Q: "Code review"
    Q->>Tools: Запускает codeReview tool
    Tools->>Code: Анализ безопасности
    Tools->>Code: Анализ производительности
    Tools->>Code: Проверка best practices
    Tools-->>Q: Отчет готов
    Q-->>Dev: Найдено 3 улучшения
    
    Dev->>Q: "Применить улучшения"
    Q->>Code: Оптимизация производительности
    Q->>Code: Улучшение читаемости
    Q->>State: Обновляет changelog.md
    Q-->>Dev: Готово к коммиту
    
    Dev->>IDE: git commit
    IDE->>Tools: Pre-commit hooks
    Tools->>Code: Финальная валидация
    Tools-->>IDE: Все проверки пройдены ✓
    IDE-->>Dev: Коммит успешен
```

## Вариант B: Цикл обратной связи в реальном времени

```mermaid
graph TD
    A[Разработчик пишет код] --> B{ИИ анализ<br/>в реальном времени}
    
    B -->|Синтаксис| C1[Проверка синтаксиса]
    B -->|Стиль| C2[Проверка стиля]
    B -->|Стандарты| C3[Проверка стандартов]
    B -->|Логика| C4[Анализ логики]
    B -->|Производительность| C5[Анализ производительности]
    
    C1 --> D1{Ошибки?}
    C2 --> D2{Нарушения?}
    C3 --> D3{Несоответствия?}
    C4 --> D4{Проблемы?}
    C5 --> D5{Узкие места?}
    
    D1 -->|Да| E1[Подсветка ошибки]
    D2 -->|Да| E2[Предложение исправления]
    D3 -->|Да| E3[Автоисправление]
    D4 -->|Да| E4[Предупреждение]
    D5 -->|Да| E5[Рекомендация]
    
    E1 --> F[Показ в IDE]
    E2 --> F
    E3 --> F
    E4 --> F
    E5 --> F
    
    F --> G{Разработчик<br/>принимает?}
    
    G -->|Да| H[Применить изменение]
    G -->|Нет| I[Отклонить]
    
    H --> J[ИИ учится на принятии]
    I --> K[ИИ учится на отклонении]
    
    J --> L[Обновление модели]
    K --> L
    
    L --> A
    
    D1 -->|Нет| M[Продолжить]
    D2 -->|Нет| M
    D3 -->|Нет| M
    D4 -->|Нет| M
    D5 -->|Нет| M
    
    M --> N{Код<br/>завершен?}
    N -->|Нет| A
    N -->|Да| O[Финальная валидация]
    
    style A fill:#e1f5ff
    style F fill:#fff4e1
    style L fill:#e1ffe1
    style O fill:#ffe1e1
```

## Вариант C: Многоуровневая обратная связь

```mermaid
graph TB
    subgraph "Уровень 1: Немедленная обратная связь (< 1 сек)"
        L1_1[Подсветка синтаксиса]
        L1_2[Автодополнение]
        L1_3[Inline подсказки]
        L1_4[Быстрые исправления]
    end
    
    subgraph "Уровень 2: Быстрая обратная связь (1-5 сек)"
        L2_1[Проверка стиля]
        L2_2[Валидация стандартов]
        L2_3[Проверка типов]
        L2_4[Простой рефакторинг]
    end
    
    subgraph "Уровень 3: Средняя обратная связь (5-30 сек)"
        L3_1[Анализ архитектуры]
        L3_2[Проверка зависимостей]
        L3_3[Генерация тестов]
        L3_4[Анализ покрытия]
    end
    
    subgraph "Уровень 4: Глубокая обратная связь (30 сек - 5 мин)"
        L4_1[Code review]
        L4_2[Security scan]
        L4_3[Performance анализ]
        L4_4[Комплексный рефакторинг]
    end
    
    subgraph "Уровень 5: Стратегическая обратная связь (5+ мин)"
        L5_1[Анализ всего проекта]
        L5_2[Оптимизация архитектуры]
        L5_3[Технический долг]
        L5_4[Предиктивный анализ]
    end
    
    Code[Изменение кода] --> L1_1
    Code --> L1_2
    Code --> L1_3
    Code --> L1_4
    
    L1_4 --> L2_1
    L2_1 --> L2_2
    L2_2 --> L2_3
    L2_3 --> L2_4
    
    L2_4 --> L3_1
    L3_1 --> L3_2
    L3_2 --> L3_3
    L3_3 --> L3_4
    
    L3_4 --> L4_1
    L4_1 --> L4_2
    L4_2 --> L4_3
    L4_3 --> L4_4
    
    L4_4 --> L5_1
    L5_1 --> L5_2
    L5_2 --> L5_3
    L5_3 --> L5_4
    
    L5_4 --> Report[Комплексный отчет]
    Report --> Dev[Разработчик]
    Dev --> Decision{Решение}
    Decision -->|Применить| Apply[Применение изменений]
    Decision -->|Отложить| Queue[Очередь задач]
    Decision -->|Отклонить| Learn[Обучение ИИ]
    
    Apply --> Code
    Queue --> Backlog[Backlog]
    Learn --> AI[Модель ИИ]
    AI --> Code
```

## Вариант D: Цикл обучения ИИ

```mermaid
graph LR
    subgraph "Сбор данных"
        D1[Действия разработчика]
        D2[Принятые предложения]
        D3[Отклоненные предложения]
        D4[Паттерны кода]
        D5[Метрики качества]
    end
    
    subgraph "Анализ"
        A1[Агрегация данных]
        A2[Выявление паттернов]
        A3[Анализ успешности]
        A4[Определение контекста]
    end
    
    subgraph "Обучение"
        L1[Обновление модели]
        L2[Настройка весов]
        L3[Добавление правил]
        L4[Улучшение контекста]
    end
    
    subgraph "Применение"
        P1[Новые предложения]
        P2[Улучшенный анализ]
        P3[Точные рекомендации]
        P4[Контекстные подсказки]
    end
    
    D1 --> A1
    D2 --> A1
    D3 --> A1
    D4 --> A2
    D5 --> A3
    
    A1 --> L1
    A2 --> L2
    A3 --> L3
    A4 --> L4
    
    L1 --> P1
    L2 --> P2
    L3 --> P3
    L4 --> P4
    
    P1 --> Feedback[Обратная связь]
    P2 --> Feedback
    P3 --> Feedback
    P4 --> Feedback
    
    Feedback --> D1
    
    style A1 fill:#e1f5ff
    style L1 fill:#fff4e1
    style P1 fill:#e1ffe1
    style Feedback fill:#ffe1e1
```

## Вариант E: Интерактивный цикл разработки

```mermaid
stateDiagram-v2
    [*] --> Idle: Ожидание
    
    Idle --> Typing: Разработчик пишет код
    Typing --> Analyzing: ИИ анализирует
    
    Analyzing --> NoIssues: Проблем нет
    Analyzing --> IssuesFound: Найдены проблемы
    
    NoIssues --> Typing: Продолжить
    NoIssues --> RequestReview: Запрос ревью
    
    IssuesFound --> ShowingSuggestions: Показать предложения
    ShowingSuggestions --> WaitingDecision: Ожидание решения
    
    WaitingDecision --> Accepted: Принято
    WaitingDecision --> Rejected: Отклонено
    WaitingDecision --> Modified: Изменено
    
    Accepted --> Applying: Применение
    Applying --> Learning: ИИ учится (позитив)
    Learning --> Typing
    
    Rejected --> Learning2: ИИ учится (негатив)
    Learning2 --> Typing
    
    Modified --> Applying2: Применение изменений
    Applying2 --> Learning3: ИИ учится (модификация)
    Learning3 --> Typing
    
    RequestReview --> DeepAnalysis: Глубокий анализ
    DeepAnalysis --> GeneratingReport: Генерация отчета
    GeneratingReport --> ShowingReport: Показ отчета
    
    ShowingReport --> HasIssues: Есть проблемы
    ShowingReport --> AllGood: Все хорошо
    
    HasIssues --> ShowingSuggestions
    AllGood --> ReadyToCommit: Готово к коммиту
    
    ReadyToCommit --> Committing: Коммит
    Committing --> [*]
    
    note right of Analyzing
        Проверки:
        - Синтаксис
        - Стиль
        - Стандарты
        - Логика
        - Производительность
    end note
    
    note right of DeepAnalysis
        Глубокий анализ:
        - Security
        - Architecture
        - Dependencies
        - Test coverage
        - Performance
    end note
```
