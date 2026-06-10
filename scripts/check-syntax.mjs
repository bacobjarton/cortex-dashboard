// Syntax gate: extracts the in-browser JSX from index.html and parses it with
// @babel/parser. Because the app compiles in the browser (Babel standalone),
// a malformed character would otherwise ship straight to production as a
// blank page. Run via `npm run check` — CI runs the same thing.
import { readFileSync } from 'node:fs';
import { parse } from '@babel/parser';

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const match = html.match(/<script type="text\/babel">([\s\S]*?)<\/script>/);

if (!match) {
  console.error('FAIL: no <script type="text/babel"> block found in index.html');
  process.exit(1);
}

try {
  parse(match[1], { sourceType: 'script', plugins: ['jsx'] });
  console.log(`OK: index.html JSX parses cleanly (${match[1].length.toLocaleString()} chars)`);
} catch (err) {
  // err.loc is relative to the script block; offset to real file coordinates
  const scriptStartLine = html.slice(0, match.index).split('\n').length;
  const line = err.loc ? scriptStartLine + err.loc.line : '?';
  console.error(`FAIL: JSX syntax error at index.html:${line} — ${err.message}`);
  process.exit(1);
}
