#!/usr/bin/env node

/**
 * Automated Quality Checks for Radix UI Lab
 * Run this script to validate code quality before commits
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

// Quality check results
const results = {
  passed: [],
  warnings: [],
  failed: [],
};

// Helper functions
function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

function runCommand(command, description) {
  try {
    log(`\n🔍 ${description}...`, colors.cyan);
    const output = execSync(command, { encoding: 'utf-8', stdio: 'pipe' });
    results.passed.push(description);
    log(`✅ ${description} passed`, colors.green);
    return { success: true, output };
  } catch (error) {
    results.failed.push(description);
    log(`❌ ${description} failed`, colors.red);
    if (error.stdout) {
      console.log(error.stdout.toString());
    }
    if (error.stderr) {
      console.error(error.stderr.toString());
    }
    return { success: false, error };
  }
}

function checkFileExists(filePath, description) {
  const fullPath = path.join(process.cwd(), filePath);
  if (fs.existsSync(fullPath)) {
    results.passed.push(description);
    log(`✅ ${description}`, colors.green);
    return true;
  } else {
    results.warnings.push(`${description} - File not found: ${filePath}`);
    log(`⚠️  ${description} - File not found: ${filePath}`, colors.yellow);
    return false;
  }
}

function analyzeAccessibility() {
  log('\n🔍 Analyzing Accessibility...', colors.cyan);
  
  const componentsDir = path.join(process.cwd(), 'components/ui/primitives');
  const files = fs.readdirSync(componentsDir).filter(f => f.endsWith('.tsx'));
  
  let accessibilityIssues = [];
  
  files.forEach(file => {
    const content = fs.readFileSync(path.join(componentsDir, file), 'utf-8');
    
    // Check for common accessibility patterns
    if (file.includes('button') && !content.includes('aria-label') && !content.includes('aria-labelledby')) {
      accessibilityIssues.push(`${file}: Missing aria-label for icon buttons`);
    }
    
    if (file.includes('input') && !content.includes('aria-describedby') && !content.includes('aria-invalid')) {
      accessibilityIssues.push(`${file}: Missing aria-describedby for error states`);
    }
    
    if (file.includes('dialog') && !content.includes('aria-modal')) {
      accessibilityIssues.push(`${file}: Missing aria-modal attribute`);
    }
    
    if (content.includes('onClick') && !content.includes('onKeyDown') && !content.includes('onKeyPress')) {
      accessibilityIssues.push(`${file}: Click handlers without keyboard support`);
    }
  });
  
  if (accessibilityIssues.length === 0) {
    results.passed.push('Accessibility checks');
    log('✅ Basic accessibility checks passed', colors.green);
  } else {
    results.warnings.push(...accessibilityIssues);
    log(`⚠️  Found ${accessibilityIssues.length} accessibility issues:`, colors.yellow);
    accessibilityIssues.forEach(issue => log(`   - ${issue}`, colors.yellow));
  }
}

function checkTestCoverage() {
  log('\n🔍 Checking Test Coverage...', colors.cyan);
  
  const testFiles = [];
  const componentsDir = path.join(process.cwd(), 'components');
  
  function findTests(dir) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        findTests(fullPath);
      } else if (file.includes('.test.') || file.includes('.spec.')) {
        testFiles.push(fullPath);
      }
    });
  }
  
  if (fs.existsSync(componentsDir)) {
    findTests(componentsDir);
  }
  
  if (testFiles.length === 0) {
    results.failed.push('No test files found');
    log('❌ No test files found - 0% coverage', colors.red);
  } else {
    results.passed.push(`Found ${testFiles.length} test files`);
    log(`✅ Found ${testFiles.length} test files`, colors.green);
  }
}

function analyzeBundleSize() {
  log('\n🔍 Analyzing Bundle Size...', colors.cyan);
  
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf-8'));
  const dependencies = Object.keys(packageJson.dependencies || {});
  
  const heavyDeps = dependencies.filter(dep => {
    const knownHeavy = ['@emotion/react', '@emotion/styled', 'date-fns'];
    return knownHeavy.includes(dep);
  });
  
  if (heavyDeps.length > 0) {
    results.warnings.push(`Heavy dependencies detected: ${heavyDeps.join(', ')}`);
    log(`⚠️  Heavy dependencies detected: ${heavyDeps.join(', ')}`, colors.yellow);
    log('   Consider using lighter alternatives or lazy loading', colors.yellow);
  } else {
    results.passed.push('No heavy dependencies detected');
    log('✅ No heavy dependencies detected', colors.green);
  }
}

// Main execution
async function runQualityChecks() {
  log('\n' + '='.repeat(60), colors.magenta);
  log('🚀 RADIX UI LAB - QUALITY VALIDATION', colors.magenta);
  log('='.repeat(60) + '\n', colors.magenta);
  
  // 1. TypeScript compilation check
  runCommand('npx tsc --noEmit', 'TypeScript compilation');
  
  // 2. ESLint check
  runCommand('npm run lint', 'ESLint validation');
  
  // 3. Check for required files
  checkFileExists('tsconfig.json', 'TypeScript configuration');
  checkFileExists('package.json', 'Package configuration');
  checkFileExists('README.md', 'README documentation');
  
  // 4. Accessibility analysis
  analyzeAccessibility();
  
  // 5. Test coverage check
  checkTestCoverage();
  
  // 6. Bundle size analysis
  analyzeBundleSize();
  
  // 7. Build check
  // Commented out as it takes time - uncomment for full validation
  // runCommand('npm run build', 'Production build');
  
  // Summary
  log('\n' + '='.repeat(60), colors.magenta);
  log('📊 QUALITY CHECK SUMMARY', colors.magenta);
  log('='.repeat(60), colors.magenta);
  
  log(`\n✅ Passed: ${results.passed.length}`, colors.green);
  results.passed.forEach(item => log(`   - ${item}`, colors.green));
  
  if (results.warnings.length > 0) {
    log(`\n⚠️  Warnings: ${results.warnings.length}`, colors.yellow);
    results.warnings.forEach(item => log(`   - ${item}`, colors.yellow));
  }
  
  if (results.failed.length > 0) {
    log(`\n❌ Failed: ${results.failed.length}`, colors.red);
    results.failed.forEach(item => log(`   - ${item}`, colors.red));
  }
  
  // Overall status
  const totalIssues = results.warnings.length + results.failed.length;
  const score = Math.max(0, 10 - totalIssues * 0.5);
  
  log('\n' + '='.repeat(60), colors.magenta);
  if (results.failed.length === 0) {
    log(`🎉 Quality Score: ${score.toFixed(1)}/10`, colors.green);
    log('All critical checks passed!', colors.green);
  } else {
    log(`⚠️  Quality Score: ${score.toFixed(1)}/10`, colors.yellow);
    log('Critical issues found. Please fix before committing.', colors.red);
    process.exit(1);
  }
}

// Run the checks
runQualityChecks().catch(error => {
  log('Fatal error during quality checks:', colors.red);
  console.error(error);
  process.exit(1);
});