#!/usr/bin/env bun

import { readdirSync, readFileSync, writeFileSync, statSync } from 'fs';
import { join, relative } from 'path';
import Fuse from 'fuse.js';

const CONTENT_DIR = 'exampleSite/content';
const OUTPUT_DIR = 'static';
const DATA_FILE = join(OUTPUT_DIR, 'search-data.json');
const INDEX_FILE = join(OUTPUT_DIR, 'fuse-index.json');

function parseMarkdownFile(filePath) {
  const content = readFileSync(filePath, 'utf-8');

  const frontmatterMatch = content.match(/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/);
  if (!frontmatterMatch) return null;

  const [, frontmatter, body] = frontmatterMatch;
  const metadata = {};

  frontmatter.split('\n').forEach(line => {
    const match = line.match(/^(\w+):\s*(.+)$/);
    if (match) {
      const [, key, value] = match;
      if (key === 'tags' || key === 'categories') {
        metadata[key] = value.replace(/[\[\]"']/g, '').split(',').map(t => t.trim()).filter(Boolean);
      } else {
        metadata[key] = value.replace(/^["']|["']$/g, '');
      }
    }
  });

  const plainContent = body
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`[^`]+`/g, '')
    .replace(/#{1,6}\s+/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[*_~`]/g, '')
    .replace(/\n+/g, ' ')
    .trim();

  return {
    ...metadata,
    content: plainContent
  };
}

function getMarkdownFiles(dir, fileList = []) {
  const files = readdirSync(dir);

  files.forEach(file => {
    const filePath = join(dir, file);
    const stat = statSync(filePath);

    if (stat.isDirectory()) {
      getMarkdownFiles(filePath, fileList);
    } else if (file.endsWith('.md') && !file.startsWith('_')) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

function generateUri(filePath) {
  const relativePath = relative(CONTENT_DIR, filePath);
  const withoutExt = relativePath.replace(/\.md$/, '');
  const withoutIndex = withoutExt.replace(/\/_?index$/, '');

  if (!withoutIndex) return '/';
  return `/${withoutIndex}/`;
}

function buildSearchIndex() {
  console.log('🔍 Building search index...');

  const markdownFiles = getMarkdownFiles(CONTENT_DIR);
  const searchData = [];

  markdownFiles.forEach(filePath => {
    const parsed = parseMarkdownFile(filePath);
    if (!parsed || !parsed.title) return;

    searchData.push({
      uri: generateUri(filePath),
      title: parsed.title,
      content: parsed.content || '',
      tags: parsed.tags || [],
      categories: parsed.categories || []
    });
  });

  console.log(`📄 Indexed ${searchData.length} pages`);

  const keys = [
    { name: 'title', weight: 2.0 },
    { name: 'content', weight: 0.2 },
    { name: 'tags', weight: 1.0 },
    { name: 'categories', weight: 1.0 }
  ];

  const fuseIndex = Fuse.createIndex(keys, searchData);

  writeFileSync(DATA_FILE, JSON.stringify(searchData, null, 2));
  console.log(`✅ Wrote search data to ${DATA_FILE}`);

  writeFileSync(INDEX_FILE, JSON.stringify(fuseIndex.toJSON()));
  console.log(`✅ Wrote search index to ${INDEX_FILE}`);

  console.log('🎉 Search index built successfully!');
}

buildSearchIndex();
