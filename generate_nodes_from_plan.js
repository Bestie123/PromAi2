#!/usr/bin/env node
/**
 * Генератор nodes_data.json из development_plan.json
 * Создает структуру для интерактивных диаграмм
 */

const fs = require('fs');
const path = require('path');

const planPath = path.join(__dirname, 'development_plan.json');
const nodesPath = path.join(__dirname, 'architecture_samples', 'nodes_data.json');

console.log('🔄 Читаю development_plan.json...');
const plan = JSON.parse(fs.readFileSync(planPath, 'utf8'));

const nodes = [];

// Генерируем узлы для каждого критерия
const allCriteria = [
  ...plan.levels[0].tracks.critical.criteria,
  ...plan.levels[0].tracks.parallel.criteria
];

allCriteria.forEach(criterion => {
  const criteriaId = criterion.id;
  
  // Узел вопроса
  nodes.push({
    id: `q${criteriaId}`,
    type: 'question',
    title: `❓ ${criterion.question}`,
    description: criterion.title,
    details: `Варианты: ${criterion.solution.name} | ${criterion.alternatives.map(a => a.name).join(' | ')}`,
    children: [
      `${criterion.solution.name.toLowerCase().replace(/\s+/g, '-')}`,
      ...criterion.alternatives.map(a => a.name.toLowerCase().replace(/[⚡📦✏️🏷️🔄⚙️⏳🔷📝🔍]/g, '').trim().replace(/\s+/g, '-'))
    ],
    criteriaId
  });
  
  // Узел выбранного решения
  const solutionId = criterion.solution.name.toLowerCase().replace(/\s+/g, '-');
  nodes.push({
    id: solutionId,
    type: criterion.priority === 'critical' ? 'critical' : 'important',
    title: `✅ ${criterion.solution.name}`,
    description: criterion.solution.description,
    details: `➕ ${criterion.solution.pros.join(', ')} ➖ ${criterion.solution.cons.join(', ')}${criterion.week ? ` | Week ${criterion.week}` : ''}${criterion.requires.length ? ` | Требует: ${criterion.requires.join(', ')}` : ''}${criterion.blocks.length ? ` | Блокирует: ${criterion.blocks.join(', ')}` : ''}`,
    children: [],
    criteriaId,
    week: criterion.week,
    dependencies: criterion.requires,
    blocks: criterion.blocks
  });
  
  // Узлы альтернатив
  criterion.alternatives.forEach(alt => {
    const altId = alt.name.toLowerCase().replace(/[⚡📦✏️🏷️🔄⚙️⏳🔷📝🔍❌]/g, '').trim().replace(/\s+/g, '-');
    nodes.push({
      id: altId,
      type: alt.type === 'rejected' ? 'rejected' : 'important',
      title: `${alt.type === 'rejected' ? '❌' : '🔄'} ${alt.name}`,
      description: alt.description,
      details: `➕ ${alt.pros.join(', ')} ➖ ${alt.cons.join(', ')}`,
      children: [],
      criteriaId
    });
  });
});

const nodesData = {
  nodes,
  compatibility: plan.compatibility
};

console.log('✅ Сгенерировано узлов:', nodes.length);
console.log('💾 Сохраняю в nodes_data.json...');

fs.writeFileSync(nodesPath, JSON.stringify(nodesData, null, 2), 'utf8');

console.log('✅ Готово! Файл сохранен:', nodesPath);
console.log('📊 Размер:', fs.statSync(nodesPath).size, 'байт');
