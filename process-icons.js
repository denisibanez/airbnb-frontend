#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function toCamelCase(name) {
  // Remove extensão
  name = name.replace('.svg', '');
  
  // Remove caracteres especiais e espaços, mantém apenas letras, números e hífens
  name = name.replace(/[^a-zA-Z0-9\-]/g, ' ');
  
  // Remove hífens duplicados e espaços
  name = name.replace(/[\-\s]+/g, ' ').trim();
  
  // Converte para camelCase
  const words = name.split(' ');
  if (words.length === 0) return 'Icon';
  
  // Primeira palavra em minúscula, resto em PascalCase
  let camelCase = words[0].toLowerCase();
  for (let i = 1; i < words.length; i++) {
    camelCase += words[i].charAt(0).toUpperCase() + words[i].slice(1).toLowerCase();
  }
  
  // Se começar com número, adiciona prefixo
  if (/^\d/.test(camelCase)) {
    camelCase = 'Icon' + camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
  }
  
  return capitalize(camelCase);
}

function getFolderPrefix(folderPath) {
  const folderName = path.basename(folderPath);
  
  // Mapeia nomes de pastas para prefixos mais legíveis
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
  
  // Sempre capitalize o prefixo
  const prefix = prefixMap[folderName] || folderName.replace(/[^a-zA-Z0-9]/g, '');
  return capitalize(prefix);
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
  
  // Limpa pasta temporária se existir
  if (fs.existsSync(tmpDir)) {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
  fs.mkdirSync(tmpDir, { recursive: true });
  
  // Limpa diretório de destino se existir
  if (fs.existsSync(iconsDir)) {
    fs.rmSync(iconsDir, { recursive: true, force: true });
  }
  fs.mkdirSync(iconsDir, { recursive: true });
  
  // Encontra todos os arquivos SVG
  const svgFiles = findSvgFiles(assetsDir);
  
  if (svgFiles.length === 0) {
    console.log('❌ Nenhum arquivo SVG encontrado em ./assets/icons/**/*');
    return;
  }
  
  console.log(`📁 Encontrados ${svgFiles.length} arquivos SVG`);
  
  // Processa cada arquivo
  const processedFiles = [];
  const usedNames = new Set();
  
  for (const svgFile of svgFiles) {
    const originalName = path.basename(svgFile.fullPath, '.svg');
    const baseCamelName = toCamelCase(originalName);
    const folderPrefix = getFolderPrefix(svgFile.folderName);
    
    // Cria nome único com prefixo da pasta
    let uniqueName = `${folderPrefix}${baseCamelName}`;
    
    // Se o nome já existe, adiciona sufixo numérico
    let counter = 1;
    while (usedNames.has(uniqueName)) {
      uniqueName = `${folderPrefix}${baseCamelName}${counter}`;
      counter++;
    }
    
    usedNames.add(uniqueName);
    
    // Copia para pasta temporária
    const tmpSvgPath = path.join(tmpDir, `${uniqueName}.svg`);
    fs.copyFileSync(svgFile.fullPath, tmpSvgPath);
    
    processedFiles.push({ 
      tempSvg: tmpSvgPath, 
      camelName: uniqueName,
      originalName,
      folderName: svgFile.folderName
    });
    
    console.log(`✅ ${originalName} (${svgFile.folderName}) -> ${uniqueName}`);
  }
  
  // Gera componentes React usando SVGR
  console.log('\n🔧 Gerando componentes React...');
  
  try {
    // Processa em lotes de 50 arquivos para evitar comando muito longo
    const batchSize = 50;
    const batches = [];
    
    for (let i = 0; i < processedFiles.length; i += batchSize) {
      batches.push(processedFiles.slice(i, i + batchSize));
    }
    
    for (let batchIndex = 0; batchIndex < batches.length; batchIndex++) {
      const batch = batches[batchIndex];
      console.log(`\n📦 Processando lote ${batchIndex + 1}/${batches.length} (${batch.length} arquivos)...`);
      
      // Comando SVGR simplificado sem template complexo
      const cmd = [
        'npx', 'svgr',
        '--typescript',
        '--icon',
        '--out-dir', iconsDir
      ];
      
      // Adiciona arquivos do lote atual
      for (const { tempSvg } of batch) {
        cmd.push(tempSvg);
      }
      
      // Executa SVGR
      execSync(cmd.join(' '), { stdio: 'inherit' });
    }
    
    console.log('✅ Componentes React gerados com sucesso!');
    
    // Cria arquivo index.ts manualmente
    const indexContent = processedFiles
      .map(({ camelName }) => `export { default as ${camelName} } from './${camelName}';`)
      .join('\n');
    
    fs.writeFileSync(path.join(iconsDir, 'index.ts'), indexContent);
    console.log('📄 Arquivo index.ts criado manualmente');
    
    // Lista componentes gerados
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