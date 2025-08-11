#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Color codes for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m',
};

// Logger utility
const log = {
  info: (msg) => console.log(`${colors.blue}ℹ${colors.reset} ${msg}`),
  success: (msg) => console.log(`${colors.green}✓${colors.reset} ${msg}`),
  warning: (msg) => console.log(`${colors.yellow}⚠${colors.reset} ${msg}`),
  error: (msg) => console.log(`${colors.red}✗${colors.reset} ${msg}`),
  section: (msg) => console.log(`\n${colors.bright}${msg}${colors.reset}`),
};

// Check build size
function checkBuildSize() {
  log.section('Checking build size...');
  
  try {
    const buildDir = path.join(process.cwd(), '.next');
    
    if (!fs.existsSync(buildDir)) {
      log.warning('Build directory not found. Run npm run build first.');
      return;
    }
    
    const getDirectorySize = (dir) => {
      let size = 0;
      const files = fs.readdirSync(dir);
      
      files.forEach(file => {
        const filePath = path.join(dir, file);
        const stats = fs.statSync(filePath);
        
        if (stats.isDirectory()) {
          size += getDirectorySize(filePath);
        } else {
          size += stats.size;
        }
      });
      
      return size;
    };
    
    const formatSize = (bytes) => {
      const units = ['B', 'KB', 'MB', 'GB'];
      let size = bytes;
      let unitIndex = 0;
      
      while (size >= 1024 && unitIndex < units.length - 1) {
        size /= 1024;
        unitIndex++;
      }
      
      return `${size.toFixed(2)} ${units[unitIndex]}`;
    };
    
    const totalSize = getDirectorySize(buildDir);
    const staticDir = path.join(buildDir, 'static');
    const staticSize = fs.existsSync(staticDir) ? getDirectorySize(staticDir) : 0;
    
    log.info(`Total build size: ${formatSize(totalSize)}`);
    log.info(`Static assets size: ${formatSize(staticSize)}`);
    
    // Check against limits
    const limitMB = 50; // 50MB limit
    const limitBytes = limitMB * 1024 * 1024;
    
    if (totalSize > limitBytes) {
      log.warning(`Build size exceeds ${limitMB}MB limit!`);
      return false;
    } else {
      log.success(`Build size is within limits`);
      return true;
    }
  } catch (error) {
    log.error(`Error checking build size: ${error.message}`);
    return false;
  }
}

// Generate build metadata
function generateBuildMetadata() {
  log.section('Generating build metadata...');
  
  try {
    const metadata = {
      buildId: process.env.BUILD_ID || `build-${Date.now()}`,
      buildTime: new Date().toISOString(),
      nodeVersion: process.version,
      npmVersion: execSync('npm --version').toString().trim(),
    };
    
    // Try to get git info
    try {
      metadata.gitCommit = execSync('git rev-parse HEAD').toString().trim();
      metadata.gitBranch = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
      metadata.gitTag = execSync('git describe --tags --abbrev=0 2>/dev/null || echo ""').toString().trim();
    } catch {
      log.warning('Git information not available');
    }
    
    const metadataPath = path.join(process.cwd(), '.next', 'build-metadata.json');
    fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));
    
    log.success(`Build metadata generated: ${metadataPath}`);
    
    // Also create a public version for client-side access
    const publicMetadata = {
      buildId: metadata.buildId,
      buildTime: metadata.buildTime,
      gitCommit: metadata.gitCommit?.substring(0, 8),
    };
    
    const publicPath = path.join(process.cwd(), 'public', 'build-info.json');
    fs.writeFileSync(publicPath, JSON.stringify(publicMetadata, null, 2));
    
    return metadata;
  } catch (error) {
    log.error(`Error generating build metadata: ${error.message}`);
    return null;
  }
}

// Clean build artifacts
function cleanBuildArtifacts() {
  log.section('Cleaning build artifacts...');
  
  const dirsToClean = [
    '.next',
    'out',
    '.next/cache',
    'node_modules/.cache',
  ];
  
  dirsToClean.forEach(dir => {
    const fullPath = path.join(process.cwd(), dir);
    if (fs.existsSync(fullPath)) {
      try {
        fs.rmSync(fullPath, { recursive: true, force: true });
        log.success(`Cleaned: ${dir}`);
      } catch (error) {
        log.error(`Failed to clean ${dir}: ${error.message}`);
      }
    }
  });
}

// Optimize images
function optimizeImages() {
  log.section('Optimizing images...');
  
  const publicDir = path.join(process.cwd(), 'public');
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.svg'];
  let imageCount = 0;
  
  const processDirectory = (dir) => {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stats = fs.statSync(filePath);
      
      if (stats.isDirectory()) {
        processDirectory(filePath);
      } else {
        const ext = path.extname(file).toLowerCase();
        if (imageExtensions.includes(ext)) {
          imageCount++;
          // Here you could add actual image optimization logic
          // For example, using sharp or imagemin
        }
      }
    });
  };
  
  if (fs.existsSync(publicDir)) {
    processDirectory(publicDir);
    log.success(`Found ${imageCount} images for optimization`);
  }
}

// Main execution
function main() {
  const args = process.argv.slice(2);
  const command = args[0];
  
  console.log(`${colors.bright}Radix UI Lab - Build Utilities${colors.reset}\n`);
  
  switch (command) {
    case 'check-size':
      checkBuildSize();
      break;
    case 'metadata':
      generateBuildMetadata();
      break;
    case 'clean':
      cleanBuildArtifacts();
      break;
    case 'optimize-images':
      optimizeImages();
      break;
    case 'all':
      cleanBuildArtifacts();
      generateBuildMetadata();
      checkBuildSize();
      optimizeImages();
      break;
    default:
      console.log('Usage: node build-utils.js [command]');
      console.log('Commands:');
      console.log('  check-size      - Check build size');
      console.log('  metadata        - Generate build metadata');
      console.log('  clean           - Clean build artifacts');
      console.log('  optimize-images - Optimize images');
      console.log('  all             - Run all utilities');
  }
}

if (require.main === module) {
  main();
}

module.exports = {
  checkBuildSize,
  generateBuildMetadata,
  cleanBuildArtifacts,
  optimizeImages,
};