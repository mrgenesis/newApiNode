const path = require('path')

  , fs = require('fs')

  , crypto = require('crypto')

  , randomNumberInteger = require(
    path.join(__dirname, '..', '..', 'src', 'utils', 'randomNumberInteger'))

  , getFoldersNameList = require(
    path.join(__dirname, '..', '..', 'src', 'utils', 'getFoldersNameList'));

describe('Pega uma lista pastas', () => {
  it('deve retornar um array de pastas de dentro do path informado', () => {
    const newFolderTest = crypto.randomBytes(5).toString('hex')
      , getMinMaxRandomNumber = { min: randomNumberInteger(4), max: randomNumberInteger(12, 7) }
      , pathNewFolder = path.join(__dirname, newFolderTest)
      , folderOrFileName = { toAdd: '', folders: [], files: [] };

    let count = getMinMaxRandomNumber.min;
    fs.mkdirSync(pathNewFolder);

    while (count <= getMinMaxRandomNumber.max) {
      folderOrFileName.toAdd = path.join(pathNewFolder, crypto.randomBytes(7).toString('hex'));
      if (randomNumberInteger() % 2 === 0) {
        fs.writeFileSync(folderOrFileName.toAdd, 'content put dynamiclly: ' + folderOrFileName.toAdd)
        folderOrFileName.files.push(folderOrFileName.toAdd);
      } else {
        fs.mkdirSync(folderOrFileName.toAdd);
        folderOrFileName.folders.push(folderOrFileName.toAdd);
      }
      ++count;
    }
    folderOrFileName.joinFoldersNames = folderOrFileName.folders.join('-');

    const foldersList = getFoldersNameList(pathNewFolder);

    expect(foldersList.length).toBe(folderOrFileName.folders.length);
    expect(foldersList.every(folder =>
      folderOrFileName.joinFoldersNames.indexOf(folder) > -1)).toBe(true);
    fs.rmSync(pathNewFolder, { recursive: true });
  })
})