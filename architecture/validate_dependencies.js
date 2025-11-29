#!/usr/bin/env node

/**
 * Dependency Validation Script for PromAi PKM Architecture
 * Validates development order and dependency constraints
 */

const fs = require('fs');
const path = require('path');

class DependencyValidator {
  constructor() {
    this.nodes = null;
    this.dependencies = null;
    this.errors = [];
    this.warnings = [];
  }

  loadData() {
    try {
      const nodesPath = path.join(__dirname, 'nodes.json');
      const depsPath = path.join(__dirname, 'dependency_tracker.json');
      
      this.nodes = JSON.parse(fs.readFileSync(nodesPath, 'utf8'));
      this.dependencies = JSON.parse(fs.readFileSync(depsPath, 'utf8'));
      
      console.log('✅ Data loaded successfully');
      return true;
    } catch (error) {
      console.error('❌ Failed to load data:', error.message);
      return false;
    }
  }

  validatePhaseOrder() {
    console.log('\n🔍 Validating phase order...');
    
    const phases = this.dependencies.development_order;
    let totalWeeks = 0;
    
    Object.entries(phases).forEach(([phaseName, phase]) => {
      if (phase.estimated_weeks) {
        totalWeeks += phase.estimated_weeks;
      }
      
      // Check if all criteria have corresponding nodes
      const missingNodes = phase.criteria?.filter(criteriaId => {
        const questionNode = this.nodes.nodes[`q${criteriaId}`];
        if (!questionNode) return true;
        
        const selectedNode = questionNode.children?.find(childId => {
          const child = this.nodes.nodes[childId];
          return child && child.type === 'critical';
        });
        
        return !selectedNode;
      });
      
      if (missingNodes?.length > 0) {
        this.errors.push(`Phase ${phaseName}: Missing nodes for criteria ${missingNodes.join(', ')}`);
      }
      
      console.log(`  ${phaseName}: ${phase.criteria?.length || 0} criteria, ${phase.estimated_weeks || 0} weeks`);
    });
    
    console.log(`📊 Total estimated development: ${totalWeeks} weeks`);
  }

  validateHardDependencies() {
    console.log('\n🔍 Validating hard dependencies...');
    
    Object.entries(this.dependencies.hard_dependencies).forEach(([fromCriteria, dep]) => {
      const enables = dep.enables || [];
      
      enables.forEach(toCriteria => {
        // Check if dependency makes sense in phase order
        const fromPhase = this.findPhaseForCriteria(parseInt(fromCriteria));
        const toPhase = this.findPhaseForCriteria(toCriteria);
        
        if (fromPhase && toPhase && fromPhase.priority >= toPhase.priority) {
          this.warnings.push(`Dependency ${fromCriteria}→${toCriteria}: ${fromPhase.name} should come before ${toPhase.name}`);
        }
      });
    });
  }

  validateCompatibility() {
    console.log('\n🔍 Validating compatibility rules...');
    
    const selected = this.getSelectedNodes();
    const impossible = this.dependencies.compatibility_matrix.impossible || [];
    
    impossible.forEach(([node1, node2]) => {
      if (selected.includes(node1) && selected.includes(node2)) {
        this.errors.push(`Impossible combination: ${node1} + ${node2}`);
      }
    });
  }

  validateBlockingDependencies() {
    console.log('\n🔍 Validating blocking dependencies...');
    
    const blockers = this.dependencies.blocking_dependencies;
    const phase1Criteria = this.dependencies.development_order.phase1_foundation.criteria;
    
    // Check if all foundation blockers are in phase 1
    blockers.foundation_blockers?.forEach(criteria => {
      if (!phase1Criteria.includes(criteria)) {
        this.errors.push(`Foundation blocker ${criteria} not in phase 1`);
      }
    });
  }

  findPhaseForCriteria(criteriaId) {
    const phases = this.dependencies.development_order;
    
    for (const [phaseName, phase] of Object.entries(phases)) {
      if (phase.criteria?.includes(criteriaId)) {
        return { name: phaseName, priority: phase.priority };
      }
    }
    return null;
  }

  getSelectedNodes() {
    const selected = [];
    
    Object.values(this.nodes.nodes).forEach(node => {
      if (node.type === 'critical') {
        selected.push(node.id);
      }
    });
    
    return selected;
  }

  generateReport() {
    console.log('\n📋 VALIDATION REPORT');
    console.log('='.repeat(50));
    
    if (this.errors.length === 0 && this.warnings.length === 0) {
      console.log('✅ All validations passed!');
    } else {
      if (this.errors.length > 0) {
        console.log('\n❌ ERRORS:');
        this.errors.forEach(error => console.log(`  - ${error}`));
      }
      
      if (this.warnings.length > 0) {
        console.log('\n⚠️  WARNINGS:');
        this.warnings.forEach(warning => console.log(`  - ${warning}`));
      }
    }
    
    console.log(`\n📊 Summary: ${this.errors.length} errors, ${this.warnings.length} warnings`);
  }

  run() {
    console.log('🚀 Starting dependency validation...');
    
    if (!this.loadData()) {
      return false;
    }
    
    this.validatePhaseOrder();
    this.validateHardDependencies();
    this.validateCompatibility();
    this.validateBlockingDependencies();
    this.generateReport();
    
    return this.errors.length === 0;
  }
}

// Run validation if called directly
if (require.main === module) {
  const validator = new DependencyValidator();
  const success = validator.run();
  process.exit(success ? 0 : 1);
}

module.exports = DependencyValidator;