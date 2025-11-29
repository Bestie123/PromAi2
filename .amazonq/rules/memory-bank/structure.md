# Project Structure

## Directory Organization

```
PromAi2/
├── .amazonq/                    # Amazon Q configuration
│   ├── prompts/                 # Saved AI prompts for development
│   └── rules/                   # Project rules and standards
│       ├── memory-bank/         # Project memory documentation
│       ├── context-optimization.md
│       └── project-standart.md
│
├── architecture/                # Architecture validation and tooling
│   ├── generate_registry.js    # Module registry generator
│   ├── validate_context.js     # Context validation tool
│   ├── validate_dependencies.js # Dependency graph validator
│   ├── server.py               # Development server
│   ├── nodes.json              # Architecture node definitions
│   └── *.md                    # Architecture documentation
│
├── architecture_samples/        # Architecture visualization samples
│   ├── layout_generator.js     # Graph layout generator
│   ├── *.html                  # Interactive architecture diagrams
│   └── *.json                  # Development plans and roadmaps
│
├── archive/                     # Archived architecture iterations
│
├── history/                     # Development history logs
│
├── templates/                   # Reusable templates
│   ├── architecture_analysis_template.md
│   └── architecture_decision_tree_template.html
│
├── docs/                        # Documentation (future)
│
├── src/                         # Source code (planned structure)
│   ├── core/                   # Core block system (≤500 lines/file)
│   ├── crdt/                   # CRDT operations
│   ├── storage/                # Local storage and event sourcing
│   ├── ui/                     # Declarative UI renderer (≤300 lines/file)
│   ├── plugins/                # Plugin system (≤400 lines/file)
│   ├── search/                 # Search and indexing
│   └── types/                  # Type definitions (≤200 lines/file)
│
├── block_schema.json           # Block data structure schema
├── crdt_operations.json        # CRDT operation definitions
├── dependencies_map.json       # Module dependency graph
├── plugin_registry.json        # Plugin registry
├── project_registry.json       # Module registry
├── todo.json                   # Task tracking
├── CONVERSATION_LOG.md         # Development conversation log
├── DEVELOPMENT_PLAN.md         # Detailed development roadmap
├── README.md                   # Project overview
└── package.json                # NPM configuration
```

## Core Components

### Block System (src/core/)
**Purpose**: Foundation of the entire system - everything is a block

**Key Responsibilities**:
- Block creation, update, deletion with UUID management
- Hierarchical relationships (parent/children)
- Reference management (refs/backlinks)
- Block validation and schema enforcement

**Modules** (planned):
- `MODULE_Core_VER_1`: Core block operations
- Functions: createBlock, updateBlock, deleteBlock, addReference, removeReference

### CRDT Layer (src/crdt/)
**Purpose**: Conflict-free synchronization across devices/users

**Key Responsibilities**:
- CRDT operation application (Yjs-based)
- Conflict resolution and merging
- Operation log management
- Atomic transaction handling

**Modules** (planned):
- `MODULE_CRDT_VER_1`: CRDT implementation
- Functions: applyOperation, mergeOperations, resolveConflict

### Storage Layer (src/storage/)
**Purpose**: Local data persistence and event sourcing

**Key Responsibilities**:
- JSON/SQLite hybrid storage
- Event sourcing with immutable operation log
- Snapshot creation and restoration
- Data export/import

**Modules** (planned):
- `MODULE_Storage_VER_1`: Storage operations
- Functions: saveBlock, loadBlocks, createSnapshot

### UI Layer (src/ui/)
**Purpose**: Declarative rendering with zero runtime logic

**Key Responsibilities**:
- Pure function rendering (no side effects)
- Virtual scrolling for 100k+ blocks
- Drag-and-drop handling
- No global mutable state

**Modules** (planned):
- `MODULE_UI_VER_1`: UI renderer
- Functions: renderBlock, virtualScroll, handleDragDrop

### Plugin System (src/plugins/)
**Purpose**: Extensibility for custom block types

**Key Responsibilities**:
- Plugin loading and lifecycle management
- Sandboxed execution with capability-based permissions
- Custom block rendering
- Plugin state management

**Modules** (planned):
- `MODULE_Plugin_VER_1`: Plugin system
- Functions: loadPlugin, executePlugin, sandboxPlugin

### Search & Indexing (src/search/)
**Purpose**: Fast full-text search in Web Workers

**Key Responsibilities**:
- Block indexing in background
- Full-text search across 100k+ blocks
- Index updates on block changes
- Search result ranking

**Modules** (planned):
- `MODULE_Search_VER_1`: Search operations
- Functions: indexBlock, searchBlocks, updateIndex

## Architectural Patterns

### Modular Architecture
- **Core separation**: Core completely independent of UI and plugins
- **Module boundaries**: Each module ≤500 lines, functions ≤50 lines, parameters ≤3
- **No circular dependencies**: Strict dependency graph validation
- **Module versioning**: `MODULE_{Name}_VER_{version}` naming convention

### Block-Centric Design
- **Everything is blocks**: Unified data model for all content types
- **Flat graph**: Blocks are not pages - flexible graph structure
- **UUID identification**: Globally unique v4/v7 identifiers
- **Hierarchical + graph**: Both tree structure (parent/children) and graph (refs/backlinks)

### CRDT-First
- **Single source of truth**: All state managed through CRDT
- **Operation-based**: All changes as CRDT operations
- **Immutable log**: Event sourcing with operation replay
- **Conflict-free**: Automatic merge without user intervention

### Declarative UI
- **Pure rendering**: UI as pure function of state
- **No runtime logic**: Zero imperative code in render path
- **Immutable state**: State changes only through CRDT operations
- **Virtual scrolling**: Efficient rendering of large lists

### Plugin Architecture
- **Unified system**: All custom blocks as plugins
- **Composite blocks**: Plugins can contain other blocks
- **Sandboxed**: Capability-based security model
- **Error boundaries**: Plugin failures isolated

## Data Flow

```
User Action
    ↓
CRDT Operation
    ↓
Operation Log (Event Sourcing)
    ↓
CRDT State Update
    ↓
Storage Persistence
    ↓
UI Re-render (Declarative)
    ↓
Display Update
```

## Module Dependencies

```
UI → Core → CRDT
Plugin → Core + UI
Search → Core
Storage → CRDT
```

**Constraints**:
- No circular dependencies allowed
- Core has no dependencies on UI or plugins
- All modules depend on CRDT for state changes

## Configuration Files

### block_schema.json
Defines block data structure, content schemas, operations, and validation rules. Central schema for runtime validation.

### project_registry.json
Module registry with paths, dependencies, exports, and status. Updated whenever modules are added/modified.

### dependencies_map.json
Visual dependency graph between modules. Used for circular dependency detection.

### plugin_registry.json
Registry of available plugins with manifests, versions, and capabilities.

### crdt_operations.json
Log of all CRDT operations for event sourcing and replay.

### todo.json
Task tracking aligned with development plan.

## Naming Conventions

- **Blocks**: UUID v4/v7 (immutable)
- **Modules**: `MODULE_{Name}_VER_{version}`
- **Functions**: `FUNC_{name}_{number}`
- **Operations**: `OP_{type}_{timestamp}`
- **Plugins**: `PLUGIN_{name}_VER_{version}`

## Development Tools

### Architecture Validation
- `validate_dependencies.js`: Checks for circular dependencies
- `validate_context.js`: Validates module context and structure
- `generate_registry.js`: Auto-generates module registry

### Visualization
- `layout_generator.js`: Generates architecture diagrams
- Various HTML files: Interactive architecture visualizations

### Development Server
- `server.py`: Local development server for testing
