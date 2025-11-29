# Product Overview

## Project Purpose
PromAi PKM is a Personal Knowledge Management (PKM) system designed for managing complex knowledge graphs with 100k+ blocks. It provides a modular, block-based architecture with real-time synchronization and offline-first capabilities.

## Core Value Proposition
- **Block-based everything**: Every piece of content is a block with UUID, enabling flexible organization and linking
- **Conflict-free collaboration**: CRDT (Conflict-free Replicated Data Types) ensures seamless multi-device/multi-user synchronization
- **Offline-first**: Full functionality without network connectivity, with local data storage in open formats
- **Extensible architecture**: Plugin system allows custom block types and behaviors without modifying core
- **Performance at scale**: Virtual scrolling and Web Workers enable handling 100k+ blocks smoothly

## Key Features

### Block System
- **Universal blocks**: Text, images, code, links, embeds - all unified under single block model
- **UUID identification**: Each block has globally unique v4/v7 UUID for reliable referencing
- **Nested hierarchy**: Unlimited depth block nesting with drag-and-drop reordering
- **Rich content**: Markdown-like rich text with custom entities and formatting
- **References & backlinks**: Bidirectional linking between blocks with automatic backlink generation

### Data Management
- **CRDT synchronization**: Yjs-based CRDT for conflict-free merging across devices
- **Event sourcing**: Immutable operation log enables time-travel, undo/redo, and audit trails
- **Local storage**: JSON/SQLite hybrid storage in open, readable formats
- **E2EE ready**: Architecture prepared for end-to-end encryption from day one
- **Atomic transactions**: All operations are atomic with proper conflict resolution

### User Interface
- **Declarative UI**: 100% declarative rendering with zero runtime logic in render functions
- **Virtual scrolling**: Efficient rendering of massive block lists (100k+ blocks)
- **No global state**: Immutable state management prevents UI inconsistencies
- **Drag & drop**: Intuitive block reordering with modifier keys (copy, reference)
- **Live updates**: Real-time synchronization across browser tabs and devices

### Plugin System
- **Unified extension**: All custom blocks implemented as plugins
- **Composite blocks**: Plugins can create blocks containing other blocks
- **Block state**: Each block maintains custom JSON state for plugin data
- **Sandboxed execution**: Capability-based permissions prevent plugin interference
- **Error isolation**: Plugin failures don't crash the entire editor

### Performance
- **Web Workers**: Heavy operations (search, indexing, CRDT) run off main thread
- **Lazy loading**: Blocks loaded on-demand to minimize memory footprint
- **Circular detection**: Safe handling of circular references prevents infinite loops
- **Auto-save**: Automatic saving every 3-5 seconds with snapshot versioning
- **Cross-tab sync**: Changes synchronized instantly across browser tabs

## Target Users

### Primary Users
- **Knowledge workers**: Researchers, writers, developers managing complex information
- **Note-takers**: Users building personal wikis and interconnected note systems
- **Content creators**: People organizing ideas, references, and creative work
- **Teams**: Small groups collaborating on shared knowledge bases

### Use Cases
- **Personal knowledge base**: Building second brain with interconnected notes
- **Research management**: Organizing papers, citations, and research findings
- **Project documentation**: Maintaining living documentation with bidirectional links
- **Learning notes**: Creating study materials with concept relationships
- **Content planning**: Organizing ideas and references for writing/creation

## Technical Highlights
- **Modular architecture**: Core completely separated from UI and plugins
- **Schema-first**: Runtime validation with JSON Schema/Zod
- **Flat graph**: Blocks are not pages - flexible graph structure
- **AI-friendly code**: Files ≤500 lines, functions ≤50 lines for maintainability
- **Open format**: All data in readable JSON/SQLite for data portability

## Current Status
Version: 0.1.0 (MVP in development)

The project is in active development with architecture and core systems being established. Focus is on building the foundational block system, CRDT integration, and plugin architecture before expanding to advanced features.
