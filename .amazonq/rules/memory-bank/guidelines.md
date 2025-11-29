# Development Guidelines

## Code Quality Standards

### File Structure and Organization
**Pattern frequency: 5/5 files**

1. **Shebang for executables**: Scripts start with `#!/usr/bin/env node` or `#!/usr/bin/env python3`
   ```javascript
   #!/usr/bin/env node
   ```

2. **File-level documentation**: Every file starts with JSDoc-style comment explaining purpose
   ```javascript
   /**
    * Dependency Validation Script for PromAi PKM Architecture
    * Validates development order and dependency constraints
    */
   ```

3. **Module exports**: Files export main functionality for reusability
   ```javascript
   if (require.main === module) {
     // CLI execution
   }
   module.exports = ClassName;
   ```

### Naming Conventions
**Pattern frequency: 5/5 files**

1. **Class names**: PascalCase for classes
   ```javascript
   class DependencyValidator { }
   ```

2. **Function names**: camelCase for functions and methods
   ```javascript
   function validateArchitecture() { }
   function generateLayout(nodes) { }
   ```

3. **Constants**: SCREAMING_SNAKE_CASE for configuration constants
   ```javascript
   const LAYOUT = {
     HORIZONTAL_SPACING: 1000,
     VERTICAL_SPACING: 500
   };
   ```

4. **File names**: snake_case for script files
   - `validate_dependencies.js`
   - `generate_registry.js`
   - `layout_generator.js`

### Code Formatting
**Pattern frequency: 5/5 files**

1. **Indentation**: 2 spaces (consistent across all files)

2. **String quotes**: Single quotes for strings
   ```javascript
   const nodesPath = path.join(__dirname, 'nodes.json');
   ```

3. **Semicolons**: Always used at statement ends

4. **Spacing**: Space after keywords, around operators
   ```javascript
   if (condition) {
     // code
   }
   ```

## Architectural Patterns

### Class-Based Architecture
**Pattern frequency: 2/5 files (validation scripts)**

1. **Constructor initialization**: Initialize state in constructor
   ```javascript
   constructor() {
     this.nodes = null;
     this.dependencies = null;
     this.errors = [];
     this.warnings = [];
   }
   ```

2. **Method organization**: Logical grouping of related methods
   - Data loading methods
   - Validation methods
   - Reporting methods
   - Utility methods

3. **Main execution method**: Single `run()` method orchestrates workflow
   ```javascript
   run() {
     if (!this.loadData()) return false;
     this.validatePhaseOrder();
     this.validateHardDependencies();
     this.validateCompatibility();
     this.generateReport();
     return this.errors.length === 0;
   }
   ```

### Functional Approach
**Pattern frequency: 3/5 files (generators and simple scripts)**

1. **Pure functions**: Functions without side effects
   ```javascript
   function generateLayout(nodes) {
     // Pure transformation
     return nodes;
   }
   ```

2. **Single responsibility**: Each function does one thing
   ```javascript
   function generateRegistry() {
     // Only generates registry
   }
   ```

## Error Handling Patterns

### Try-Catch with Logging
**Pattern frequency: 2/5 files**

```javascript
loadData() {
  try {
    const nodesPath = path.join(__dirname, 'nodes.json');
    this.nodes = JSON.parse(fs.readFileSync(nodesPath, 'utf8'));
    console.log('✅ Data loaded successfully');
    return true;
  } catch (error) {
    console.error('❌ Failed to load data:', error.message);
    return false;
  }
}
```

**Key principles**:
- Return boolean success/failure
- Log success with emoji indicators
- Log errors with descriptive messages
- Don't throw, return status

### Validation with Error Collection
**Pattern frequency: 2/5 files**

```javascript
validateCompatibility() {
  console.log('\n🔍 Validating compatibility rules...');
  
  impossible.forEach(([node1, node2]) => {
    if (selected.includes(node1) && selected.includes(node2)) {
      this.errors.push(`Impossible combination: ${node1} + ${node2}`);
    }
  });
}
```

**Key principles**:
- Collect all errors, don't fail fast
- Descriptive error messages
- Log validation step being performed
- Use emoji for visual clarity

## Data Processing Patterns

### JSON File Operations
**Pattern frequency: 5/5 files**

1. **Reading JSON files**:
   ```javascript
   const data = JSON.parse(fs.readFileSync('./nodes.json', 'utf8'));
   ```

2. **Path resolution**:
   ```javascript
   const nodesPath = path.join(__dirname, 'nodes.json');
   ```

3. **Synchronous file operations**: All file I/O is synchronous in scripts

### Data Transformation
**Pattern frequency: 4/5 files**

1. **Array filtering and mapping**:
   ```javascript
   const questions = nodes.filter(n => n.type === 'question');
   const answers = nodes.filter(n => n.type !== 'question');
   ```

2. **Object iteration**:
   ```javascript
   Object.values(nodes).forEach(node => {
     // Process each node
   });
   
   Object.entries(phases).forEach(([phaseName, phase]) => {
     // Process key-value pairs
   });
   ```

3. **Set usage for uniqueness**:
   ```javascript
   const criteriaIds = new Set();
   Object.values(nodes).forEach(node => {
     if (node.criteriaId) criteriaIds.add(node.criteriaId);
   });
   ```

## Console Output Patterns

### Structured Logging
**Pattern frequency: 5/5 files**

1. **Emoji indicators**: Visual status indicators
   - ✅ Success
   - ❌ Error
   - ⚠️ Warning
   - 🔍 Processing/Validation
   - 📊 Statistics
   - 📋 Report
   - 🚀 Start

2. **Section headers**: Clear visual separation
   ```javascript
   console.log('\n📋 VALIDATION REPORT');
   console.log('='.repeat(50));
   ```

