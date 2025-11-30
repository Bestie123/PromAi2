#!/usr/bin/env node
/**
 * Validation script for development_plan.json
 * Checks requires and blocks fields consistency
 */

const fs = require('fs');
const path = require('path');

const planPath = path.join(__dirname, 'development_plan.json');
const plan = JSON.parse(fs.readFileSync(planPath, 'utf8'));

console.log('🔍 Validating development_plan.json...\n');

// Expected dependencies based on critical paths
const expectedDeps = {
  // Critical path: №1 → №29 → №2 → №3 → №4 → №13 → №16 → №17
  1: { requires: [], blocks: ['q29', 'q2', 'q11', 'q26'] },
  29: { requires: ['modular-arch'], blocks: ['q2'] },
  2: { requires: ['modular-arch'], blocks: ['q3', 'q4'] },
  3: { requires: ['all-blocks'], blocks: ['q4', 'q7'] },
  4: { requires: ['uuid-v4'], blocks: ['q13'] },
  13: { requires: ['nested-blocks'], blocks: ['q14', 'q16', 'q18'] },
  16: { requires: ['yjs-crdt'], blocks: ['q17'] },
  17: { requires: ['crdt-only'], blocks: [] },
  14: { requires: ['yjs-crdt'], blocks: [] },
  
  // Rich text path
  6: { requires: ['all-blocks'], blocks: [] },
  
  // UI path: №11 → №21 → №5
  11: { requires: ['modular-arch'], blocks: ['q21'] },
  21: { requires: ['declarative-ui'], blocks: ['q5'] },
  5: { requires: ['virtual-scrolling'], blocks: [] },
  
  // Plugin path: №1 → №2 → №26 → №27 ↓ №28
  26: { requires: ['all-blocks', 'modular-arch'], blocks: ['q27', 'q28'] },
  27: { requires: ['plugin-unified'], blocks: [] },
  28: { requires: ['plugin-unified'], blocks: [] },
  
  // Refs path: №3 → №7 → №8 ↓ №18
  7: { requires: ['uuid-v4'], blocks: ['q8', 'q18'] },
  8: { requires: ['refs-uuid'], blocks: [] },
  18: { requires: ['yjs-crdt', 'refs-uuid'], blocks: [] },
  
  // Storage
  9: { requires: [], blocks: [] },
  
  // UI related
  12: { requires: ['declarative-ui'], blocks: [] },
  20: { requires: ['declarative-ui'], blocks: [] },
  
  // Offline
  10: { requires: ['json-storage'], blocks: [] },
  
  // Schema
  15: { requires: [], blocks: [] },
  
  // Graph
  19: { requires: ['all-blocks'], blocks: [] },
  
  // Workers
  22: { requires: [], blocks: [] },
  
  // Circular detection
  23: { requires: ['nested-blocks'], blocks: [] },
  
  // E2EE
  24: { requires: ['json-storage'], blocks: [] },
  
  // Conflict management
  25: { requires: ['yjs-crdt'], blocks: [] }
};

let errors = 0;
let warnings = 0;

// Check MVP criteria
const mvp = plan.levels[0];
const allCriteria = [
  ...mvp.tracks.critical.criteria,
  ...mvp.tracks.parallel.criteria
];

allCriteria.forEach(criterion => {
  const expected = expectedDeps[criterion.id];
  if (!expected) {
    console.log(`⚠️  №${criterion.id}: No expected dependencies defined`);
    warnings++;
    return;
  }
  
  // Check requires
  const reqSet = new Set(criterion.requires);
  const expReqSet = new Set(expected.requires);
  
  const missingReqs = expected.requires.filter(r => !reqSet.has(r));
  const extraReqs = criterion.requires.filter(r => !expReqSet.has(r));
  
  if (missingReqs.length > 0) {
    console.log(`❌ №${criterion.id} (${criterion.title})`);
    console.log(`   Missing requires: ${missingReqs.join(', ')}`);
    errors++;
  }
  
  if (extraReqs.length > 0) {
    console.log(`⚠️  №${criterion.id} (${criterion.title})`);
    console.log(`   Extra requires: ${extraReqs.join(', ')}`);
    warnings++;
  }
  
  // Check blocks
  const blockSet = new Set(criterion.blocks);
  const expBlockSet = new Set(expected.blocks);
  
  const missingBlocks = expected.blocks.filter(b => !blockSet.has(b));
  const extraBlocks = criterion.blocks.filter(b => !expBlockSet.has(b));
  
  if (missingBlocks.length > 0) {
    console.log(`❌ №${criterion.id} (${criterion.title})`);
    console.log(`   Missing blocks: ${missingBlocks.join(', ')}`);
    errors++;
  }
  
  if (extraBlocks.length > 0) {
    console.log(`⚠️  №${criterion.id} (${criterion.title})`);
    console.log(`   Extra blocks: ${extraBlocks.join(', ')}`);
    warnings++;
  }
});

console.log(`\n📊 Summary:`);
console.log(`   Errors: ${errors}`);
console.log(`   Warnings: ${warnings}`);

if (errors === 0 && warnings === 0) {
  console.log('\n✅ All checks passed!');
  process.exit(0);
} else {
  console.log('\n❌ Validation failed!');
  process.exit(1);
}
