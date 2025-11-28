# PromAi PKM Memory Bank

## 🏗️ Core Architecture (Level 0 - Load-Bearing Walls)

### Block System Foundation
```typescript
// UUID v4/v7 for all blocks - IMMUTABLE
interface Block {
  id: string;           // UUID v4/v7 - NEVER changes
  type: string;         // text, image, code, plugin-custom
  content: any;         // Rich content (Markdown + entities)
  children: string[];   // Child block UUIDs (order preserved)
  parent?: string;      // Parent block UUID
  refs: string[];       // References to other blocks
  backlinks: string[];  // Auto-generated (CRDT managed)
  properties: Record<string, any>; // Custom block state
  created: number;      // Timestamp
  modified: number;     // Timestamp
}
```

### CRDT Operations (Single Source of Truth)
```typescript
interface CRDTOperation {
  id: string;           // OP_{type}_{timestamp}
  type: 'create' | 'update' | 'delete' | 'move' | 'ref_add' | 'ref_remove';
  blockId: string;      // Target block UUID
  data: any;           // Operation payload
  timestamp: number;    // Lamport timestamp
  userId: string;       // User identifier
  parentOp?: string;    // Parent operation for causality
}
```

## 🔧 Critical Implementation Patterns

### File Size Enforcement
- **Files:** ≤500 lines (MAX 1000)
- **Functions:** ≤50 lines (MAX 100)
- **Parameters:** ≤3 (MAX 5)
- **AI-friendly:** Complete file reading in single request

### ID Naming Convention
```typescript
// STRICT naming - NO exceptions
const IDs = {
  blocks: "UUID v4/v7",           // Immutable
  modules: "MODULE_{Name}_VER_{version}",
  functions: "FUNC_{name}_{number}",
  operations: "OP_{type}_{timestamp}",
  plugins: "PLUGIN_{name}_VER_{version}"
};
```

### Modular Architecture Pattern
```typescript
// Every module MUST follow this pattern
interface Module {
  id: string;          // MODULE_{Name}_VER_{version}
  dependencies: string[]; // Other module IDs
  exports: string[];   // Public API functions
  init(): Promise<void>;
  destroy(): Promise<void>;
}
```

## 🎯 Performance Requirements (NON-NEGOTIABLE)

### Virtual Scrolling (100k+ blocks)
```typescript
// MANDATORY for large datasets
interface VirtualScrollConfig {
  itemHeight: number;     // Fixed or dynamic
  bufferSize: number;     // Items to render outside viewport
  threshold: number;      // Trigger lazy loading
  maxItems: number;       // 100,000+ support required
}
```

### Web Workers (UI Responsiveness)
```typescript
// ALL heavy operations in workers
const WorkerTasks = {
  search: "Full-text search across all blocks",
  indexing: "Block content indexing",
  crdt_merge: "CRDT operation merging",
  export: "Large dataset export",
  plugin_execution: "Heavy plugin computations"
};
```

### Circular Reference Detection
```typescript
// CRITICAL for preventing infinite loops
interface CircularDetector {
  visited: Set<string>;    // Block UUIDs
  path: string[];         // Current traversal path
  detect(blockId: string): boolean;
  getSafePath(from: string, to: string): string[] | null;
}
```

## 🔌 Plugin System Architecture

### Plugin Interface (MANDATORY)
```typescript
interface IPlugin {
  id: string;              // PLUGIN_{name}_VER_{version}
  version: string;         // Semantic versioning
  manifest: PluginManifest;
  
  // Lifecycle
  init(): Promise<void>;
  destroy(): Promise<void>;
  
  // Block rendering (optional)
  renderBlock?(block: Block): HTMLElement;
  
  // CRDT operations (optional)
  handleOperation?(op: CRDTOperation): void;
  
  // Custom block types (optional)
  getBlockTypes?(): string[];
  
  // State management (optional)
  saveState?(): any;
  loadState?(state: any): void;
}
```

### Plugin Sandbox (Security)
```typescript
interface PluginCapabilities {
  dom_access: boolean;     // Can modify DOM
  network_access: boolean; // Can make HTTP requests
  file_access: boolean;    // Can access local files
  crdt_write: boolean;     // Can write CRDT operations
  modal_create: boolean;   // Can create modal dialogs
}
```

