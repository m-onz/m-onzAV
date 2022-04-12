
/*

if you have folders of sounds..

sounds/demo/test.wav
sounds/demo/test_b.wav
sounds/demo2/test.wav

this will rename all wavs incrementally too.

sounds/demo/1.wav
sounds/demo/2.wav

and so on...

*/

var fs = require('fs/promises')
var cwd = process.cwd()

var soundsDir = __dirname+'/sounds2'

var dirs = fs.readdir(soundsDir)

dirs.then(function (_dirs) {
  _dirs = _dirs.map(async function (path) {
    var files = await fs.readdir(soundsDir+'/'+path)
    return { folderPath: soundsDir, folder: path, files: files }
  })
  Promise.all(_dirs).then(function (paths) {
    paths = paths.map(function (i) {
      return new Promise(function (resolve, reject) {
        i.files = i.files.map(function (_i, index) {
          return renameFile(i.folderPath+'/'+i.folder+'/'+_i, i.folderPath+'/'+i.folder+'/'+(index+1)+'.wav')
        })
        Promise.all(i.files).then(resolve).catch(reject)
      })
    })
  })
})

function renameFile(path, newPath) {
  return new Promise(function (resolve, reject) {
    console.log('renaming file ', path);
    return fs.rename(path, newPath)
  })
}
