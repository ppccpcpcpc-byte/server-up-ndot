const { exec } = require("child_process");
function build() {
// ../build.sh 실행
exec("sh ./build.sh", (error, stdout, stderr) => {
  if (error) {
    console.error(`runt<ime> error: ${error.message}`);
    return;
    }
    console.log(stdout);
  });
}
module.exports = build;
