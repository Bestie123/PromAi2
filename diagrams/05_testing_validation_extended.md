# Диаграмма 5: Тестирование и валидация

## Вариант A: Многоуровневая пирамида тестирования

```mermaid
graph TB
    subgraph "Уровень 1: Unit тесты (70%)"
        U1[Тесты функций<br/>≤50 строк]
        U2[Тесты модулей<br/>≤500 строк]
        U3[Тесты CRDT операций]
        U4[Тесты валидации]
        U5[Тесты утилит]
    end
    
    subgraph "Уровень 2: Integration тесты (20%)"
        I1[Тесты модулей Core+CRDT]
        I2[Тесты Storage+CRDT]
        I3[Тесты UI+Core]
        I4[Тесты Plugin+Core+UI]
        I5[Тесты Search+Storage]
    end
    
    subgraph "Уровень 3: E2E тесты (8%)"
        E1[Создание блока]
        E2[Редактирование блока]
        E3[Синхронизация CRDT]
        E4[Работа плагинов]
        E5[Поиск и навигация]
    end
    
    subgraph "Уровень 4: Performance тесты (2%)"
        P1[100k блоков]
        P2[Virtual scrolling]
        P3[CRDT merge]
        P4[Search индексация]
        P5[Memory usage]
    end
    
    U1 --> I1
    U2 --> I1
    U3 --> I2
    U4 --> I3
    U5 --> I4
    
    I1 --> E1
    I2 --> E2
    I3 --> E3
    I4 --> E4
    I5 --> E5
    
    E1 --> P1
    E2 --> P2
    E3 --> P3
    E4 --> P4
    E5 --> P5
    
    P1 --> Report[Отчет о тестировании]
    P2 --> Report
    P3 --> Report
    P4 --> Report
    P5 --> Report
    
    style U1 fill:#e1f5ff
    style I1 fill:#fff4e1
    style E1 fill:#ffe1e1
    style P1 fill:#e1ffe1
    style Report fill:#f0e1ff
```

## Вариант B: Процесс генерации и запуска тестов

```mermaid
sequenceDiagram
    participant Dev as Разработчик
    participant AI as Amazon Q
    participant Gen as Генератор тестов
    participant Runner as Test Runner
    participant Report as Отчеты
    
    Dev->>AI: Код модуля готов
    AI->>Gen: Анализ кода
    
    Gen->>Gen: Анализ функций
    Gen->>Gen: Анализ параметров
    Gen->>Gen: Анализ edge cases
    Gen->>Gen: Анализ зависимостей
    
    Gen->>AI: Генерация unit тестов
    Gen->>AI: Генерация integration тестов
    Gen->>AI: Генерация CRDT тестов
    
    AI-->>Dev: Тесты сгенерированы
    
    Dev->>Runner: Запуск тестов
    Runner->>Runner: Unit тесты
    Runner->>Runner: Integration тесты
    Runner->>Runner: CRDT тесты
    Runner->>Runner: Performance тесты
    
    Runner->>Report: Результаты
    Report->>Report: Анализ покрытия
    Report->>Report: Анализ провалов
    Report->>Report: Метрики производительности
    
    Report-->>AI: Отчет готов
    AI->>AI: Анализ результатов
    
    alt Тесты провалены
        AI->>Dev: Найдены проблемы
        Dev->>AI: Исправить
        AI->>Gen: Обновление кода
        Gen->>Runner: Повторный запуск
    else Покрытие < 80%
        AI->>Dev: Недостаточное покрытие
        Dev->>AI: Добавить тесты
        AI->>Gen: Генерация доп. тестов
        Gen->>Runner: Повторный запуск
    else Все OK
        AI->>Dev: Все тесты пройдены ✓
    end
```

## Вариант C: Валидационный конвейер

```mermaid
flowchart TD
    Code[Новый код] --> V1[Валидация 1:<br/>Синтаксис]
    
    V1 --> V1_Check{OK?}
    V1_Check -->|Нет| V1_Fix[Исправление синтаксиса]
    V1_Fix --> Code
    V1_Check -->|Да| V2[Валидация 2:<br/>Стиль и форматирование]
    
    V2 --> V2_Check{OK?}
    V2_Check -->|Нет| V2_Fix[Применение prettier/eslint]
    V2_Fix --> Code
    V2_Check -->|Да| V3[Валидация 3:<br/>Стандарты проекта]
    
    V3 --> V3_1{Файл ≤500<br/>строк?}
    V3_1 -->|Нет| V3_Fix1[Разделение файла]
    V3_Fix1 --> Code
    V3_1 -->|Да| V3_2{Функции ≤50<br/>строк?}
    V3_2 -->|Нет| V3_Fix2[Рефакторинг функций]
    V3_Fix2 --> Code
    V3_2 -->|Да| V3_3{Параметры ≤3?}
    V3_3 -->|Нет| V3_Fix3[Рефакторинг параметров]
    V3_Fix3 --> Code
    V3_3 -->|Да| V4[Валидация 4:<br/>Архитектура]
    
    V4 --> V4_1{Циклические<br/>зависимости?}
    V4_1 -->|Да| V4_Fix1[Реорганизация зависимостей]
    V4_Fix1 --> Code
    V4_1 -->|Нет| V4_2{Правильные<br/>импорты?}
    V4_2 -->|Нет| V4_Fix2[Исправление импортов]
    V4_Fix2 --> Code
    V4_2 -->|Да| V5[Валидация 5:<br/>Тестирование]
    
    V5 --> V5_1{Тесты<br/>существуют?}
    V5_1 -->|Нет| V5_Fix1[Генерация тестов]
    V5_Fix1 --> V5
    V5_1 -->|Да| V5_2{Тесты<br/>проходят?}
    V5_2 -->|Нет| V5_Fix2[Исправление кода/тестов]
    V5_Fix2 --> Code
    V5_2 -->|Да| V5_3{Покрытие<br/>≥80%?}
    V5_3 -->|Нет| V5_Fix3[Добавление тестов]
    V5_Fix3 --> V5
    V5_3 -->|Да| V6[Валидация 6:<br/>Безопасность]
    
    V6 --> V6_1[Security scan]
    V6_1 --> V6_2{Уязвимости?}
    V6_2 -->|Да| V6_Fix[Исправление уязвимостей]
    V6_Fix --> Code
    V6_2 -->|Нет| V7[Валидация 7:<br/>Производительность]
    
    V7 --> V7_1[Performance анализ]
    V7_1 --> V7_2{Узкие места?}
    V7_2 -->|Да| V7_Fix[Оптимизация]
    V7_Fix --> Code
    V7_2 -->|Нет| V8[Валидация 8:<br/>Документация]
    
    V8 --> V8_1{Документация<br/>актуальна?}
    V8_1 -->|Нет| V8_Fix[Обновление документации]
    V8_Fix --> V8
    V8_1 -->|Да| Success[✓ Все валидации пройдены]
    
    Success --> Approve[Одобрено для коммита]
    
    style Code fill:#e1f5ff
    style Success fill:#e1ffe1
    style Approve fill:#90ee90
```

