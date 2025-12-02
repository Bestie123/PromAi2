# Диаграмма 6: Quality Gates и контроль качества

## Вариант A: Многоуровневые Quality Gates

```mermaid
graph TD
    Code[Новый код] --> Gate1[Gate 1: Базовые проверки]
    
    subgraph "Gate 1: Базовые проверки"
        G1_1[Синтаксис валиден]
        G1_2[Код форматирован]
        G1_3[Нет lint ошибок]
        G1_4[Типы корректны]
    end
    
    Gate1 --> Check1{Пройдено?}
    Check1 -->|Нет| Fail1[❌ Отклонено]
    Check1 -->|Да| Gate2[Gate 2: Стандарты]
    
    subgraph "Gate 2: Стандарты проекта"
        G2_1[Файлы ≤500 строк]
        G2_2[Функции ≤50 строк]
        G2_3[Параметры ≤3]
        G2_4[Naming conventions]
        G2_5[Нет циклических зависимостей]
    end
    
    Gate2 --> Check2{Пройдено?}
    Check2 -->|Нет| Fail2[❌ Отклонено]
    Check2 -->|Да| Gate3[Gate 3: Тестирование]
    
    subgraph "Gate 3: Тестирование"
        G3_1[Unit тесты пройдены]
        G3_2[Integration тесты пройдены]
        G3_3[Покрытие ≥80%]
        G3_4[Нет flaky тестов]
        G3_5[Performance тесты OK]
    end
    
    Gate3 --> Check3{Пройдено?}
    Check3 -->|Нет| Fail3[❌ Отклонено]
    Check3 -->|Да| Gate4[Gate 4: Безопасность]
    
    subgraph "Gate 4: Безопасность"
        G4_1[Нет уязвимостей]
        G4_2[Нет секретов в коде]
        G4_3[Безопасные зависимости]
        G4_4[SAST проверки OK]
        G4_5[Input validation]
    end
    
    Gate4 --> Check4{Пройдено?}
    Check4 -->|Нет| Fail4[❌ Отклонено]
    Check4 -->|Да| Gate5[Gate 5: Производительность]
    
    subgraph "Gate 5: Производительность"
        G5_1[Memory usage OK]
        G5_2[CPU usage OK]
        G5_3[Нет memory leaks]
        G5_4[Время выполнения OK]
        G5_5[Bundle size OK]
    end
    
    Gate5 --> Check5{Пройдено?}
    Check5 -->|Нет| Fail5[❌ Отклонено]
    Check5 -->|Да| Gate6[Gate 6: Документация]
    
    subgraph "Gate 6: Документация"
        G6_1[API документирован]
        G6_2[README обновлен]
        G6_3[Changelog обновлен]
        G6_4[State файлы обновлены]
        G6_5[Комментарии актуальны]
    end
    
    Gate6 --> Check6{Пройдено?}
    Check6 -->|Нет| Fail6[❌ Отклонено]
    Check6 -->|Да| Success[✓ Все gates пройдены]
    
    Success --> Approve[Одобрено для merge]
    
    style Success fill:#90ee90
    style Approve fill:#90ee90
    style Fail1 fill:#ffcccb
    style Fail2 fill:#ffcccb
    style Fail3 fill:#ffcccb
    style Fail4 fill:#ffcccb
    style Fail5 fill:#ffcccb
    style Fail6 fill:#ffcccb
```

## Вариант B: Scoring система качества

```mermaid
graph TB
    Code[Код на ревью] --> Scoring[Система оценки]
    
    subgraph "Категории оценки"
        S1[Читаемость: 0-20]
        S2[Тестируемость: 0-20]
        S3[Производительность: 0-15]
        S4[Безопасность: 0-15]
        S5[Документация: 0-10]
        S6[Архитектура: 0-10]
        S7[Стандарты: 0-10]
    end
    
    Scoring --> S1
    Scoring --> S2
    Scoring --> S3
    Scoring --> S4
    Scoring --> S5
    Scoring --> S6
    Scoring --> S7
    
    S1 --> Total[Общий балл]
    S2 --> Total
    S3 --> Total
    S4 --> Total
    S5 --> Total
    S6 --> Total
    S7 --> Total
    
    Total --> Grade{Оценка}
    
    Grade -->|90-100| A[Grade A<br/>Отлично]
    Grade -->|80-89| B[Grade B<br/>Хорошо]
    Grade -->|70-79| C[Grade C<br/>Удовлетворительно]
    Grade -->|60-69| D[Grade D<br/>Требует улучшений]
    Grade -->|0-59| F[Grade F<br/>Отклонено]
    
    A --> Approve1[✓ Одобрено]
    B --> Approve2[✓ Одобрено с замечаниями]
    C --> Review[⚠️ Требует ревью]
    D --> Rework[🔄 Требует доработки]
    F --> Reject[❌ Отклонено]
    
    style A fill:#90ee90
    style B fill:#c8e6c9
    style C fill:#fff9c4
    style D fill:#ffccbc
    style F fill:#ffcccb
```

## Вариант C: Автоматизированный анализ качества

