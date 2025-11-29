// Context validation script
const fs = require('fs');

function validateArchitecture() {
    const data = JSON.parse(fs.readFileSync('./nodes.json', 'utf8'));
    const nodes = data.nodes;
    const compatibility = data.compatibility;
    
    console.log('=== ARCHITECTURE VALIDATION ===\n');
    
    // 1. Check all 29 criteria present
    const criteriaIds = new Set();
    const questions = [];
    
    Object.values(nodes).forEach(node => {
        if (node.criteriaId) criteriaIds.add(node.criteriaId);
        if (node.type === 'question') questions.push(node);
    });
    
    console.log(`✓ Criteria found: ${criteriaIds.size}/29`);
    console.log(`✓ Questions: ${questions.length}`);
    console.log(`✓ Total nodes: ${Object.keys(nodes).length}`);
    
    // 2. Check broken references
    const brokenRefs = [];
    Object.values(nodes).forEach(node => {
        if (node.children) {
            node.children.forEach(childId => {
                if (!nodes[childId]) {
                    brokenRefs.push(`${node.id} -> ${childId}`);
                }
            });
        }
    });
    
    if (brokenRefs.length > 0) {
        console.log(`❌ Broken references: ${brokenRefs.join(', ')}`);
    } else {
        console.log('✓ All references valid');
    }
    
    // 3. Check missing criteria
    const missing = [];
    for (let i = 1; i <= 29; i++) {
        if (!criteriaIds.has(i)) missing.push(i);
    }
    
    if (missing.length > 0) {
        console.log(`❌ Missing criteria: ${missing.join(', ')}`);
    } else {
        console.log('✓ All 29 criteria present');
    }
    
    // 4. Check compatibility matrix
    console.log(`✓ Compatibility pairs: ${Object.keys(compatibility).length}`);
    
    return {
        totalNodes: Object.keys(nodes).length,
        criteriaCount: criteriaIds.size,
        brokenRefs: brokenRefs.length,
        compatibilityPairs: Object.keys(compatibility).length
    };
}

if (require.main === module) {
    validateArchitecture();
}