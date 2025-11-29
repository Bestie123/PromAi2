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

## 📊 Architecture Decision Tree Diagram

### Data Structure (nodes_data.json)
```typescript
interface ArchitectureDiagram {
  nodes: Node[];           // All decision nodes and answers
  compatibility: Record<string, CompatibilityType>; // Cross-node relationships
}

interface Node {
  id: string;              // Unique identifier (kebab-case)
  type: NodeType;          // Visual and semantic type
  title: string;           // Display title with emoji
  description: string;     // Short explanation
  details: string;         // Pros/cons or variants
  children: string[];      // Child node IDs (answers to questions)
  criteriaId: number;      // Maps to 29 core criteria
}

type NodeType = 
  | 'question'   // Decision point (blue)
  | 'critical'   // Must-have choice (red)
  | 'important'  // Recommended choice (orange)
  | 'flexible'   // Optional choice (green)
  | 'rejected';  // Not recommended (gray)

type CompatibilityType = 
  | 'невозможно'    // Mutually exclusive (red line)
  | 'переключать'   // Can switch between (orange line)
  | 'объединить';   // Can combine (green line)
```

### Layout Generation Algorithm
```typescript
interface LayoutConfig {
  HORIZONTAL_SPACING: 1000;  // px between questions
  VERTICAL_SPACING: 500;     // px between rows
  QUESTION_Y: 100;           // Starting Y for questions
  ANSWER_Y: 300;             // Offset for answers below questions
}

// Auto-layout rules:
// 1. Questions arranged horizontally, 5 per row
// 2. Answers positioned below parent question
// 3. Multiple answers spread evenly around parent X
// 4. Coordinates calculated at runtime (not stored)

function generateLayout(nodes: Node[]): Node[] {
  const questions = nodes.filter(n => n.type === 'question');
  const answers = nodes.filter(n => n.type !== 'question');
  
  // Position questions in grid
  questions.forEach((q, i) => {
    q.x = 500 + (i % 5) * HORIZONTAL_SPACING;
    q.y = QUESTION_Y + Math.floor(i / 5) * VERTICAL_SPACING * 2;
  });
  
  // Position answers relative to parent
  answers.forEach(a => {
    const parent = questions.find(q => q.children.includes(a.id));
    if (parent) {
      const siblingIndex = parent.children.indexOf(a.id);
      const totalSiblings = parent.children.length;
      const offset = (siblingIndex - (totalSiblings - 1) / 2) * 600;
      a.x = parent.x + offset;
      a.y = parent.y + ANSWER_Y;
    }
  });
  
  return nodes;
}
```

### Visual Rendering Rules
```typescript
interface NodeStyle {
  // Colors by type
  critical: { border: '#f85149', gradient: '#2d1b1f' };
  important: { border: '#f79009', gradient: '#2d2419' };
  flexible: { border: '#3fb950', gradient: '#1b2d1f' };
  question: { border: '#58a6ff', gradient: '#1b2332' };
  rejected: { border: '#8b949e', gradient: '#2d2d2d', opacity: 0.7 };
  
  // Dimensions
  minWidth: 280;
  maxWidth: 320;
  padding: 16;
  borderRadius: 12;
}

interface ConnectionStyle {
  // Parent-child connections (tree structure)
  height: 2;              // px
  color: 'inherit';       // From parent node type
  zIndex: -1;
  
  // Compatibility connections (cross-links)
  height: 2;
  color: {
    'объединить': '#3fb950',
    'переключать': '#f79009',
    'невозможно': '#f85149'
  };
  opacity: 0.6;
  zIndex: -2;
}
```

### ID Naming Convention
```typescript
// Question nodes: q{number}
const questionId = `q${criteriaId}`; // q1, q2, ..., q29

// Answer nodes: {concept}-{variant}
const answerId = `${concept}-${variant}`;
// Examples:
// - 'modular-arch', 'monolith-arch'
// - 'uuid-v4', 'uuid-v7'
// - 'yjs-crdt', 'automerge-crdt'

// Compatibility keys: {id1},{id2}
const compatKey = `${id1},${id2}`; // 'uuid-v4,uuid-v7'
```

