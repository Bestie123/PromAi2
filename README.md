# PromAi PKM - Personal Knowledge Management System

Модульная система управления знаниями с блочной архитектурой и CRDT синхронизацией.

## Архитектура

- **Блочная система** с UUID идентификаторами
- **CRDT** для конфликт-free синхронизации  
- **Plugin система** для расширяемости
- **Декларативный UI** без runtime логики
- **Оффлайн-first** подход

## Документация

- [Стандарты проекта](.amazonq/rules/project-standart.md)
- [Лог разговоров](CONVERSATION_LOG.md)
- [Схема блоков](block_schema.json)
- [Реестр модулей](project_registry.json)

## Разработка

```bash
npm install
npm run gitdoc:serve  # Запуск документации с live reload
```

## Состояние проекта

Текущая версия: 0.1.0 (MVP в разработке)