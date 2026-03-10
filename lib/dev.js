const { spawn } = require("child_process");

function dev() {
const child = spawn("node", ["app.js"], {
  stdio: "inherit"
});
}
module.exports = dev;
