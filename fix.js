const fs = require('fs');
const path = require('path');
function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else if (file.endsWith('.jsx')) { 
      results.push(file);
    }
  });
  return results;
}
const files = walk('src');
files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  content = content.replace(/CheckCircle2/g, 'CircleCheck');
  content = content.replace(/XCircle/g, 'CircleX');
  content = content.replace(/AlertTriangle/g, 'TriangleAlert');
  content = content.replace(/MessagesSquare/g, 'MessageSquare');
  fs.writeFileSync(f, content);
});
console.log('done');
