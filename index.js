var recursiveReadSync = require('recursive-readdir-sync');
var fs = require('fs');
var files;

try {
  files = recursiveReadSync('C:\\Projects\\GIT\\JSGames\\Source\\Auslots\\GamesRTG\\Nova7s\\common');
} catch(err){
  if(err.errno === 34){
    console.log('Path does not exist');
  } else {
    //something unrelated went wrong, rethrow
    throw err;
  }
}

var arrClassNames = [];
//loop over resulting files
for(let i = 0, len = files.length; i < len; i++){
  let contents = fs.readFileSync(files[i]).toString();
  try{
    let className = contents.split('provide(\'')[1].split('\')')[0];
    arrClassNames.push(className);
  }catch(e){
    //doNothing
  }
}

var unusedClasses = [];

for(let j = 0, len = arrClassNames.length; j < len; j++) {
  let used = 1;
  for(let i = 0, len = files.length; i < len; i++){
    let contents = fs.readFileSync(files[i]).toString();
    try{
      used = contents.split('require(\'' + arrClassNames[j]).length;
      if(used > 1) {
        break;
      }
    }catch(e){
      //doNothing
    }
  }
  if(used == 1) unusedClasses.push(arrClassNames[j]);
}
console.log('Unused Classes found ' + unusedClasses.length + ':');
for(let i = 0, len = unusedClasses.length; i < len; i++){
  console.log(unusedClasses[i]);
}