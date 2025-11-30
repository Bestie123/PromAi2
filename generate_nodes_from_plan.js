#!/usr/bin/env node
/**
 * Генератор nodes_data.json из development_plan.json
 */

const fs = require('fs');
const path = require('path');

const planPath = path.join(__dirname, 'development_plan.json');
const nodesPath = path.join(__dirname, 'architecture_samples', 'nodes_data.json');

console.log('🔄 Читаю development_plan.json...');
const plan = JSON.parse(fs.readFileSync(planPath, 'utf8'));

const nodes = [];
const allCriteria = [
  ...plan.levels[0].tracks.critical.criteria,
  ...plan.levels[0].tracks.parallel.criteria
];

allCriteria.forEach(criterion => {
  const id = criterion.id;
  const mapping = plan.nodeMapping[id];
  
  // Узел вопроса
  nodes.push({
    id: mapping.question,
    type: 'question',
    title: `❓ ${criterion.question}`,
    description: criterion.title,
    details: `Варианты: ${criterion.solution.name} | ${criterion.alternatives.map(a => a.name).join(' | ')}`,
    children: [mapping.selected, ...mapping.alternatives],
    criteriaId: id
  });
  
  // Узел выбранного решения
  const emoji = criterion.solution.name.includes('v4') ? '🎲' : criterion.solution.name.includes('Markdown') ? '📝' : '✅';
  nodes.push({
    id: mapping.selected,
    type: criterion.priority === 'critical' ? 'critical' : 'important',
    title: `${emoji} ${criterion.solution.name}`,
    description: criterion.solution.description,
    details: `➕ ${criterion.solution.pros.join(', ')} ➖ ${criterion.solution.cons.join(', ')}${criterion.week ? ` | Week ${criterion.week}` : ''}${criterion.requires.length ? ` | Требует: ${criterion.requires.join(', ')}` : ''}`,
    children: [],
    criteriaId: id,
    week: criterion.week,
    dependencies: criterion.requires,
    blocks: criterion.blocks
  });
  
  // Узлы альтернатив
  criterion.alternatives.forEach((alt, idx) => {
    const altId = mapping.alternatives[idx];
    const altEmoji = alt.type === 'rejected' ? '❌' : alt.name.includes('SQLite') ? '⚡' : alt.name.includes('v7') ? '⏰' : alt.name.includes('Библиотека') ? '📦' : alt.name.includes('WYSIWYG') ? '✏️' : alt.name.includes('алиасу') ? '🏷️' : '🔄';
    
    nodes.push({
      id: altId,
      type: alt.type === 'rejected' ? 'rejected' : alt.type === 'alternative' ? 'important' : 'flexible',
      title: `${altEmoji} ${alt.name}`,
      description: alt.description,
      details: `➕ ${alt.pros.join(', ')} ➖ ${alt.cons.join(', ')}`,
      children: [],
      criteriaId: id
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
