const fs = require('fs');

const files = [
  'src/zones/Zone1_VisualHealth.jsx',
  'src/zones/Zone2_LifeSupport.jsx',
  'src/zones/Zone3_Resources.jsx'
];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');

  // Backgrounds
  content = content.replace(/bg-\[\#0a0a0c\]/g, 'bg-(--dashboard-bg-deep)');
  content = content.replace(/bg-\[\#18181b\]/g, 'bg-(--dashboard-bg-deep)');
  content = content.replace(/bg-\[\#111114\]/g, 'bg-(--dashboard-bg-card)');
  content = content.replace(/bg-\[\#212124\]/g, 'bg-(--dashboard-bg-item)');
  content = content.replace(/bg-\[\#303033\]/g, 'bg-(--bg-card-hover)');
  content = content.replace(/bg-black\/40/g, 'bg-(--dashboard-bg-item)');
  content = content.replace(/bg-black\/5/g, 'bg-[var(--glass-border-strong)]');
  content = content.replace(/bg-white\/5/g, 'bg-(--bg-card)');
  content = content.replace(/bg-white\/20/g, 'bg-(--dashboard-stroke-strong)');

  // Borders
  content = content.replace(/border-white\/10/g, 'border-(--dashboard-stroke)');
  content = content.replace(/border-white\/5/g, 'border-(--dashboard-stroke)');
  content = content.replace(/border-white\/80/g, 'border-(--dashboard-stroke-strong)');
  
  // Specific replacements to avoid overlap
  content = content.replace(/text-\[\#e2e8f0\]/g, 'text-(--text-primary)');
  content = content.replace(/text-white\/80/g, 'text-(--text-secondary)');
  content = content.replace(/text-white\/60/g, 'text-(--text-muted)');
  content = content.replace(/text-white\/50/g, 'text-(--text-muted)');
  content = content.replace(/text-white\/40/g, 'text-(--text-muted)');
  
  content = content.replace(/text-gray-400/g, 'text-(--text-muted)');
  content = content.replace(/text-gray-500/g, 'text-(--text-muted)');
  content = content.replace(/text-gray-600/g, 'text-(--text-muted)');
  
  // text-white replacement
  content = content.replace(/text-white(?![\/\w\-])/g, 'text-(--text-primary)');

  // stroke replacements for SVGs
  content = content.replace(/stroke="white"/g, 'stroke="var(--text-primary)"');
  content = content.replace(/fill="white"/g, 'fill="var(--text-primary)"');

  fs.writeFileSync(file, content, 'utf8');
  console.log(`Processed ${file}`);
});
