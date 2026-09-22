/**
 * PostToolUse hook: typecheck after Claude edits a .ts/.tsx file.
 * This project has no test suite, so `tsc --noEmit` is the only automatic signal.
 * Non-blocking: failures are reported back to Claude as context, not as a veto.
 */
import {execSync} from 'node:child_process';
import {existsSync} from 'node:fs';

let raw = '';
process.stdin.setEncoding('utf8');
process.stdin.on('data', (c) => (raw += c));
process.stdin.on('end', () => {
  let file = '';
  try {
    const payload = JSON.parse(raw);
    file = payload.tool_input?.file_path ?? payload.tool_response?.filePath ?? '';
  } catch {
    process.exit(0);
  }

  if (!/\.tsx?$/.test(file)) process.exit(0);

  if (!existsSync('node_modules/typescript')) {
    console.log(
      JSON.stringify({systemMessage: 'Typecheck skipped — run `npm install` first.'}),
    );
    process.exit(0);
  }

  try {
    execSync('npx tsc --noEmit', {stdio: 'pipe'});
  } catch (err) {
    const output = `${err.stdout ?? ''}${err.stderr ?? ''}`
      .trim()
      .split('\n')
      .slice(0, 30)
      .join('\n');
    console.log(
      JSON.stringify({
        hookSpecificOutput: {
          hookEventName: 'PostToolUse',
          additionalContext: `\`tsc --noEmit\` failed after editing ${file}:\n\n${output}`,
        },
      }),
    );
  }
  process.exit(0);
});
