const fs = require('fs');

// Читаем оригинальный nodes.json
const original = JSON.parse(fs.readFileSync('../architecture/nodes.json', 'utf8'));

// Создаем минимальную структуру
const minimal = {
  nodes: {},
  dependencies: {},
  layout: {
    columnWidth: 600,
    rowHeight: 500,
    startX: 100,
    startY: 100
  }
};

// Фазы из dependency_tracker.json
const phases = {
  foundation: ['modular-arch', 'all-blocks', 'uuid-v4', 'yjs-crdt'],
  core: ['declarative-ui', 'zero-runtime', 'nested-blocks', 'refs-uuid', 'backlinks-auto'],
  features: ['crdt-only', 'virtual-scrolling', 'plugin-unified', 'json-storage', 'offline-full', 'drag-drop-native', 'markdown-rich'],
  polish: ['event-sourcing-separate', 'json-schema', 'atomic-transactions', 'refs-crdt-first', 'flat-graph', 'no-global-state', 'web-workers-all', 'circular-render', 'e2ee-ready', 'crdt-merge', 'composite-blocks', 'block-state-json', 'modular-code']
};

// Определяем фазу для каждого узла
const nodePhases = {};
Object.keys(phases).forEach(phase => {
  phases[phase].forEach(nodeId => {
    nodePhases[nodeId] = phase;
  });
});

// Конвертируем ВСЕ узлы
Object.keys(original.nodes).forEach(id => {
  const node = original.nodes[id];
  minimal.nodes[id] = {
    phase: nodePhases[id] || 'other',
    criteriaId: node.criteriaId,
    title: node.title,
    type: node.type
  };
});

// Зависимости ТОЛЬКО из вопросов к ответам
Object.keys(original.nodes).forEach(id => {
  const node = original.nodes[id];
  if (node.type === 'question' && node.children && node.children.length > 0) {
    minimal.dependencies[id] = node.children;
  }
});

// Фазовые зависимости (enables)
minimal.phaseDependencies = {
  blocking: [
    { from: 'modular-arch', to: 'declarative-ui' },
    { from: 'modular-arch', to: 'plugin-unified' },
    { from: 'all-blocks', to: 'nested-blocks' },
    { from: 'all-blocks', to: 'refs-uuid' },
    { from: 'all-blocks', to: 'crdt-only' },
    { from: 'uuid-v4', to: 'refs-uuid' },
    { from: 'uuid-v4', to: 'backlinks-auto' },
    { from: 'yjs-crdt', to: 'crdt-only' }
  ],
  hard: [
    { from: 'declarative-ui', to: 'zero-runtime' },
    { from: 'declarative-ui', to: 'virtual-scrolling' }
  ],
  soft: [
    { from: 'virtual-scrolling', to: 'web-workers-all' },
    { from: 'plugin-unified', to: 'composite-blocks' }
  ]
};

fs.writeFileSync('./variant3_full.json', JSON.stringify(minimal, null, 2));
console.log('Конвертировано узлов:', Object.keys(minimal.nodes).length);
console.log('Зависимостей:', Object.keys(minimal.dependencies).length);