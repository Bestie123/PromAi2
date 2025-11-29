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

// Конвертируем узлы (только критичные, без вопросов и rejected)
Object.keys(original.nodes).forEach(id => {
  const node = original.nodes[id];
  if (node.type === 'critical' || node.type === 'important') {
    minimal.nodes[id] = {
      phase: nodePhases[id] || 'other',
      criteriaId: node.criteriaId,
      title: node.title,
      type: node.type
    };
  }
});

// Извлекаем зависимости из оригинального файла
// Используем children для построения зависимостей
Object.keys(original.nodes).forEach(id => {
  const node = original.nodes[id];
  if (node.children && node.children.length > 0) {
    const validChildren = node.children.filter(childId => minimal.nodes[childId]);
    if (validChildren.length > 0 && minimal.nodes[id]) {
      minimal.dependencies[id] = validChildren;
    }
  }
});

// Добавляем явные зависимости из варианта 1
const explicitDeps = {
  'modular-arch': ['declarative-ui', 'plugin-unified'],
  'all-blocks': ['nested-blocks', 'refs-uuid', 'crdt-only'],
  'uuid-v4': ['refs-uuid', 'backlinks-auto'],
  'yjs-crdt': ['crdt-only'],
  'declarative-ui': ['zero-runtime', 'virtual-scrolling'],
  'virtual-scrolling': ['web-workers-all'],
  'plugin-unified': ['composite-blocks']
};

Object.keys(explicitDeps).forEach(from => {
  if (minimal.nodes[from]) {
    const existing = minimal.dependencies[from] || [];
    const newDeps = explicitDeps[from].filter(to => minimal.nodes[to]);
    minimal.dependencies[from] = [...new Set([...existing, ...newDeps])];
  }
});

fs.writeFileSync('./variant3_full.json', JSON.stringify(minimal, null, 2));
console.log('Конвертировано узлов:', Object.keys(minimal.nodes).length);
console.log('Зависимостей:', Object.keys(minimal.dependencies).length);