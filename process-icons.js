#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function toPascalCase(str) {
  return str
    .replace(/[^a-zA-Z0-9]+/g, ' ')
    .split(' ')
    .filter(Boolean)
    .map(s => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase())
    .join('');
}

function getFolderPrefix(folderPath) {
  const folderName = path.basename(folderPath);
  const prefixMap = {
    'airbnb-icons-neon': 'Neon',
    'airbnb-icons-neon-dark': 'NeonDark',
    'airbnb-icons-outline': 'Outline',
    'airbnb-icons-outline-dark': 'OutlineDark',
    'airbnb-icons-two-tone': 'TwoTone',
    'airbnb-icons-two-tone-dark': 'TwoToneDark',
    'icons-general': 'General',
    'icons-interface': 'Interface',
    'icons-social': 'Social'
  };
  // Sempre PascalCase e nunca incluir 'Icons' no prefixo
  let prefix = prefixMap[folderName] || toPascalCase(folderName);
  if (prefix.startsWith('Icons')) {
    prefix = prefix.replace(/^Icons/, '');
  }
  return prefix;
}

function toComponentName(folderPrefix, originalName) {
  // Remove extensão, converte nome base para PascalCase
  const baseName = toPascalCase(originalName.replace('.svg', ''));
  return `Icons${folderPrefix}${baseName}`;
}

function findSvgFiles(dir) {
  const files = [];
  function scanDirectory(currentDir, relativePath = '') {
    const items = fs.readdirSync(currentDir);
    for (const item of items) {
      const fullPath = path.join(currentDir, item);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        const newRelativePath = relativePath ? path.join(relativePath, item) : item;
        scanDirectory(fullPath, newRelativePath);
      } else if (item.endsWith('.svg')) {
        files.push({
          fullPath,
          relativePath,
          folderName: path.basename(path.dirname(fullPath))
        });
      }
    }
  }
  scanDirectory(dir);
  return files;
}

function processSvgFiles() {
  const assetsDir = './assets/icons';
  const iconsDir = './components/ui/Icons';
  const tmpDir = './.icons-tmp';

  // Limpa pasta temporária e de destino se existirem
  if (fs.existsSync(tmpDir)) {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
  if (fs.existsSync(iconsDir)) {
    fs.rmSync(iconsDir, { recursive: true, force: true });
  }
  fs.mkdirSync(tmpDir, { recursive: true });
  fs.mkdirSync(iconsDir, { recursive: true });

  // Encontra todos os arquivos SVG
  const svgFiles = findSvgFiles(assetsDir);
  if (svgFiles.length === 0) {
    console.log('❌ Nenhum arquivo SVG encontrado em ./assets/icons/**/*');
    return;
  }
  console.log(`📁 Encontrados ${svgFiles.length} arquivos SVG`);

  // Garante nomes únicos e determinísticos
  const nameToSvg = new Map();
  for (const svgFile of svgFiles) {
    const originalName = path.basename(svgFile.fullPath, '.svg');
    const folderPrefix = getFolderPrefix(svgFile.folderName);
    const componentName = toComponentName(folderPrefix, originalName);
    const key = componentName;
    if (nameToSvg.has(key)) {
      // Se o conteúdo do SVG for igual, ignore duplicata
      const prevContent = fs.readFileSync(nameToSvg.get(key).fullPath, 'utf8');
      const currContent = fs.readFileSync(svgFile.fullPath, 'utf8');
      if (prevContent === currContent) {
        continue;
      } else {
        // Se for diferente, avise e pule (ou gere um nome alternativo, se preferir)
        console.warn(`⚠️ Conflito: ${key} já existe com conteúdo diferente. Ignorando ${svgFile.fullPath}`);
        continue;
      }
    }
    nameToSvg.set(key, svgFile);
  }

  // Processa cada arquivo único
  const processedFiles = [];
  for (const [componentName, svgFile] of nameToSvg.entries()) {
    const tmpSvgPath = path.join(tmpDir, `${componentName}.svg`);
    fs.copyFileSync(svgFile.fullPath, tmpSvgPath);
    processedFiles.push({
      tempSvg: tmpSvgPath,
      camelName: componentName,
      originalName: path.basename(svgFile.fullPath, '.svg'),
      folderName: svgFile.folderName
    });
    console.log(`✅ ${svgFile.fullPath} -> ${componentName}`);
  }

  // Gera componentes React usando SVGR
  console.log('\n🔧 Gerando componentes React...');
  try {
    const batchSize = 50;
    const batches = [];
    for (let i = 0; i < processedFiles.length; i += batchSize) {
      batches.push(processedFiles.slice(i, i + batchSize));
    }
    for (let batchIndex = 0; batchIndex < batches.length; batchIndex++) {
      const batch = batches[batchIndex];
      console.log(`\n📦 Processando lote ${batchIndex + 1}/${batches.length} (${batch.length} arquivos)...`);
      const cmd = [
        'npx', 'svgr',
        '--typescript',
        '--icon',
        '--out-dir', iconsDir
      ];
      for (const { tempSvg } of batch) {
        cmd.push(tempSvg);
      }
      execSync(cmd.join(' '), { stdio: 'inherit' });
    }
    console.log('✅ Componentes React gerados com sucesso!');
    // Cria arquivo index.tsx manualmente
    const indexPath = path.join(iconsDir, 'index.tsx');
    let customIconsBlock = '';
    if (fs.existsSync(indexPath)) {
      const oldContent = fs.readFileSync(indexPath, 'utf8');
      const match = oldContent.match(/\/\/ --- CUSTOM ICONS: NÃO REMOVER, NÃO ALTERAR VIA SCRIPT ---[\s\S]*?\/\/ --- FIM DOS CUSTOM ICONS ---/);
      if (match) {
        customIconsBlock = '\n' + match[0] + '\n';
      }
    }
    const indexContent = processedFiles
      .map(({ camelName }) => `export { default as ${camelName} } from './${camelName}';`)
      .join('\n');
    fs.writeFileSync(indexPath, indexContent + customIconsBlock);
    console.log('📄 Arquivo index.tsx criado manualmente (custom icons preservados)');
    const generatedComponents = fs.readdirSync(iconsDir).filter(file => file.endsWith('.tsx'));
    console.log(`📦 ${generatedComponents.length} componentes gerados em ${iconsDir}`);
  } catch (error) {
    console.log(`❌ Erro ao gerar componentes: ${error.message}`);
  }
  // Limpa pasta temporária
  if (fs.existsSync(tmpDir)) {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}

console.log('🚀 Processando ícones SVG...');
processSvgFiles();
console.log('✨ Processamento concluído!');

// Utilitário: Limpa o index.tsx dos ícones mantendo apenas exports válidos
if (require.main === module && process.argv.includes('--fix-index')) {
  const fs = require('fs');
  const path = require('path');
  const iconsDir = path.join(__dirname, 'components/ui/Icons');
  const indexFile = path.join(iconsDir, 'index.tsx');
  const files = fs.readdirSync(iconsDir)
    .filter(f => f.endsWith('.tsx') && f !== 'index.tsx')
    .map(f => f.replace(/\.tsx$/, ''));
  const validSet = new Set(files);
  const lines = fs.readFileSync(indexFile, 'utf8').split('\n');
  const filtered = lines.filter(line => {
    const match = line.match(/from '\.\/(.+)';/);
    if (!match) return true;
    return validSet.has(match[1]);
  });
  fs.writeFileSync(indexFile, filtered.join('\n'));
  console.log('index.tsx limpo: apenas exports válidos mantidos.');
} 