```mermaid
sequenceDiagram
    participant Dev as Разработчик
    participant PR as Pull Request
    participant Bot as Quality Bot
    participant Tools as Инструменты анализа
    participant Report as Отчет
    
    Dev->>PR: Создает PR
    PR->>Bot: Триггер анализа
    
    Bot->>Tools: Запуск ESLint
    Tools-->>Bot: Результаты lint
    
    Bot->>Tools: Запуск Prettier
    Tools-->>Bot: Результаты format
    
    Bot->>Tools: Запуск тестов
    Tools-->>Bot: Результаты тестов
    
    Bot->>Tools: Анализ покрытия
    Tools-->>Bot: Coverage report
    
    Bot->>Tools: Security scan
    Tools-->>Bot: Security report
    
    Bot->>Tools: Performance анализ
    Tools-->>Bot: Performance metrics
    
    Bot->>Tools: Проверка стандартов
    Tools-->>Bot: Standards compliance
    
    Bot->>Report: Агрегация результатов
    Report->>Report: Расчет score
    Report->>Report: Генерация рекомендаций
    
    Report-->>Bot: Отчет готов
    Bot-->>PR: Публикация комментария
    
    alt Score < 70
        Bot->>PR: ❌ Блокировка merge
        Bot->>Dev: Уведомление о проблемах
        Dev->>Dev: Исправление
        Dev->>PR: Обновление PR
        PR->>Bot: Повторный анализ
    else Score >= 70
        Bot->>PR: ✓ Разрешение merge
        Bot->>Dev: Уведомление об успехе
    end
```

## Вариант D: Дашборд метрик качества

```mermaid
graph TB
    subgraph "Метрики кода"
        M1[Lines of Code: 15,234]
        M2[Files: 87]
        M3[Functions: 423]
        M4[Avg File Size: 175 строк]
        M5[Avg Function Size: 23 строки]
    end
    
    subgraph "Метрики тестирования"
        T1[Test Coverage: 83%]
        T2[Unit Tests: 1,247]
        T3[Integration Tests: 156]
        T4[E2E Tests: 42]
        T5[Test Success Rate: 98.5%]
    end
    
    subgraph "Метрики качества"
        Q1[Code Quality Score: 87/100]
        Q2[Maintainability Index: A]
        Q3[Technical Debt: 2.3 дня]
        Q4[Code Smells: 12]
        Q5[Duplications: 1.2%]
    end
    
    subgraph "Метрики безопасности"
        S1[Vulnerabilities: 0]
        S2[Security Hotspots: 3]
        S3[Security Rating: A]
        S4[Secrets Detected: 0]
        S5[Dependencies OK: 98%]
    end
    
    subgraph "Метрики производительности"
        P1[Build Time: 45 сек]
        P2[Test Time: 2.3 мин]
        P3[Bundle Size: 234 KB]
        P4[Memory Usage: 145 MB]
        P5[Load Time: 1.2 сек]
    end
    
    M1 --> Health[Общее здоровье проекта]
    M2 --> Health
    T1 --> Health
    Q1 --> Health
    S1 --> Health
    P1 --> Health
    
    Health --> Score[Итоговый Score: 85/100]
    Score --> Status{Статус}
    
    Status -->|85-100| Excellent[🟢 Отличное состояние]
    Status -->|70-84| Good[🟡 Хорошее состояние]
    Status -->|50-69| Fair[🟠 Требует внимания]
    Status -->|0-49| Poor[🔴 Критическое состояние]
    
    style Excellent fill:#90ee90
    style Good fill:#fff9c4
    style Fair fill:#ffccbc
    style Poor fill:#ffcccb
```

## Вариант E: Процесс непрерывного улучшения качества

```mermaid
graph TD
    Start([Текущее состояние]) --> Measure[Измерение метрик]
    
    Measure --> M1[Code quality]
    Measure --> M2[Test coverage]
    Measure --> M3[Performance]
    Measure --> M4[Security]
    Measure --> M5[Documentation]
    
    M1 --> Analyze[Анализ]
    M2 --> Analyze
    M3 --> Analyze
    M4 --> Analyze
    M5 --> Analyze
    
    Analyze --> Issues{Проблемы<br/>найдены?}
    
    Issues -->|Да| Prioritize[Приоритизация]
    Prioritize --> P1{Критичность}
    
    P1 -->|Критическая| Critical[Немедленное исправление]
    P1 -->|Высокая| High[Исправление в текущем спринте]
    P1 -->|Средняя| Medium[Планирование на следующий спринт]
    P1 -->|Низкая| Low[Добавление в backlog]
    
    Critical --> Fix[Исправление]
    High --> Fix
    Medium --> Plan[Планирование]
    Low --> Backlog[Backlog]
    
    Fix --> Verify[Верификация]
    Verify --> V1{Исправлено?}
    V1 -->|Нет| Fix
    V1 -->|Да| Measure
    
    Plan --> NextSprint[Следующий спринт]
    NextSprint --> Fix
    
    Backlog --> Review[Периодический ревью]
    Review --> Plan
    
    Issues -->|Нет| Improve[Поиск улучшений]
    Improve --> I1[ИИ анализ паттернов]
    I1 --> I2[Предложения оптимизации]
    I2 --> I3{Применить?}
    I3 -->|Да| Implement[Реализация]
    I3 -->|Нет| Monitor[Мониторинг]
    
    Implement --> Measure
    Monitor --> Trend[Анализ трендов]
    Trend --> Report[Отчет]
    Report --> Start
    
    style Start fill:#e1f5ff
    style Critical fill:#ffcccb
    style High fill:#ffccbc
    style Medium fill:#fff9c4
    style Low fill:#c8e6c9
    style Report fill:#90ee90
```
