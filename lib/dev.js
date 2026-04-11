const { spawn } = require("child_process");

function dev() {
const child = spawn("node", ["app.js"], {
  stdio: "inherit"
});
console.log(`
==============================
🔐 TODAY SECURITY NOTICE
==============================

📦 Package: axios
⚠️  Affected: <= 1.14.0
🔥 Severity: CRITICAL

📖 See README for full details

⚡ Action Required:
- Update immediately
- Check your dependencies

==============================
Stay safe. Security matters.
==============================
`);
}
module.exports = dev;
