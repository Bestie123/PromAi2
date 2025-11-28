# PromAi PKM Project Standards

## Architecture Principles (Уровень 0 - Несущие стены)

### Core Requirements (Критерии 1-29 из "Без названия.md")
- **Модульность:** Ядро полностью отделено от UI и плагинов (критерий 1)
- **Блочность:** Всё является блоками с единой моделью данных (критерий 2)
- **UUID:** Каждый блок имеет уникальный глобальный UUID (v4/v7) (критерий 3)
- **Иерархия:** Вложенные блоки любой глубины (критерий 4)
- **Drag & Drop:** Порядок дочерних блоков сохраняется и меняется drag & drop (критерий 5)
- **Rich Text:** Каждый блок может содержать богатый текст (Markdown-подобный + сущности) (критерий 6)
- **Refs:** Любой блок может ссылаться на любой другой по UUID (критерий 7)
- **Backlinks:** Мгновенный доступ к обратным ссылкам (критерий 8)
- **Local Data:** Все данные локально в открытом читаемом формате (JSON или SQLite) (критерий 9)
- **Offline First:** Полная оффлайн-работа (критерий 10)
- **Declarative UI:** UI 100% декларативный (JSON-структуры/ViewScript) (критерий 11)
- **Zero Runtime Logic:** Zero runtime logic в рендере (чистая функция) (критерий 12)
- **CRDT:** Single source of truth = CRDT (Yjs/Automerge) (критерий 13)
- **Event Sourcing:** Immutable ops log + Event Sourcing с первого дня (критерий 14)
- **Schema-first:** Schema-first + runtime валидация (критерий 15)
- **CRDT Only:** Все изменения только через CRDT-операции (критерий 16)
- **Atomic Transactions:** Атомарные транзакции операций (критерий 17)
- **Refs in CRDT:** References и backlinks — first-class в CRDT (критерий 18)
- **Flat Graph:** Блоки ≠ страницы (плоский граф блоков) (критерий 19)
- **No Global State:** Отсутствие глобального mutable состояния в UI (критерий 20)
- **Virtual Scrolling:** Virtual scrolling + ленивая загрузка (критерий 21)
- **Web Workers:** Web Workers для всех тяжёлых операций (критерий 22)
- **Circular Detection:** Circular Reference Detection + безопасная обработка циклов (критерий 23)
- **E2EE Ready:** E2EE-ready формат хранения с первого дня (критерий 24)
- **Conflict Management:** Конфликт-менеджмент при синхронизации (CRDT-merge) (критерий 25)
- **Plugin Blocks:** Все пользовательские блоки подключаются как плагины (критерий 26)
- **Composite Blocks:** Поддержка кастомных блоков, содержащих другие блоки (критерий 27)
- **Block State:** Каждый блок может иметь собственное сохраняемое состояние (JSON) (критерий 28)
- **Code Modularity:** Максимальная модульность кода: файлы ≤500 строк, функции ≤50 строк, параметры ≤3 (критерий 29)

### File Size Limits (КРИТИЧНО)
- **Файлы:** ≤500 строк (максимум 1000)
- **Функции:** ≤50 строк (максимум 100) 
- **Параметры:** ≤3 (максимум 5)
- **AI-friendly:** Файлы читаются полностью за один запрос

### ID Naming Convention
- **Блоки:** UUID v4/v7 (неизменяемые)
- **Модули:** `MODULE_{Name}_VER_{version}`
- **Функции:** `FUNC_{name}_{number}`
- **Операции:** `OP_{type}_{timestamp}`
- **Плагины:** `PLUGIN_{name}_VER_{version}`

## Required State Files
ВСЕГДА обновляй при изменении кода:
- `project_registry.json` - реестр модулей
- `dependencies_map.json` - граф зависимостей  
- `block_schema.json` - схема блоков
- `crdt_operations.json` - лог CRDT операций
- `plugin_registry.json` - реестр плагинов
- `todo.json` - задачи
- `changelog.md` - история изменений

## Block System Requirements

### Block Structure
```typescript
interface Block {
  id: string;           // UUID v4/v7
  type: string;         // text, image, code, etc.
  content: any;         // Rich content
  children: string[];   // Child block IDs
  parent?: string;      // Parent block ID
  refs: string[];       // References to other blocks
  backlinks: string[];  // Auto-generated backlinks
  properties: Record<string, any>; // Custom properties
  created: number;      // Timestamp
  modified: number;     // Timestamp
}
```

### CRDT Operations
```typescript
interface CRDTOperation {
  id: string;
  type: 'create' | 'update' | 'delete' | 'move';
  blockId: string;
  data: any;
  timestamp: number;
  userId: string;
}
```

## UI Requirements

### Declarative UI (КРИТИЧНО)
- **100% декларативный:** JSON-структуры/ViewScript
- **Zero runtime logic:** Чистые функции рендера
- **Immutable state:** Никакого глобального mutable состояния
- **Virtual scrolling:** Для 100k+ блоков
- **Web Workers:** Для тяжёлых операций

