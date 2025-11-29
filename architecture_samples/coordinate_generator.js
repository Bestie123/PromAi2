// Генератор координат для nodes.json
// Поддерживает несколько вариантов раскладки

const fs = require('fs');
const path = require('path');

// Варианты раскладки
const LAYOUTS = {
  grid: generateGridLayout,
  tree: generateTreeLayout,
  circular: generateCircularLayout,
  force: generateForceLayout
};

// Параметры раскладки
const PARAMS = {
  nodeWidth: 320,
  nodeHeight: 200,
  horizontalGap: 400,
  verticalGap: 300,
  canvasWidth: 12000,
  canvasHeight: 8000
};

// Grid Layout - сетка по критериям
function generateGridLayout(nodes) {
  const questions = nodes.filter(n => n.type === 'question');
  const cols = 5;
  const startX = 500;
  const startY = 100;
  
  questions.forEach((q, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    q.x = startX + col * 1000;
    q.y = startY + row * 500;
    
    // Размещаем дочерние узлы
    if (q.children && q.children.length > 0) {
      const childY = q.y + 200;
      const childSpacing = 600;
      const totalWidth = (q.children.length - 1) * childSpacing;
      const childStartX = q.x - totalWidth / 2;
      
      q.children.forEach((childId, j) => {
        const child = nodes.find(n => n.id === childId);
        if (child) {
          child.x = childStartX + j * childSpacing;
          child.y = childY;
        }
      });
    }
  });
  
  return nodes;
}

// Tree Layout - иерархическое дерево
function generateTreeLayout(nodes) {
  const questions = nodes.filter(n => n.type === 'question');
  const levels = Math.ceil(questions.length / 4);
  
  questions.forEach((q, i) => {
    const level = Math.floor(i / 4);
    const posInLevel = i % 4;
    
    q.x = 500 + posInLevel * 2500;
    q.y = 100 + level * 600;
    
    // Дочерние узлы
    if (q.children && q.children.length > 0) {
      const childY = q.y + 250;
      const childSpacing = 700;
      const totalWidth = (q.children.length - 1) * childSpacing;
      const childStartX = q.x - totalWidth / 2;
      
      q.children.forEach((childId, j) => {
        const child = nodes.find(n => n.id === childId);
        if (child) {
          child.x = childStartX + j * childSpacing;
          child.y = childY;
        }
      });
    }
  });
  
  return nodes;
}

// Circular Layout - круговая раскладка
function generateCircularLayout(nodes) {
  const questions = nodes.filter(n => n.type === 'question');
  const centerX = 3000;
  const centerY = 2000;
  const radius = 1500;
  
  questions.forEach((q, i) => {
    const angle = (i / questions.length) * 2 * Math.PI;
    q.x = centerX + Math.cos(angle) * radius;
    q.y = centerY + Math.sin(angle) * radius;
    
    // Дочерние узлы по кругу вокруг вопроса
    if (q.children && q.children.length > 0) {
      const childRadius = 400;
      q.children.forEach((childId, j) => {
        const child = nodes.find(n => n.id === childId);
        if (child) {
          const childAngle = (j / q.children.length) * 2 * Math.PI;
          child.x = q.x + Math.cos(childAngle) * childRadius;
          child.y = q.y + Math.sin(childAngle) * childRadius;
        }
      });
    }
  });
  
  return nodes;
}

// Force-Directed Layout - физическая симуляция
function generateForceLayout(nodes) {
  const questions = nodes.filter(n => n.type === 'question');
  const iterations = 100;
  const repulsion = 50000;
  const attraction = 0.01;
  const damping = 0.9;
  
  // Инициализация случайных позиций
  nodes.forEach(n => {
    n.x = Math.random() * 8000 + 1000;
    n.y = Math.random() * 5000 + 500;
    n.vx = 0;
    n.vy = 0;
  });
  
  // Симуляция
  for (let iter = 0; iter < iterations; iter++) {
    // Отталкивание между всеми узлами
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[j].x - nodes[i].x;
        const dy = nodes[j].y - nodes[i].y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        const force = repulsion / (dist * dist);
        
        nodes[i].vx -= (dx / dist) * force;
        nodes[i].vy -= (dy / dist) * force;
        nodes[j].vx += (dx / dist) * force;
        nodes[j].vy += (dy / dist) * force;
      }
    }
    
    // Притяжение между связанными узлами
    questions.forEach(q => {
      if (q.children) {
        q.children.forEach(childId => {
          const child = nodes.find(n => n.id === childId);
          if (child) {
            const dx = child.x - q.x;
            const dy = child.y - q.y;
            const force = attraction;
            
            q.vx += dx * force;
            q.vy += dy * force;
            child.vx -= dx * force;
            child.vy -= dy * force;
          }
        });
      }
    });
    
    // Обновление позиций
    nodes.forEach(n => {
      n.vx *= damping;
      n.vy *= damping;
      n.x += n.vx;
      n.y += n.vy;
      
      // Границы
      n.x = Math.max(200, Math.min(11000, n.x));
      n.y = Math.max(200, Math.min(7500, n.y));
    });
  }
  
  // Очистка временных полей
  nodes.forEach(n => {
    delete n.vx;
    delete n.vy;
    n.x = Math.round(n.x);
    n.y = Math.round(n.y);
  });
  
  return nodes;
}

// Генерация вариантов
function generateVariants() {
  const inputPath = path.join(__dirname, 'nodes.json');
  const data = JSON.parse(fs.readFileSync(inputPath, 'utf8'));
  
  Object.keys(LAYOUTS).forEach(layoutName => {
    const nodes = Object.values(data.nodes);
    const layoutFunc = LAYOUTS[layoutName];
    const layoutedNodes = layoutFunc(nodes);
    
    // Преобразуем обратно в объект
    const nodesObj = {};
    layoutedNodes.forEach(n => {
      nodesObj[n.id] = n;
    });
    
    const output = {
      nodes: nodesObj,
      compatibility: data.compatibility
    };
    
    const outputPath = path.join(__dirname, `nodes_${layoutName}.json`);
    fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));
    console.log(`✅ Создан вариант: ${layoutName} -> nodes_${layoutName}.json`);
  });
  
  console.log('\n🎉 Все варианты сгенерированы!');
}

// Запуск
if (require.main === module) {
  generateVariants();
}

module.exports = { LAYOUTS, generateVariants };
