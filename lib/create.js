const fs = require("fs");
const path = require("path");

module.exports = function create(name){

  const projectPath = path.join(process.cwd(), name);
  const templatePath = path.join(__dirname, "../templates/basic");

  if(fs.existsSync(projectPath)){
    console.log("Folder already exists");
    return;
  }

  fs.mkdirSync(projectPath);
  copyFolder(templatePath, projectPath);

  console.log("Server created:", name);
};

function copyFolder(src,dest){

  const files = fs.readdirSync(src);

  files.forEach(file=>{

    const srcPath = path.join(src,file);
    const destPath = path.join(dest,file);

    if(fs.statSync(srcPath).isDirectory()){
      fs.mkdirSync(destPath);
      copyFolder(srcPath,destPath);
    }else{
      fs.copyFileSync(srcPath,destPath);
    }

  });

}