### Performance Requirements (КРИТИЧНО)
- **Virtual scrolling** обязателен для 100k+ блоков
- **Lazy loading** блоков
- **Circular reference detection** для предотвращения бесконечных циклов
- **Web Workers** для поиска/индексации (UI остается отзывчивым)
- **Live updates** без задержек (взаимное изменение в реальном времени)
- **Cross-Tab Sync** синхронизация между вкладками
- **Drag & Drop** с модификаторами (копия, ссылка)
- **Auto-save** каждые 3-5 сек + версии/snapshots

## Plugin System

### Plugin Structure
```typescript
interface IPlugin {
  id: string;
  version: string;
  manifest: PluginManifest;
  init(): Promise<void>;
  destroy(): Promise<void>;
  renderBlock?(block: Block): HTMLElement;
  handleOperation?(op: CRDTOperation): void;
}
```

### Plugin Requirements (КРИТИЧНО)
- **Unified System:** Все пользовательские блоки подключаются как плагины (критерий 26)
- **Composite Blocks:** Поддержка кастомных блоков, содержащих другие блоки (критерий 27)
- **Block State:** Каждый блок может иметь собственное сохраняемое состояние JSON (критерий 28)
- **Sandbox:** Capability-based permissions
- **Error Boundaries:** Изоляция падений (один плагин не валит весь редактор)
- **Lazy loading:** Отдельные файлы + tree-shaking
- **Interactive Blocks:** Поддержка интерактивных блоков с кастомной отрисовкой
- **Modal Support:** Модальные окна, управляемые из плагинов
- **Plugin API:** Редактирование любых блоков через публичное скриптовое API

## Data Storage

### Local Storage Requirements
- **Формат:** JSON или SQLite (открытый)
- **Оффлайн:** Полная работа без сети
- **E2EE-ready:** Готовность к шифрованию
- **Backups:** Автоматические снапшоты
- **Export/Import:** Полная база данных

### CRDT Integration
- **Все изменения** только через CRDT операции
- **Атомарные транзакции** операций
- **References** как first-class в CRDT
- **Conflict resolution** автоматический

## Code Quality

### Error Handling
- Try-catch для всех async операций
- Логирование с MODULE_ID и FUNC_ID
- Понятные сообщения об ошибках
- Graceful degradation

### Testing Requirements
- **Unit тесты:** Все FUNC_*
- **Integration тесты:** Все MODULE_*
- **CRDT тесты:** Merge conflicts
- **Plugin тесты:** Изоляция и совместимость
- **Минимальное покрытие:** 80%

## Development Workflow

### Git Commit Format
- `feat(BLOCK): описание` - новая функциональность блоков
- `feat(CRDT): описание` - CRDT операции
- `feat(PLUGIN): описание` - плагин система
- `fix(MODULE): описание` - исправления
- `refactor(MODULE): описание` - рефакторинг

### Обязательная последовательность
1. **Создание модуля** → обновить все state файлы
2. **Изменение CRDT** → проверить схему и операции
3. **Новый плагин** → обновить plugin_registry.json
4. **Любое изменение** → обновить changelog.md
5. **КРИТИЧНО** → Логировать в CONVERSATION_LOG.md

## Security & Performance

### Security Requirements
- **Plugin sandbox** с ограниченными правами
- **Input validation** всех CRDT операций
- **XSS protection** в rich text
- **E2EE готовность** в архитектуре

### Performance Targets
- **Startup:** <2 сек для 10k блоков
- **Search:** <100ms для 100k блоков
- **Render:** 60 FPS при скролле
- **Memory:** <500MB для 50k блоков

## Versioning & Compatibility

### API Versioning
- **Patch (1.0.X):** Багфиксы, совместимые CRDT операции
- **Minor (1.X.0):** Новые типы блоков, обратная совместимость
- **Major (X.0.0):** Breaking changes в CRDT схеме

### Plugin Compatibility
- **Manifest версии** для совместимости
- **API deprecation** с предупреждениями
- **Migration scripts** для breaking changes

## Documentation Requirements

При добавлении функционала ОБЯЗАТЕЛЬНО:
1. **Промпт:** `.amazonq/prompts/PROMPT_{Name}.md`
2. **Документация:** `docs/{Name}_GUIDE.md`
3. **Обновить README.md**
4. **Обновить project-standart.md**
5. **Обновить все state файлы**
6. **Логировать в CONVERSATION_LOG.md**

## Critical Success Factors

### Уровень 0 (MVP) - БЕЗ КОМПРОМИССОВ
- Модульная архитектура
- Блочная система с UUID
- CRDT с Event Sourcing
- Декларативный UI
- Plugin система
- Оффлайн работа

### Запрещено
- Глобальное mutable состояние
- Imperative UI код
- Прямые изменения данных (минуя CRDT)
- Файлы >1000 строк
- Функции >100 строк
- Циклические зависимости модулей

## Monitoring & Debugging

### Inspector Integration
- `data-module-id` для всех DOM элементов
- `data-block-id` для блоков
- `data-plugin-id` для плагинов
- `data-operation-id` для CRDT операций

### Logging Requirements
- Все CRDT операции в лог
- Performance метрики
- Plugin errors изолированно
- User actions для replay

---

**ПОМНИ:** Это PKM инструмент для работы со знаниями. Архитектура должна быть готова к 100k+ блоков, реальному времени, коллаборации и сложным плагинам с первого дня.