## 💾 Data Storage Patterns

### Local Storage (Offline-First)
```typescript
interface StorageLayer {
  format: 'JSON' | 'SQLite';  // Open, readable formats
  encryption: boolean;        // E2EE ready
  backup: boolean;           // Auto snapshots
  sync: boolean;             // Cross-tab sync
  
  // CRDT operations log
  operations: CRDTOperation[];
  
  // Block storage
  blocks: Map<string, Block>;
  
  // Index for fast lookups
  indices: {
    refs: Map<string, string[]>;      // Block -> referenced blocks
    backlinks: Map<string, string[]>; // Block -> referencing blocks
    content: Map<string, string[]>;   // Search terms -> blocks
  };
}
```

### Event Sourcing (Immutable Log)
```typescript
interface EventStore {
  append(op: CRDTOperation): Promise<void>;
  replay(fromTimestamp?: number): AsyncIterator<CRDTOperation>;
  snapshot(timestamp: number): Promise<Block[]>;
  compact(beforeTimestamp: number): Promise<void>;
}
```

## 🎨 UI Architecture (Declarative Only)

### Zero Runtime Logic
```typescript
// UI = Pure function of state
interface UIRenderer {
  render(state: AppState): ViewTree;
  // NO side effects, NO mutations, NO async operations
}

interface ViewTree {
  type: string;
  props: Record<string, any>;
  children: ViewTree[];
  key?: string; // For efficient updates
}
```

### State Management (Immutable)
```typescript
// NO global mutable state - EVER
interface AppState {
  blocks: ReadonlyMap<string, Block>;
  operations: readonly CRDTOperation[];
  ui: {
    viewport: ViewportState;
    selection: readonly string[];
    focus: string | null;
  };
  plugins: ReadonlyMap<string, PluginState>;
}
```

## 🔄 CRDT Integration Patterns

### All Changes Through CRDT
```typescript
// NEVER modify blocks directly
class BlockManager {
  // ❌ FORBIDDEN
  updateBlockDirect(block: Block, changes: Partial<Block>): void {
    throw new Error("Direct block modification forbidden");
  }
  
  // ✅ REQUIRED
  updateBlockCRDT(blockId: string, changes: Partial<Block>): CRDTOperation {
    const op: CRDTOperation = {
      id: `OP_update_${Date.now()}`,
      type: 'update',
      blockId,
      data: changes,
      timestamp: this.lamportClock.tick(),
      userId: this.currentUser
    };
    this.crdt.apply(op);
    return op;
  }
}
```

### Atomic Transactions
```typescript
interface Transaction {
  id: string;
  operations: CRDTOperation[];
  commit(): Promise<void>;
  rollback(): Promise<void>;
}

// Multiple operations = single transaction
const tx = crdt.beginTransaction();
tx.add(createBlockOp);
tx.add(addRefOp);
tx.add(updateParentOp);
await tx.commit(); // All or nothing
```

## 🔍 Search & Indexing

### Full-Text Search (Web Worker)
```typescript
interface SearchIndex {
  // Built in Web Worker for UI responsiveness
  index(block: Block): void;
  search(query: string): Promise<SearchResult[]>;
  suggest(partial: string): Promise<string[]>;
  
  // Real-time updates
  onBlockChange(op: CRDTOperation): void;
}

interface SearchResult {
  blockId: string;
  score: number;
  highlights: TextRange[];
  context: string;
}
```

## 🚨 Error Handling Patterns

### Module Error Boundaries
```typescript
// Every module MUST handle errors gracefully
class ModuleErrorBoundary {
  async executeWithBoundary<T>(
    moduleId: string,
    operation: () => Promise<T>
  ): Promise<T | null> {
    try {
      return await operation();
    } catch (error) {
      this.logError(moduleId, error);
      this.notifyUser(moduleId, error);
      return null; // Graceful degradation
    }
  }
}
```

