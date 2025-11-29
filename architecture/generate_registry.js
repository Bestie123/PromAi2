// Auto-generate node registry from nodes.json
const fs = require('fs');

function generateRegistry() {
    const data = JSON.parse(fs.readFileSync('./nodes.json', 'utf8'));
    const nodes = data.nodes;
    
    const questions = [];
    const critical = [];
    const important = [];
    const flexible = [];
    const rejected = [];
    
    Object.values(nodes).forEach(node => {
        switch(node.type) {
            case 'question': questions.push(`q${node.criteriaId}→${node.title.replace('❓ ', '').split('?')[0]}`); break;
            case 'critical': critical.push(node.id); break;
            case 'important': important.push(node.id); break;
            case 'flexible': flexible.push(node.id); break;
            case 'rejected': rejected.push(node.id); break;
        }
    });
    
    console.log('## Node Counts');
    console.log(`Questions: ${questions.length}`);
    console.log(`Critical: ${critical.length}`);
    console.log(`Important: ${important.length}`);
    console.log(`Flexible: ${flexible.length}`);
    console.log(`Rejected: ${rejected.length}`);
    console.log(`Total: ${Object.keys(nodes).length}`);
    
    return {
        questions: questions.sort(),
        critical: critical.sort(),
        important: important.sort(),
        flexible: flexible.sort(),
        rejected: rejected.sort()
    };
}

if (require.main === module) {
    generateRegistry();
}

module.exports = generateRegistry;