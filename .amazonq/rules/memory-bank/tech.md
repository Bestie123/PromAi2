# Technology Stack

## Programming Languages

### JavaScript/Node.js
- **Primary language**: Core development and tooling
- **Version**: Modern ES6+ features
- **Usage**: 
  - Architecture validation scripts
  - Module registry generation
  - Layout generators
  - Build tooling

### Python
- **Version**: Python 3.x
- **Usage**:
  - Development server (`server.py`)
  - Potential backend utilities

### TypeScript (Planned)
- **Target for production code**: Type-safe implementation
- **Usage**:
  - Core block system
  - CRDT operations
  - Plugin system
  - UI components

## Core Dependencies

### CRDT Library (Planned)
- **Yjs** or **Automerge**: CRDT implementation
- **Purpose**: Conflict-free synchronization
- **Features needed**:
  - Operation-based CRDT
  - Nested data structures
  - Custom types for blocks
  - Efficient merging

### Schema Validation (Planned)
- **JSON Schema** or **Zod**: Runtime validation
- **Purpose**: Schema-first development with validation
- **Usage**:
  - Block schema validation
  - CRDT operation validation
  - Plugin manifest validation

### Storage (Planned)
- **JSON**: Human-readable storage format
- **SQLite** (via sql.js or better-sqlite3): Performance-critical queries
- **Hybrid approach**: JSON for readability, SQLite for indexing

### UI Framework (Planned)
- **Declarative approach**: React, Vue, or custom
- **Requirements**:
  - Pure functional rendering
  - Virtual scrolling support
  - No global mutable state
  - Efficient re-rendering

### Rich Text Editor (Planned)
- **Markdown-based** with extensions
- **Options**: ProseMirror, Slate, or custom
- **Requirements**:
  - CRDT-compatible
  - Custom entity support
  - Live preview
  - Extensible

## Development Tools

### Package Manager
- **npm**: Node package management
- **Version**: Latest stable
- **Configuration**: `package.json`

### Documentation
- **Docsify**: Documentation site generator
- **Commands**:
  - `npm run docs:init`: Initialize docs
  - `npm run docs:serve`: Serve documentation with live reload
  - `npm run docs:build`: Build static docs

### Architecture Tools
- **Custom scripts**: JavaScript-based validation
- **Files**:
  - `generate_registry.js`: Auto-generate module registry
  - `validate_dependencies.js`: Check circular dependencies
  - `validate_context.js`: Validate module structure
  - `layout_generator.js`: Generate architecture diagrams

### Version Control
- **Git**: Source control
- **Commit format**:
  - `feat(BLOCK): description` - Block system features
  - `feat(CRDT): description` - CRDT operations
  - `feat(PLUGIN): description` - Plugin system
  - `fix(MODULE): description` - Bug fixes
  - `refactor(MODULE): description` - Code refactoring

## Build System (Planned)

### Bundler
- **Vite** or **Webpack**: Module bundling
- **Requirements**:
  - Tree-shaking for plugins
  - Code splitting
  - Fast HMR (Hot Module Replacement)
  - TypeScript support

### Linting & Formatting
- **ESLint**: Code quality
- **Prettier**: Code formatting
- **Custom rules**:
  - Max file lines: 500 (hard limit: 1000)
  - Max function lines: 50 (hard limit: 100)
  - Max parameters: 3 (hard limit: 5)

### Testing (Planned)
- **Unit tests**: Jest or Vitest
- **Integration tests**: Testing Library
- **CRDT tests**: Conflict resolution scenarios
- **Plugin tests**: Isolation and compatibility
- **Target coverage**: 80% minimum

## Performance Technologies

### Web Workers
- **Purpose**: Off-main-thread processing
- **Usage**:
  - Search and indexing
  - CRDT operations
  - Heavy computations
- **Goal**: Keep UI responsive at 60 FPS