### Plugin Error Isolation
```typescript
// Plugin failures NEVER crash the editor
class PluginManager {
  async executePlugin(pluginId: string, method: string, ...args: any[]): Promise<any> {
    try {
      const plugin = this.plugins.get(pluginId);
      return await plugin[method](...args);
    } catch (error) {
      // Isolate plugin error
      this.disablePlugin(pluginId, error);
      this.showPluginError(pluginId, error);
      return null; // Continue without plugin
    }
  }
}
```

## 📊 Performance Monitoring

### Required Metrics
```typescript
interface PerformanceMetrics {
  // Startup performance
  startup_time: number;        // Target: <2s for 10k blocks
  
  // Search performance  
  search_time: number;         // Target: <100ms for 100k blocks
  
  // Render performance
  render_fps: number;          // Target: 60 FPS during scroll
  
  // Memory usage
  memory_usage: number;        // Target: <500MB for 50k blocks
  
  // CRDT performance
  operation_apply_time: number; // Target: <10ms per operation
  merge_time: number;          // Target: <100ms for conflict resolution
}
```

## 🔐 Security Requirements

### Input Validation (All CRDT Operations)
```typescript
interface OperationValidator {
  validate(op: CRDTOperation): ValidationResult;
  sanitizeContent(content: any): any;
  checkPermissions(userId: string, op: CRDTOperation): boolean;
}
```

### XSS Protection (Rich Text)
```typescript
interface ContentSanitizer {
  sanitizeHTML(html: string): string;
  sanitizeMarkdown(md: string): string;
  allowedTags: readonly string[];
  allowedAttributes: readonly string[];
}
```

## 🔄 Sync & Collaboration

### Cross-Tab Synchronization
```typescript
interface CrossTabSync {
  // Broadcast CRDT operations across tabs
  broadcast(op: CRDTOperation): void;
  
  // Listen for operations from other tabs
  onOperation(callback: (op: CRDTOperation) => void): void;
  
  // Resolve conflicts between tabs
  resolveConflict(ops: CRDTOperation[]): CRDTOperation[];
}
```

### Conflict Resolution (CRDT Merge)
```typescript
interface ConflictResolver {
  // Automatic merge for concurrent operations
  merge(ops: CRDTOperation[]): CRDTOperation[];
  
  // Handle semantic conflicts (user intervention needed)
  detectSemanticConflict(ops: CRDTOperation[]): boolean;
  
  // Last-writer-wins for simple conflicts
  lww(ops: CRDTOperation[]): CRDTOperation;
}
```

## 📁 Required State Files (ALWAYS UPDATE)

### Project Registry
```json
// project_registry.json
{
  "modules": {
    "MODULE_Core_VER_1": {
      "path": "./src/core/",
      "dependencies": [],
      "exports": ["FUNC_createBlock_1", "FUNC_updateBlock_1"]
    }
  },
  "lastUpdated": "2024-01-01T00:00:00Z"
}
```

### Dependencies Map
```json
// dependencies_map.json
{
  "graph": {
    "MODULE_Core_VER_1": [],
    "MODULE_UI_VER_1": ["MODULE_Core_VER_1"],
    "MODULE_Plugin_VER_1": ["MODULE_Core_VER_1"]
  },
  "circular": [],
  "lastCheck": "2024-01-01T00:00:00Z"
}
```

### Block Schema
```json
// block_schema.json
{
  "version": "1.0.0",
  "blockTypes": {
    "text": {
      "content": "string",
      "formatting": "object"
    },
    "image": {
      "src": "string",
      "alt": "string",
      "dimensions": "object"
    }
  },
  "operations": ["create", "update", "delete", "move", "ref_add", "ref_remove"]
}
```

## 🎯 Critical Success Factors

### Level 0 (MVP) - NO COMPROMISES
- ✅ Modular architecture (files ≤500 lines)
- ✅ Block system with UUID v4/v7
- ✅ CRDT with Event Sourcing
- ✅ Declarative UI (zero runtime logic)
- ✅ Plugin system with sandboxing
- ✅ Offline-first operation

### Forbidden Patterns
- ❌ Global mutable state
- ❌ Imperative UI code
- ❌ Direct data mutations (bypass CRDT)
- ❌ Files >1000 lines
- ❌ Functions >100 lines
- ❌ Circular module dependencies

