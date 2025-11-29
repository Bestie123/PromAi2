# Architecture Context Index

## Quick Reference (AI Context Loading)

### 🚀 Ultra Fast (500 bytes)
```
29 критериев → 29 critical решений
modular-arch→all-blocks→uuid-v4→yjs-crdt→declarative-ui→virtual-scrolling→plugin-unified
```

### ⚡ Fast (1KB) 
Load: `ARCHITECTURE_MEMORY.md`

### 📊 Medium (3KB)
Load: `NODE_REGISTRY.md` + `CONTEXT_TRACKER.md`

### 🔍 Full (26KB)
Load: `nodes.json` + `ARCHITECTURE_MEMORY.md`

## File Purpose Map
- `nodes.json` → Complete data (89 nodes)
- `NODE_REGISTRY.md` → Node index by type
- `CONTEXT_TRACKER.md` → Status & dependencies  
- `ARCHITECTURE_MEMORY.md` → Critical decisions
- `validate_context.js` → Integrity check
- `generate_registry.js` → Auto-update registry

## Context Validation Commands
```bash
node validate_context.js     # Full validation
node generate_registry.js    # Update counts
```

## AI Loading Strategy
1. **Quick questions** → CONTEXT_INDEX.md (this file)
2. **Architecture review** → ARCHITECTURE_MEMORY.md  
3. **Node analysis** → NODE_REGISTRY.md
4. **Full analysis** → nodes.json
5. **Validation** → validate_context.js

## Critical Node IDs (for quick reference)
modular-arch | all-blocks | uuid-v4 | nested-blocks | declarative-ui | zero-runtime | yjs-crdt | virtual-scrolling | plugin-unified | crdt-only | atomic-transactions | refs-crdt-first | flat-graph | no-global-state