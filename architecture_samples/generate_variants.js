const fs = require('fs');
const original = JSON.parse(fs.readFileSync('../architecture/nodes.json', 'utf8'));

// Вариант A: Использовать оригинальные координаты
const variantA = {
  nodes: {},
  dependencies: {},
  phaseDependencies: {},
  useOriginalPositions: true
};

Object.keys(original.nodes).forEach(id => {
  const node = original.nodes[id];
  variantA.nodes[id] = {
    x: node.x,
    y: node.y,
    criteriaId: node.criteriaId,
    title: node.title,
    type: node.type,
    phase: 'other'
  };
});

// Вариант B: Масштабировать оригинальные координаты (уменьшить)
const variantB = {
  nodes: {},
  dependencies: {},
  phaseDependencies: {},
  useOriginalPositions: true
};

Object.keys(original.nodes).forEach(id => {
  const node = original.nodes[id];
  variantB.nodes[id] = {
    x: node.x * 0.5,
    y: node.y * 0.5,
    criteriaId: node.criteriaId,
    title: node.title,
    type: node.type,
    phase: 'other'
  };
});

// Вариант C: Группировать по Y-координатам из оригинала
const variantC = {
  nodes: {},
  dependencies: {},
  phaseDependencies: {},
  layout: { columnWidth: 500, rowHeight: 200, startX: 100, startY: 100 }
};

const byY = {};
Object.keys(original.nodes).forEach(id => {
  const node = original.nodes[id];
  const y = node.y;
  if (!byY[y]) byY[y] = [];
  byY[y].push({ id, x: node.x, node });
});

Object.keys(original.nodes).forEach(id => {
  const node = original.nodes[id];
  variantC.nodes[id] = {
    x: node.x,
    y: node.y,
    criteriaId: node.criteriaId,
    title: node.title,
    type: node.type,
    phase: 'other'
  };
});

// Копируем зависимости
[variantA, variantB, variantC].forEach(v => {
  Object.keys(original.nodes).forEach(id => {
    const node = original.nodes[id];
    if (node.type === 'question' && node.children && node.children.length > 0) {
      v.dependencies[id] = node.children;
    }
  });
  
  v.phaseDependencies = {
    blocking: [
      { from: 'modular-arch', to: 'declarative-ui' },
      { from: 'all-blocks', to: 'nested-blocks' },
      { from: 'uuid-v4', to: 'refs-uuid' },
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
});

fs.writeFileSync('./variant_A_original.json', JSON.stringify(variantA, null, 2));
fs.writeFileSync('./variant_B_scaled.json', JSON.stringify(variantB, null, 2));
fs.writeFileSync('./variant_C_grouped.json', JSON.stringify(variantC, null, 2));

console.log('Создано 3 варианта:');
console.log('A: Оригинальные координаты');
console.log('B: Масштабированные (x0.5)');
console.log('C: Группированные по Y');