### Virtual Scrolling
- **Library**: react-window, react-virtualized, or custom
- **Purpose**: Render 100k+ blocks efficiently
- **Requirements**:
  - Dynamic item heights
  - Smooth scrolling
  - Memory efficiency

### IndexedDB (Planned)
- **Purpose**: Browser-based storage
- **Usage**:
  - Block data caching
  - Operation log storage
  - Offline data persistence

## Security Technologies

### Sandboxing (Planned)
- **iframe sandbox** or **Web Workers**: Plugin isolation
- **Capability-based permissions**: Restricted API access
- **CSP (Content Security Policy)**: XSS protection

### Encryption (Planned)
- **Web Crypto API**: E2EE implementation
- **Purpose**: End-to-end encryption ready architecture
- **Usage**:
  - Block content encryption
  - Key management
  - Secure synchronization

## Development Commands

### Current Commands
```bash
npm install              # Install dependencies
npm run docs:serve       # Start documentation server
npm run docs:build       # Build documentation
```

### Planned Commands
```bash
npm run dev              # Start development server
npm run build            # Build for production
npm run test             # Run tests
npm run test:watch       # Run tests in watch mode
npm run lint             # Lint code
npm run format           # Format code
npm run validate         # Validate architecture
npm run generate:registry # Generate module registry
```

## File Size Constraints

### Critical Limits (Enforced by linting)
- **Files**: ≤500 lines (maximum 1000)
- **Functions**: ≤50 lines (maximum 100)
- **Parameters**: ≤3 (maximum 5)

### Rationale
- **AI-friendly**: Files readable in single context window
- **Maintainability**: Easier to understand and modify
- **Modularity**: Forces proper code organization
- **Testing**: Smaller units easier to test

## Performance Targets

### Startup Performance
- **<2 seconds**: Load 10k blocks
- **<5 seconds**: Load 50k blocks

### Runtime Performance
- **<100ms**: Search across 100k blocks
- **60 FPS**: Smooth scrolling
- **<500MB**: Memory usage for 50k blocks

### Storage Performance
- **<50ms**: Save single block
- **<500ms**: Create snapshot
- **<1s**: Load full database

## Browser Support (Planned)

### Target Browsers
- **Chrome/Edge**: Latest 2 versions
- **Firefox**: Latest 2 versions
- **Safari**: Latest 2 versions

### Required APIs
- **ES6+**: Modern JavaScript features
- **Web Workers**: Background processing
- **IndexedDB**: Local storage
- **Web Crypto**: Encryption (future)
- **Drag and Drop API**: Block reordering

## Development Environment

### Recommended Setup
- **Node.js**: v18+ LTS
- **npm**: v9+
- **Editor**: VS Code with extensions:
  - ESLint
  - Prettier
  - TypeScript
  - GitLens

### Operating Systems
- **Windows**: Primary development (current)
- **macOS**: Supported
- **Linux**: Supported

## Monitoring & Debugging

### Logging
- **Console logging**: Development
- **Structured logs**: Production (planned)
- **Log levels**: Error, Warn, Info, Debug

### Performance Monitoring
- **Performance API**: Browser performance metrics
- **Custom metrics**:
  - CRDT operation time
  - Render time
  - Search time
  - Memory usage

### Debugging Tools
- **Browser DevTools**: Primary debugging
- **React DevTools**: UI debugging (if React chosen)
- **Custom inspector**: Module/block/plugin inspection
  - `data-module-id` attributes
  - `data-block-id` attributes
  - `data-plugin-id` attributes
  - `data-operation-id` attributes

## Version Management

### Semantic Versioning
- **Patch (1.0.X)**: Bug fixes, compatible CRDT operations
- **Minor (1.X.0)**: New block types, backward compatible
- **Major (X.0.0)**: Breaking changes in CRDT schema

### API Versioning
- **Module versions**: `MODULE_{Name}_VER_{version}`
- **Plugin versions**: `PLUGIN_{name}_VER_{version}`
- **Deprecation policy**: Warnings before breaking changes
- **Migration scripts**: For major version upgrades