## 🔧 Development Workflow

### Git Commit Format
```bash
feat(BLOCK): add rich text formatting support
feat(CRDT): implement conflict resolution for refs
feat(PLUGIN): add modal dialog API
fix(MODULE_Core): resolve UUID collision edge case
refactor(MODULE_UI): split large renderer into components
```

### Mandatory Sequence
1. **Create module** → Update all state files
2. **Change CRDT** → Validate schema and operations
3. **New plugin** → Update plugin_registry.json
4. **Any change** → Update changelog.md
5. **CRITICAL** → Log in CONVERSATION_LOG.md

## 🎨 UI Component Patterns

### Virtual Scrolling Implementation
```typescript
interface VirtualScroller {
  itemHeight: number | ((index: number) => number);
  containerHeight: number;
  itemCount: number;
  
  getVisibleRange(): [number, number];
  renderItems(startIndex: number, endIndex: number): HTMLElement[];
  updateScrollPosition(scrollTop: number): void;
}
```

### Drag & Drop System
```typescript
interface DragDropManager {
  // Support for modifiers (copy, reference)
  startDrag(blockId: string, modifiers: DragModifiers): void;
  
  // Preserve child order during drops
  handleDrop(targetId: string, position: 'before' | 'after' | 'inside'): CRDTOperation[];
  
  // Visual feedback during drag
  showDropZones(draggedBlockId: string): void;
}

interface DragModifiers {
  copy: boolean;      // Ctrl+drag = copy block
  reference: boolean; // Alt+drag = create reference
  move: boolean;      // Default = move block
}
```

## 🔍 Inspector Integration

### Debug Attributes (All DOM Elements)
```typescript
// MANDATORY for debugging and development
interface DebugAttributes {
  'data-module-id': string;    // MODULE_{Name}_VER_{version}
  'data-block-id'?: string;    // Block UUID
  'data-plugin-id'?: string;   // Plugin identifier
  'data-operation-id'?: string; // CRDT operation ID
  'data-function-id'?: string; // FUNC_{name}_{number}
}
```

## 📈 Scalability Targets

### Performance Benchmarks
```typescript
interface ScalabilityTargets {
  blocks: {
    max_count: 100_000;        // Support 100k blocks
    search_time: 100;          // <100ms search
    render_time: 16;           // <16ms render (60 FPS)
  };
  
  memory: {
    max_usage: 500_000_000;    // <500MB for 50k blocks
    gc_frequency: 30_000;      // GC every 30s max
  };
  
  storage: {
    max_size: 1_000_000_000;   // 1GB local storage
    backup_time: 5_000;        // <5s backup creation
  };
}
```

## 🚀 Plugin Development Guide

### Plugin Manifest
```json
{
  "id": "PLUGIN_CustomBlock_VER_1",
  "version": "1.0.0",
  "name": "Custom Block Plugin",
  "description": "Adds custom block types",
  "capabilities": {
    "dom_access": true,
    "crdt_write": true,
    "modal_create": false
  },
  "blockTypes": ["custom-chart", "custom-table"],
  "dependencies": ["MODULE_Core_VER_1"]
}
```

### Plugin API Surface
```typescript
interface PluginAPI {
  // Block operations
  createBlock(type: string, content: any): Promise<string>;
  updateBlock(id: string, changes: Partial<Block>): Promise<void>;
  deleteBlock(id: string): Promise<void>;
  
  // References
  addReference(fromId: string, toId: string): Promise<void>;
  removeReference(fromId: string, toId: string): Promise<void>;
  
  // UI integration
  showModal(content: HTMLElement): Promise<any>;
  showNotification(message: string, type: 'info' | 'warning' | 'error'): void;
  
  // Search
  search(query: string): Promise<SearchResult[]>;
  
  // Events
  onBlockChange(callback: (op: CRDTOperation) => void): void;
  onSelectionChange(callback: (blockIds: string[]) => void): void;
}
```

---

**REMEMBER:** This is a PKM tool for knowledge work. Architecture must be ready for 100k+ blocks, real-time collaboration, and complex plugins from day one. Every decision should optimize for long-term scalability and maintainability.