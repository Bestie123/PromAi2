// Проверка зависимостей
fetch('./nodes_variant1.json')
  .then(response => response.json())
  .then(data => {
    const nodes = Object.values(data.nodes);
    const nodeIds = nodes.map(n => n.id);
    const dependencies = data.dependencies;
    
    console.log('Всего узлов:', nodes.length);
    console.log('ID узлов:', nodeIds);
    
    // Проверяем blocking зависимости
    console.log('\n=== BLOCKING DEPENDENCIES ===');
    dependencies.blocking.forEach(dep => {
      const fromExists = nodeIds.includes(dep.from);
      const toExists = nodeIds.includes(dep.to);
      console.log(`${dep.from} -> ${dep.to}: from=${fromExists}, to=${toExists}`);
      if (!fromExists) console.error(`MISSING FROM: ${dep.from}`);
      if (!toExists) console.error(`MISSING TO: ${dep.to}`);
    });
    
    // Проверяем hard зависимости
    console.log('\n=== HARD DEPENDENCIES ===');
    dependencies.hard.forEach(dep => {
      const fromExists = nodeIds.includes(dep.from);
      const toExists = nodeIds.includes(dep.to);
      console.log(`${dep.from} -> ${dep.to}: from=${fromExists}, to=${toExists}`);
      if (!fromExists) console.error(`MISSING FROM: ${dep.from}`);
      if (!toExists) console.error(`MISSING TO: ${dep.to}`);
    });
    
    // Проверяем soft зависимости
    console.log('\n=== SOFT DEPENDENCIES ===');
    dependencies.soft.forEach(dep => {
      const fromExists = nodeIds.includes(dep.from);
      const toExists = nodeIds.includes(dep.to);
      console.log(`${dep.from} -> ${dep.to}: from=${fromExists}, to=${toExists}`);
      if (!fromExists) console.error(`MISSING FROM: ${dep.from}`);
      if (!toExists) console.error(`MISSING TO: ${dep.to}`);
    });
  });