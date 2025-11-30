#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const nodesPath = path.join(__dirname, 'architecture_samples', 'nodes_data.json');
const mdPath = path.join(__dirname, 'DEVELOPMENT_PLAN.md');
const jsonPath = path.join(__dirname, 'development_plan.json');

console.log('🔄 Читаю nodes_data.json и DEVELOPMENT_PLAN.md...');

const nodesData = JSON.parse(fs.readFileSync(nodesPath, 'utf8'));
const mdContent = fs.readFileSync(mdPath, 'utf8');

// Парсим детали из строки
function parseDetails(details) {
  const result = { pros: [], cons: [], week: null };
  
  // Разделяем по ➕ и ➖
  const plusParts = details.split('➕').filter(s => s.trim());
  const minusParts = details.split('➖').filter(s => s.trim());
  
  plusParts.forEach(part => {
    const cleaned = part.split('➖')[0].split('|')[0].trim();
    if (cleaned && !cleaned.startsWith('Week') && !cleaned.startsWith('Требует') && !cleaned.startsWith('Блокирует')) {
      result.pros.push(cleaned);
    }
  });
  
  minusParts.forEach(part => {
    const cleaned = part.split('➕')[0].split('|')[0].trim();
    if (cleaned && !cleaned.startsWith('Week') && !cleaned.startsWith('Требует') && !cleaned.startsWith('Блокирует')) {
      result.cons.push(cleaned);
    }
  });
  
  // Извлекаем week
  const weekMatch = details.match(/Week\s+(\d+)/);
  if (weekMatch) result.week = parseInt(weekMatch[1]);
  
  return result;
}

// Группируем узлы по criteriaId
const criteriaMap = {};
nodesData.nodes.forEach(node => {
  if (!criteriaMap[node.criteriaId]) {
    criteriaMap[node.criteriaId] = { question: null, options: [] };
  }
  
  if (node.type === 'question') {
    criteriaMap[node.criteriaId].question = node;
  } else {
    criteriaMap[node.criteriaId].options.push(node);
  }
});

// Создаем критерии для JSON
const criticalCriteria = [];
const parallelCriteria = [];

// Критический путь (Week 1-6)
const criticalIds = [1, 29, 2, 3, 4, 13, 16, 17, 14, 6, 21, 5, 26, 27, 28];
const parallelIds = [9, 11, 12, 20, 10, 15, 7, 8, 18, 19, 22, 23, 24, 25];

criticalIds.forEach(id => {
  const data = criteriaMap[id];
  if (!data || !data.question) return;
  
  const selected = data.options.find(o => o.type === 'critical');
  const alternatives = data.options.filter(o => o.type !== 'critical');
  
  if (!selected) return;
  
  const details = parseDetails(selected.details);
  
  criticalCriteria.push({
    id,
    title: data.question.description,
    question: data.question.title.replace('❓ ', ''),
    week: selected.week || null,
    time: extractTime(mdContent, id),
    priority: 'critical',
    requires: selected.dependencies || [],
    blocks: selected.blocks || [],
    solution: {
      type: 'selected',
      name: selected.title.replace(/[✅🎲📝⚡]/g, '').trim(),
      description: selected.description,
      pros: details.pros,
      cons: details.cons
    },
    alternatives: alternatives.map(alt => ({
      type: alt.type === 'rejected' ? 'rejected' : 'alternative',
      name: alt.title.replace(/[❌⏰📦✏️🏷️🔄⚙️⏳🔷📝🔍]/g, '').trim(),
      description: alt.description,
      pros: parseDetails(alt.details).pros,
      cons: parseDetails(alt.details).cons
    }))
  });
});

parallelIds.forEach(id => {
  const data = criteriaMap[id];
  if (!data || !data.question) return;
  
  const selected = data.options.find(o => o.type === 'critical');
  const alternatives = data.options.filter(o => o.type !== 'critical');
  
  if (!selected) return;
  
  const details = parseDetails(selected.details);
  
  parallelCriteria.push({
    id,
    title: data.question.description,
    question: data.question.title.replace('❓ ', ''),
    week: selected.week || null,
    time: extractTime(mdContent, id),
    priority: 'parallel',
    requires: selected.dependencies || [],
    blocks: selected.blocks || [],
    solution: {
      type: 'selected',
      name: selected.title.replace(/[✅🎲📝⚡]/g, '').trim(),
      description: selected.description,
      pros: details.pros,
      cons: details.cons
    },
    alternatives: alternatives.map(alt => ({
      type: alt.type === 'rejected' ? 'rejected' : 'alternative',
      name: alt.title.replace(/[❌⏰📦✏️🏷️🔄⚙️⏳🔷📝🔍]/g, '').trim(),
      description: alt.description,
      pros: parseDetails(alt.details).pros,
      cons: parseDetails(alt.details).cons
    }))
  });
});

