# Architecture Memory Bank

## Context Management Strategy

**ACTIVE FILE:** `architecture_full_complete.html` - Complete decision tree with all 29 criteria
**DATABASE:** `architecture_nodes_db.json` - Structured node data with dependencies
**ARCHIVED:** `archive/` - Old diagram versions

## Key Architecture Decisions (Critical Path)

### Level 0 - Foundation (Non-negotiable)
1. **Modular Architecture** (Criteria 1) → `modular-arch` ✅
2. **Block System** (Criteria 2) → `all-blocks` ✅  
3. **UUID System** (Criteria 3) → `uuid-v4` or `uuid-v7` ✅
4. **Nested Blocks** (Criteria 4) → `nested-blocks` ✅
5. **CRDT Foundation** (Criteria 13) → `yjs-crdt` ✅

### Level 1 - Core Features (Must-have)
6. **Declarative UI** (Criteria 11) → `declarative-ui` ✅
7. **Zero Runtime Logic** (Criteria 12) → `zero-runtime` ✅
8. **Event Sourcing** (Criteria 14) → `event-sourcing-separate` ✅
9. **CRDT Operations** (Criteria 16) → `crdt-only` ✅
10. **Plugin System** (Criteria 26) → `plugin-unified` ✅

### Level 2 - Performance (Critical for scale)
11. **Virtual Scrolling** (Criteria 21) → `virtual-scrolling` ✅
12. **Web Workers** (Criteria 22) → `web-workers-all` ✅
13. **No Global State** (Criteria 20) → `no-global-state` ✅

## Decision Dependencies

```
modular-arch → declarative-ui → zero-runtime
all-blocks → crdt-only → yjs-crdt
uuid-system → refs-crdt-first → backlinks-auto
nested-blocks → flat-graph → virtual-scrolling
```

## Compatibility Matrix

- **Impossible:** modular-arch ↔ monolith-arch
- **Switchable:** uuid-v4 ↔ uuid-v7, yjs-crdt ↔ automerge-crdt
- **Combinable:** drag-drop-native + drag-drop-lib

## Context Loading Instructions

When discussing architecture:
1. **Always reference criteria number** (1-29)
2. **Use node IDs** from JSON database
3. **Check dependencies** before suggesting changes
4. **Verify compatibility** in matrix

## AI Context Optimization

- **File size:** architecture_full_complete.html ≈ 15KB (fits in single context)
- **Node database:** architecture_nodes_db.json ≈ 5KB (structured data)
- **Memory bank:** This file ≈ 2KB (quick reference)

**Total context:** ~22KB - well within limits for comprehensive analysis

## Quick Reference

**Critical Nodes:** modular-arch, all-blocks, uuid-v4/v7, nested-blocks, declarative-ui, zero-runtime, yjs-crdt, crdt-only, plugin-unified, virtual-scrolling, web-workers-all, no-global-state

**Rejected Nodes:** monolith-arch, mixed-model, flat-only, imperative-ui, stateful-runtime, manual-merge, plugin-mixed, global-state

**Flexible Nodes:** hybrid-storage, zod-schema, composite-blocks, block-state-json