const fs = require('fs');

// Читаем оригинальный nodes.json
const original = JSON.parse(fs.readFileSync('../architecture/nodes.json', 'utf8'));

// Создаем минимальную структуру
const minimal = {
  nodes: {},
  dependencies: {},
  layout: {
    columnWidth: 400,
    rowHeight: 300,
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

// Конвертируем ВСЕ узлы (включая вопросы и rejected)
Object.keys(original.nodes).forEach(id => {
  const node = original.nodes[id];
  minimal.nodes[id] = {
    phase: nodePhases[id] || 'other',
    criteriaId: node.criteriaId,
    title: node.title,
    type: node.type,
    children: node.children || []
  };
});

// Зависимости из children (вопрос -> ответы)
Object.keys(original.nodes).forEach(id => {
  const node = original.nodes[id];
  if (node.children && node.children.length > 0) {
    minimal.dependencies[id] = node.children;
  }
});

// Добавляем фазовые зависимости отдельно
minimal.phaseDependencies = {
  'modular-arch': ['declarative-ui', 'plugin-unified'],
  'all-blocks': ['nested-blocks', 'refs-uuid', 'crdt-only'],
  'uuid-v4': ['refs-uuid', 'backlinks-auto'],
  'yjs-crdt': ['crdt-only'],
  'declarative-ui': ['zero-runtime', 'virtual-scrolling'],
  'virtual-scrolling': ['web-workers-all'],
  'plugin-unified': ['composite-blocks']
};

fs.writeFileSync('./variant3_full.json', JSON.stringify(minimal, null, 2));
console.log('Конвертировано узлов:', Object.keys(minimal.nodes).length);
console.log('Зависимостей:', Object.keys(minimal.dependencies).length);