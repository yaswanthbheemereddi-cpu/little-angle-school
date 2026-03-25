const { execSync } = require('child_process');
try {
  const output = execSync('npm run build', { encoding: 'utf8', env: {...process.env, CI: 'true'} });
  console.log('SUCCESS:\n', output);
} catch (err) {
  console.log('ERROR STATUS:', err.status);
  console.log('STDOUT:\n', err.stdout);
  console.log('STDERR:\n', err.stderr);
}
