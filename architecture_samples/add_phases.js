const fs = require('fs');
const data = JSON.parse(fs.readFileSync('./nodes_variant1.json', 'utf8'));

// Добавляем фазы
const phases = {
  foundation: ['modular-arch', 'all-blocks', 'uuid-v4', 'yjs-crdt'],
  core: ['declarative-ui', 'zero-runtime', 'nested-blocks', 'refs-uuid', 'backlinks-auto'],
  features: ['crdt-only', 'virtual-scrolling', 'plugin-unified', 'json-storage', 'offline-full', 'drag-drop-native', 'markdown-rich'],
  polish: ['event-sourcing-separate', 'json-schema', 'atomic-transactions', 'refs-crdt-first', 'flat-graph', 'no-global-state', 'web-workers-all', 'circular-render', 'e2ee-ready', 'crdt-merge', 'composite-blocks', 'block-state-json', 'modular-code']
};

Object.keys(phases).forEach(phase => {
  phases[phase].forEach(nodeId => {
    if (data.nodes[nodeId]) {
      data.nodes[nodeId].phase = phase;
    }
  });
});

// Добавляем зависимости
data.dependencies = {
  blocking: [
    { from: 'modular-arch', to: 'declarative-ui', type: 'enables' },
    { from: 'modular-arch', to: 'plugin-unified', type: 'enables' },
    { from: 'all-blocks', to: 'nested-blocks', type: 'enables' },
    { from: 'all-blocks', to: 'refs-uuid', type: 'enables' },
    { from: 'all-blocks', to: 'crdt-only', type: 'enables' },
    { from: 'uuid-v4', to: 'refs-uuid', type: 'enables' },
    { from: 'uuid-v4', to: 'backlinks-auto', type: 'enables' },
    { from: 'yjs-crdt', to: 'crdt-only', type: 'enables' }
  ],
  hard: [
    { from: 'declarative-ui', to: 'zero-runtime', type: 'enables' },
    { from: 'declarative-ui', to: 'virtual-scrolling', type: 'enables' }
  ],
  soft: [
    { from: 'virtual-scrolling', to: 'web-workers-all', type: 'enhances' },
    { from: 'plugin-unified', to: 'composite-blocks', type: 'enables' }
  ]
};

data.phases = {
  foundation: { color: '#f85149', nodes: phases.foundation, description: 'Несущие стены архитектуры' },
  core: { color: '#f79009', nodes: phases.core, description: 'Основная функциональность' },
  features: { color: '#3fb950', nodes: phases.features, description: 'Ключевые возможности' },
  polish: { color: '#a5a5a5', nodes: phases.polish, description: 'Доводка и оптимизация' }
};

fs.writeFileSync('./nodes_variant1.json', JSON.stringify(data, null, 2));
console.log('Done!');