function extractTime(md, id) {
  const regex = new RegExp(`№${id}\\..*?Время:\\s*([^\\n]+)`, 's');
  const match = md.match(regex);
  return match ? match[1].trim() : null;
}

// Извлекаем гибкие задачи из markdown
const flexibleTasks = extractFlexibleTasks(mdContent);

function extractFlexibleTasks(md) {
  const levels = [];
  const levelRegex = /## УРОВЕНЬ (\d+):(.*?)\n([\s\S]*?)(?=\n## |$)/g;
  let match;
  
  while ((match = levelRegex.exec(md)) !== null) {
    const levelId = parseInt(match[1]);
    const levelName = match[2].trim();
    const content = match[3];
    
    const tasks = [];
    const taskRegex = /\*\*(.*?)\*\*\n- Требует: (.*?)\n- Время: (.*?)\n/g;
    let taskMatch;
    
    while ((taskMatch = taskRegex.exec(content)) !== null) {
      tasks.push({
        title: taskMatch[1],
        requires: taskMatch[2].split(',').map(s => s.trim()).filter(s => s !== '-'),
        time: taskMatch[3],
        priority: 'flexible'
      });
    }
    
    if (tasks.length > 0) {
      levels.push({ id: levelId, name: levelName, tasks });
    }
  }
  
  return levels;
}

const plan = {
  version: '1.0.0',
  project: 'PromAi PKM',
  description: 'План разработки - Полный анализ всех уровней',
  generated: new Date().toISOString(),
  source: 'DEVELOPMENT_PLAN.md + nodes_data.json',
  summary: {
    totalDuration: '548-814 дней (18-27 месяцев)',
    mvp: {
      duration: '68-94 дня (10-13 недель)',
      criticalPath: '50-65 дней',
      parallelTasks: '18-29 дней'
    },
    level1: '90-120 дней (3-4 месяца)',
    level2: '120-180 дней (4-6 месяцев)',
    level3: '90-150 дней (3-5 месяцев)',
    level4: '180-270 дней (6-9 месяцев)'
  },
  legend: {
    critical: '🔴 Критический путь - блокирует другие задачи',
    parallel: '🟡 Параллельный - можно делать одновременно',
    flexible: '🟢 Гибкий - можно отложить без блокировки'
  },
  criticalPaths: [
    {
      id: 1,
      name: 'Архитектура → CRDT',
      duration: '35-50 дней',
      risk: 'МАКСИМАЛЬНЫЙ',
      description: 'Блокирует всё',
      path: '№1 → №29 → №2 → №3 → №4 → №13 → №16 → №17'
    },
    {
      id: 2,
      name: 'Ссылки → CRDT Refs',
      duration: '10-15 дней',
      risk: 'ВЫСОКИЙ',
      description: 'Блокирует knowledge graph',
      path: '№3 → №7 → №8 ↓ №18 ← №13'
    },
    {
      id: 3,
      name: 'UI → Производительность',
      duration: '12-16 дней',
      risk: 'ВЫСОКИЙ',
      description: 'Блокирует UX',
      path: '№11 → №21 → №5'
    },
    {
      id: 4,
      name: 'Плагины',
      duration: '17-24 дня',
      risk: 'ВЫСОКИЙ',
      description: 'Блокирует экосистему',
      path: '№1 → №2 → №26 → №27 ↓ №28'
    }
  ],
  levels: [
    {
      id: 0,
      name: 'Несущие стены проекта (MVP)',
      description: '29 критериев',
      duration: '68-94 дня (10-13 недель)',
      tracks: {
        critical: {
          name: 'Критический путь',
          duration: '50-65 дней',
          weeks: '1-6',
          criteria: criticalCriteria
        },
        parallel: {
          name: 'Параллельные задачи',
          duration: '18-29 дней',
          weeks: '1-4',
          criteria: parallelCriteria
        }
      }
    },
    ...flexibleTasks.map(level => ({
      id: level.id,
      name: level.name,
      tasks: level.tasks
    }))
  ],
  compatibility: nodesData.compatibility
};

console.log('✅ JSON структура создана');
console.log(`📊 Критических критериев: ${criticalCriteria.length}`);
console.log(`📊 Параллельных критериев: ${parallelCriteria.length}`);
console.log(`📊 Уровней с гибкими задачами: ${flexibleTasks.length}`);
console.log('💾 Сохраняю в development_plan.json...');

fs.writeFileSync(jsonPath, JSON.stringify(plan, null, 2), 'utf8');

console.log('✅ Готово! Файл сохранен:', jsonPath);
console.log('📊 Размер:', fs.statSync(jsonPath).size, 'байт');