3. **Indented output**: Hierarchical information
   ```javascript
   console.log(`  ${phaseName}: ${phase.criteria?.length || 0} criteria`);
   ```

4. **Summary statistics**: Always provide counts and totals
   ```javascript
   console.log(`📊 Summary: ${this.errors.length} errors, ${this.warnings.length} warnings`);
   ```

## Module Patterns

### CommonJS Module Pattern
**Pattern frequency: 5/5 files**

```javascript
// At top of file
const fs = require('fs');
const path = require('path');

// At bottom of file
if (require.main === module) {
  // CLI execution code
  const validator = new DependencyValidator();
  const success = validator.run();
  process.exit(success ? 0 : 1);
}

module.exports = DependencyValidator;
```

**Key principles**:
- Require dependencies at top
- Check if run directly vs imported
- Export for reusability
- Exit with proper status code

## Validation Patterns

### Multi-Stage Validation
**Pattern frequency: 2/5 files**

```javascript
run() {
  if (!this.loadData()) return false;
  
  this.validatePhaseOrder();
  this.validateHardDependencies();
  this.validateCompatibility();
  this.validateBlockingDependencies();
  this.generateReport();
  
  return this.errors.length === 0;
}
```

**Key principles**:
- Early return on critical failures
- Multiple independent validation stages
- Collect all issues before reporting
- Final report summarizes all findings

### Reference Validation
**Pattern frequency: 2/5 files**

```javascript
const brokenRefs = [];
Object.values(nodes).forEach(node => {
  if (node.children) {
    node.children.forEach(childId => {
      if (!nodes[childId]) {
        brokenRefs.push(`${node.id} -> ${childId}`);
      }
    });
  }
});
```

**Key principles**:
- Check all references exist
- Collect broken references
- Report all issues together

## Configuration Patterns

### Configuration Objects
**Pattern frequency: 2/5 files**

```javascript
const LAYOUT = {
  HORIZONTAL_SPACING: 1000,
  VERTICAL_SPACING: 500,
  QUESTION_Y: 100,
  ANSWER_Y: 300
};
```

**Key principles**:
- Constants in SCREAMING_SNAKE_CASE
- Group related configuration
- Numeric values for easy tuning

### Server Configuration
**Pattern frequency: 1/5 files (Python)**

```python
PORT = 8000

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        super().end_headers()
```

**Key principles**:
- CORS headers for development
- Clear startup messages
- Graceful shutdown handling

## Code Organization Best Practices

### Method Ordering
**Pattern frequency: 2/5 files**

1. Constructor
2. Data loading methods
3. Validation methods (specific to general)
4. Utility/helper methods
5. Report generation
6. Main execution method

### Separation of Concerns
**Pattern frequency: 5/5 files**

- **Data loading**: Separate from validation
- **Validation logic**: Separate from reporting
- **Transformation**: Separate from I/O
- **CLI execution**: Separate from module exports

## Documentation Standards

### Inline Comments
**Pattern frequency: 4/5 files**

1. **Section comments**: Mark major sections
   ```javascript
   // 1. Check all 29 criteria present
   // 2. Check broken references
   // 3. Check missing criteria
   ```

2. **Explanatory comments**: Explain non-obvious logic
   ```javascript
   // Check if dependency makes sense in phase order
   ```

3. **Minimal comments**: Code should be self-documenting

### Console Documentation
**Pattern frequency: 5/5 files**

- Use console output as live documentation
- Show what's being validated
- Display progress and results
- Provide actionable error messages

## Testing Patterns

### Validation as Testing
**Pattern frequency: 2/5 files**

```javascript
console.log(`✓ Criteria found: ${criteriaIds.size}/29`);
console.log(`✓ Questions: ${questions.length}`);
console.log(`✓ Total nodes: ${Object.keys(nodes).length}`);
```

**Key principles**:
- Validate expected counts
- Check data integrity
- Report all findings
- Use checkmarks for passed validations

## Anti-Patterns to Avoid

Based on the codebase analysis:

1. **No global mutable state**: All state in class instances or function parameters
2. **No magic numbers**: Use named constants
3. **No silent failures**: Always log errors
4. **No nested callbacks**: Use synchronous operations or async/await
5. **No long functions**: Keep functions focused and short

## Project-Specific Conventions

### Node/Criteria Naming
- Questions: `q{criteriaId}` (e.g., `q1`, `q2`)
- Nodes: Descriptive IDs based on content
- Criteria IDs: Numbers 1-29

### File Naming
- Scripts: `{action}_{subject}.js` (e.g., `validate_dependencies.js`)
- Data: `{name}.json` (e.g., `nodes.json`)
- HTML: `{name}_{variant}.html` (e.g., `architecture_full_complete.html`)

### Exit Codes
- `0`: Success
- `1`: Failure/errors found

## Performance Considerations

### Synchronous Operations
**Pattern frequency: 5/5 files**

- All scripts use synchronous file operations
- Acceptable for build/validation scripts
- Keeps code simple and linear

### Efficient Data Structures
**Pattern frequency: 4/5 files**

- Use `Set` for uniqueness checks
- Use `Map` or objects for lookups
- Filter/map for transformations

## Summary of Key Patterns

1. **Class-based validation scripts** with error collection
2. **Functional transformation scripts** for data processing
3. **Emoji-rich console output** for visual clarity
4. **Try-catch with boolean returns** for error handling
5. **CommonJS modules** with CLI/import duality
6. **Synchronous file operations** for simplicity
7. **Multi-stage validation** with comprehensive reporting
8. **Self-documenting code** with minimal comments
9. **Configuration constants** for easy tuning
10. **Exit codes** for script success/failure
