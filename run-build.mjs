import { execSync } from 'child_process';
import fs from 'fs';
try {
  const result = execSync('npm run build', { encoding: 'utf8', stdio: 'pipe' });
  fs.writeFileSync('build-out.txt', result);
} catch (e) {
  fs.writeFileSync('build-out.txt', (e.stdout || '') + '\n\n' + (e.stderr || '') + '\n\n' + e.message);
}