### Adding New Criteria
```typescript
// Step 1: Add question node
{
  id: 'q30',
  type: 'question',
  title: '❓ New Decision?',
  description: 'What to decide',
  details: 'Варианты: Option A | Option B',
  children: ['option-a', 'option-b'],
  criteriaId: 30
}

// Step 2: Add answer nodes
{
  id: 'option-a',
  type: 'critical',
  title: '✅ Option A',
  description: 'Why this is good',
  details: '➕ Pros ➖ Cons',
  children: [],
  criteriaId: 30
}

// Step 3: Add compatibility (if needed)
'option-a,option-b': 'невозможно'

// Coordinates auto-generated by layout algorithm
```

### Emoji Convention
```typescript
const emojiMap = {
  question: '❓',      // All questions
  critical: '✅',     // Approved/selected
  rejected: '❌',     // Not recommended
  important: '⚡🔷📦🏷️⏰🔍⚙️⏳', // Variants
  flexible: '🔄',     // Flexible options
  
  // Semantic emojis
  markdown: '📝',
  code: '💻',
  database: '💾',
  network: '🌐',
  security: '🔐'
};
```

### Interaction Features
```typescript
interface ViewportControls {
  // Pan: Left mouse drag
  pan: { button: 0, cursor: 'grab' };
  
  // Zoom: Mouse wheel
  zoom: {
    min: 0.1,
    max: 3.0,
    step: 0.1,
    anchor: 'mouse_position' // Zoom towards cursor
  };
  
  // Reset: Button
  reset: { scale: 0.2, x: 100, y: 50 };
}

interface NodeInteraction {
  hover: { scale: 1.05, shadow: '0 12px 48px rgba(0,0,0,0.6)' };
  click: null; // No click action (read-only)
}
```

### File Structure
```
architecture_samples/
├── nodes_data.json          # Data only (no coordinates)
├── layout_generator.js      # Layout algorithm (standalone)
├── architecture_auto.html   # Full visualization
└── README.md               # Usage guide
```

### Generation from Scratch
```typescript
// 1. Define criteria (29 core + new ones)
const criteria = [
  { id: 1, question: 'Модульность движка?', variants: ['Модульная', 'Монолитная'] },
  { id: 2, question: 'Блочность элементов?', variants: ['Всё блоки', 'Смешанная'] },
  // ... 27 more
];

// 2. Generate nodes
const nodes = criteria.flatMap(c => [
  { id: `q${c.id}`, type: 'question', title: `❓ ${c.question}`, ... },
  ...c.variants.map((v, i) => ({
    id: `${kebabCase(v)}-${i}`,
    type: determineType(v),
    title: `${getEmoji(v)} ${v}`,
    ...
  }))
]);

// 3. Define compatibility
const compatibility = {
  'variant-a,variant-b': 'невозможно',
  'variant-c,variant-d': 'объединить',
  // ...
};

// 4. Save to JSON (no coordinates)
// 5. Load in HTML with auto-layout
```

### Modification Workflow
```typescript
// To modify existing diagram:

// 1. Edit nodes_data.json
//    - Add/remove nodes
//    - Update titles/descriptions
//    - Change node types
//    - Modify children arrays

// 2. Update compatibility
//    - Add new relationships
//    - Remove obsolete ones

// 3. Reload HTML
//    - Layout auto-regenerates
//    - No manual coordinate adjustment

// 4. Adjust layout algorithm (if needed)
//    - Modify HORIZONTAL_SPACING
//    - Modify VERTICAL_SPACING
//    - Change grid size (5 per row)
```

### Export/Import
```typescript
// Export to other formats
interface ExportFormat {
  json: 'nodes_data.json';           // Native format
  svg: 'architecture_diagram.svg';   // Vector graphics
  png: 'architecture_diagram.png';   // Raster image
  markdown: 'architecture_tree.md';  // Text representation
}

// Import from other tools
interface ImportSource {
  mermaid: 'Convert from Mermaid syntax';
  graphviz: 'Convert from DOT format';
  json: 'Direct import';
}
```

---

**REMEMBER:** This is a PKM tool for knowledge work. Architecture must be ready for 100k+ blocks, real-time collaboration, and complex plugins from day one. Every decision should optimize for long-term scalability and maintainability.