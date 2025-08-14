// utils/fileUtils.js
const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse/sync');

function readCsvFile(relativePath) {
  const absolutePath = path.resolve(process.cwd(), relativePath);
  const csvContent = fs.readFileSync(absolutePath, 'utf-8');
  return parse(csvContent, { columns: true, skip_empty_lines: true });
}

module.exports = { readCsvFile };