## Вариант D: Матрица тестового покрытия

```mermaid
graph TB
    subgraph "Модуль Core"
        Core_Unit[Unit: 95%]
        Core_Int[Integration: 85%]
        Core_E2E[E2E: 70%]
        Core_Perf[Performance: 100%]
    end
    
    subgraph "Модуль CRDT"
        CRDT_Unit[Unit: 90%]
        CRDT_Int[Integration: 80%]
        CRDT_E2E[E2E: 75%]
        CRDT_Perf[Performance: 95%]
    end
    
    subgraph "Модуль Storage"
        Storage_Unit[Unit: 88%]
        Storage_Int[Integration: 82%]
        Storage_E2E[E2E: 65%]
        Storage_Perf[Performance: 90%]
    end
    
    subgraph "Модуль UI"
        UI_Unit[Unit: 85%]
        UI_Int[Integration: 78%]
        UI_E2E[E2E: 80%]
        UI_Perf[Performance: 85%]
    end
    
    subgraph "Модуль Plugin"
        Plugin_Unit[Unit: 92%]
        Plugin_Int[Integration: 75%]
        Plugin_E2E[E2E: 70%]
        Plugin_Perf[Performance: 88%]
    end
    
    Core_Unit --> Total[Общее покрытие]
    Core_Int --> Total
    Core_E2E --> Total
    Core_Perf --> Total
    
    CRDT_Unit --> Total
    CRDT_Int --> Total
    CRDT_E2E --> Total
    CRDT_Perf --> Total
    
    Storage_Unit --> Total
    Storage_Int --> Total
    Storage_E2E --> Total
    Storage_Perf --> Total
    
    UI_Unit --> Total
    UI_Int --> Total
    UI_E2E --> Total
    UI_Perf --> Total
    
    Plugin_Unit --> Total
    Plugin_Int --> Total
    Plugin_E2E --> Total
    Plugin_Perf --> Total
    
    Total --> Result[Итого: 83%<br/>Цель: ≥80% ✓]
    
    style Result fill:#90ee90
```

## Вариант E: Автоматизированный CI/CD pipeline

```mermaid
graph LR
    subgraph "Commit"
        C1[git commit] --> C2[Pre-commit hooks]
        C2 --> C3[Lint]
        C2 --> C4[Format]
        C2 --> C5[Validate]
    end
    
    subgraph "Push"
        C3 --> P1[git push]
        C4 --> P1
        C5 --> P1
        P1 --> P2[CI Trigger]
    end
    
    subgraph "Build"
        P2 --> B1[Install deps]
        B1 --> B2[Build project]
        B2 --> B3{Build OK?}
        B3 -->|Нет| B4[Notify failure]
        B3 -->|Да| T1[Run tests]
    end
    
    subgraph "Test"
        T1 --> T2[Unit tests]
        T1 --> T3[Integration tests]
        T1 --> T4[E2E tests]
        T2 --> T5{All pass?}
        T3 --> T5
        T4 --> T5
        T5 -->|Нет| T6[Notify failure]
        T5 -->|Да| A1[Analysis]
    end
    
    subgraph "Analysis"
        A1 --> A2[Code coverage]
        A1 --> A3[Security scan]
        A1 --> A4[Performance test]
        A2 --> A5{All OK?}
        A3 --> A5
        A4 --> A5
        A5 -->|Нет| A6[Notify issues]
        A5 -->|Да| D1[Deploy]
    end
    
    subgraph "Deploy"
        D1 --> D2[Staging]
        D2 --> D3[Smoke tests]
        D3 --> D4{Tests OK?}
        D4 -->|Нет| D5[Rollback]
        D4 -->|Да| D6[Production]
        D6 --> D7[Monitor]
    end
    
    B4 --> End1[❌ Failed]
    T6 --> End1
    A6 --> End1
    D5 --> End1
    D7 --> End2[✓ Success]
    
    style End1 fill:#ffcccb
    style End2 fill:#90ee90
```
